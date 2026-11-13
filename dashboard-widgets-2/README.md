# Simple dashboard widgets — варіант 5

Навчальний React + Vite проєкт для предметної області «Космічні запуски». Дані беруться з Launch Library 2 (`ll.thespacedevs.com`).

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
    launchLibrary.js        запит до API, нормалізація даних
  hooks/
    useDebounce.js          затримка вводу (ЛР3)
    useFetch.js             запит + стани loading / error (ЛР3)
  components/
    DashboardLayout.jsx     спільна оболонка
    KpiCard.jsx             картка показника (presentational)
    LaunchFilters.jsx       контрольована форма фільтрів (ЛР3)
    LaunchesContainer.jsx   container: стан фільтрів, хуки, KPI
    LaunchesSection.jsx     presentational: loading / error / empty
    LaunchesTable.jsx       таблиця з сортуванням (ЛР2)
    Counter.jsx             лічильник (ЛР1)
    Toggle.jsx              перемикач теми секції (ЛР1)
  data/
    dashboard.js            заголовки і налаштування дашборду
  utils/
    format.js               форматування дат
    launchFilters.js        опції фільтрів і значення за замовчуванням
    launches.js             модель mock-даних (ЛР1)
    liveStats.js            KPI з реальних даних (ЛР2)
    sorting.js              сортування без мутації (ЛР2)
    widgets.js              допоміжні функції (ЛР1)
test/
  launches.test.js
  widgets.test.js
  liveStats.test.js
  sorting.test.js
  launchQuery.test.js
```

## Реалізовано

### ЛР2: дані з API
- `useEffect` виконує запит при першому рендері через `fetchLaunches`.
- Три стани: loading (спінер), error (повідомлення з кнопкою «Повторити»), empty (немає записів).
- Таблиця з п'ятьма полями: місія, дата старту (UTC), статус, ракета, провайдер, майданчик.
- Сортування за назвою, датою і статусом з перемиканням напрямку. Сортований масив створюється через `useMemo` і не змінює вихідний.
- KPI рахуються з реальних даних: найближчий запуск, кількість проведених у поточному році, загальна кількість записів.

### ЛР3: фільтри і хуки
- Контрольована форма `LaunchFilters`: пошук за назвою, фільтр за статусом, ліміт записів. Усі поля мають `value` і `onChange`, стан зберігається в `LaunchesContainer`.
- Кнопка «Скинути фільтри» повертає форму до `DEFAULT_FILTERS`.
- `useDebounce(filters, 400)`: запит іде лише після паузи в 400 мс.
- `useFetch(fetchLaunches, debouncedFilters)`: універсальний хук, що повертає `{ data, loading, error, reload }`. Не прив'язаний до конкретного компонента.
- Параметри запиту формує `buildLaunchQuery` у `api/launchLibrary.js`.

## Архітектура

Логіка відокремлена від представлення. Компоненти з префіксом `Launches` тільки отримують дані через props, а `LaunchesContainer` відповідає за стан, хуки та обчислення. Хуки `useDebounce` і `useFetch` не імпортують компонентів і можуть використовуватися повторно.

## Обмеження

- Анонімний ліміт Launch Library 2 малий. Якщо з'являється помилка 429, зачекайте кілька хвилин.
- KPI «Проведено у поточному році» рахується лише за записами, які відповідають поточним фільтрам, тому це не повна статистика року.
- `StrictMode` у режимі розробки подвоює запити. Для зменшення навантаження його можна прибрати в `main.jsx`.

## Джерела

- Документація API: https://lldev.thespacedevs.com/docs
