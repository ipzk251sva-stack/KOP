const isMissing = (value) => value == null || (typeof value === 'number' && Number.isNaN(value));

function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'uk');
}
export function sortLaunches(launches, key, direction = 'asc') {
  const factor = direction === 'asc' ? 1 : -1;
  return [...launches].sort((x, y) => {
    const a = x[key];
    const b = y[key];
    if (isMissing(a) || isMissing(b)) {
      if (isMissing(a) && isMissing(b)) return 0;
      return isMissing(a) ? 1 : -1;
    }
    return factor * compareValues(a, b);
  });
}