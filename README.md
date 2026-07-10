# Pro VSCode Themes

A collection of professional Visual Studio Code themes designed for developers who want a clean and productive coding experience.

![Pro Dark icon](images/icon.png)

## Themes

- **Pro Dark** — a low-glare dark theme with a blue accent, tuned syntax highlighting, and consistent colors across the editor, sidebar, tabs, terminal, and git decorations.

More themes (Pro Light, Pro Midnight, Pro High Contrast) are planned for future releases.

## Install

1. Open the **Extensions** view in VS Code (`Ctrl+Shift+X`).
2. Search for `Pro VSCode Themes`.
3. Click **Install**.
4. Open the Command Palette (`Ctrl+Shift+P`) → `Preferences: Color Theme` → select **Pro Dark**.

## Repository layout

```
pro-vscode-themes/
├── src/
│   ├── palettes/        # one flat color palette per theme variant
│   │   ├── dark.json     (Pro Dark — ready)
│   │   ├── light.json    (placeholder, not designed yet)
│   │   ├── midnight.json (placeholder, not designed yet)
│   │   └── soft.json     (placeholder, not designed yet)
│   ├── ui/               # workbench colors, one file per component, using {{paletteKey}} refs
│   │   ├── editor.json
│   │   ├── activitybar.json
│   │   ├── sidebar.json
│   │   ├── statusbar.json
│   │   ├── panel.json
│   │   └── terminal.json
│   ├── semantic/         # tokenColors (syntax highlighting), common + per-language additions
│   │   ├── common.json
│   │   ├── javascript.json
│   │   ├── typescript.json
│   │   ├── python.json
│   │   └── rust.json
│   └── generator/
│       └── build.js      # compiles src/ into the final themes/*.json files
├── themes/
│   └── Pro Dark Color Theme.json   # generated — do not hand-edit
├── scripts/
│   └── release.js        # build + vsce package + git commit
├── images/
│   └── icon.png
├── package.json
├── CHANGELOG.md
├── README.md
└── LICENSE
```

Only **Pro Dark** is wired up right now. Light/Midnight/Soft have placeholder
palettes (copies of `dark.json`) and are marked `ready: false` in
`src/generator/build.js`, so `npm run build` skips them until someone designs
real palettes for them and flips the flag.

## Development

Themes are generated, not hand-written. After editing anything under `src/`:

```bash
npm run build   # regenerates themes/*.json from src/
```

Then open this folder in VS Code and press `F5` to launch an Extension
Development Host with the rebuilt theme applied.

## Publishing to the Marketplace

This project uses [`vsce`](https://github.com/microsoft/vscode-vsce) (already available via `npm i -g @vscode/vsce` if needed). `vsce package`/`vsce publish` always run `npm run build` first (via the `vscode:prepublish` script), so the shipped theme is always up to date with `src/`.

1. Log in once with a Personal Access Token from Azure DevOps (scope: **Marketplace > Manage**):
   ```bash
   vsce login alvarosiles
   ```
2. Build, package locally, and commit in one step:
   ```bash
   npm run release -- "chore: release v1.0.0"
   ```
   This regenerates the themes, runs `vsce package` to verify the `.vsix`, then stages and commits everything. It does **not** push or publish.
3. Push and publish manually:
   ```bash
   git push
   vsce publish
   ```
   Or bump the version and publish in one step: `vsce publish patch|minor|major`.

## License

MIT — see [LICENSE](LICENSE).
