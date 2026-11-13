import { useState } from 'react';
import { clampValue } from '../utils/widgets.js';

export default function Counter({ title, description, initialValue = 0, min = 0, max = 100, step = 1, unit = '' }) {
  const [value, setValue] = useState(() => clampValue(initialValue, min, max));

  function adjustValue(direction) {
    setValue((previous) => clampValue(previous + direction * step, min, max));
  }

  function resetValue() {
    setValue(clampValue(initialValue, min, max));
  }

  return (
    <section className="widget" aria-label={title}>
      <div className="widget-header"><span className="widget-number">01</span><h2>{title}</h2></div>
      <p className="widget-description">{description}</p>
      <div className="counter-controls">
        <button className="step-button" type="button" aria-label="Зменшити значення" disabled={value <= min} onClick={() => adjustValue(-1)}>−</button>
        <div className="counter-reading"><output aria-live="polite" aria-label="Поточне значення">{value}</output><span>{unit}</span></div>
        <button className="step-button" type="button" aria-label="Збільшити значення" disabled={value >= max} onClick={() => adjustValue(1)}>+</button>
      </div>
      <div className="widget-bottom"><span>Діапазон {min}–{max}</span><button className="text-button" type="button" onClick={resetValue}>Скинути</button></div>
    </section>
  );
}
