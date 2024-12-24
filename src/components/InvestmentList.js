// 김세환

import './InvestmentList.css';
const InvestmentList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="investment-item">
          <div className="rank">{index + 1}</div>
          <div className="company-info">
            <img src={item.imageUrl} className="company-logo" />
            <div className="comdivany-name">{item.name}</div>
          </div>
          <div className="comdivany-intro">{item.description}</div>
          <div className="category">{item.category}</div>
          <div className="investment-amount">{item.simInvest}</div>
          <div className="real-investment-amount">{item.actualInvest}</div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentList;
