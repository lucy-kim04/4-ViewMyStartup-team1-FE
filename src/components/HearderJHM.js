// 조형민

import './HeaderJHM.css';
import imgLogo from '../assets/images/vms_logo_2x.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="dkdkd">
      <Link to="/">
        <img
          className="header-img"
          src={imgLogo}
          alt="로고"
          width="112px"
          height="40px"
        />
      </Link>
      <div className="header-nav">
        <div>
          <Link to="/my-comparision">나의 기업 비교</Link>
        </div>
        <div>
          <Link to="/comparision-status">비교 현황</Link>
        </div>
        <div>
          <Link to="/investment-status">투자 현황</Link>
        </div>
      </div>
    </header>
  );
}
