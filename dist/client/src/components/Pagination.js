"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
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
    return (<nav className='flex flex-row justify-center mb-10 mt-5'>
      <ul className='inline-flex items-center'>
        <li>
          <react_router_dom_1.Link className='block px-4 py-3 ml-0 mr-2 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-red-200 hover:text-gray-700' onClick={prevPage} to='#'>
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </react_router_dom_1.Link>
        </li>
        <li>
          <react_router_dom_1.Link to='#' className='px-4 py-3 mr-2 leading-tight text-gray-500 border border-gray-300 hover:bg-red-200 hover:text-gray-700' onClick={() => setCurrentPage(currentPage)}>
            {currentPage}
          </react_router_dom_1.Link>
        </li>
        <p>of</p>
        <li>
          <react_router_dom_1.Link to='#' className='px-4 py-3 mx-2 leading-tight text-gray-500 border border-gray-300 hover:bg-red-200 hover:text-gray-700' onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])}>
            {pageNumbers[pageNumbers.length - 1]}
          </react_router_dom_1.Link>
        </li>
        <li>
          <react_router_dom_1.Link className='block px-4 py-3 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-red-200 hover:text-gray-700' onClick={nextPage} to='#'>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </react_router_dom_1.Link>
        </li>
      </ul>
    </nav>);
};
exports.default = Pagination;
