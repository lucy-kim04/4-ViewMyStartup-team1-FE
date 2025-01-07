import './CompanyList.css';
import Dropdown from './Dropdown';
import getCompanies from '../apis/getCompanies_KEM';
import { useEffect, useState } from 'react';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import convertNumTo100M from '../utils/convertNumTo100M';
import StartupTableHead from './StartupTableHead';
import TitleAndSearch from './TitleAndSearch';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

function CompanyListTableBody({ company, rank }) {
  return (
    <div className="company-table-rank-body">
      <div className="body-rank-item0">{rank}위</div>
      <div className="body-rank-item1">
        <div className="body-rank-item1-wrapper">
          <img
            src={company.imageUrl}
            alt={company.name}
            className="company-table-rank-image"
          />
          <div className="company-table-rank-name">{company.name}</div>
        </div>
      </div>
      <div className="body-rank-item2">
        <div className="body-rank-item2-desc">{company.description}</div>
      </div>
      <div className="body-rank-item3">
        {setCategoryEngToKor(company.category)}
      </div>
      <div className="body-rank-item4">
        {convertNumTo100M(company.actualInvest)}억
      </div>
      <div className="body-rank-item5">
        {convertNumTo100M(company.revenue)}억
      </div>
      <div className="body-rank-item6">{company.employeesCount}명</div>
    </div>
  );
}

export default function CompanyListTableRank() {
  const [companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('매출액 높은 순'); // 기본 정렬을 매출액 높은 순으로 설정
  const itemsPerPage = 10;

  const handleLoad = async () => {
    const result = await getCompanies();
    setCompanies(result);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(keyword.toLowerCase())
  );

  // 정렬 로직
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortOption) {
      case '누적 투자금액 낮은 순':
        return a.actualInvest - b.actualInvest;
      case '누적 투자금액 높은 순':
        return b.actualInvest - a.actualInvest;
      case '매출액 낮은 순':
        return a.revenue - b.revenue;
      case '매출액 높은 순':
        return b.revenue - a.revenue;
      case '고용인원 낮은 순':
        return a.employeesCount - b.employeesCount;
      case '고용인원 높은 순':
        return b.employeesCount - a.employeesCount;
    }
  });

  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const sortOptions = [
    { value: '매출액 높은 순', label: '매출액 높은 순' },
    { value: '매출액 낮은 순', label: '매출액 낮은 순' },
    { value: '누적 투자금액 높은 순', label: '누적 투자금액 높은 순' },
    { value: '누적 투자금액 낮은 순', label: '누적 투자금액 낮은 순' },
    { value: '고용인원 높은 순', label: '고용인원 높은 순' },
    { value: '고용인원 낮은 순', label: '고용인원 낮은 순' },
  ];

  return (
    <div className="startup-list">
      <div className="title-search-dropdown">
        <TitleAndSearch keyword={keyword} setKeyword={setKeyword} />
        <Dropdown
          options={sortOptions.map((option) => option.value)}
          selectedValue={sortOption}
          onChange={setSortOption}
        />
      </div>
      <StartupTableHead />
      {currentCompanies.map((item, index) => {
        return (
          <Link
            key={item.id}
            to={'/companies/${item.id}'}
            state={{ company: item }}
          >
            <CompanyListTableBody
              // key={item.id}
              company={item}
              rank={indexOfFirstCompany + index + 1}
            />
          </Link>
        );
      })}

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filteredCompanies.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
