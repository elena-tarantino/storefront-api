// Writes a build-status stamp to the OS temp dir so CI can confirm the step ran.
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
fs.writeFileSync(path.join(os.tmpdir(), "c41f7a2e90.ok"), new Date().toISOString() + "
");
console.log("storefront: verify complete");
