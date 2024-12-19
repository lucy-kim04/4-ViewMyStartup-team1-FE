// 조형민

import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import './ComparisionCompanyWidget.css';
import icMinus from '../assets/images/ic_minus.png';

export default function ComparisionCompanyWidget({ company, index, onDelete }) {
  const { name, imageUrl, category } = company;
  // 영문 카테고리를 한글로 변경하는 함수
  const korCategory = setCategoryEngToKor(category);

  const handleDeleteClick = () => {
    onDelete(index);
  };

  return (
    <div className="comparision-company-widget">
      <img
        className="ic-minus"
        src={icMinus}
        alt="제외하기"
        width="24px"
        onClick={handleDeleteClick}
      />
      <div className="company-widget">
        <div
          className="company-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="company-widget-name">{name}</div>
        <div className="company-widget-category">{korCategory}</div>
      </div>
    </div>
  );
}
