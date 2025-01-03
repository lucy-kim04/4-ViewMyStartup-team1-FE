// 김희주

import "./HeaderKHJ.css";
import imgLogo from "../assets/images/vms_logo_2x.png";
import { Link } from "react-router-dom";

function HeaderKHJ() {
  return (
    <header className="header">
      <Link to="/">
        <img src={imgLogo} alt="로고" width="112px" height="40px" />
      </Link>
      <div className="header-menu">
        <Link to="/my-comparision">나의 기업 비교</Link>
        <Link to="/comparision-status">비교 현황</Link>
        <Link to="/investment-status">투자 현황</Link>
      </div>
    </header>
  );
}

export default HeaderKHJ;
