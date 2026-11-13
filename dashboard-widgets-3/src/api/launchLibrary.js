const API = 'https://ll.thespacedevs.com/2.2.0/launch/';

export function buildLaunchQuery({ search = '', status = 'all', limit = 20 } = {}) {
  const params = new URLSearchParams({ limit: String(limit), ordering: '-net' });
  const term = search.trim();
  if (term) params.set('search', term);
  if (status !== 'all') params.set('status__ids', status);
  return params.toString();
}

export function normalizeLaunch(raw) {
  const netTs = raw.net ? Date.parse(raw.net) : Number.NaN;
  return {
    id: raw.id,
    name: raw.name ?? 'Без назви',
    netTs,
    status: raw.status?.name ?? 'Невідомо',
    rocket: raw.rocket?.configuration?.full_name ?? '—',
    provider: raw.launch_service_provider?.name ?? '—',
    pad: raw.pad?.name ?? '—',
  };
}

export async function fetchLaunches(filters, signal) {
  const response = await fetch(`${API}?${buildLaunchQuery(filters)}`, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? 'перевищено ліміт запитів до API (429), спробуйте пізніше'
        : `помилка HTTP ${response.status}`,
    );
  }
  const json = await response.json();
  return {
    launches: json.results.map(normalizeLaunch),
    total: json.count,
  };
}