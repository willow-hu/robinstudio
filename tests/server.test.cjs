const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
let processHandle, base;

before(async () => {
  processHandle = spawn(process.execPath, ['server.cjs'], {
    cwd: path.join(__dirname, '..'), env: { ...process.env, PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  base = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Server startup timed out')), 5000);
    processHandle.once('error', reject);
    processHandle.once('exit', code => reject(new Error(`Server exited: ${code}`)));
    processHandle.stdout.on('data', chunk => {
      const match = chunk.toString().match(/Preview: (http:\/\/127\.0\.0\.1:\d+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
});
after(() => processHandle?.kill());

test('game directory serves its own index', async () => {
  const response = await fetch(`${base}/apps/twin_pagoda_interaction_game/`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /id="startGameButton"/);
});
test('slash redirect preserves game parameters', async () => {
  const response = await fetch(`${base}/apps/twin_pagoda_interaction_game?site=twin_pagoda`, { redirect: 'manual' });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), '/apps/twin_pagoda_interaction_game/?site=twin_pagoda');
});
test('game script and images are served correctly', async () => {
  const response = await fetch(`${base}/apps/twin_pagoda_interaction_game/game_scripts/twin_pagoda.json`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.ok((await response.json()).metadata);
  const image = await fetch(`${base}/apps/twin_pagoda_interaction_game/imgs/twin_pagoda/bg.png`);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.ok((await image.arrayBuffer()).byteLength > 0);
});
test('missing game resources return 404 instead of the studio HTML', async () => {
  const response = await fetch(`${base}/apps/twin_pagoda_interaction_game/game_scripts/missing.json`);
  assert.equal(response.status, 404);
});
test('ScrAIter serves its build and relative JS/CSS assets under the subpath', async () => {
  const redirect = await fetch(`${base}/apps/scraiter?view=demo`, { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), '/apps/scraiter/?view=demo');
  const response = await fetch(`${base}/apps/scraiter/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /ScrAIter/);
  assert.doesNotMatch(html, /\/vite\.svg/);
  const assets = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"\s]+)"/g)];
  assert.ok(assets.length >= 2);
  for (const [, asset] of assets) {
    const resource = await fetch(new URL(asset, `${base}/apps/scraiter/`));
    assert.equal(resource.status, 200);
    assert.match(resource.headers.get('content-type'), /text\/(javascript|css)/);
  }
  assert.equal((await fetch(`${base}/apps/scraiter/assets/missing.js`)).status, 404);
});
test('studio home and existing routes still receive the studio index', async () => {
  for (const route of ['/', '/projects/20250825', '/projects/20251024', '/projects/20251225']) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /id="root"/);
  }
});
test('Museum UGC serves its entry, relative bundle and local JSON data', async () => {
  const redirect = await fetch(`${base}/apps/museum-ugc`, { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), '/apps/museum-ugc/');
  const response = await fetch(`${base}/apps/museum-ugc/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /文物探索/);
  const asset = html.match(/src="(\.\/assets\/[^"\s]+\.js)"/);
  assert.ok(asset);
  const bundle = await fetch(new URL(asset[1], `${base}/apps/museum-ugc/`));
  assert.equal(bundle.status, 200);
  assert.match(bundle.headers.get('content-type'), /javascript/);
  for (const name of ['ugc_data', 'users_data']) {
    const data = await fetch(`${base}/apps/museum-ugc/data/${name}.json`);
    assert.equal(data.status, 200);
    assert.match(data.headers.get('content-type'), /application\/json/);
    assert.ok(await data.json());
  }
  assert.equal((await fetch(`${base}/apps/museum-ugc/assets/missing.js`)).status, 404);
});

 test('Markdown details are served as text and missing details return 404', async () => {
  for (const id of ['20250825','20251024','20251225']) {
    const response = await fetch(base + '/details/' + id + '/detail.md');
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/markdown/);
    const markdown = await response.text();
    const { marked } = require('../vendor/marked.js');
    const html = marked.parse(markdown);
    assert.match(html, /<h1>/);
    assert.match(html, /<p>/);
  }
  const missing = await fetch(base + '/details/not-found.md');
  assert.equal(missing.status, 404);
 });

test('Project-local images and PDF links resolve alongside detail.md', async () => {
 for (const [id, file, type] of [['20251024','ProjectOverview.pdf','application/pdf'],['20251225','poster_grid.png','image/png']]) {
  const url = new URL(file, base + '/details/' + id + '/detail.md');
  const response = await fetch(url);
  assert.equal(response.status,200);
  assert.equal(response.headers.get('content-type'),type);
  assert.ok((await response.arrayBuffer()).byteLength > 0);
 }
});
