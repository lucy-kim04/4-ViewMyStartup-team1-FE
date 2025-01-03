// 김세환

import './HeaderKSH.css';
import imgLogo from '../assets/images/vms_logo_2x.png';
import { Link } from 'react-router-dom';
import React from 'react';

function HeaderKSH() {
  return (
    <header className="header">
      <img src={imgLogo} alt="로고" width="112px" height="40px" />
      <div className="header-text">
        <Link to="/my-comparision">나의 기업 비교</Link>
        <Link to="/comparision-status">비교 현황</Link>
        <Link to="/investment-status">투자 현황</Link>
      </div>
    </header>
  );
}

export default React.memo(HeaderKSH) ;