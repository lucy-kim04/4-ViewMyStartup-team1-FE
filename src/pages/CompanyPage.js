import './CompanyPage.css';
import Header from '../components/my-comparison/HearderJHM';
import CompanyDetailInfo from '../components/CompanyDetailInfo';
import CompanyInvestmentSection from '../components/CompanyInvestmentSection';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getCompany from '../apis/getCompany_kjy';

/**
 * CompanyPage는 링크를 타고 들어오는 경우와 주소창에 직접 주소를 입력하는 경우 두 가지가 있을 수 있음
 * 1. 링크를 타고 들어오는 경우에는 state를 통해 company를 전달받아서 보여주고
 * 2. 직접 주소를 입력하는 경우에는 주소창의 companyId를 이용해 db에서 company를 받아올 것
 */
function CompanyPage() {
  const [company, setCompany] = useState();
  const { companyId } = useParams();
  const location = useLocation();
  console.log(useParams());

  const handleLoad = async () => {
    // 일단 location.state를 먼저 체크해서 없으면 params체크
    if (location.state) {
      // state로부터 company 가져오기
      console.log('company from state');
      setCompany(location.state.company);
    } else {
      // 주소창(params)으로부터 companyId를 받아 db에서 company 가져오기
      console.log('company from params');
      const result = await getCompany(companyId);
      setCompany(result);
    }
    console.log(company);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Header />
      <div className="headerLine"></div>
      {company && (
        <div className="wrapper">
          {company && <CompanyDetailInfo company={company} />}
          <CompanyInvestmentSection company={company} />
          {/* <CompanyInvestmentSection companyId={company.id} /> */}
        </div>
      )}
    </>
  );
}
export default CompanyPage;
