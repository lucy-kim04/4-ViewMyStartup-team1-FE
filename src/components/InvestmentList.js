// 김세환

import './InvestmentList.css';
import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import convertNumTo100M from '../utils/convertNumTo100M';

const InvestmentList = ({ items, currentPage, itemsPerPage }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="ksh-investment-item">
          <div className="rank">{index + 1 + (currentPage - 1) * itemsPerPage}</div>
          <div className="ksh-company-info">
            <img src={item.imageUrl} className="company-logo" />
            <div className="ksh-company-name">{item.name}</div>
          </div>
          <div className="ksh-company-intro">{item.description}</div>
          <div className="ksh-category">{setCategoryEngToKor(item.category)}</div>
          <div className="ksh-investment-amount">{convertNumTo100M(item.simInvest)}억</div>
          <div className="ksh-actual-investment-amount">
            {convertNumTo100M(item.actualInvest)}
          억</div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentList;
