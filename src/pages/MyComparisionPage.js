// 조형민

import Container from '../components/Container';
import Header from '../components/HearderJHM';
import './MyComparisionPage.css';
import icPlus from '../assets/images/ic_plus.png';
import icRestart from '../assets/images/ic_restart.png';
import { Link } from 'react-router-dom';
import CompanyWidget from '../components/CompanyWidget';
import { useRef, useState } from 'react';
import SelectMyCompanyModal from '../components/SelectMyCompanyModal';
import ComparisionCompanyWidget from '../components/ComparisionCompanyWidget';
import SelectComparisionCompanyModal from '../components/SelectComparisionCompanyModal';
import { updateUser } from '../apis/updateUser';
import { updateCompany } from '../apis/updateCompany';

// 현재 사용자 지정
const INITIAL_USER_ID = 'fca6ef85-02ba-4868-a7b7-4f49ed16e881';

function MyComparisionPage() {
  const [myCompany, setMyCompany] = useState();
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [popMyModal, setPopMyModal] = useState(false);
  const [popComparisionModal, setPopComparisionModal] = useState(false);
  const modalBackground = useRef();
  const modalComparisionBackground = useRef();

  const btnCompareCompanyClass = `primary-round-button ${compareCompanies.length > 0 ? '' : 'disable'}`;
  const btnAddCompareCompanyClass = `primary-round-button-small ${compareCompanies.length < 5 ? '' : 'disable'}`;

  // 모달 팝업 시 스크롤 막기
  if (popComparisionModal || popMyModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // 나의 기업 선택 박스에서 '기업 추가' 버튼 클릭
  const handleAddMyClick = () => {
    setPopMyModal(true);
  };
  // 비교 기업 선택 박스에서 '기업 추가하기' 버튼 클릭
  const handleAddComparisionClick = () => {
    if (compareCompanies.length > 4) return;
    setPopComparisionModal(true);
  };
  // 나의 기업 선택 박스에서 '선택 취소' 클릭
  const handleCancelClick = () => {
    setMyCompany();
    // setCompareCompanies([]);
  };
  // 전체 초기화 버튼 클릭
  const handleResetClick = () => {
    setMyCompany();
    setCompareCompanies([]);
  };
  // 나의 기업 선택 모달의 빈 공간을 클릭했을 때 닫기
  const handleModalClick = e => {
    if (e.target === modalBackground.current) {
      setPopMyModal(false);
    }
  };
  // 비교 기업 선택 모달의 빈 공간을 클릭했을 때 닫기
  const handleComparisionModalClick = e => {
    if (e.target === modalComparisionBackground.current) {
      setPopComparisionModal(false);
    }
  };
  // 나의 기업 선택 모달 닫기
  const handleCloseMyClick = () => {
    setPopMyModal(false);
  };
  // 비교 기업 선택 모달 닫기
  const handleCloseComparisionClick = () => {
    setPopComparisionModal(false);
  };
  // 나의 기업 선택 모달에서 '선택하기' 버튼 클릭
  const handleSelectClick = async (
    selectedCompany,
    newSelections,
    noUpdateUser,
  ) => {
    if (!noUpdateUser) {
      await updateUser(INITIAL_USER_ID, {
        latestSelectedCompanies: newSelections,
      });
    }
    await updateCompany(selectedCompany.id, {
      mySelectionCount: Number(selectedCompany.mySelectionCount) + 1,
    });
    setMyCompany(selectedCompany);
    setPopMyModal(false);
  };
  // 비교 기업 선택 모달에서 '선택완료' 버튼 클릭
  // 모달에서 compareSelectionCount를 1씩 증가시킨 상태이므로 받은 값 그대로 DB저장
  const handleSaveComparisionClick = selectedCompanies => {
    for (let i = 0; i < selectedCompanies.length; i++) {
      updateCompany(selectedCompanies[i].id, {
        compareSelectionCount: selectedCompanies[i].compareSelectionCount,
      });
    }
    setPopComparisionModal(false);
    setCompareCompanies(selectedCompanies);
  };
  // 비교 기업 선택 박스 목록에서 특정 기업 삭제 버튼 클릭
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
          isMyCompany={true}
          compareCompanies={compareCompanies}
        />
      )}
      {popComparisionModal && (
        <SelectComparisionCompanyModal
          onModalClick={handleComparisionModalClick}
          onCloseClick={handleCloseComparisionClick}
          onSaveClick={handleSaveComparisionClick}
          initialCompanies={compareCompanies}
          modalBackground={modalComparisionBackground}
          myCompany={myCompany}
        />
      )}
      <div className="wrapper">
        <Header />
        <Container>
          <div className="select-my-company">
            <div className="my-company-title">
              나의 기업을 선택해 주세요!
              {(myCompany || compareCompanies.length !== 0) && (
                <div
                  className="primary-round-button-small"
                  onClick={handleResetClick}
                >
                  <img src={icRestart} alt="초기화" width="24px" />
                  전체 초기화
                </div>
              )}
            </div>
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
          {(myCompany || compareCompanies.length > 0) && (
            <div className="select-comparision-company">
              <div className="comparision-company-title">
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
            <div className={`${btnCompareCompanyClass} "last"`}>
              기업 비교하기
            </div>
            {/* </Link> */}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default MyComparisionPage;
