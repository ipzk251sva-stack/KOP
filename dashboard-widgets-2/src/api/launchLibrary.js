const API = 'https://ll.thespacedevs.com/2.2.0/launch';

async function requestJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? 'перевищено ліміт запитів до API (429), спробуйте пізніше'
        : `помилка HTTP ${response.status}`,
    );
  }
  return response.json();
}

// Перетворюємо відповідь API у плоску модель, яку використовує UI.
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

export async function fetchLaunches(signal) {
  const [upcoming, previous] = await Promise.all([
    requestJson(`${API}/upcoming/?limit=20&ordering=net`, signal),
    requestJson(`${API}/previous/?limit=50&ordering=-net`, signal),
  ]);
  return {
    launches: [...upcoming.results, ...previous.results].map(normalizeLaunch),
    upcomingTotal: upcoming.count,
  };
}