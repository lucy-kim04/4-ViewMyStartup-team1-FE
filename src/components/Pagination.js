import './Pagination.css';

const Pagination = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxButtons = 5; // 항상 5개의 버튼만 출력
  // currentPage를 기준으로 5개의 버튼을 보여주기 위한 startPage와 endPage 계산
  let startPage = Math.max(1, currentPage - 2); // currentPage를 기준으로 최소 1로 설정
  let endPage = Math.min(totalPages, startPage + maxButtons - 1); // totalPages를 넘지 않게 설정

  // 만약 endPage가 totalPages보다 크면, startPage를 조정해서 끝까지 표시
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // 페이지 번호들이 비어 있지 않게 하기 위해 totalPages가 5개 이상이면 endPage를 5로 고정
  if (totalPages <= maxButtons) {
    endPage = totalPages;
    startPage = 1;
  }

  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  // 부족한 자리는 endPage + 1부터 버튼 숫자 추가
  while (pageButtons.length < maxButtons) {
    pageButtons.push(pageButtons[pageButtons.length - 1] + 1);
  }

  const goToNextPage = () => {
    // 5개씩 페이지를 넘기기
    if (currentPage < totalPages) {
      const nextPage = Math.min(currentPage + 5, totalPages);
      onPageChange(nextPage);
    }
  };

  const goToPreviousPage = () => {
    // 5개씩 이전 페이지로 이동
    if (currentPage > 1) {
      const prevPage = Math.max(currentPage - 5, 1);
      onPageChange(prevPage);
    }
  };

  return (
    <div>
      <div className="pagination">
        <button
          className="prev-btn"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {pageButtons.map((page, index) => (
          <button
            key={index}
            style={{
              backgroundColor: page === currentPage ? '#eb5230' : '#4b4b4b',
            }}
            onClick={() => onPageChange(page)}
            disabled={page > totalPages} // 페이지가 실제로 없으면 비활성화
          >
            {page}
          </button>
        ))}

        <button
          className="next-btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
