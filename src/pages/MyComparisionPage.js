import Container from '../components/Container';
import Header from '../components/Hearder';
import './MyComparisionPage.css';
import icPlus from '../assets/images/ic_plus.png';

function MyComparisionPage() {
  return (
    <>
      <Header />
      <Container>
        <div className="my-comparision-title">나의 기업을 선택해 주세요!</div>
        <div className="my-company-box">
          <div className="add-button-wrap">
            <div className="plus-icon">
              <img src={icPlus} alt="나의 기업선택" width="20px" />
            </div>
            <span>기업 추가</span>
          </div>
          <div className="company-box">
            <div className="company-image"></div>
            <div className="company-box-name">코드잇</div>
            <div className="company-box-category">에듀테크</div>
          </div>
        </div>
        <div className="button-container">
          <div className="primary-round-button disable">기업 비교하기</div>
        </div>
      </Container>
    </>
  );
}

export default MyComparisionPage;
