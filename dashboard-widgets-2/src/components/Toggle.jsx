import { useState } from 'react';

export default function Toggle({ title, description, defaultEnabled = false }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <section className={`widget theme-widget ${enabled ? 'theme-widget--dark' : ''}`} aria-label={title}>
      <div className="widget-header"><span className="widget-number">02</span><h2>{title}</h2></div>
      <p className="widget-description">{description}</p>
      <div className="theme-controls">
        <div className="theme-mode"><span className="mode-icon" aria-hidden="true">{enabled ? '☾' : '☀'}</span><div><strong>{enabled ? 'Темний режим' : 'Світлий режим'}</strong><p>Локальний стан секції</p></div></div>
        <button className="switch" type="button" role="switch" aria-label="Темний режим секції" aria-checked={enabled} onClick={() => setEnabled((previous) => !previous)}><span /></button>
      </div>
      <p className="theme-hint" aria-live="polite">{enabled ? 'Темний фон і світлий текст активні.' : 'Світлий фон і темний текст активні.'}</p>
    </section>
  );
}
