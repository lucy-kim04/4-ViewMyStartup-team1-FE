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
          <div className="add-button">
            <div className="plus-icon">
              <img src={icPlus} alt="나의 기업선택" width="20px" />
            </div>
            <span>기업 추가</span>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MyComparisionPage;
