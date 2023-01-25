"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const react_1 = __importDefault(require("react"));
const Alert = () => {
    return (<div className='fixed bottom-52 left-32 p-16 overflow-x-hidden overflow-y-auto bg-white border border-rose-500 rounded-lg lg:left-80 bottom-28'>You successufully placed an order! Thank you</div>);
};
exports.Alert = Alert;
