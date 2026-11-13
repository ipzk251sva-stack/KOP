import { createDashboardData } from '../utils/launches.js';

// Усі місії, агенції, ракети й дати вигадані. Модель наслідує Launch Library 2.
// Жодних API-запитів: віджети отримують дані лише через props.
const agencies = [
  { id: 101, name: 'DemoSpace', abbrev: 'DS' },
  { id: 102, name: 'OrbitWorks', abbrev: 'OW' },
  { id: 103, name: 'PolarLaunch', abbrev: 'PL' },
];
const statuses = {
  1: { id: 1, name: 'Go', abbrev: 'Go' },
  3: { id: 3, name: 'Launch Successful', abbrev: 'Success' },
  5: { id: 5, name: 'Hold', abbrev: 'Hold' },
};
const records = [
  [1, 'Orbit Demo 01', '2026-10-15T08:30:00Z', 1, 0, 'Vector 1', 'Demo Complex A'],
  [2, 'Lunar Demo', '2026-10-25T14:00:00Z', 5, 1, 'Nova 2', 'Demo Complex B'],
  [3, 'Polar Demo', '2026-11-20T06:15:00Z', 1, 2, 'Aurora', 'Demo Complex C'],
  [4, 'Relay Demo', '2026-09-10T12:00:00Z', 3, 0, 'Vector 1', 'Demo Complex A'],
  [5, 'Science Demo', '2026-05-04T09:00:00Z', 3, 1, 'Nova 2', 'Demo Complex B'],
  [6, 'Test Demo', '2026-01-15T10:45:00Z', 3, 2, 'Aurora', 'Demo Complex C'],
  [7, 'Archive Demo', '2025-12-06T16:20:00Z', 3, 0, 'Vector 1', 'Demo Complex A'],
];

export const mockLaunchResponse = {
  count: records.length,
  next: null,
  previous: null,
  results: records.map(([id, name, net, statusId, agencyIndex, rocketName, padName]) => ({
    id: `00000000-0000-4000-8000-${String(id).padStart(12, '0')}`,
    name: `${rocketName} | ${name}`,
    net,
    status: statuses[statusId],
    launch_service_provider: agencies[agencyIndex],
    mission: { id, name, type: 'Demonstration' },
    rocket: { configuration: { id: 201 + agencyIndex, name: rocketName, full_name: rocketName } },
    pad: { id: 301 + agencyIndex, name: padName, location: { name: 'Demo Location' } },
  })),
};

// Фіксована дата дає однакові навчальні результати в будь-який день запуску.
export const referenceDate = '2026-10-12T00:00:00Z';
export const dashboard = {
  ...createDashboardData(mockLaunchResponse.results, referenceDate),
  title: 'Космічні запуски',
  subtitle: 'Огляд місій, найближчих стартів і статусів запуску',
  brand: 'Launch desk',
  domain: 'Варіант 05 · Launch Library 2',
  variant: 5,
  source: 'Дані вигадані · дата демонстрації 12.10.2026 · без API-запитів',
  counter: { title: 'Ліміт місій', description: 'Налаштування ліміту для майбутнього API-запиту.', initialValue: 10, min: 1, max: 30, step: 1, unit: 'місій' },
  toggle: { title: 'Режим секції', description: 'Перемикач змінює лише вигляд цього віджета.', defaultEnabled: false },
  list: { title: 'Таблиця місій', description: 'Mock-місії Launch Library 2 · фільтрація за статусом', filterLabel: 'Статус' },
};
