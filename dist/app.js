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
const express_1 = __importDefault(require("express"));
const milkDB_json_1 = __importDefault(require("./milkDB.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/milk', (_req, res) => {
    try {
        return res.status(200).json({ db: milkDB_json_1.default });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
/// route unused
app.get('/milk/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = milkDB_json_1.default.results.find(item => item.id === id);
        if (!product) {
            return res.status(404).send('Product not found!');
        }
        return res.status(200).send(product);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}));
app.patch('/milk/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { liter } = req.body.data;
        const product = milkDB_json_1.default.results.find(item => item.id === id);
        if (!product) {
            return res.status(404).send('Product not found!');
        }
        const index = milkDB_json_1.default.results.findIndex(item => item.id === id);
        const updatedMilk = Object.assign(Object.assign({}, product), { storage: product.storage - liter });
        milkDB_json_1.default.results.splice(index, 1, updatedMilk);
        return res.status(200).send(updatedMilk);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}));
exports.default = app;
