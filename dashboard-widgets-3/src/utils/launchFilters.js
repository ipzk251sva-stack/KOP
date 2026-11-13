export const STATUS_OPTIONS = [
  { value: 'all', label: 'Усі статуси' },
  { value: '1', label: 'Go (готовий)' },
  { value: '3', label: 'Success (успішний)' },
  { value: '4', label: 'Failure (невдалий)' },
  { value: '5', label: 'Hold (відкладений)' },
];

export const LIMIT_OPTIONS = [10, 20, 50];

export const DEFAULT_FILTERS = Object.freeze({
  search: '',
  status: 'all',
  limit: 20,
});