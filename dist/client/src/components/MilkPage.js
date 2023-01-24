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
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const milk_png_1 = __importDefault(require("../milk.png"));
const Alert_1 = require("./Alert");
const MilkPage = () => {
    const [milkProduct, setMilkProduct] = (0, react_1.useState)({});
    const [sliderValue, setSliderValue] = (0, react_1.useState)('0');
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        const getMilk = () => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield axios_1.default.get(`milk/${id}`);
            setMilkProduct(product.data);
        });
        getMilk();
    }, []);
    if (showAlert) {
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    }
    ;
    const handleOrder = () => __awaiter(void 0, void 0, void 0, function* () {
        setShowAlert(!showAlert);
        setSliderValue('0');
        const order = yield axios_1.default.patch(`milk/${id}`, { liter: sliderValue });
        setMilkProduct(order.data);
        return order;
    });
    return (<main className='static'>
      <react_router_dom_1.Link to='/'>Back to Home</react_router_dom_1.Link>
      <section className='absolute inset-x-1/4 top-52  flex flex-row justify-beteween '>
        <img src={milk_png_1.default} className='w-60 p-5'/>
        <article className='p-5 bg-white rounded-lg'>
          <h1 className='font-medium mb-2'>{milkProduct.name}</h1>
          <p className='text-gray-700'>{milkProduct.type}</p>
          <p className='text-sm mb-4'>{milkProduct.storage}l in stock</p>
          <input type='range' min='0' max={milkProduct.storage} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'>
          </input>
          <p>{sliderValue} liter</p>
          <button className='text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800' onClick={handleOrder}>Order!</button>
        </article>
          {showAlert && <Alert_1.Alert />}
      </section>
    </main>);
};
exports.default = MilkPage;
