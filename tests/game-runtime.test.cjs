const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('game UI script loads without executing instance methods at global scope', () => {
  const script = fs.readFileSync(path.join(__dirname, '../apps/twin_pagoda_interaction_game/scripts/uiManager.js'), 'utf8');
  assert.doesNotThrow(() => vm.runInNewContext(script, {}));
});
