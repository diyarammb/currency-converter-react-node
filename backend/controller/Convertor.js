const currencyService = require("./currencyService");

const currencies = async (req, res) => {
  try {
    const data = await currencyService.getCurrencies();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertor = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;
  try {
    const { convertedAmount, conversionRate } =
      await currencyService.convertCurrency(fromCurrency, toCurrency, amount);
    res.json({ convertedAmount, conversionRate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { currencies, convertor };
