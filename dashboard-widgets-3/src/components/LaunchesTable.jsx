import { useMemo, useState } from 'react';
import { sortLaunches } from '../utils/sorting.js';
import { formatDate } from '../utils/format.js';

const COLUMNS = [
  { key: 'name', label: 'Місія', sortable: true },
  { key: 'netTs', label: 'Дата старту (UTC)', sortable: true },
  { key: 'status', label: 'Статус', sortable: true },
  { key: 'rocket', label: 'Ракета' },
  { key: 'provider', label: 'Провайдер' },
  { key: 'pad', label: 'Майданчик' },
];

export default function LaunchesTable({ launches }) {
  const [sort, setSort] = useState({ key: 'netTs', direction: 'asc' });

  // Derived state: оригінальний масив з props не змінюється.
  const sorted = useMemo(
    () => sortLaunches(launches, sort.key, sort.direction),
    [launches, sort],
  );

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  }

  function ariaSort(key) {
    if (sort.key !== key) return undefined;
    return sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <div className="table-scroll">
      <table className="mission-table">
        <caption className="sr-only">Запуски з Launch Library 2</caption>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col.key} scope="col" aria-sort={ariaSort(col.key)}>
                {col.sortable ? (
                  <button className="sort-button" type="button" onClick={() => handleSort(col.key)}>
                    {col.label}
                    {sort.key === col.key && (sort.direction === 'asc' ? ' ▲' : ' ▼')}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((launch) => (
            <tr key={launch.id}>
              <td>{launch.name}</td>
              <td>{formatDate(launch.netTs)}</td>
              <td><span className="status">{launch.status}</span></td>
              <td>{launch.rocket}</td>
              <td>{launch.provider}</td>
              <td>{launch.pad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}