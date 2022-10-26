import React from "react";
import axios from "axios";

const api_key = "GBDTVVLW877IPQ9I";
const BASE_URL = "https://www.alphavantage.co/";

const Header = ({
  setData,
  term,
  setTerm,
  setShowResult,
  entryList,
  setEntryList,
  setTradingData,
  setHistoryData,
}) => {
  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    axios
      .get(
        `${BASE_URL}query?function=OVERVIEW&symbol=${term}&apikey=${api_key}`
      )
      .then((response) => {
        setData(response.data);
      });

    axios
      .get(
        `${BASE_URL}query?function=GLOBAL_QUOTE&symbol=${term}&apikey=${api_key}`
      )
      .then((response) => {
        setTradingData(response.data);
      });

    axios
      .get(
        `${BASE_URL}query?function=TIME_SERIES_MONTHLY&symbol=${term}&apikey=${api_key}`
      )
      .then((response) => {
        setHistoryData(response.data);
      });

    setShowResult(true);
    setEntryList([...entryList, term]);
    localStorage.setItem("searchHistory", JSON.stringify(entryList));
  };

  return (
    <>
      <div className="row">
        <div className="col mt-5 mb-4 h1">Hello, investor!</div>
      </div>
      <div className="row">
        <div className="col">
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="enter ticker here"
              aria-describedby="button-addon2"
              onChange={(e) => handleInputChange(e)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-outline-light"
              type="button"
              id="button-addon2"
              onClick={handleSubmit}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
