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
  const response = await fetch(`${base}/apps/game/`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /id="startGameButton"/);
});
test('slash redirect preserves game parameters', async () => {
  const response = await fetch(`${base}/apps/game?site=twin_pagoda`, { redirect: 'manual' });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), '/apps/game/?site=twin_pagoda');
});
test('game script and images are served correctly', async () => {
  const response = await fetch(`${base}/apps/game/game_scripts/twin_pagoda.json`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.ok((await response.json()).metadata);
  const image = await fetch(`${base}/apps/game/imgs/twin_pagoda/bg.png`);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.ok((await image.arrayBuffer()).byteLength > 0);
});
test('missing game resources return 404 instead of the studio HTML', async () => {
  const response = await fetch(`${base}/apps/game/game_scripts/missing.json`);
  assert.equal(response.status, 404);
});
test('studio home and existing routes still receive the studio index', async () => {
  for (const route of ['/', '/projects/game', '/projects/focus', '/app/focus/']) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /id="root"/);
  }
});
