// 조형민(공통)

import { Routes, Route } from 'react-router-dom';
import CompanyListPage from './pages/CompanyListPage';
import CompanyPage from './pages/CompanyPage';
import InvestmentStatusPage from './pages/InvestmentStatusPage';
import ComparisionStatusPage from './pages/ComparisionStatusPage';
import MyComparisionPage from './pages/MyComparisionPage';
import MyComparisionResultPage from './pages/MyComparisionResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanyListPage />} />
      <Route path="companies">
        <Route index element={<CompanyListPage />} />
        <Route path=":companyId" element={<CompanyPage />} />
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
