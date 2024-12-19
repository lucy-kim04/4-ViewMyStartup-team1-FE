// 조형민

import { useState } from 'react';
import icDelete from '../assets/images/ic_delete.png';
import icDeleteCircleSmall from '../assets/images/ic_delete_circle_small.png';
import icSearch from '../assets/images/ic_search.png';
import './SelectComparisionCompanyModal.css';
import CompanyListWidget from './CompanyListWidget';

export default function SelectComparisionCompanyModal({
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
      className="modal-comparision-background"
      ref={modalBackground}
      onClick={onModalClick}
    >
      <div className="modal-comparision-content">
        <div className="modal-comparision-content-header">
          <span>비교할 기업 선택하기</span>
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
            {`선택한 기업 (2)`}
          </div>
          <div className="latest-selected-companies-list">
            <CompanyListWidget
              company={companies[5]}
              onSelectClick={onSelectClick}
              btnStatus={'selectCancel'}
            />
            <CompanyListWidget
              company={companies[3]}
              onSelectClick={onSelectClick}
              btnStatus={'selectCancel'}
            />
            {/* <CompanyListWidget
              company={company}
              onSelectClick={onSelectClick}
            />
            <CompanyListWidget
              company={company}
              onSelectClick={onSelectClick}
            />
            <CompanyListWidget
              company={company}
              onSelectClick={onSelectClick}
            /> */}
          </div>
        </div>
        <div className="search-result-companies">
          <div className="search-result-companies-title">{`검색 결과 (2)`}</div>
          <div className="search-result-companies-list">
            <CompanyListWidget
              company={companies[5]}
              onSelectClick={onSelectClick}
              btnStatus={'selectDone'}
            />
            <CompanyListWidget
              company={companies[3]}
              onSelectClick={onSelectClick}
              btnStatus={'selectDone'}
            />
            <CompanyListWidget
              company={companies[4]}
              onSelectClick={onSelectClick}
              btnStatus={'select'}
            />
            <CompanyListWidget
              company={companies[1]}
              onSelectClick={onSelectClick}
              btnStatus={'select'}
            />
            <CompanyListWidget
              company={companies[0]}
              onSelectClick={onSelectClick}
              btnStatus={'select'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
