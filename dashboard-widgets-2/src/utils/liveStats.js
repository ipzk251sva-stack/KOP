const DAY_MS = 86_400_000;

// Чиста функція: отримує реальні дані й повертає значення для KPI.
export function computeLiveKpis(launches, upcomingTotal, now = Date.now()) {
  const future = launches.filter((l) => Number.isFinite(l.netTs) && l.netTs > now);
  const nearest = future.reduce(
    (best, l) => (!best || l.netTs < best.netTs ? l : best),
    null,
  );

  const currentYear = new Date(now).getUTCFullYear();
  const launchedThisYear = launches.filter(
    (l) =>
      Number.isFinite(l.netTs) &&
      l.netTs <= now &&
      new Date(l.netTs).getUTCFullYear() === currentYear,
  ).length;

  return {
    nearest,
    daysUntil: nearest ? Math.ceil((nearest.netTs - now) / DAY_MS) : null,
    launchedThisYear,
    upcomingTotal,
  };
}