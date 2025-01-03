import './Pagination.css';

const Pagination = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxButtons = Math.min(totalPages, 5); // 페이지 개수가 5개 이하일 경우 조정
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수
    const nextPageGroupStart = Math.min(currentPage + maxButtons, totalPages); // 다음 그룹의 시작 페이지
    onPageChange(nextPageGroupStart); // 다음 그룹의 시작 페이지로 이동
  };

  const goToPreviousPage = () => {
    const previousPageGroupStart = Math.max(currentPage - maxButtons, 1); // 이전 그룹의 시작 페이지
    onPageChange(previousPageGroupStart); // 이전 그룹의 시작 페이지로 이동
  };

  return (
    <div>
      <div className="pagination">
        {totalPages > 5 && (
          <button
            className="prev-btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        )}

        {pageButtons.map((page, index) => (
          <button
            key={index}
            style={{
              backgroundColor: page === currentPage ? '#eb5230' : '#4b4b4b',
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {totalPages > 5 && (
          <button
            className="next-btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
