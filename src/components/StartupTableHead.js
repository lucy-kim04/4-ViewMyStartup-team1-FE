import './StartupTableHead.css';

function StartupTableHead() {
  return (
    <>
      <div className="table-head">
        <div className="ranking">순위</div>
        <div className="companyname">기업명</div>
        <div className="script">기업소개</div>
        <div className="category">카테고리</div>
        <div className="investment-amount">누적투자금액</div>
        <div className="revenue">매출액</div>
        <div className="employee">고용인원</div>
      </div>
    </>
  );
}

export default StartupTableHead;
