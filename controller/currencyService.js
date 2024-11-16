const axios = require("axios");
require("dotenv").config();

const currencyApiKey = process.env.CURRENCY_API_KEY;

const getCurrencies = async () => {
  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/currencies?apikey=${currencyApiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching currency data");
  }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${currencyApiKey}`,
      {
        params: {
          base_currency: fromCurrency,
          symbols: toCurrency
        }
      }
    );

    const conversionRate = response.data.data[toCurrency];
    const result = amount * conversionRate;

    return { convertedAmount: result, conversionRate };
  } catch (error) {
    throw new Error("Error during conversion");
  }
};

module.exports = { getCurrencies, convertCurrency };
