"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Header_1 = __importDefault(require("./components/Header"));
const Landing_1 = __importDefault(require("./components/Landing"));
const MilkPage_1 = __importDefault(require("./components/MilkPage"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <Header_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path='/' element={<Landing_1.default />}/>
        <react_router_dom_1.Route path='/:id' element={<MilkPage_1.default />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
