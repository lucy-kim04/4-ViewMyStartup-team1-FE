// 김주영
import { useState } from 'react';
import './CompanyDetailInfo.css';
import convertNumTo100M from '../utils/convertNumTo100M';
import CompanyInvestmentModal from './CompanyInvestmentModal';
import { createPortal } from 'react-dom';

export default function CompanyDetailInfo({ company, investment }) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleInvestBtnClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => setModalVisible(false);

  console.log(company);
  // const company = COMPANIES[10];
  /* 그리드 완료 후 아래 코드로 변경 
   const { id } = useParams();
   const company = COMPANIES.find(company => company.id === id);
*/
  return (
    <div className='company-detail-info'>
      <div className='company-detail-header-title'>
        <img src={company.imageUrl} alt={company.name} />
        <div className='company-detail-header-title-text'>
          <h1>{company.name}</h1>
          <p>{company.category}</p>
        </div>
      </div>
      <div className='divider' />
      <div className='metrics-container'>
        <div className='metrics-row'>
          <div className='metric-input'>
            <span className='metric-title'>누적투자금액</span>
            <span className='metric-value'>
              {convertNumTo100M(company.actualInvest)} 억 원
            </span>
          </div>
          <div className='metric-input'>
            <span className='metric-title'>매출액</span>
            <span className='metric-value'>
              {convertNumTo100M(company.revenue)} 억 원
            </span>
          </div>
          <div className='metric-input'>
            <span className='metric-title'>고용인원</span>
            <span className='metric-value'>{company.employeesCount} 명</span>
          </div>
        </div>

        <div className='company-intro'>
          <span className='company-intro-title'>기업소개</span>
          <p>{company.description}</p>
        </div>
      </div>
      <div className='invest-button-container'>
        <button className='invest-button' onClick={handleInvestBtnClick}>
          기업 투자하기
        </button>
      </div>
      <div className='divider' />
      <div
        className={`ksh-investment-modal-overlay ${
          modalVisible ? 'active' : ''
        }`}
        onClick={handleModalClose}
      >
        <CompanyInvestmentModal
          company={company}
          investment={investment}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
}
