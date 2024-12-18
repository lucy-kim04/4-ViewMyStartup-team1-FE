import './Header.css';
import imgLogo from '../assets/images/vms_logo_2x.png';

export default function Header() {
  return (
    <header className="header">
      <img src={imgLogo} alt="로고" width="112px" height="40px" />
      <div className="header-nav">
        <div>나의 기업 비교</div>
        <div>비교 현황</div>
        <div>투자 현황</div>
      </div>
    </header>
  );
}
