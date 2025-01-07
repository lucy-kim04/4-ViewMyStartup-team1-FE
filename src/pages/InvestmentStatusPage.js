// 김세환

import './InvestmentStatusPage.css';
import Header from '../components/my-comparison/HearderJHM';
import Container from '../components/Container';
import Dropdown from '../components/Dropdown';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvestmentList from '../components/InvestmentList';
import { getCompanies } from '../apis/getCompanies_ksh';
// import { postInvestment } from '../apis/postInvestment_ksh';
// import CompanyInvestmentModal from '../components/CompanyInvestmentModal';
// import InvestmentDeleteModal from '../components/InvestmentDeleteModal';

function InvestmentStatusPage() {
  // 모달용 States
  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedCompany, setSelectedCompany] = useState({
  //   name: '',
  //   category: '',
  //   info: '',
  // });
  // const [investment, setInvestment] = useState({
  //   investorName: '',
  //   amount: 0,
  //   comment: '',
  //   password: '',
  //   passwordConfirm: '',
  // });
  // const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // const openModal = () => {
  //   setModalVisible(true);
  // }
  // const closeModal = () => {
  //   setModalVisible(false);
  // }

  // const openDeleteModal = () => {
  //   setDeleteModalVisible(true);
  // };
  // const closeDeleteModal = () => {
  //   setDeleteModalVisible(false);
  // };

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

  const getCompanyData = async () => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;

      const mapping = {
        'View My Startup 투자 금액 높은순': {
          orderBy: 'highestSimInvestment',
        },
        'View My Startup 투자 금액 낮은순': {
          orderBy: 'lowestSimInvestment',
        },
        '실제 누적 투자 금액 높은순': {
          orderBy: 'highestInvestment',
        },
        '실제 누적 투자 금액 낮은순': {
          orderBy: 'lowestInvestment',
        },
      };

      const orderBy = mapping[selectedOption]?.orderBy;

      const result = await getCompanies({
        skip: skip,
        limit: itemsPerPage,
        orderBy: orderBy,
      });

      setItems(result.companies); // companies는 서버에서 받아온 데이터의 배열
      setTotalItems(result.totalItems); // totalItems는 서버에서 받아온 데이터의 총 개수
    } catch (error) {
      console.error('Failed to get investments:', error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, [currentPage, itemsPerPage, selectedOption]);

  return (
    <div className="investment-status-page">
      <Header />
      <div className="headerLine"></div>
      <Container>
        {/* <button className="delete-button" onClick={openDeleteModal}>삭제 모달 열기</button>
        {deleteModalVisible && <div
          className={`ksh-investment-delete-modal-overlay ${deleteModalVisible ? 'active' : ''}`}
          onClick={closeDeleteModal}
        >
          <InvestmentDeleteModal
            investment={investment}
            password={investment.password}
            onClose={closeDeleteModal}
          />
        </div>}
        <button className="investment-button" onClick={openModal}>모달 열기</button>
        {modalVisible && <div
          className={`ksh-investment-modal-overlay ${modalVisible ? 'active' : ''}`}
          onClick={closeModal}
        >
          <CompanyInvestmentModal
            company={selectedCompany}
            investment={investment}
            onClose={closeModal}
          />
        </div>} */}
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
            <InvestmentList 
              items={items}  
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
        </div>
        <div>
          {totalItems > 0 && (
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={totalItems}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
export default InvestmentStatusPage;
