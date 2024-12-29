// 김세환

import './InvestmentList.css';
const InvestmentList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="ksh-investment-item">
          <div className="rank">{index + 1}</div>
          <div className="ksh-company-info">
            <img src={item.imageUrl} className="company-logo" />
            <div className="ksh-company-name">{item.name}</div>
          </div>
          <div className="ksh-company-intro">{item.description}</div>
          <div className="ksh-category">{item.category}</div>
          <div className="ksh-investment-amount">{item.simInvest}</div>
          <div className="ksh-actual-investment-amount">
            {item.actualInvest}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentList;
