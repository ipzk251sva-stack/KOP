import { LIMIT_OPTIONS, STATUS_OPTIONS } from '../utils/launchFilters.js';

export default function LaunchFilters({ values, onChange, onReset }) {
  return (
    <form
      className="widget filters-form"
      aria-label="Фільтри запусків"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="filters-grid">
        <label>
          Пошук за назвою
          <input
            type="search"
            value={values.search}
            placeholder="Наприклад, Falcon"
            onChange={(event) => onChange('search', event.target.value)}
          />
        </label>

        <label>
          Статус
          <select
            value={values.status}
            onChange={(event) => onChange('status', event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label>
          Кількість записів
          <select
            value={values.limit}
            onChange={(event) => onChange('limit', Number(event.target.value))}
          >
            {LIMIT_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" className="text-button" onClick={onReset}>
        Скинути фільтри
      </button>
    </form>
  );
}