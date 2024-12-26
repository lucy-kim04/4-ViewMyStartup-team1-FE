// 김세환

import './InvestmentStatusPage.css';
import Header from '../components/HeaderKSH';
import Container from '../components/Container';
import Dropdown from '../components/Dropdown';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvestmentList from '../components/InvestmentList';
import { fetchInvestments } from '../apis/getInvestments';

function InvestmentStatusPage() {
  const [selectedOption, setSelectedOption] = useState(
    'View My Startup 투자 금액 높은순',
  );
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

  const getInvestmentData = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;

      const mapping = {
        'View My Startup 투자 금액 높은순': {
          orderBy: 'simInvest',
          sortOrder: 'desc',
        },
        'View My Startup 투자 금액 낮은순': {
          orderBy: 'simInvest',
          sortOrder: 'asc',
        },
        '실제 누적 투자 금액 높은순': {
          orderBy: 'actualInvest',
          sortOrder: 'desc',
        },
        '실제 누적 투자 금액 낮은순': {
          orderBy: 'actualInvest',
          sortOrder: 'asc',
        },
      };

      const { orderBy, sortOrder } = mapping[selectedOption] || {};

      const result = await fetchInvestments({
        skip,
        limit: itemsPerPage,
        orderBy,
        sortOrder,
      });

      setItems(result.data);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error('Failed to get investments:', error);
    }
  };

  useEffect(() => {
    getInvestmentData(currentPage, itemsPerPage, selectedOption);
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
          <div className="investment-status-rank">순위</div>
          <div className="investment-status-company-name">기업명</div>
          <div className="investment-status-company-description">기업 소개</div>
          <div className="investment-status-category">카테고리</div>
          <div className="investment-status-investment-amount">
            View My Startup 투자 금액
          </div>
          <div className="investment-status-real-investment-amount">
            실제 투자 금액
          </div>
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
