const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

function htmlResponse(body, status = 200, extraHeaders = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      ...extraHeaders
    }
  });
}

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/plain; charset=UTF-8" }
  });
}

function jsonScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function buildCallbackHtml(content, isError = false) {
  const state = isError ? "error" : "success";
  const message = `authorization:github:${state}:${jsonScript(content)}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Authorizing Ernest's Journal</title>
  <style>
    body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:#fbf7f0;
      color:#6b5f54;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    }
    main{
      max-width:420px;
      padding:24px;
      text-align:center;
      line-height:1.7;
    }
  </style>
</head>
<body>
  <main>
    <h1>${isError ? "Login failed" : "Login complete"}</h1>
    <p>${isError ? "Please close this window and try again." : "Returning to the admin page..."}</p>
  </main>
  <script>
    (function(){
      function sendMessage(event){
        if (!window.opener) return;
        window.opener.postMessage(${JSON.stringify(message)}, event.origin);
        window.removeEventListener("message", sendMessage, false);
        setTimeout(function(){ window.close(); }, 250);
      }

      if (window.opener) {
        window.addEventListener("message", sendMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      }
    })();
  </script>
</body>
</html>`;
}

function getCookie(request, name) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function clearStateCookie() {
  return "decap_oauth_state=deleted; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";
}

function allowedDomain(siteId, allowedDomains) {
  if (!allowedDomains) return true;
  const domains = allowedDomains.split(",").map((item) => item.trim()).filter(Boolean);
  return domains.includes(siteId);
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");
  const siteId = url.searchParams.get("site_id") || "";

  if (provider !== "github") {
    return textResponse("Unsupported OAuth provider.", 400);
  }

  if (!allowedDomain(siteId, env.ALLOWED_DOMAINS)) {
    return textResponse("This site is not allowed to use this OAuth proxy.", 403);
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return textResponse("GitHub OAuth environment variables are missing.", 500);
  }

  const state = crypto.randomUUID().replaceAll("-", "");
  const scope = env.GITHUB_REPO_PRIVATE === "true" ? "repo,user" : "public_repo,user";
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    scope,
    state
  });

  return new Response(null, {
    status: 302,
    headers: {
      location: `${GITHUB_AUTHORIZE_URL}?${params.toString()}`,
      "set-cookie": `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
    }
  });
}

async function exchangeCodeForToken(code, env) {
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  return response.json();
}

async function getGitHubUser(token) {
  const response = await fetch(GITHUB_USER_URL, {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "user-agent": "ernest-journal-decap-oauth"
    }
  });

  if (!response.ok) return null;
  return response.json();
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = getCookie(request, "decap_oauth_state");

  if (!code || !state) {
    return htmlResponse(
      buildCallbackHtml({ error: "GitHub did not return an authorization code.", provider: "github" }, true),
      400,
      { "set-cookie": clearStateCookie() }
    );
  }

  if (!savedState || state !== savedState) {
    return htmlResponse(
      buildCallbackHtml({ error: "OAuth state check failed.", provider: "github" }, true),
      403,
      { "set-cookie": clearStateCookie() }
    );
  }

  const tokenResult = await exchangeCodeForToken(code, env);
  const token = tokenResult.access_token;

  if (!token) {
    return htmlResponse(
      buildCallbackHtml({ error: tokenResult.error_description || "Could not obtain a GitHub access token.", provider: "github" }, true),
      502,
      { "set-cookie": clearStateCookie() }
    );
  }

  if (env.GITHUB_ALLOWED_LOGIN) {
    const user = await getGitHubUser(token);
    if (!user || user.login.toLowerCase() !== env.GITHUB_ALLOWED_LOGIN.toLowerCase()) {
      return htmlResponse(
        buildCallbackHtml({ error: "This GitHub account is not allowed to edit Ernest's Journal.", provider: "github" }, true),
        403,
        { "set-cookie": clearStateCookie() }
      );
    }
  }

  return htmlResponse(
    buildCallbackHtml({ token, provider: "github" }),
    200,
    { "set-cookie": clearStateCookie() }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/auth") {
      return handleAuth(request, env);
    }

    if (request.method === "GET" && url.pathname === "/callback") {
      return handleCallback(request, env);
    }

    return textResponse("Ernest's Journal CMS OAuth proxy is running.");
  }
};
