# Simple dashboard widgets — варіант 5

Навчальний React + Vite проєкт для предметної області «Космічні запуски». Дані беруться з Launch Library 2 (`ll.thespacedevs.com`) і залежать від фільтрів, які задає користувач.

## Запуск

Потрібен Node.js 20.19+ або 22.12+ та npm.

```sh
npm ci
npm run dev
```

Для перевірки та збірки:

```sh
npm test
npm run build
npm run preview
```

## Структура

```text
src/
  App.jsx
  main.jsx
  styles.css
  api/
    launchLibrary.js          параметризований запит до API, нормалізація
  hooks/
    useDebounce.js            затримка вводу (400 мс)
    useFetch.js               універсальний запит + стани loading / error
  components/
    DashboardLayout.jsx       спільна оболонка
    KpiCard.jsx               картка показника (presentational)
    LaunchFilters.jsx         контрольована форма фільтрів
    LaunchesContainer.jsx     container: стан фільтрів, хуки, KPI
    LaunchesSection.jsx       presentational: loading / error / empty
    LaunchesTable.jsx         таблиця з сортуванням
    Counter.jsx               лічильник (ЛР1)
    Toggle.jsx                перемикач теми секції (ЛР1)
  data/
    dashboard.js              заголовки і налаштування дашборду
  utils/
    format.js                 форматування дат
    launchFilters.js          опції фільтрів і значення за замовчуванням
    liveStats.js              KPI з реальних даних
    sorting.js                сортування без мутації
    widgets.js                допоміжні функції (ЛР1)
    launches.js               модель mock-даних (ЛР1)
test/
  launches.test.js
  widgets.test.js
  liveStats.test.js
  sorting.test.js
  launchQuery.test.js
```

## Реалізовано

### Контрольована форма фільтрів
- `LaunchFilters`: пошук за назвою, фільтр за статусом, ліміт записів.
- Усі поля контрольовані: `value` і `onChange`, єдине джерело істини — стан у `LaunchesContainer`.
- Кнопка «Скинути фільтри» повертає стан до `DEFAULT_FILTERS`.

### Власні хуки
- `useDebounce(value, 400)`: повертає значення, яке змінюється лише після паузи в 400 мс. Запит не надсилається на кожне натискання клавіші.
- `useFetch(fetcher, params)`: приймає функцію запиту і параметри, повертає `{ data, loading, error, reload }`. Скасовує попередній запит через `AbortController`, якщо параметри змінились або компонент розмонтований.
- Обидва хуки не прив'язані до конкретного компонента і можуть використовуватися повторно.

### Інтеграція
- Фільтри → `useDebounce` → `useFetch(fetchLaunches, ...)` → таблиця і KPI оновлюються.
- Параметри запиту формує `buildLaunchQuery` у `api/launchLibrary.js`.

### Стани і таблиця (з ЛР2)
- Три стани: loading, error (з кнопкою «Повторити»), empty.
- Таблиця з п'ятьма полями і сортуванням за назвою, датою та статусом. Сортований масив створюється через `useMemo` без мутації.
- KPI рахуються з реальних даних.

## Архітектура

`LaunchesContainer` тримає стан фільтрів і викликає хуки. Компоненти `LaunchFilters`, `LaunchesSection` і `LaunchesTable` отримують дані через props і не містять `fetch` або таймерів.

## Обмеження

- Анонімний ліміт Launch Library 2 малий. Частий набір тексту без паузи або повторні зміни фільтрів можуть дати помилку 429. Затримка в 400 мс зменшує кількість запитів, але не скасовує ліміт.
- KPI «Записів за фільтром» показує загальну кількість з API для поточної вибірки, а «Проведено у поточному році» рахується лише з тих записів, що повернув запит.
- `StrictMode` у режимі розробки подвоює запити. Для зменшення навантаження його можна прибрати в `main.jsx`.

## Джерела

- Документація API: https://lldev.thespacedevs.com/docs
