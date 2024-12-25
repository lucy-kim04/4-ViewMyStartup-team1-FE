import { useState } from 'react';
import { startups } from '../db/mockKem';
import './TitleAndSaerch.css';

function TitleAndSearch() {
  const [order, setOder] = useState('revenue');
  const sortedCompany = startups.sort((a, b) => b[order] - a[order]);

  const handleRevenueClick = () => setOder('revenue');

  const handleBeststClick = () => setOder('revenue');

  return (
    <>
      <div className="title">
        <h1>전체 스타트업 목록</h1>
        <div className="searchAndSort">
          <div className="search">
            <input></input>
          </div>
          <div className="sort">
            <button onClick={handleRevenueClick}>매출액 높은순</button>
            <button onClick={handleBeststClick}>고용인원 순</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TitleAndSearch;
