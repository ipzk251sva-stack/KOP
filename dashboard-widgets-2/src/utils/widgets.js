export const ALL_CATEGORIES = '__all__';

export function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// filter повертає новий масив; вихідні елементи та порядок не змінюються.
export function filterItems(items, categoryId) {
  return items.filter((item) => categoryId === ALL_CATEGORIES || item.categoryId === categoryId);
}
