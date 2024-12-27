// 조형민

import './CompanyTableRank.css';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import Dropdown from './Dropdown';
import { useState } from 'react';

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

export default function CompanyTableRank({ companies, myCompanyId, onChange }) {
  const dropdownOptions = [
    '누적 투자 금액 높은순',
    '누적 투자 금액 낮은순',
    '매출액 높은순',
    '매출액 낮은순',
    '고용 인원 많은순',
    '고용 인원 적은순',
  ];
  const [dropdownValue, setDropdownValue] = useState('매출액 높은순');
  const handleDropdownChange = value => {
    onChange(value);
    setDropdownValue(value);
  };
  return (
    <div className="company-table-rank">
      <div className="company-table-rank-title">
        기업 순위 확인하기
        <Dropdown
          options={dropdownOptions}
          selectedValue={dropdownValue}
          onChange={handleDropdownChange}
        />{' '}
      </div>
      <div className="company-table-rank-header">
        <div className="header-rank-item0">순위</div>
        <div className="header-rank-item1">기업 명</div>
        <div className="header-rank-item2">기업 소개</div>
        <div className="header-rank-item3">카테고리</div>
        <div className="header-rank-item4">누적 투자 금액</div>
        <div className="header-rank-item5">매출액</div>
        <div className="header-rank-item6">고용 인원</div>
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
