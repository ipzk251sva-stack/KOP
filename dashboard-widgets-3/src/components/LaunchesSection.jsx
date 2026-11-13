import LaunchesTable from './LaunchesTable.jsx';

// Presentational: показує один із трьох станів або таблицю.
export default function LaunchesSection({ loading, error, launches, onRetry }) {
  let content;

  if (loading) {
    content = (
      <div className="state state-loading" role="status">
        <span className="spinner" aria-hidden="true" />
        Завантаження запусків…
      </div>
    );
  } else if (error) {
    content = (
      <div className="state state-error" role="alert">
        <p>Не вдалося завантажити дані: {error}</p>
        <button type="button" onClick={onRetry}>Повторити</button>
      </div>
    );
  } else if (launches.length === 0) {
    content = <p className="state state-empty">За цими фільтрами запусків не знайдено.</p>;
  } else {
    content = <LaunchesTable launches={launches} />;
  }

  return (
    <section className="widget launches-widget" aria-label="Запуски з API">
      <div className="widget-header">
        <span className="widget-number">03</span>
        <h2>Запуски з Launch Library 2</h2>
      </div>
      {content}
    </section>
  );
}