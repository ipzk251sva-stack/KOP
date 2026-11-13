import test from 'node:test';
import assert from 'node:assert/strict';
import { computeLiveKpis } from '../src/utils/liveStats.js';

const now = Date.parse('2026-10-12T00:00:00Z');
const launches = [
  { id: 1, name: 'Future A', netTs: Date.parse('2026-10-15T00:00:00Z') },
  { id: 2, name: 'Future B', netTs: Date.parse('2026-11-01T00:00:00Z') },
  { id: 3, name: 'Past 2026', netTs: Date.parse('2026-09-01T00:00:00Z') },
  { id: 4, name: 'Past 2025', netTs: Date.parse('2025-12-01T00:00:00Z') },
];

test('найближчий майбутній запуск і кількість днів до нього', () => {
  const kpis = computeLiveKpis(launches, 2, now);
  assert.equal(kpis.nearest.id, 1);
  assert.equal(kpis.daysUntil, 3);
  assert.equal(kpis.upcomingTotal, 2);
});

test('проведені лише в поточному році й не в майбутньому', () => {
  assert.equal(computeLiveKpis(launches, 2, now).launchedThisYear, 1);
});

test('порожні дані дають нульові KPI без помилок', () => {
  const kpis = computeLiveKpis([], 0, now);
  assert.equal(kpis.nearest, null);
  assert.equal(kpis.daysUntil, null);
  assert.equal(kpis.launchedThisYear, 0);
});