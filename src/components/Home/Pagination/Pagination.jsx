import styles from "./Pagination.module.css";

export default function Pagination({
  pagination,
  pageNumbers,
  currentPage,
  totalPages,
  handlePrevPage,
  handlePageNumber,
  handleNextPage,
}) {
  return (
    <div className={styles.pagination_layout}>
      <button
        className={styles.button_pagination}
        disabled={pagination.offset === 0}
        onClick={handlePrevPage}
      >
        Prev
      </button>
      <div className={styles.numbers_layout}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={styles.page_number}
            onClick={() => handlePageNumber(number)}
            style={{
              fontWeight: number === currentPage ? "bold" : "normal",
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={styles.button_pagination}
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
}
