import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 5000;

const API_KEY = '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2';
app.use(cors());

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/currencies', {
            params: { apiKey: API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

app.post('/api/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
    try {
        const response = await axios.get('https://api.freecurrencyapi.com/v1/convert', {
            params: {
                apiKey: 'YOUR_API_KEY',
                from: fromCurrency,
                to: toCurrency,
                amount: amount,
            },
        });
        res.json({
            convertedAmount: response.data.data[toCurrency],
            conversionRate: response.data.info.rate,
        });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
