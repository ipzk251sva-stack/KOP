import DashboardLayout from './components/DashboardLayout.jsx';
import KpiCard from './components/KpiCard.jsx';
import Counter from './components/Counter.jsx';
import Toggle from './components/Toggle.jsx';
import FilteredList from './components/FilteredList.jsx';
import { dashboard } from './data/dashboard.js';

export default function App() {
  return (
    <DashboardLayout title={dashboard.title} subtitle={dashboard.subtitle} domain={dashboard.domain} source={dashboard.source} brand={dashboard.brand}>
      <section className="kpi-grid" aria-label="Ключові показники">
        {dashboard.kpis.map((kpi) => <KpiCard key={kpi.id} {...kpi} />)}
      </section>
      <div className="widget-grid"><Counter {...dashboard.counter} /><Toggle {...dashboard.toggle} /></div>
      <FilteredList {...dashboard.list} items={dashboard.items} categories={dashboard.categories} />
    </DashboardLayout>
  );
}
