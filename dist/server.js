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
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
app.get('/api/currencies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.freecurrencyapi.com/v1/currencies', {
            params: { apiKey: API_KEY }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
}));
app.post('/api/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromCurrency, toCurrency, amount } = req.body;
    try {
        const response = yield axios_1.default.get('https://api.freecurrencyapi.com/v1/convert', {
            params: {
                apiKey: API_KEY,
                from: fromCurrency,
                to: toCurrency,
                amount: amount
            }
        });
        const { data } = response;
        res.json({
            convertedAmount: data.data[toCurrency],
            conversionRate: data.info.rate
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Conversion failed' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
