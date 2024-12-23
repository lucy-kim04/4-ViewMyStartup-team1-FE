// 조형민

import { useLocation } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/HearderJHM';
import MyCompanyBox from '../components/MyCompanyBox';
import './MyComparisionResultPage.css';
import CompanyTableResult from '../components/CompanyTableResult';
import CompanyTableRank from '../components/CompanyTableRank';
import { getCompanyRank_jhm } from '../../src/apis/getCompanyRank_jhm';
import { useEffect, useState } from 'react';

function MyComparisionResultPage() {
  const location = useLocation();
  const handleInvestBtnClick = () => {};
  const [rankCompareCompanies, setRankCompareCompanies] = useState([]);
  const [order, setOrder] = useState('highestSales');

  const handleLoadCompanyRank = async orderBy => {
    const rankCompanies = await getCompanyRank_jhm(
      location.state.myCompany.id,
      orderBy,
    );
    setRankCompareCompanies(rankCompanies);
  };
  const handleEmployeeClick = () => {
    setOrder('mostEmployees');
  };
  const handleRevenueClick = () => {
    setOrder('highestSales');
  };
  const handleActInvestClick = () => {
    setOrder('highestInvestment');
  };

  useEffect(() => {
    handleLoadCompanyRank(order);
  }, [order]);

  return (
    <div className="modal-wrapper">
      <div className="header-underline"></div>
      <div className="wrapper">
        <Header />
        <Container>
          <MyCompanyBox
            myCompany={location.state.myCompany}
            compareCompanies={[]}
            isResult={true}
          />
          <CompanyTableResult
            companies={location.state.compareCompanies}
            myCompanyId={location.state.myCompany.id}
          />
          <CompanyTableRank
            companies={rankCompareCompanies}
            myCompanyId={location.state.myCompany.id}
            onEmployeeClick={handleEmployeeClick}
            onRevenueClick={handleRevenueClick}
            onActInvestClick={handleActInvestClick}
          />
          <div className="button-wrapper">
            <div
              className="primary-round-button"
              onClick={handleInvestBtnClick}
            >
              나의 기업에 투자하기
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default MyComparisionResultPage;
