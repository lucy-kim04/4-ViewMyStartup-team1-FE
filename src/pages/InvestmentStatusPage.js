// 김세환

import './InvestmentStatusPage.css';
import Header from '../components/HeaderKSH';
import Container from '../components/Container';
import Dropdown from '../components/Dropdown';
import { useEffect, useState } from 'react';
import Pagination from '../components/PaginationKSH';
import InvestmentList from '../components/InvestmentList';

function InvestmentStatusPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const sortOptions = [
    'View My Startup 투자 금액 높은순',
    'View My Startup 투자 금액 낮은순',
    '실제 누적 투자 금액 높은순',
    '실제 누적 투자 금액 낮은순',
  ];

  const handleDropdownChange = value => {
    setSelectedOption(value);
  };

  const handlePageChange = value => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const sortParam =
      selectedOption === '실제 누적 투자 금액 높은순' ? 'desc' : 'asc';
    fetch(
      `http://localhost:3000/company?_page=${currentPage}&_limit=${itemsPerPage}&_sort=${sortParam}`,
    )
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setTotalItems(22);
        console.log(data);
      });
  }, [currentPage, itemsPerPage, selectedOption]);

  return (
    <div className="investment-status-page">
      <Header />
      <Container>
        <div className="investment-status">
          <p>투자 현황</p>
          <Dropdown
            options={sortOptions}
            selectedValue={selectedOption}
            onChange={handleDropdownChange}
          />
        </div>
        <div className="investment-status-table">
          <div className="rank">순위</div>
          <div className="company-name">기업명</div>
          <div className="company-intro">기업 소개</div>
          <div className="category">카테고리</div>
          <div className="investment-amount">View My Startup 투자 금액</div>
          <div className="real-investment-amount">실제 투자 금액</div>
        </div>
        <div className="investment-list">
          <div>
            <InvestmentList items={items} />
          </div>
        </div>
        <div>
          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={totalItems}
          />
        </div>
      </Container>
    </div>
  );
}
export default InvestmentStatusPage;
