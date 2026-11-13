import DashboardLayout from './components/DashboardLayout.jsx';
import Counter from './components/Counter.jsx';
import Toggle from './components/Toggle.jsx';
import LaunchesContainer from './components/LaunchesContainer.jsx';
import { dashboard } from './data/dashboard.js';

export default function App() {
  return (
    <DashboardLayout
      title={dashboard.title}
      subtitle={dashboard.subtitle}
      domain={dashboard.domain}
      source="Дані: Launch Library 2 (The Space Devs)"
      brand={dashboard.brand}
    >
      <LaunchesContainer />
      <div className="widget-grid">
        <Counter {...dashboard.counter} />
        <Toggle {...dashboard.toggle} />
      </div>
    </DashboardLayout>
  );
}