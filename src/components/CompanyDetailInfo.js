// 김주영

import { COMPANIES } from '../db/companyMock';
import { useParams } from 'react-router-dom';
import './CompanyDetailInfo.css';

export default function CompanyDetailInfo() {
  const company = COMPANIES[10];
  /* 그리드 완료 후 아래 코드로 변경 
   const { id } = useParams();
   const company = COMPANIES.find(company => company.id === id);
*/
  return (
    <div className="company-detail-info">
      <div className="company-detail-header-title">
        <img src={company.image} alt={company.name} />
        <div className="company-detail-header-title-text">
          <h1>{company.name}</h1>
          <p>{company.category}</p>
        </div>
      </div>
      <div className="divider" />
      <div className="metrics-container">
        <div className="metrics-row">
          <div className="metric-input">
            <span className="metric-title">누적투자금액</span>
            <span className="metric-value">
              {company.totalInvestment} 억 원
            </span>
          </div>
          <div className="metric-input">
            <span className="metric-title">매출액</span>
            <span className="metric-value">{company.revenue} 억 원</span>
          </div>
          <div className="metric-input">
            <span className="metric-title">고용인원</span>
            <span className="metric-value">{company.employees} 명</span>
          </div>
        </div>

        <div className="company-intro">
          <span className="company-intro-title">기업소개</span>
          <p>{company.description}</p>
        </div>
      </div>
      <div className="invest-button-container">
        <button className="invest-button">기업 투자하기</button>
      </div>
      <div className="divider" />
    </div>
  );
}
