// 조형민

import { useState } from 'react';
import icDelete from '../assets/images/ic_delete.png';
import icDeleteCircleSmall from '../assets/images/ic_delete_circle_small.png';
import icSearch from '../assets/images/ic_search.png';
import './SelectMyCompanyModal.css';
import CompanyListWidget from './CompanyListWidget';

export default function SelectMyCompanyModal({
  onModalClick,
  onCloseClick,
  onSelectClick,
  modalBackground,
  companies,
}) {
  const [inputValue, setInputValue] = useState('');
  const handleChange = e => {
    setInputValue(e.target.value);
  };
  const handleClearClick = () => {
    setInputValue('');
  };
  return (
    <div
      className="modal-background"
      ref={modalBackground}
      onClick={onModalClick}
    >
      <div className="modal-content">
        <div className="modal-content-header">
          <span>나의 기업 선택하기</span>
          <img
            src={icDelete}
            alt="창닫기"
            width="32px"
            onClick={onCloseClick}
          />
        </div>
        <form id="searchForm">
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
          <img className="ic-search" src={icSearch} alt="검색" width="24px" />
        </form>
        <div className="latest-selected-companies">
          <div className="latest-selected-companies-title">
            {`최근 선택된 기업 (2)`}
          </div>
          <div className="latest-selected-companies-list">
            <CompanyListWidget
              company={companies[0]}
              onSelectClick={onSelectClick}
            />
            <CompanyListWidget
              company={companies[1]}
              onSelectClick={onSelectClick}
            />
          </div>
        </div>
        <div className="search-result-companies">
          <div className="search-result-companies-title">{`검색 결과 (2)`}</div>
          <div className="search-result-companies-list">
            <CompanyListWidget
              company={companies[2]}
              onSelectClick={onSelectClick}
            />
            <CompanyListWidget
              company={companies[3]}
              onSelectClick={onSelectClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
