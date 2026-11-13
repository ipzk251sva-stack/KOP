/** Presentational-компонент: не має стану, дані надходять лише через props. */
export default function KpiCard({ title, value, change, trend = 'neutral', description }) {
  return (
    <article className="kpi-card" aria-label={title}>
      <div className="kpi-heading"><h2>{title}</h2><span className="kpi-symbol" aria-hidden="true">↗</span></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-bottom"><span className={`change change--${trend}`}>{change}</span><p>{description}</p></div>
    </article>
  );
}
