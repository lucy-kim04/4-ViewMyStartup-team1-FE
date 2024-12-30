// 조형민
import { useState } from 'react';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import './CompanyTableResult.css';
import Dropdown from './Dropdown';

function CompanyTableBody({ company, isLast, isMyCompany }) {
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
        <div className="body-item1-wrapper">
          <div
            className="company-table-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <div className="company-table-name">{name}</div>
        </div>
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

export default function CompanyTableResult({ companies, myCompanyId }) {
  const dropdownOptions = [
    '누적 투자 금액 높은순',
    '누적 투자 금액 낮은순',
    '매출액 높은순',
    '매출액 낮은순',
    '고용 인원 많은순',
    '고용 인원 적은순',
  ];
  const [dropdownValue, setDropdownValue] = useState('누적 투자 금액 높은순');
  const [order, setOrder] = useState('actualInvest');
  // const sortedCompanies = companies.sort((a, b) => b[order] - a[order]);
  let sortedCompanies;
  switch (order) {
    case '누적 투자 금액 높은순':
      sortedCompanies = companies.sort(
        (a, b) => b.actualInvest - a.actualInvest,
      );
      break;
    case '누적 투자 금액 낮은순':
      sortedCompanies = companies.sort(
        (a, b) => a.actualInvest - b.actualInvest,
      );
      break;
    case '매출액 높은순':
      sortedCompanies = companies.sort((a, b) => b.revenue - a.revenue);
      break;
    case '매출액 낮은순':
      sortedCompanies = companies.sort((a, b) => a.revenue - b.revenue);
      break;
    case '고용 인원 많은순':
      sortedCompanies = companies.sort(
        (a, b) => b.employeesCount - a.employeesCount,
      );
      break;
    case '고용 인원 적은순':
      sortedCompanies = companies.sort(
        (a, b) => a.employeesCount - b.employeesCount,
      );
      break;
    default:
      sortedCompanies = companies.sort(
        (a, b) => b.actualInvest - a.actualInvest,
      );
  }
  const handleDropdownChange = (value) => {
    setOrder(value);
    setDropdownValue(value);
  };

  return (
    <div className="company-table">
      <div className="company-table-title">
        비교 결과 확인하기
        <Dropdown
          options={dropdownOptions}
          selectedValue={dropdownValue}
          onChange={handleDropdownChange}
        />
      </div>
      <div className="company-table-header">
        <div className="header-item1">기업 명</div>
        <div className="header-item2">기업 소개</div>
        <div className="header-item3">카테고리</div>
        <div className="header-item4">누적 투자 금액</div>
        <div className="header-item5">매출액</div>
        <div className="header-item6">고용 인원</div>
      </div>

      {sortedCompanies.map((company, index) => {
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
