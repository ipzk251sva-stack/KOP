import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeLaunches, createDashboardData } from '../src/utils/launches.js';
import { mockLaunchResponse, referenceDate } from '../src/data/dashboard.js';
import { filterItems } from '../src/utils/widgets.js';

test('launch KPIs use scheduled status, date and the selected year', () => {
  const summary = summarizeLaunches(mockLaunchResponse.results, referenceDate);
  assert.equal(summary.nearest.mission.name, 'Orbit Demo 01');
  assert.equal(summary.completedCount, 3);
  assert.equal(summary.upcomingCount, 3);
  assert.equal(mockLaunchResponse.results[0].mission.name, 'Orbit Demo 01');
});

test('empty launch response is displayed without invalid dates', () => {
  const data = createDashboardData([], referenceDate);
  assert.equal(data.kpis[0].value, 'Немає');
  assert.equal(data.kpis[1].value, '0');
  assert.deepEqual(data.items, []);
});

test('status filters return the documented mock mission counts', () => {
  const { items } = createDashboardData(mockLaunchResponse.results, referenceDate);
  assert.equal(filterItems(items, '1').length, 2);
  assert.equal(filterItems(items, '3').length, 4);
  assert.equal(filterItems(items, '5').length, 1);
  assert.equal(filterItems(items, '4').length, 0);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
});
