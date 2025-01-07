import './CompanyInvestmentSection.css';
import getCompanyInvestments from '../apis/getCompanyInvestments';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import InvestmentDeleteModal from './InvestmentDeleteModal';
import { createPortal } from 'react-dom';

const formatToKoreanBillion = (amount) => {
  return (Math.round((amount / 100000000) * 10) / 10).toLocaleString();
};

const ITEMSPERPAGE_COUNT = 5;

// 각 행별로 필요한 액션(드롭다운, 수정/삭제)이 있어서 분리함
function TableRowCompany({ investment, index, openedMenuIdx, onClick }) {
  // const [isShowDropdown, setIsShowDropdwon] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isShowDropdown = index === openedMenuIdx;

  const dropdownClassName = `dropdown-menu ${isShowDropdown ? '' : 'hidden'}`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isShowDropdown && !e.target.closest('.more-button')) {
        onClick(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isShowDropdown, onClick]);

  const handleMenuClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom,
      left: rect.left - 120,
    });
    if (isShowDropdown) {
      onClick(null);
    } else {
      onClick(index);
    }

    // setIsShowDropdwon(!isShowDropdown);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    // 수정 액션 실행
    console.log('수정하기 clicked');
    onClick(null); // 수동으로 드롭다운 닫기
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    onClick(null); // 드롭다운 메뉴 닫기
  };

  return (
    <>
      <div className='table-row'>
        <div className='table-cell'>
          <p>{investment.name}</p>
        </div>
        <div className='table-cell'>
          <p>{investment.rank}위</p>
        </div>
        <div className='table-cell'>
          <p>{formatToKoreanBillion(investment.amount)}억</p>
        </div>
        <div className='table-cell'>
          <p className='table-cell-comment'>{investment.comment}</p>
        </div>
        <div className='table-cell'>
          <button className='more-button' onClick={handleMenuClick}>
            ⋮
          </button>
        </div>
      </div>
      {isShowDropdown && (
        <div
          className={dropdownClassName}
          style={{
            position: 'fixed',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          <div className='dropdown-edit-btn' onClick={handleEdit}>
            수정하기
          </div>
          <div className='dropdown-delete-btn' onClick={handleDelete}>
            삭제하기
          </div>
        </div>
      )}
      {showDeleteModal &&
        createPortal(
          <InvestmentDeleteModal
            investment={investment}
            onClose={() => setShowDeleteModal(false)}
            password='임시비밀번호'
          />,
          document.getElementById('root')
        )}
    </>
  );
}

export default function CompanyInvestmentSection({ companyId }) {
  const [investments, setInvestments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalInvestAmount, setTotalInvestAmount] = useState(0);
  const [openedMenuIdx, setOpenedMenuIdx] = useState();
  const [error, setError] = useState(null);

  // companyId를 이용해 db에서 투자 정보 불러오기
  // 에러 처리는 하지 않았습니다. 나중에 주영님이 적용해 보세요~ :)
  const handleLoad = async (options) => {
    try {
      const result = await getCompanyInvestments(companyId, options);
      if (!result || !result.companyInvestments.length) {
        setError(
          `아직 투자한 기업이 없어요.\n버튼을 눌러 기업에 투자해 보세요!`
        );
        return;
      }
      setInvestments(result.companyInvestments);
      setTotalCount(result.totalCount);
      setTotalInvestAmount(result.totalInvestAmount);
      setError(null); // 성공시 에러 초기화
    } catch (error) {
      if (error.response?.status === 404) {
        setError('투자 정보를 찾을 수 없습니다.');
      } else {
        setError('투자 정보를 불러오는데 실패했습니다.');
      }
      // 실패 시 불러오는 데이터 초기화 해주기
      setInvestments([]);
      setTotalCount(0);
      setTotalInvestAmount(0);
    }
  };

  const handleMenuClick = (idx) => {
    setOpenedMenuIdx(idx);
  };

  useEffect(() => {
    handleLoad({
      skip: (page - 1) * ITEMSPERPAGE_COUNT,
      limit: ITEMSPERPAGE_COUNT,
    });
  }, [page]);

  return (
    <>
      <div className='company-investment-section'>
        <h1 className='table-title'>View My Startup에서 받은 투자</h1>
        <div className='divider' />
        <p className='investment-sum'>
          {`총 ${formatToKoreanBillion(totalInvestAmount)}억 원`}
        </p>
        <div className='data-table'>
          <div className='table-header'>
            <div className='table-cell'>
              <p className='table-cell-tit'>투자자 이름</p>
            </div>
            <div className='table-cell'>
              <p className='table-cell-tit'>순위</p>
            </div>
            <div className='table-cell'>
              <p className='table-cell-tit'>투자금액</p>
            </div>
            <div className='table-cell'>
              <p className='table-cell-tit'>투자 코멘트</p>
            </div>
            <div className='table-cell'></div>
          </div>
          <div className='table-body'>
            {error ? (
              <div className='error-message'>{error}</div>
            ) : (
              investments.map((investment, idx) => (
                <TableRowCompany
                  key={investment.id}
                  investment={investment}
                  index={idx}
                  openedMenuIdx={openedMenuIdx}
                  onClick={handleMenuClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {totalCount !== 0 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalItems={totalCount}
          itemsPerPage={ITEMSPERPAGE_COUNT}
        />
      )}
    </>
  );
}
