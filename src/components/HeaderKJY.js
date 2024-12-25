// 김주영

import './HeaderKJY.css';
import imgLogo from '../assets/images/vms_logo_2x.png';
import { Link } from 'react-router-dom';

export default function HeaderKJY() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={imgLogo} alt="로고" />
        <ul className="header-menu">
          <li>
            <Link to="/my-comparision">나의 기업 비교</Link>
          </li>
          <li>
            <Link to="/comparision-status">비교 현황</Link>
          </li>
          <li>
            <Link to="/investment-status">투자 현황</Link>
          </li>
        </ul>
        <div className="header-text"></div>
      </div>
    </header>
  );
}
