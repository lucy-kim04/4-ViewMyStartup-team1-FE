import Container from '../components/Container';
import Header from '../components/HearderJHM';
import './MyComparisionPage.css';
import icPlus from '../assets/images/ic_plus.png';
import { Link } from 'react-router-dom';
import CompanyWidget from '../components/CompanyWidget';

function MyComparisionPage() {
  const company = {
    name: '비브리지',
    imageUrl:
      'https://logo-resources.thevc.kr/organizations/200x200/1c6530110690076399ab100ab4bdb678073e159f045253e700b08115017634ea_1602996000306496.jpg',
    category: 'EDUTECH',
  };
  return (
    <>
      <Header />
      <Container>
        <div className="my-comparision-title">나의 기업을 선택해 주세요!</div>
        <div className="my-company-box">
          <div className="add-button-widget">
            <div className="plus-icon">
              <img src={icPlus} alt="나의 기업선택" width="20px" />
            </div>
            <span>기업 추가</span>
          </div>
          <CompanyWidget company={company} />
        </div>
        <div className="button-container">
          <Link to="my-comparision/result">
            <div className="primary-round-button disable">기업 비교하기</div>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default MyComparisionPage;
