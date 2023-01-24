"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const MilkCard_1 = __importDefault(require("./MilkCard"));
const Pagination_1 = __importDefault(require("./Pagination"));
const ProductList = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [category, setCategory] = (0, react_1.useState)([]);
    const [filter, setFilter] = (0, react_1.useState)([]);
    const [text, setText] = (0, react_1.useState)('');
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [recordsPerPage] = (0, react_1.useState)(9);
    (0, react_1.useEffect)(() => {
        const getMilk = () => __awaiter(void 0, void 0, void 0, function* () {
            const milkList = yield axios_1.default.get('/milk');
            setProducts(milkList.data.db.results);
            setFilter(milkList.data.db.results);
        });
        getMilk();
    }, []);
    (0, react_1.useEffect)(() => {
        const getFilter = () => {
            const categoryArray = products.map(milk => milk.type);
            const categoryFilter = categoryArray.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            categoryFilter.unshift('All');
            setCategory(categoryFilter);
        };
        getFilter();
    }, [products]);
    const handleFilter = (event) => {
        if (event) {
            if (event.target.value === 'All')
                return setFilter(products);
            const filtered = products.filter(item => item.type === event.target.value);
            setFilter(filtered);
        }
    };
    const handleSearch = () => {
        if (text.length > 0) {
            const regex = new RegExp(text, 'i');
            const searchResult = products.filter(milk => {
                return milk.name.match(regex);
            });
            setFilter(searchResult);
            setText('');
        }
    };
    const nextPage = () => {
        // if(currentPage !== totalPages) 
        setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1);
    };
    return (<main>
       <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type='text' placeholder='Search by Name..' value={text} onChange={e => setText(e.target.value)} className='block w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50'></input>
        <button onClick={handleSearch} className='text-white absolute left-56 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800'>
          Search
        </button>
      </div>
      <label>Type:</label>
      <select onChange={handleFilter}>
        {category.map((milkType, i) => <option key={i} value={milkType}>{milkType}</option>)}
      </select>
      <section className='flex flex-row flex-wrap justify-around'>
        {filter.map((milk, i) => <MilkCard_1.default product={milk} key={i}/>)}
      </section>
      <Pagination_1.default currentPage={currentPage} recordsPerPage={recordsPerPage} prevPage={prevPage} nextPage={nextPage} data={filter}/>
    </main>);
};
exports.default = ProductList;
