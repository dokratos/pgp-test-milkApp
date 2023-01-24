import React from 'react';

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({totalPages, currentPage, setCurrentPage}: PaginationProps) => {

  const nextPage = () => {
    if(currentPage !== totalPages) 
        setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
      if(currentPage !== 1) 
          setCurrentPage(currentPage - 1)
  }

  const pageNumbers = Array.from(Array(totalPages), (_, index) => index + 1);

  return (
    <nav>
      <ul>
        <li>
          <a
          onClick={prevPage}
          href='#'
          >Previous</a>
        </li>
        { pageNumbers.map(page =>
          <li key={page}>
            <a
            onClick={() => setCurrentPage(page)}
            href='#'
            >
              {page}
            </a>
          </li> 
          )}
        <li>
          <a
          onClick={nextPage}
          href='#'
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination