export function formatDate(timestamp) {
  if (!Number.isFinite(timestamp)) return '—';
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(timestamp));
}