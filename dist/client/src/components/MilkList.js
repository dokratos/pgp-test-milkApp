"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MilkCard_1 = __importDefault(require("./MilkCard"));
const MilkList = ({ data }) => {
    return (<section className='flex flex-row flex-wrap justify-around'>
    {data.map((milk, i) => <MilkCard_1.default product={milk} key={i}/>)}
  </section>);
};
exports.default = MilkList;
