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
exports.selectMilk = exports.milkSlice = exports.patchMilk = exports.fetchMilk = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const initialState = {
    milks: [],
    status: 'idle'
};
exports.fetchMilk = (0, toolkit_1.createAsyncThunk)('milk/fetchMilk', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('/milk');
    return response.data.db.results;
}));
exports.patchMilk = (0, toolkit_1.createAsyncThunk)('milk/patchMilk', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield axios_1.default.patch(`milk/${data.id}`, { data });
    return (yield order.data);
}));
exports.milkSlice = (0, toolkit_1.createSlice)({
    name: 'milk',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(exports.fetchMilk.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.milks = state.milks.concat(action.payload);
        })
            .addCase(exports.patchMilk.fulfilled, (state, action) => {
            const index = state.milks.findIndex(item => item.id === action.payload.id);
            state.milks.splice(index, 1, action.payload);
        });
    }
});
const selectMilk = (state) => state.milk.milks;
exports.selectMilk = selectMilk;
exports.default = exports.milkSlice.reducer;
