import LaunchesTable from './LaunchesTable.jsx';

export default function LaunchesSection({ status, error, launches, onRetry }) {
  if (status === 'loading') {
    return (
      <section className="widget launches-widget" aria-label="Запуски з API">
        <div className="state state-loading" role="status">
          <span className="spinner" aria-hidden="true" />
          Завантаження запусків…
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="widget launches-widget" aria-label="Запуски з API">
        <div className="state state-error" role="alert">
          <p>Не вдалося завантажити дані: {error}</p>
          <button type="button" onClick={onRetry}>Повторити</button>
        </div>
      </section>
    );
  }

  return (
    <section className="widget launches-widget" aria-label="Запуски з API">
      <div className="widget-header">
        <span className="widget-number">03</span>
        <h2>Запуски з Launch Library 2</h2>
      </div>
      {launches.length === 0 ? (
        <p className="state state-empty">Запусків для відображення немає.</p>
      ) : (
        <LaunchesTable launches={launches} />
      )}
    </section>
  );
}