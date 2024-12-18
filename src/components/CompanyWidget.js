import setCategoryEngToKor from '../utils/setCategoryEngToKor';
import './CompanyWidget.css';

export default function CompanyWidget({ company }) {
  // 영문 카테고리를 한글로 변경하는 함수
  const korCategory = setCategoryEngToKor(company.category);

  return (
    <>
      <div className="company-widget">
        <div
          className="company-image"
          style={{
            backgroundImage: `url(${company.imageUrl})`,
          }}
        ></div>
        <div className="company-widget-name">{company.name}</div>
        <div className="company-widget-category">{korCategory}</div>
      </div>
    </>
  );
}
