#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const OUT_DIR = path.join(ROOT, 'themes');

// Add a variant here once its palette in src/palettes/ is actually designed,
// then flip ready to true.
const THEMES = [
  { label: 'Pro Dark', type: 'dark', palette: 'dark', output: 'Pro Dark Color Theme.json', ready: true },
  { label: 'Pro Light', type: 'light', palette: 'light', output: 'Pro Light Color Theme.json', ready: false },
  { label: 'Pro Midnight', type: 'dark', palette: 'midnight', output: 'Pro Midnight Color Theme.json', ready: false },
  { label: 'Pro Soft', type: 'dark', palette: 'soft', output: 'Pro Soft Color Theme.json', ready: false }
];

const UI_FILES = ['editor', 'activitybar', 'sidebar', 'statusbar', 'panel', 'terminal'];
const SEMANTIC_FILES = ['common', 'javascript', 'typescript', 'python', 'rust'];

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function resolvePlaceholders(value, palette) {
  return JSON.parse(
    JSON.stringify(value).replace(/\{\{(\w+)\}\}/g, (match, key) => {
      if (!(key in palette)) {
        throw new Error(`Unknown palette token "${key}" (used as ${match})`);
      }
      return palette[key];
    })
  );
}

function buildColors(palette) {
  let colors = {};
  for (const name of UI_FILES) {
    const chunk = readJSON(path.join(SRC, 'ui', `${name}.json`));
    colors = { ...colors, ...chunk };
  }
  return resolvePlaceholders(colors, palette);
}

function buildTokenColors(palette) {
  let tokenColors = [];
  for (const name of SEMANTIC_FILES) {
    const chunk = readJSON(path.join(SRC, 'semantic', `${name}.json`));
    tokenColors = tokenColors.concat(chunk);
  }
  return resolvePlaceholders(tokenColors, palette);
}

function buildTheme(def) {
  const palette = readJSON(path.join(SRC, 'palettes', `${def.palette}.json`));
  const theme = {
    name: def.label,
    type: def.type,
    colors: buildColors(palette),
    tokenColors: buildTokenColors(palette)
  };
  const outPath = path.join(OUT_DIR, def.output);
  fs.writeFileSync(outPath, JSON.stringify(theme, null, 2) + '\n');
  return outPath;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const built = [];
  const skipped = [];

  for (const def of THEMES) {
    if (!def.ready) {
      skipped.push(def.label);
      continue;
    }
    built.push(buildTheme(def));
  }

  for (const file of built) {
    console.log(`built ${path.relative(ROOT, file)}`);
  }
  if (skipped.length) {
    console.log(`skipped (palette not ready): ${skipped.join(', ')}`);
  }
}

main();
