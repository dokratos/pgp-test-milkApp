"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const milk_png_1 = __importDefault(require("../milk.png"));
const MilkCard = ({ product }) => {
    return (<article className='w-72 mb-3 bg-slate-50 rounded-lg'>
      <react_router_dom_1.Link to={`/${product.id}`}>
        <img src={milk_png_1.default} className='w-40 my-6 ml-16 '/>
        <div className='flex flex-wrap justify-between bg-white rounded-b-lg p-5 text-gray-700'>
          <h1 className='font-medium mb-2'>{product.name}</h1>
          <p className='text-sm'>{product.type}</p>
          <p className='text-sm'>{product.storage}l in stock</p>
        </div>
      </react_router_dom_1.Link>
    </article>);
};
exports.default = MilkCard;
