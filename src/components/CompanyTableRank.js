// 조형민

import './CompanyTableRank.css';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';

function CompanyTableBody({ company, isLast, isMyCompany }) {
  const {
    name,
    imageUrl,
    description,
    category,
    actualInvest,
    revenue,
    employeesCount,
    rank,
  } = company;
  const bodyClassName = `${isMyCompany ? 'company-table-rank-body-my' : 'company-table-rank-body'} ${isLast ? '' : 'underline'}`;
  // 억단위로 바꾸기
  function convertNum(num) {
    const newNum = Math.round((num / 100000000) * 10) / 10;
    return newNum;
  }

  return (
    <div className={bodyClassName}>
      <div className="body-rank-item0">{`${rank}위`}</div>
      <div className="body-rank-item1">
        <div className="body-rank-item1-wrapper">
          <div
            className="company-table-rank-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className="company-table-rank-name">{name}</div>
        </div>
      </div>
      <div className="body-rank-item2">
        <div className="body-rank-item2-desc">{description}</div>
      </div>
      <div className="body-rank-item3">{setCategoryEngToKor(category)}</div>
      <div className="body-rank-item4">{`${convertNum(actualInvest)}억 원`}</div>
      <div className="body-rank-item5">{`${convertNum(revenue)}억 원`}</div>
      <div className="body-rank-item6">{`${employeesCount}명`}</div>
    </div>
  );
}

export default function CompanyTableRank({
  companies,
  myCompanyId,
  onEmployeeClick,
  onRevenueClick,
  onActInvestClick,
}) {
  return (
    <div className="company-table-rank">
      <div className="company-table-rank-title">기업 순위 확인하기</div>
      <div className="company-table-rank-header">
        <div className="header-rank-item0">순위</div>
        <div className="header-rank-item1">기업 명</div>
        <div className="header-rank-item2">기업 소개</div>
        <div className="header-rank-item3">카테고리</div>
        <div className="header-rank-item4" onClick={onActInvestClick}>
          누적 투자 금액
        </div>
        <div className="header-rank-item5" onClick={onRevenueClick}>
          매출액
        </div>
        <div className="header-rank-item6" onClick={onEmployeeClick}>
          고용 인원
        </div>
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
