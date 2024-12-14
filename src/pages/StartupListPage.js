import { Link } from 'react-router-dom';

function StartupListPage() {
  return (
    <>
      <Link to="/my-comparision">
        <div>나의 기업 비교</div>
      </Link>
      <Link to="/comparision-status">
        <div>비교 현황</div>
      </Link>
      <Link to="/investment-status">
        <div>투자 현황</div>
      </Link>
      <Link to="/my-comparision/result">
        <div>기업 비교 결과</div>
      </Link>
    </>
  );
}
export default StartupListPage;
