const statusLabels = { 1: 'Готовий', 3: 'Успішний', 4: 'Невдалий', 5: 'Відкладений' };
const completedStatusIds = new Set([3, 4]);
const scheduledStatusIds = new Set([1, 5]);

export function summarizeLaunches(launches, referenceDate) {
  const now = new Date(referenceDate);
  const scheduled = launches
    .filter((launch) => scheduledStatusIds.has(launch.status.id) && new Date(launch.net) >= now)
    .sort((a, b) => new Date(a.net) - new Date(b.net));
  const completedThisYear = launches.filter((launch) => completedStatusIds.has(launch.status.id)
    && new Date(launch.net).getUTCFullYear() === now.getUTCFullYear()
    && new Date(launch.net) <= now);
  return { nearest: scheduled[0] ?? null, upcomingCount: scheduled.length, completedCount: completedThisYear.length };
}

export function createDashboardData(launches, referenceDate) {
  const { nearest, upcomingCount, completedCount } = summarizeLaunches(launches, referenceDate);
  const dateFormatter = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', timeZone: 'UTC' });
  const nearestDate = nearest ? dateFormatter.format(new Date(nearest.net)) : 'Немає';
  const daysUntil = nearest ? Math.floor((new Date(nearest.net) - new Date(referenceDate)) / 86_400_000) : null;
  return {
    kpis: [
      { id: 'next', title: 'Найближчий запуск', value: nearestDate, change: daysUntil === null ? '—' : `через ${daysUntil} дн.`, trend: 'neutral', description: nearest?.mission?.name ?? 'Запланованих місій немає' },
      { id: 'year', title: `Проведено у ${new Date(referenceDate).getUTCFullYear()}`, value: String(completedCount), change: '+1', trend: 'positive', description: 'Порівняно з попередньою mock-вибіркою' },
      { id: 'upcoming', title: 'Заплановані місії', value: String(upcomingCount), change: '+2', trend: 'positive', description: 'Майбутні місії демонстраційної вибірки' },
    ],
    categories: Object.entries(statusLabels).map(([id, label]) => ({ id, label })),
    items: launches.map((launch) => ({
      id: launch.id,
      name: launch.mission?.name ?? launch.name,
      categoryId: String(launch.status.id),
      detail: `${launch.rocket.configuration.name} · ${launch.pad.name}`,
      date: new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(launch.net)),
      agency: launch.launch_service_provider.name,
      status: statusLabels[launch.status.id] ?? launch.status.name,
    })),
  };
}
