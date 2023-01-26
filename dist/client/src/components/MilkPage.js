"use strict";
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
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const reduxHooks_1 = require("../hooks/reduxHooks");
const milkSlice_1 = require("../slices/milkSlice");
const milk_png_1 = __importDefault(require("../milk.png"));
const Alert_1 = require("./Alert");
const MilkPage = () => {
    const dispatch = (0, reduxHooks_1.useAppDispatch)();
    const milkStatus = (0, reduxHooks_1.useAppSelector)(state => state.milk.status);
    const [sliderValue, setSliderValue] = (0, react_1.useState)('1');
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        if (milkStatus === 'idle') {
            dispatch((0, milkSlice_1.fetchMilk)());
        }
    }, [milkStatus]);
    const milkProduct = (0, reduxHooks_1.useAppSelector)(state => state.milk.milks.find(item => item.id === id));
    if (showAlert) {
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
    }
    ;
    const handleOrder = () => __awaiter(void 0, void 0, void 0, function* () {
        setShowAlert(!showAlert);
        setSliderValue('0');
        if (id)
            dispatch((0, milkSlice_1.patchMilk)({ id, liter: sliderValue }));
    });
    return (<main className='relative'>
      {milkProduct &&
            <>
      <react_router_dom_1.Link to='/' className='h-7 absolute left-1/4 top-24 flex flex-row text-gray-600'>
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='inline'>
        <path className="stroke-rose-500 stroke-2 hover:stroke-2" strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
        </svg>Back
      </react_router_dom_1.Link>
      <section className='absolute top-1/2 left-1/4 flex flex-col lg:flex-row top-56 left-32 md:flex-row top-32'>
        <img src={milk_png_1.default} className='w-60 p-5 lg:w-80'/>
        <article className='p-5 bg-white rounded-lg lg:p-10'>
          <h1 className='font-medium mb-2'>{milkProduct.name}</h1>
          <p className='text-gray-700'>{milkProduct.type}</p>
          <p className='text-sm mb-4'>{milkProduct.storage}l in stock</p>
         {milkProduct.storage > 0 ?
                    <>
          <div className='relative'>
              <input type='range' min='1' max={milkProduct.storage} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-400 lg:mt-10'></input>
              <output>{sliderValue}l</output>
            </div>
            <button className='text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2' onClick={handleOrder}>Order!</button>
          </> : <p className='text-white bg-rose-700 font-medium rounded-lg text-sm px-4 py-2'>Sorry, out of Stock!</p>}
        </article>
          {showAlert && <Alert_1.Alert />}
      </section></>}
    </main>);
};
exports.default = MilkPage;
