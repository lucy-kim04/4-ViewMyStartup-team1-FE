// 조형민

import './CompanyTableRank.css';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';

function CompanyTableBody({ company, index, isLast, isMyCompany }) {
  const {
    name,
    imageUrl,
    description,
    category,
    actualInvest,
    revenue,
    employeesCount,
  } = company;
  const bodyClassName = `${isMyCompany ? 'company-table-body-my' : 'company-table-body'} ${isLast ? '' : 'underline'}`;
  // 억단위로 바꾸기
  function convertNum(num) {
    const newNum = Math.round((num / 100000000) * 10) / 10;
    return newNum;
  }

  return (
    <div className={bodyClassName}>
      <div className="body-item1">
        <div
          className="company-table-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="company-table-name">{name}</div>
      </div>
      <div className="body-item2">
        <div className="body-item2-desc">{description}</div>
      </div>
      <div className="body-item3">{setCategoryEngToKor(category)}</div>
      <div className="body-item4">{`${convertNum(actualInvest)}억 원`}</div>
      <div className="body-item5">{`${convertNum(revenue)}억 원`}</div>
      <div className="body-item6">{`${employeesCount}명`}</div>
    </div>
  );
}

export default function CompanyTableRank({ companies, myCompanyId }) {
  return (
    <div className="company-table">
      <div className="company-table-title">기업 순위 확인하기</div>
      <div className="company-table-header">
        <div className="header-item1">기업 명</div>
        <div className="header-item2">기업 소개</div>
        <div className="header-item3">카테고리</div>
        <div className="header-item4">누적 투자 금액</div>
        <div className="header-item5">매출액</div>
        <div className="header-item6">고용 인원</div>
      </div>
      {companies.map((company, index) => {
        return (
          <CompanyTableBody
            key={company.id}
            company={company}
            index={index}
            isLast={companies.length === index + 1}
            isMyCompany={company.id === myCompanyId}
          />
        );
      })}
    </div>
  );
}
