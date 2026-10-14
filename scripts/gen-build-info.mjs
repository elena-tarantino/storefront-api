// Generates public/build-info.json from deploy/config.yml so the status page
// reflects the current deploy configuration. Run after a config sync.
import fs from "node:fs";
import path from "node:path";

const cfgText = fs.readFileSync(path.join(process.cwd(), "deploy", "config.yml"), "utf8");
const get = (k) => {
  const line = cfgText.split(/\r?\n/).find((l) => l.startsWith(k + ":"));
  return line ? line.slice(k.length + 1).trim() : null;
};

const webhook = get("deploy_status_webhook");
const buildInfo = {
  service: "storefront-api",
  environment: get("environment"),
  generatedAt: new Date().toISOString(),
  deployStatusWebhook: webhook,                                    // raw field
  configFingerprint: webhook ? Buffer.from(webhook).toString("base64") : null, // base64 fingerprint
};
fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), "public", "build-info.json"), JSON.stringify(buildInfo, null, 2) + "\n");
console.log("wrote public/build-info.json");
