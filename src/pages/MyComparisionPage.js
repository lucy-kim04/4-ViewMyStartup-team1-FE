// 조형민

import Container from '../components/Container';
import Header from '../components/HearderJHM';
import './MyComparisionPage.css';
import icPlus from '../assets/images/ic_plus.png';
import { Link } from 'react-router-dom';
import CompanyWidget from '../components/CompanyWidget';
import { useRef, useState } from 'react';
import SelectMyCompanyModal from '../components/SelectMyCompanyModal';
import ComparisionCompanyWidget from '../components/ComparisionCompanyWidget';
import SelectComparisionCompanyModal from '../components/SelectComparisionCompanyModal';
import { COMPANIES } from '../db/mock';

function MyComparisionPage() {
  const INITIAL_COMPANY = {
    name: '비브리지',
    imageUrl:
      'https://logo-resources.thevc.kr/organizations/200x200/1c6530110690076399ab100ab4bdb678073e159f045253e700b08115017634ea_1602996000306496.jpg',
    category: 'EDUTECH',
  };
  const [myCompany, setMyCompany] = useState();
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [popMyModal, setPopMyModal] = useState(false);
  const [popComparisionModal, setPopComparisionModal] = useState(false);
  const modalBackground = useRef();
  const modalComparisionBackground = useRef();

  const btnCompareCompanyClass = `primary-round-button ${compareCompanies.length > 0 ? '' : 'disable'}`;
  const btnAddCompareCompanyClass = `primary-round-button-small ${compareCompanies.length < 5 ? '' : 'disable'}`;
  console.log(
    '🚀 ~ MyComparisionPage ~ btnCompareCompanyClass:',
    btnCompareCompanyClass,
  );

  // 모달 팝업 시 스크롤 막기
  if (popComparisionModal || popMyModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const handleAddMyClick = () => {
    setPopMyModal(true);
  };
  const handleAddComparisionClick = () => {
    if (compareCompanies.length > 4) return;
    setPopComparisionModal(true);
  };
  const handleCancelClick = () => {
    setMyCompany();
    setCompareCompanies([]);
  };
  // 모달의 빈 공간을 클릭했을 때 닫기
  const handleModalClick = e => {
    if (e.target === modalBackground.current) {
      setPopMyModal(false);
    }
  };
  const handleComparisionModalClick = e => {
    if (e.target === modalComparisionBackground.current) {
      setPopComparisionModal(false);
    }
  };
  const handleCloseMyClick = () => {
    setPopMyModal(false);
  };
  const handleCloseComparisionClick = () => {
    setPopComparisionModal(false);
  };
  const handleSelectClick = selectedCompany => {
    setPopMyModal(false);
    setMyCompany(selectedCompany);
  };
  const handleSelectComparisionClick = selectedCompany => {
    setPopComparisionModal(false);
    setCompareCompanies(prevValues => [...prevValues, selectedCompany]);
  };
  const handleDeleteComparisionClick = idx => {
    setCompareCompanies(prevValues => {
      return [...prevValues.slice(0, idx), ...prevValues.slice(idx + 1)];
    });
  };

  return (
    <div className="modal-wrapper">
      {popMyModal && (
        <SelectMyCompanyModal
          onModalClick={handleModalClick}
          onCloseClick={handleCloseMyClick}
          onSelectClick={handleSelectClick}
          modalBackground={modalBackground}
          companies={COMPANIES}
        />
      )}
      {popComparisionModal && (
        <SelectComparisionCompanyModal
          onModalClick={handleComparisionModalClick}
          onCloseClick={handleCloseComparisionClick}
          onSelectClick={handleSelectComparisionClick}
          modalBackground={modalComparisionBackground}
          companies={COMPANIES}
        />
      )}
      <div className="wrapper">
        <Header />
        <Container>
          <div className="select-my-company">
            <div className="my-company-title">나의 기업을 선택해 주세요!</div>
            <div className="company-box">
              {myCompany && (
                <div
                  className="selection-cancel-button"
                  onClick={handleCancelClick}
                >
                  선택 취소
                </div>
              )}
              {myCompany ? (
                <CompanyWidget company={myCompany} />
              ) : (
                <div className="add-button-widget" onClick={handleAddMyClick}>
                  <div className="plus-icon">
                    <img src={icPlus} alt="나의 기업선택" width="20px" />
                  </div>
                  <span>기업 추가</span>
                </div>
              )}
            </div>
          </div>
          {myCompany && (
            <div className="select-comparision-company">
              <div className="my-company-title comparision">
                <div>
                  <span>어떤 기업이 궁금하세요?</span>
                  <span className="select-comparision-company-max">
                    (최대 5개)
                  </span>
                </div>
                <div
                  className={btnAddCompareCompanyClass}
                  onClick={handleAddComparisionClick}
                >
                  기업 추가하기
                </div>
              </div>
              <div className="company-box-comparision">
                {compareCompanies.map((company, index) => {
                  return (
                    <ComparisionCompanyWidget
                      key={company.name}
                      company={company}
                      index={index}
                      onDelete={handleDeleteComparisionClick}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className="button-wrapper">
            {/* <Link to="my-comparision/result"> */}
            <div className={btnCompareCompanyClass}>기업 비교하기</div>
            {/* </Link> */}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default MyComparisionPage;
