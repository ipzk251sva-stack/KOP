import { useCallback, useMemo, useState } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import useFetch from '../hooks/useFetch.js';
import { fetchLaunches } from '../api/launchLibrary.js';
import { computeLiveKpis } from '../utils/liveStats.js';
import { formatDate } from '../utils/format.js';
import { DEFAULT_FILTERS } from '../utils/launchFilters.js';
import KpiCard from './KpiCard.jsx';
import LaunchFilters from './LaunchFilters.jsx';
import LaunchesSection from './LaunchesSection.jsx';

export default function LaunchesContainer() {
  // Стан форми: єдине джерело істини.
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Затримка вводу: запит іде після паузи 400 мс.
  const debouncedFilters = useDebounce(filters, 400);

  // Запит залежить від відкладених фільтрів.
  const { data, loading, error, reload } = useFetch(fetchLaunches, debouncedFilters);

  const launches = data?.launches ?? [];
  const total = data?.total ?? 0;
  const kpis = useMemo(() => computeLiveKpis(launches, total), [launches, total]);

  const ready = !loading && !error && data !== null;
  const pending = (value) => (ready ? value : '…');

  const handleChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return (
    <>
      <section className="kpi-grid" aria-label="Ключові показники">
        <KpiCard
          title="Найближчий запуск"
          value={pending(kpis.nearest ? formatDate(kpis.nearest.netTs) : 'Немає')}
          change={ready && kpis.daysUntil !== null ? `через ${kpis.daysUntil} дн.` : '—'}
          trend="neutral"
          description={ready ? kpis.nearest?.name ?? 'У вибірці немає майбутніх запусків' : 'Очікуємо дані'}
        />
        <KpiCard
          title="Проведено у поточному році"
          value={pending(String(kpis.launchedThisYear))}
          change="за вибіркою"
          trend="neutral"
          description="Рахується з записів, що відповідають фільтрам"
        />
        <KpiCard
          title="Записів за фільтром"
          value={pending(String(total))}
          change="всього в API"
          trend="neutral"
          description="Скільки записів API знайшов для поточних фільтрів"
        />
      </section>

      <LaunchFilters
        values={filters}
        onChange={handleChange}
        onReset={handleReset}
      />

      <LaunchesSection
        loading={loading}
        error={error}
        launches={launches}
        onRetry={reload}
      />
    </>
  );
}