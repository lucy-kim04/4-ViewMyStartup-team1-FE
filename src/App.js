import { Routes, Route } from 'react-router-dom';
import StartupListPage from './pages/StartupListPage';
import StartupPage from './pages/StartupPage';
import InvestmentStatusPage from './pages/InvestmentStatusPage';
import ComparisionStatusPage from './pages/ComparisionStatusPage';
import MyComparisionPage from './pages/MyComparisionPage';
import MyComparisionResultPage from './pages/MyComparisionResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartupListPage />} />
      <Route path="startups">
        <Route index element={<StartupListPage />} />
        <Route path=":startupId" element={<StartupPage />} />
      </Route>
      <Route path="my-comparision">
        <Route index element={<MyComparisionPage />} />
        <Route path="result" element={<MyComparisionResultPage />} />
      </Route>
      <Route path="investment-status" element={<InvestmentStatusPage />} />
      <Route path="comparision-status" element={<ComparisionStatusPage />} />
    </Routes>
  );
}

export default App;
