// 조형민

import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import './CompanyListWidget.css';
import icCheck from '../assets/images/ic_check.png';

export default function CompanyListWidget({
  company,
  onSelectClick,
  btnStatus = 'select',
}) {
  console.log('🚀 ~ btnStatus:', btnStatus);
  const BUTTONS = {
    select: '선택하기',
    selectCancel: '선택 해제',
    selectDone: '선택완료',
  };
  const { name, imageUrl, category } = company;
  const korCategory = setCategoryEngToKor(category);
  const btnText = BUTTONS[btnStatus];
  const btnClassName = `primary-rectangle-button-outline ${btnStatus === 'selectCancel' ? 'disable' : btnStatus === 'selectDone' ? 'white' : ''}`;

  const handleSelectClick = () => {
    onSelectClick(company);
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
        <div className={btnClassName} onClick={handleSelectClick}>
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
