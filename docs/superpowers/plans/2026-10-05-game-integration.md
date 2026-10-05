# Game Integration Implementation Plan

**Goal:** Serve the existing game at `/apps/game/` and link it from the studio.

**Architecture:** Copy only the static runtime files into `apps/game`. Keep the original game as the source project. Use an optional `appUrl` for the game entry while retaining the existing demo URLs.

**Tech Stack:** Plain HTML/CSS/JavaScript, Node.js HTTP server, Node.js test runner.

## Constraints

- Work in the current checkout as approved; preserve existing user changes.
- Do not modify the original game or copy dependencies, Git metadata, or temporary uploads.
- Do not publish externally; document static hosting with a concrete Nginx example.

## Tasks

- [x] Copy `index.html`, `config.js`, `scripts`, `styles`, `game_scripts`, and `imgs` into `apps/game`.
- [x] Add HTTP regression checks for the game index, slash redirect with query preservation, JSON/assets, missing game resources, and existing studio pages.
- [x] Update `server.cjs` to serve directory indexes, redirect to trailing slashes, serve JSON with its correct MIME type, and return 404 for missing game resources.
- [x] Add the game record to `apps.js`, use `appUrl` in `templates.js`, and retain existing demo links.
- [x] Add a repeatable PowerShell sync command and document local preview, source updates, and static hosting.
- [x] Run syntax checks and HTTP tests; exercise home, detail, game loading, and starting in a real browser.

## Verification

Run `npm run check` and `npm test`. Browser: open `/`, follow the game card to `/projects/game`, follow “打开应用” to `/apps/game/`, click “开始游戏”, verify dialogue and history, and refresh the game.

## Results and Decisions

- Approved integration was implemented directly in the current checkout; no commit or public deployment performed.
- Existing preview on port 5173 was preserved; the new server was tested on port 5174.
- HTTP checks and UI script regression: 6/6 pass. Syntax checks pass.
- Browser verified home, game detail, game start, history, dialogue option selection, and refresh.
- Browser revealed a source defect: duplicate reset statements outside UIManager. Only the release copy is corrected; sync applies the same narrow correction when the duplicate matches existing class content. Original source remains unchanged.
- The default npm launcher is broken in this execution environment; the installed CLI at D:\nodejs\node_modules\npm\bin\npm-cli.js successfully ran check, test, and sync scripts.
