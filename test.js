// Minimal "test" stage for the CI/CD pipeline.
// Verifies that the built site contains the expected markers before it is deployed.
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const checks = [
  ["<title>DevOps Training</title>", "page title"],
  ['id="version"', "version element"],
  ["CI/CD Deployment Successful", "status message"],
];

let failed = false;
for (const [needle, label] of checks) {
  if (!html.includes(needle)) {
    console.error(`FAIL: missing ${label} (${needle})`);
    failed = true;
  } else {
    console.log(`PASS: found ${label}`);
  }
}

if (failed) {
  process.exit(1);
}
console.log("All checks passed.");
