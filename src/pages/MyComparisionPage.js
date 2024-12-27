// 조형민

import Container from '../components/Container';
import Header from '../components/HearderJHM';
import './MyComparisionPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import SelectMyCompanyModal from '../components/SelectMyCompanyModal';
import SelectComparisionCompanyModal from '../components/SelectComparisionCompanyModal';
import { updateUser_jhm } from '../apis/updateUser_jhm';
import { updateCompany_jhm } from '../apis/updateCompany_jhm';
import MyCompanyBox from '../components/MyCompanyBox';
import CompareCompanyBox from '../components/CompareCompanyBox';

// 현재 사용자 지정
const INITIAL_USER_ID = 'fca6ef85-02ba-4868-a7b7-4f49ed16e881';

function MyComparisionPage() {
  const [myCompany, setMyCompany] = useState();
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [popMyModal, setPopMyModal] = useState(false);
  const [popComparisionModal, setPopComparisionModal] = useState(false);
  const [updateUsrError, setUpdateUsrError] = useState(null);
  const [updateCompanyError, setUpdateCompanyError] = useState(null);
  const modalBackground = useRef();
  const modalComparisionBackground = useRef();
  const navigate = useNavigate();

  const btnCompareCompanyClass = `primary-round-button ${myCompany && compareCompanies.length > 0 ? '' : 'disable'}`;

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
      // 사용자의 '최근 선택 기업' 목록을 업데이트
      try {
        setUpdateUsrError(null);
        await updateUser_jhm(INITIAL_USER_ID, {
          latestSelectedCompanies: newSelections,
        });
      } catch (error) {
        setUpdateUsrError(error);
      }
    }
    // 기업의 '나의 기업 선택횟수'를 업데이트(1만큼 증가)
    try {
      setUpdateCompanyError(null);
      await updateCompany_jhm(selectedCompany.id, {
        mySelectionCount: Number(selectedCompany.mySelectionCount) + 1,
      });
    } catch (error) {
      setUpdateCompanyError(error);
    }
    setMyCompany(selectedCompany);
    setPopMyModal(false);
  };
  // 비교 기업 선택 모달에서 '선택완료' 버튼 클릭
  const handleSaveComparisionClick = selectedCompanies => {
    for (let i = 0; i < selectedCompanies.length; i++) {
      /** 기업의 '비교 기업 선택횟수'를 업데이트
       * - 모달에서 compareSelectionCount를 1씩 증가시킨 상태이므로 받은 값 그대로 업데이트
       * - 순서는 상관없으므로 속도를 최우선으로 하기 위해 반복문에서 await 하지 않음
       */
      try {
        setUpdateCompanyError(null);
        updateCompany_jhm(selectedCompanies[i].id, {
          compareSelectionCount: selectedCompanies[i].compareSelectionCount,
        });
      } catch (error) {
        setUpdateCompanyError(error);
      }
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
  // 기업 비교하기 클릭
  const handleDoCompareClick = () => {
    if (!(myCompany && compareCompanies.length > 0)) return;
    const sumCompanies = [...compareCompanies, myCompany];
    sumCompanies.sort((a, b) => b.actualInvest - a.actualInvest);
    navigate('/my-comparision/result', {
      state: { myCompany: myCompany, compareCompanies: sumCompanies },
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
      <div className="header-underline"></div>
      <div className="wrapper">
        <Header />
        <Container>
          <MyCompanyBox
            myCompany={myCompany}
            compareCompanies={compareCompanies}
            onResetClick={handleResetClick}
            onCancelClick={handleCancelClick}
            onAddMyClick={handleAddMyClick}
            isResult={false}
          />
          {(myCompany || compareCompanies.length > 0) && (
            <CompareCompanyBox
              compareCompanies={compareCompanies}
              onAddComparisionClick={handleAddComparisionClick}
              onDeleteClick={handleDeleteComparisionClick}
            />
          )}
          <div className="button-wrapper">
            <div
              className={`${btnCompareCompanyClass} "last"`}
              onClick={handleDoCompareClick}
            >
              기업 비교하기
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default MyComparisionPage;
