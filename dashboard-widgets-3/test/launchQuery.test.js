import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLaunchQuery } from '../src/api/launchLibrary.js';
import { DEFAULT_FILTERS } from '../src/utils/launchFilters.js';

test('дефолтні фільтри не додають пошук і статус', () => {
  const q = new URLSearchParams(buildLaunchQuery(DEFAULT_FILTERS));
  assert.equal(q.get('limit'), '20');
  assert.equal(q.has('search'), false);
  assert.equal(q.has('status__ids'), false);
});

test('пошук обрізає пробіли, статус і ліміт потрапляють у запит', () => {
  const q = new URLSearchParams(buildLaunchQuery({ search: '  Falcon  ', status: '3', limit: 50 }));
  assert.equal(q.get('search'), 'Falcon');
  assert.equal(q.get('status__ids'), '3');
  assert.equal(q.get('limit'), '50');
});

test('пробіли в пошуку дають відсутній параметр', () => {
  const q = new URLSearchParams(buildLaunchQuery({ search: '   ' }));
  assert.equal(q.has('search'), false);
});