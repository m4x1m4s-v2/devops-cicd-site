// "Build/Package" stage: stamps the VERSION file's value into index.html
// and copies the static assets into dist/ ready for deployment to S3.
const fs = require("fs");
const path = require("path");

const root = __dirname;
const distDir = path.join(root, "dist");

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

const version = fs.readFileSync(path.join(root, "VERSION"), "utf8").trim();

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace(/<span id="version">.*?<\/span>/, `<span id="version">${version}</span>`);
fs.writeFileSync(path.join(distDir, "index.html"), html);

for (const file of ["style.css", "script.js"]) {
  fs.copyFileSync(path.join(root, file), path.join(distDir, file));
}

console.log(`Built dist/ with version ${version}`);
