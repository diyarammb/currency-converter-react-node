const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const currencies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.freecurrencyapi.com/v1/currencies",
      {
        headers: {
          Authorization: `Bearer ${process.env.CURRENCY_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching currency data" });
  }
};

// currency convertor function
const convertor = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;
  try {
    const response = await axios.get(
      "https://api.freecurrencyapi.com/v1/latest",
      {
        params: {
          base_currency: fromCurrency,
          symbols: toCurrency
        },
        headers: {
          Authorization: `Bearer ${process.env.CURRENCY_API_KEY}`
        }
      }
    );

    const conversionRate = response.data.data[toCurrency];
    const result = amount * conversionRate;

    res.json({ convertedAmount: result, conversionRate });
  } catch (error) {
    res.status(500).json({ error: "Error during conversion" });
  }
};

module.exports = { currencies, convertor };
