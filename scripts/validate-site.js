const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ignoredDirs = new Set([".git", "node_modules", ".agents"]);
const unresolvedKeyPattern = /\b(?:now|timeline|map|library|photos|life|notes)\.[A-Za-z0-9_.-]+/;

function walk(dir, matcher, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name), matcher, out);
      continue;
    }
    const file = path.join(dir, entry.name);
    if (matcher(file)) out.push(file);
  }
  return out;
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function stripInvisible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

const errors = [];
const htmlFiles = walk(root, (file) => file.endsWith(".html"));
const jsFiles = walk(root, (file) => file.endsWith(".js"));

for (const file of jsFiles) {
  try {
    const source = fs.readFileSync(file, "utf8");
    const parseableSource = source.replace(/\bexport\s+default\b/, "const __default__ =");
    new Function(parseableSource);
  } catch (error) {
    errors.push(`${relative(file)}: JavaScript parse error: ${error.message}`);
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const fileDir = path.dirname(file);

  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      new Function(match[1]);
    } catch (error) {
      errors.push(`${relative(file)}: inline script parse error: ${error.message}`);
    }
  }

  for (const match of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/gi)) {
    const asset = match[1];
    if (/^(https?:)?\/\//i.test(asset) || asset.startsWith("#") || asset.startsWith("mailto:")) continue;
    if (asset.includes("?")) continue;
    const resolved = path.resolve(fileDir, asset);
    if (!fs.existsSync(resolved)) {
      errors.push(`${relative(file)}: missing referenced asset ${asset}`);
    }
  }

  const visible = stripInvisible(html);
  const unresolvedMatch = visible.match(unresolvedKeyPattern);
  if (unresolvedMatch) {
    errors.push(`${relative(file)}: visible unresolved token ${unresolvedMatch[0]}`);
  }

  if (visible.includes("undefined")) {
    errors.push(`${relative(file)}: visible unresolved token undefined`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and ${jsFiles.length} JavaScript files.`);
