import './CompanyPage.css';
import Header from '../components/HeaderKJY';
import CompanyDetailInfo from '../components/CompanyDetailInfo';
import CompanyInvestmentSection from '../components/CompanyInvestmentSection';
function CompanyPage() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <CompanyDetailInfo />
        <CompanyInvestmentSection />
      </div>
    </>
  );
}
export default CompanyPage;
