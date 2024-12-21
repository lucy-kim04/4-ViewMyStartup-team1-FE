// 조형민

import { useEffect, useRef, useState } from 'react';
import icDelete from '../assets/images/ic_delete.png';
import icDeleteCircleSmall from '../assets/images/ic_delete_circle_small.png';
import icSearch from '../assets/images/ic_search.png';
import './SelectComparisionCompanyModal.css';
import CompanyWidgetHor from './CompanytWidgetHor';
import { getCompaniesModal } from '../apis/getComapniesModal';
import AlertModal from './AlertModal';

export default function SelectComparisionCompanyModal({
  onModalClick,
  onCloseClick,
  onSaveClick,
  modalBackground,
  initialCompanies,
  myCompany,
}) {
  const [selectedCompanies, setSelectedCompanies] = useState(initialCompanies);
  const [searchCompanies, setSearchCompanies] = useState([]);
  const [searchCount, setSearchCount] = useState();
  const [loadingError, setLoadingError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const formRef = useRef();

  const modalClassName = `modal-comparision-content ${isShowAlert ? 'hide' : ''}`;
  const btnSelectDoneClass = `primary-round-button ${selectedCompanies.length > 0 ? '' : 'disable'}`;

  const handleChange = e => {
    setInputValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(inputValue);
    handleLoadSearchCompanies({ searchString: inputValue, limit: 20 });
  };
  const handleSearchClick = () => {
    if (!formRef) return;
    setInputValue(formRef.current.search.value);
    handleLoadSearchCompanies({ searchString: inputValue, limit: 20 });
  };
  const handleClearClick = () => {
    setInputValue('');
    handleLoadSearchCompanies({ searchString: '', limit: 20 });
  };
  // 기업 목록에 있는 버튼 클릭(선택하기, 선택됨, 선택해제)
  const handleButtonClick = (btnStatus, company, index) => {
    if (btnStatus === 'select') {
      if (selectedCompanies.length >= 5) {
        setAlertText('최대 5개까지만 선택 가능합니다.');
        setIsShowAlert(true);
        return;
      }
      if (company.id === myCompany.id) {
        setAlertText('나의 기업과 비교 기업은 같을 수 없습니다.');
        setIsShowAlert(true);
        return;
      }
      setSelectedCompanies(prevValues => [...prevValues, company]);
    } else if (btnStatus === 'selectCancel') {
      setSelectedCompanies(prevValues => {
        return [...prevValues.slice(0, index), ...prevValues.slice(index + 1)];
      });
    } else {
      return;
    }
  };
  // 선택완료 버튼 클릭 시 각 기업의 compareSelectionCount 1씩 증가
  const handleSaveClick = () => {
    if (selectedCompanies.length === 0) return;
    for (let i = 0; i < selectedCompanies.length; i++) {
      selectedCompanies[i].compareSelectionCount++;
    }
    onSaveClick(selectedCompanies);
  };
  // alert modal의 닫기 또는 확인 버튼 클릭
  const handleCloseModalClick = () => {
    setIsShowAlert(false);
  };

  const handleLoadSearchCompanies = async options => {
    let result;
    try {
      setLoadingError(null);
      result = await getCompaniesModal(options);
      if (!result.companies && result.companies.length === 0) return;
    } catch (error) {
      setLoadingError(error);
    }
    setSearchCount(result.totalCount);
    setSearchCompanies(result.companies);
  };
  useEffect(() => {
    setSelectedCompanies(selectedCompanies);
  }, [selectedCompanies]);

  useEffect(() => {
    handleLoadSearchCompanies({ searchString: inputValue, limit: 20 });
  }, []);
  return (
    <div
      className="modal-comparision-background"
      ref={modalBackground}
      onClick={onModalClick}
    >
      <div className={modalClassName}>
        <div className="modal-comparision-content-header">
          <span>비교할 기업 선택하기</span>
          <img
            src={icDelete}
            alt="창닫기"
            width="32px"
            onClick={onCloseClick}
          />
        </div>
        <form id="searchForm" onSubmit={handleSubmit} ref={formRef}>
          <input
            id="searchName"
            name="search"
            value={inputValue}
            placeholder="기업명 입력"
            onChange={handleChange}
          />
          {inputValue && (
            <img
              className="ic-clear"
              src={icDeleteCircleSmall}
              alt="텍스트 초기화"
              width="16px"
              onClick={handleClearClick}
            />
          )}
          <img
            className="ic-search"
            src={icSearch}
            alt="검색"
            width="24px"
            onClick={handleSearchClick}
          />
        </form>
        <div className="latest-selected-companies">
          <div className="latest-selected-companies-title">
            {`선택한 기업 (${selectedCompanies.length})`}
          </div>
          <div className="latest-selected-companies-list">
            {selectedCompanies.map((company, index) => {
              return (
                <CompanyWidgetHor
                  key={company.id}
                  company={company}
                  onButtonClick={handleButtonClick}
                  btnStatus="selectCancel"
                  index={index}
                  onComparisionButtionClick={handleButtonClick}
                />
              );
            })}
          </div>
        </div>
        <div className="search-result-companies">
          <div className="search-result-companies-title">{`검색 결과 (${searchCount})`}</div>
          <div className="search-result-companies-list">
            {searchCompanies.map((company, index) => {
              const btnStatus = `${selectedCompanies.some(el => el.id === company.id) ? 'selectDone' : 'select'}`;
              return (
                <CompanyWidgetHor
                  key={company.id}
                  company={company}
                  onButtonClick={handleButtonClick}
                  btnStatus={btnStatus}
                  index={index}
                  onComparisionButtionClick={handleButtonClick}
                />
              );
            })}
          </div>
        </div>
        <div className="button-wrapper done">
          <div className={btnSelectDoneClass} onClick={handleSaveClick}>
            선택완료
          </div>
        </div>
      </div>
      <AlertModal
        text={alertText}
        isShow={isShowAlert}
        onClick={handleCloseModalClick}
      />
    </div>
  );
}
