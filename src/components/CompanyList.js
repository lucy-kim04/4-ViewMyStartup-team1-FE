import './CompanyList.css';

function CompanyListLine({ startup }) {
  return (
    <div className="companyListLine">
      <img
        className="companyListLine-img"
        src={startup.imgUrl}
        alt={startup.name}
      />
      <div className="ranking">
        <h1>1위</h1>
      </div>
      <div className="companyName">
        <h1>{startup.name}</h1>
      </div>
      <div className="description">
        <h1>{startup.description}</h1>
      </div>
      <div className="category">
        <h1>{startup.category}</h1>
      </div>
      <div className="actualInvest">
        <h1>{startup.actualInvest}</h1>
      </div>
      <div className="revenue">
        <h1>{startup.revenue}</h1>
      </div>
      <div className="employeesCount">
        <h1>{startup.employeesCount}</h1>
      </div>
    </div>
  );
}

function CompanyList({ startups }) {
  return (
    <ul>
      {startups.map(startup => (
        <CompanyListLine key={startup.id} startup={startup} />
      ))}
    </ul>
  );
}

export default CompanyList;
