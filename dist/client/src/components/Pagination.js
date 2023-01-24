"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const nextPage = () => {
        if (currentPage !== totalPages)
            setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1);
    };
    const pageNumbers = Array.from(Array(totalPages), (_, index) => index + 1);
    return (<nav>
      <ul>
        <li>
          <a onClick={prevPage} href='#'>Previous</a>
        </li>
        {pageNumbers.map(page => <li key={page}>
            <a onClick={() => setCurrentPage(page)} href='#'>
              {page}
            </a>
          </li>)}
        <li>
          <a onClick={nextPage} href='#'>
            Next
          </a>
        </li>
      </ul>
    </nav>);
};
exports.default = Pagination;
