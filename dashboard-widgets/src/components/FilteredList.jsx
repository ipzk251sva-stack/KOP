import { useId, useState } from 'react';
import { ALL_CATEGORIES, filterItems } from '../utils/widgets.js';

export default function FilteredList({ title, description, items, categories, filterLabel = 'Категорія' }) {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const selectId = useId();
  const visibleItems = filterItems(items, selectedCategory);

  return (
    <section className="widget list-widget" aria-label={title}>
      <div className="list-header">
        <div><div className="widget-header"><span className="widget-number">03</span><h2>{title}</h2></div><p className="widget-description">{description}</p></div>
        <div className="filter-control"><label htmlFor={selectId}>{filterLabel}</label><select id={selectId} value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}><option value={ALL_CATEGORIES}>Усі статуси</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></div>
      </div>
      <p className="list-count" aria-live="polite">Показано {visibleItems.length} із {items.length}</p>
      {visibleItems.length > 0 ? (
        <div className="table-scroll"><table className="mission-table"><caption className="sr-only">{title}</caption><thead><tr><th scope="col">Місія / ракета</th><th scope="col">Дата UTC</th><th scope="col">Агенція</th><th scope="col">Статус</th></tr></thead><tbody>{visibleItems.map((item) => (
          <tr key={item.id}><td><div className="item-info"><h3>{item.name}</h3><p>{item.detail}</p></div></td><td>{item.date}</td><td>{item.agency}</td><td><span className={`status ${item.categoryId === '3' ? 'status--active' : ''}`}>{item.status}</span></td></tr>
        ))}</tbody></table></div>
      ) : <p className="empty-state">У цій категорії поки немає записів.</p>}
    </section>
  );
}
