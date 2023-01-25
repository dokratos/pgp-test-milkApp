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
const MilkList_1 = __importDefault(require("./MilkList"));
const Pagination_1 = __importDefault(require("./Pagination"));
const Landing = () => {
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
            setCurrentPage(1);
        }
    };
    const handleSearch = () => {
        if (text.length > 0) {
            const regex = new RegExp(text, 'i');
            const searchResult = products.filter(milk => {
                return milk.name.match(regex);
            });
            setFilter(searchResult);
            setCurrentPage(1);
            setText('');
        }
    };
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentData = filter.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filter.length / recordsPerPage);
    return (<main>
       <form className="flex flex-row justify-between relative my-10 mx-5 lg:mx-20" onSubmit={e => e.preventDefault()}>
        <button onClick={handleSearch} className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <input type='text' placeholder='Search by Name..' value={text} onChange={e => setText(e.target.value)} className='w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-rose-500'></input>
        <select className='justify-self-end w-64 p-4 px-5 text-sm text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-rose-500' onChange={handleFilter}>
        {category.map((milkType, i) => <option key={i} value={milkType}>{milkType}</option>)}
        </select>
      </form>
      <MilkList_1.default data={currentData}/>
      <Pagination_1.default currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </main>);
};
exports.default = Landing;
