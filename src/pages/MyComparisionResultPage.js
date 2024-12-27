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

const dropdownOptionsMap = {
  '누적 투자 금액 높은순': 'highestInvestment',
  '누적 투자 금액 낮은순': 'lowestInvestment',
  '매출액 높은순': 'highestSales',
  '매출액 낮은순': 'lowestSales',
  '고용 인원 많은순': 'mostEmployees',
  '고용 인원 적은순': 'fewestEmployees',
};

function MyComparisionResultPage() {
  const location = useLocation();
  const handleInvestBtnClick = () => {};
  const [rankCompareCompanies, setRankCompareCompanies] = useState([]);
  const [order, setOrder] = useState('highestSales');
  const [loadingError, setLoadingError] = useState(null);

  const handleLoadCompanyRank = async orderBy => {
    let rankCompanies;
    try {
      setLoadingError(null);
      rankCompanies = await getCompanyRank_jhm(
        location.state.myCompany.id,
        orderBy,
      );
    } catch (error) {
      setLoadingError(error);
    }
    setRankCompareCompanies(rankCompanies);
  };
  const handleDropdownChange = value => {
    setOrder(dropdownOptionsMap[value]);
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
          {loadingError?.message && <span>{loadingError.message}</span>}
          <CompanyTableRank
            companies={rankCompareCompanies}
            myCompanyId={location.state.myCompany.id}
            onChange={handleDropdownChange}
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
