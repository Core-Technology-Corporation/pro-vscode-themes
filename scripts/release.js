#!/usr/bin/env node
'use strict';

// Regenerates the themes from src/, packages a local .vsix to verify the
// result, then stages and commits everything. Does NOT push or run
// `vsce publish` — those stay explicit, separate, manual steps.
//
// Usage: node scripts/release.js "commit message"
//   or:  npm run release -- "commit message"

const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const message = process.argv.slice(2).join(' ');

if (!message) {
  console.error('Usage: node scripts/release.js "commit message"');
  process.exit(1);
}

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

run('npm run build');
run('vsce package');
run('git add -A');
run(`git commit -m "${message.replace(/"/g, '\\"')}"`);

console.log('\nCommitted. Next steps (manual, not run automatically):');
console.log('  git push');
console.log('  vsce publish            # or: vsce publish patch|minor|major');
