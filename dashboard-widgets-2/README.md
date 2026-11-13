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
    launchLibrary.js          запит до API, нормалізація даних
  hooks/
    useLaunches.js            useEffect + useState, стани запиту
  components/
    DashboardLayout.jsx       спільна оболонка
    KpiCard.jsx               картка показника (presentational)
    LaunchesContainer.jsx     container: дані, KPI
    LaunchesSection.jsx       presentational: loading / error / empty
    LaunchesTable.jsx         таблиця з сортуванням
    Counter.jsx               лічильник (ЛР1)
    Toggle.jsx                перемикач теми секції (ЛР1)
  data/
    dashboard.js              заголовки і налаштування дашборду
  utils/
    format.js                 форматування дат
    liveStats.js              KPI з реальних даних
    sorting.js                сортування без мутації
    widgets.js                допоміжні функції (ЛР1)
    launches.js               модель mock-даних (ЛР1)
test/
  launches.test.js
  widgets.test.js
  liveStats.test.js
  sorting.test.js
```

## Реалізовано

- `useLaunches` виконує запит через `useEffect` при монтуванні компонента і зберігає результат у стані через `useState`.
- Три стани: loading (спінер), error (повідомлення з кнопкою «Повторити»), empty (немає записів).
- Таблиця з п'ятьма полями: місія, дата старту (UTC), статус, ракета, провайдер, майданчик.
- Сортування за назвою, датою і статусом з перемиканням напрямку. Сортований масив створюється через `useMemo` і не змінює вихідний масив.
- KPI рахуються з реальних даних: найближчий запуск, кількість проведених у поточному році, кількість запланованих місій.
- Ключі рядків (`key`) беруться з `id` запису API.

## Архітектура

Логіка відокремлена від представлення. `LaunchesContainer` відповідає за дані та обчислення, а `LaunchesSection` і `LaunchesTable` лише відображають props. Запит до API винесено в `api/launchLibrary.js`, тому компоненти не містять `fetch`.

## Обмеження

- Анонімний ліміт Launch Library 2 малий. Якщо з'являється помилка 429, зачекайте кілька хвилин.
- KPI «Проведено у поточному році» рахується лише за останніми 50 завершеними запусками, тому це не повна статистика.
- `StrictMode` у режимі розробки подвоює запити. Для зменшення навантаження його можна прибрати в `main.jsx`.

## Джерела

- Документація API: https://lldev.thespacedevs.com/docs
