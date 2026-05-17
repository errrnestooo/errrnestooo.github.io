const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const ADMIN_URL = "https://songyangao.com/admin/";

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

function htmlResponse(body, status = 200, extraHeaders = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
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
  return allowedDomains
    .split(",")
    .map((domain) => domain.trim())
    .filter(Boolean)
    .includes(siteId);
}

function callbackHtml(payload, status) {
  const isSuccess = status === "success";
  const message = `authorization:github:${status}:${safeJson(payload)}`;

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${isSuccess ? "登录完成" : "登录失败"} | Ernest's Journal</title>
  <style>
    :root{
      --bg:#fbf7f0;
      --text:#1f1f1f;
      --muted:#6b5f54;
      --line:#eadfce;
      --accent:#7a4e2d;
    }
    body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:var(--bg);
      color:var(--text);
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif;
    }
    main{
      max-width:420px;
      padding:28px;
      text-align:center;
      line-height:1.75;
    }
    h1{
      margin:0 0 8px;
      font-family:Georgia,"Times New Roman",serif;
      font-weight:500;
    }
    p{ color:var(--muted); margin:0; }
  </style>
</head>
<body>
  <main>
    <h1>${isSuccess ? "登录完成" : "登录失败"}</h1>
    <p>${isSuccess ? "正在返回 Ernest's Journal Admin..." : "请关闭此窗口后重试。"}</p>
  </main>
  <script>
    (function(){
      var message = ${JSON.stringify(message)};
      var adminUrl = ${JSON.stringify(ADMIN_URL)};

      function closePopup(){
        setTimeout(function(){
          window.close();
          if (!window.closed) window.location.replace(adminUrl);
        }, 250);
      }

      if (window.opener && !window.opener.closed) {
        var sent = false;
        function sendAuthorization(event){
          if (sent) return;
          sent = true;
          window.opener.postMessage(message, event.origin || adminUrl);
          closePopup();
        }

        window.addEventListener("message", function(event){
          if (event.data === "authorizing:github") sendAuthorization(event);
        });

        window.opener.postMessage("authorizing:github", "*");

        setTimeout(function(){
          if (!sent) {
            sent = true;
            window.opener.postMessage(message, adminUrl);
            closePopup();
          }
        }, 800);
      } else {
        window.location.replace(adminUrl);
      }
    })();
  </script>
</body>
</html>`;
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
      "cache-control": "no-store",
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
  const responseHeaders = { "set-cookie": clearStateCookie() };

  if (!code || !state) {
    return htmlResponse(
      callbackHtml({ error: "GitHub did not return an authorization code." }, "error"),
      400,
      responseHeaders
    );
  }

  if (!savedState || state !== savedState) {
    return htmlResponse(
      callbackHtml({ error: "OAuth state check failed." }, "error"),
      403,
      responseHeaders
    );
  }

  const tokenResult = await exchangeCodeForToken(code, env);
  const token = tokenResult.access_token;

  if (!token) {
    return htmlResponse(
      callbackHtml({ error: tokenResult.error_description || "Could not obtain a GitHub token." }, "error"),
      502,
      responseHeaders
    );
  }

  if (env.GITHUB_ALLOWED_LOGIN) {
    const user = await getGitHubUser(token);
    if (!user || user.login.toLowerCase() !== env.GITHUB_ALLOWED_LOGIN.toLowerCase()) {
      return htmlResponse(
        callbackHtml({ error: "This GitHub account is not allowed to edit Ernest's Journal." }, "error"),
        403,
        responseHeaders
      );
    }
  }

  return htmlResponse(
    callbackHtml({ token, provider: "github" }, "success"),
    200,
    responseHeaders
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
