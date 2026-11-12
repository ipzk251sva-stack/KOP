import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_CATEGORIES, clampValue, filterItems } from '../src/utils/widgets.js';

test('counter clamps both boundaries and accepts an in-range value', () => {
  assert.equal(clampValue(-1, 1, 30), 1);
  assert.equal(clampValue(31, 1, 30), 30);
  assert.equal(clampValue(10, 1, 30), 10);
});

test('filter preserves order and does not mutate frozen input', () => {
  const items = Object.freeze([
    Object.freeze({ id: 'one', categoryId: 'a' }),
    Object.freeze({ id: 'two', categoryId: 'b' }),
    Object.freeze({ id: 'three', categoryId: 'a' }),
  ]);
  assert.deepEqual(filterItems(items, 'a').map((item) => item.id), ['one', 'three']);
  assert.equal(items.length, 3);
  assert.deepEqual(filterItems(items, ALL_CATEGORIES), items);
  assert.notEqual(filterItems(items, ALL_CATEGORIES), items);
  assert.deepEqual(filterItems(items, 'missing'), []);
});
