import { useMemo } from 'react';
import useLaunches from '../hooks/useLaunches.js';
import { computeLiveKpis } from '../utils/liveStats.js';
import { formatDate } from '../utils/format.js';
import KpiCard from './KpiCard.jsx';
import LaunchesSection from './LaunchesSection.jsx';

export default function LaunchesContainer() {
  const { status, error, launches, upcomingTotal, reload } = useLaunches();
  const kpis = useMemo(
    () => computeLiveKpis(launches, upcomingTotal),
    [launches, upcomingTotal],
  );

  // Поки дані не готові, KPI не показують хибні нулі.
  const ready = status === 'success';
  const pending = (value) => (ready ? value : '…');

  return (
    <>
      <section className="kpi-grid" aria-label="Ключові показники">
        <KpiCard
          title="Найближчий запуск"
          value={pending(kpis.nearest ? formatDate(kpis.nearest.netTs) : 'Немає')}
          change={ready && kpis.daysUntil !== null ? `через ${kpis.daysUntil} дн.` : '—'}
          trend="neutral"
          description={ready ? kpis.nearest?.name ?? 'Запланованих місій немає' : 'Очікуємо дані'}
        />
        <KpiCard
          title="Проведено у поточному році"
          value={pending(String(kpis.launchedThisYear))}
          change="за вибіркою"
          trend="neutral"
          description="Рахується з 50 останніх завершених запусків"
        />
        <KpiCard
          title="Заплановані місії"
          value={pending(String(kpis.upcomingTotal))}
          change="всього в API"
          trend="neutral"
          description="Загальна кількість майбутніх запусків"
        />
      </section>

      <LaunchesSection
        status={status}
        error={error}
        launches={launches}
        onRetry={reload}
      />
    </>
  );
}