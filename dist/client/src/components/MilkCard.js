"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const milk_png_1 = __importDefault(require("../milk.png"));
const MilkCard = ({ product }) => {
    return (<article className='w-72 bg-white mb-3 bg-slate-100 rounded-lg'>
      <img src={milk_png_1.default} className='w-40 my-6 ml-20 '/>
      <div className='bg-white rounded-b-lg '>

      <h1>{product.name}</h1>
      <p>{product.type}</p>
      <p>{product.storage}</p>
      </div>
    </article>);
};
exports.default = MilkCard;
