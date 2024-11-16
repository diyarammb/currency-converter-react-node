import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://currency-convertor-n6u7oob2w-dayas-projects-158d4082.vercel.app/api/currencies"
      )
      .then((response) => setCurrencies(Object.keys(response.data.data)))
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  const handleConversion = () => {
    setLoading(true);
    axios
      .post(
        "https://currency-convertor-n6u7oob2w-dayas-projects-158d4082.vercel.app/api/convert",
        {
          fromCurrency,
          toCurrency,
          amount
        }
      )
      .then((response) => {
        setConvertedAmount(response.data.convertedAmount);
        setConversionRate(response.data.conversionRate);

        const conversionRecord = {
          fromCurrency,
          toCurrency,
          amount,
          result: response.data.convertedAmount,
          rate: response.data.conversionRate,
          date: new Date().toLocaleString()
        };
        setConversionHistory((prevHistory) => [
          conversionRecord,
          ...prevHistory
        ]);

        localStorage.setItem(
          "conversionHistory",
          JSON.stringify([conversionRecord, ...conversionHistory])
        );
      })
      .catch((error) => console.error("Error during conversion:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("conversionHistory")) || [];
    setConversionHistory(savedHistory);
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-center text-uppercase">Currency Converter</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="form-group">
            <label>From Currency</label>
            <select
              className="form-control"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>To Currency</label>
            <select
              className="form-control"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary my-3"
            onClick={handleConversion}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>
        <div className="col-3"></div>
      </div>

      {convertedAmount !== null && (
        <div className="text-center">
          <h3 className="text-success">Converted Amount: {convertedAmount}</h3>
          <p className="text-primary">
            Conversion Rate: 1 {fromCurrency} = {conversionRate} {toCurrency}
          </p>
        </div>
      )}

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h6 className="my-4 text-center text-uppercase">
            Conversion History
          </h6>
          <ul className="list-group">
            {conversionHistory.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.date} - {item.amount} {item.fromCurrency} = {item.result}{" "}
                {item.toCurrency}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
