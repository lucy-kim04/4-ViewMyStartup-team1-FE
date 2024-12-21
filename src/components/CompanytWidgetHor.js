// 조형민

import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import './CompanyWidgetHor.css';
import icCheck from '../assets/images/ic_check.png';

export default function CompanyWidgetHor({
  company,
  onButtonClick,
  onComparisionButtionClick,
  btnStatus = 'select',
  index,
  isMyCompany,
}) {
  const BUTTONS = {
    select: '선택하기',
    selectCancel: '선택 해제',
    selectDone: '선택됨',
  };
  const { name, imageUrl, category, compareSelectionCount } = company;
  const korCategory = setCategoryEngToKor(category);
  const btnText = BUTTONS[btnStatus];
  const btnClassName = `primary-rectangle-button-outline ${btnStatus === 'selectCancel' ? 'white' : btnStatus === 'selectDone' ? 'disable' : ''}`;

  const handleButtonClick = () => {
    if (isMyCompany) {
      onButtonClick(company);
    } else {
      onComparisionButtionClick(btnStatus, company, index);
    }
  };
  return (
    <>
      <div className="company-list-wrapper">
        <div className="company-list-widget">
          <div
            className="company-image-list"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <span className="company-widget-name-list">{name}</span>
          <span className="company-widget-category-list">{korCategory}</span>
        </div>
        <div className={btnClassName} onClick={handleButtonClick}>
          <div className="button-text-wrapper">
            {btnStatus === 'selectDone' && (
              <img src={icCheck} alt="아이콘" width="24px" />
            )}
            {btnText}
          </div>
        </div>
      </div>
    </>
  );
}
