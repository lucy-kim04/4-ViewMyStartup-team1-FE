import './CompanyPage.css';
import Header from '../components/HeaderKJY';
import CompanyDetailInfo from '../components/CompanyDetailInfo';
import CompanyInvestmentSection from '../components/CompanyInvestmentSection';
import { useLocation } from 'react-router-dom';
function CompanyPage() {
  /**
   * 페이지 이동 시 state에 company라는 객체로 company를 전달
   */
  const location = useLocation();
  const propCompany = location.state.company;
  return (
    <>
      <Header />
      <div className="wrapper">
        <CompanyDetailInfo company={propCompany} />
        <CompanyInvestmentSection />
      </div>
    </>
  );
}
export default CompanyPage;
