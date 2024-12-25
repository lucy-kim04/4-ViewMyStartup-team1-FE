import { useNavigate } from 'react-router-dom';
import icPlus from '../assets/images/ic_plus.png';
import icRestart from '../assets/images/ic_restart.png';
import CompanyWidget from './CompanyWidget';
import './MyCompanyBox.css';

export default function MyCompanyBox({
  myCompany,
  compareCompanies,
  onResetClick,
  onCancelClick,
  onAddMyClick,
  isResult,
}) {
  const headerTxt = `${isResult ? '내가 선택한 기업' : '나의 기업을 선택해 주세요!'}`;
  const btnTxt = `${isResult ? '다른 기업 비교하기' : '전체 초기화'}`;
  const btnClassName = `primary-round-button-small ${isResult ? 'wide' : ''}`;
  const navigate = useNavigate();

  const handleRoundBtnClick = () => {
    if (isResult) {
      navigate('/my-comparision');
      return;
    }
    onResetClick();
  };
  return (
    <div className="select-my-company">
      <div className="my-company-title">
        {headerTxt}
        {(myCompany || compareCompanies.length !== 0) && (
          <div className={btnClassName} onClick={handleRoundBtnClick}>
            {isResult || <img src={icRestart} alt="초기화" width="24px" />}
            {btnTxt}
          </div>
        )}
      </div>
      <div className="company-box">
        {myCompany && !isResult && (
          <div className="selection-cancel-button" onClick={onCancelClick}>
            선택 취소
          </div>
        )}
        {myCompany ? (
          <CompanyWidget company={myCompany} />
        ) : (
          <div className="add-button-widget" onClick={onAddMyClick}>
            <div className="plus-icon">
              <img src={icPlus} alt="나의 기업선택" width="20px" />
            </div>
            <span>기업 추가</span>
          </div>
        )}
      </div>
    </div>
  );
}
