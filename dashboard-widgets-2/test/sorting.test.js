import test from 'node:test';
import assert from 'node:assert/strict';
import { sortLaunches } from '../src/utils/sorting.js';

const data = [
  { id: 1, name: 'Beta', netTs: 300 },
  { id: 2, name: 'Alpha', netTs: Number.NaN },
  { id: 3, name: 'Gamma', netTs: 100 },
];

test('сортування за датою в обидва боки, відсутні дати в кінці', () => {
  assert.deepEqual(sortLaunches(data, 'netTs', 'asc').map((l) => l.id), [3, 1, 2]);
  assert.deepEqual(sortLaunches(data, 'netTs', 'desc').map((l) => l.id), [1, 3, 2]);
});

test('сортування за назвою', () => {
  assert.deepEqual(sortLaunches(data, 'name', 'asc').map((l) => l.name), ['Alpha', 'Beta', 'Gamma']);
  assert.deepEqual(sortLaunches(data, 'name', 'desc').map((l) => l.name), ['Gamma', 'Beta', 'Alpha']);
});

test('вхідний масив не мутується', () => {
  const before = data.map((l) => l.id);
  sortLaunches(data, 'name', 'desc');
  assert.deepEqual(data.map((l) => l.id), before);
});