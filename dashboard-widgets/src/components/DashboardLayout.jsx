/** Спільне компонування. Вміст віджетів передається через children. */
export default function DashboardLayout({ title, subtitle, domain, source, brand, children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main"><span className="brand-mark" aria-hidden="true">L</span>{brand}</a>
        <span className="mock-badge"><span aria-hidden="true" />Mock-дані</span>
      </header>
      <main id="main" className="dashboard">
        <div className="page-heading">
          <div><p className="eyebrow">{domain}</p><h1>{title}</h1><p className="subtitle">{subtitle}</p></div>
          <span className="course-label">Лабораторна 01<span>React · Components</span></span>
        </div>
        {children}
        <footer className="page-footer"><span>{source}</span><span>Simple dashboard widgets</span></footer>
      </main>
    </div>
  );
}
