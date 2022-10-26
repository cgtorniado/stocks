import React from "react";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
} from "victory";

const SearchResult = ({ entryList, data, historyData, tradingData }) => {
  const { Name, Description, Symbol } = data || {};

  const {
    "Global Quote": {
      "02. open": open,
      "03. high": high,
      "04. low": low,
      "05. price": price,
      "06. volume": volume,
      "07. latest trading day": latestTradingDay,
    } = {},
  } = tradingData || {};

  const { "Monthly Time Series": monthlyArray = {} } = historyData || {};

  const monthsArray = Object.values(monthlyArray);
  const twelveMonthsArray = monthsArray.slice(0, 12);

  const timeObject = Object.keys(monthlyArray).slice(0, 12);
  const timeArray = Object.values(timeObject);

  const openArray = twelveMonthsArray.map((a) => a["1. open"]);
  const closeArray = twelveMonthsArray.map((a) => a["4. close"]);
  const highArray = twelveMonthsArray.map((a) => a["2. high"]);
  const lowArray = twelveMonthsArray.map((a) => a["3. low"]);

  const finalArray = [];
  for (let i = 0; i < 12; i++) {
    finalArray.push({
      x: timeArray[i],
      open: openArray[i],
      close: closeArray[i],
      high: highArray[i],
      low: lowArray[i],
    });
  }

  const finalArrayLatestRight = finalArray.reverse();

  console.log(finalArrayLatestRight);
  return (
    <>
      <div className="row">
        <div className="col mb-5" style={{ fontSize: "12px" }}>
          <small>
            Some parts may not fully show because of the API limits (5
            calls/min). If any of the graph/values/descriptions are missing,
            please wait for 1 minute and try again.
          </small>
        </div>
      </div>
      <div className="row">
        <div className="col">
          Show search result/s for "{entryList.slice(-1)}"
        </div>
      </div>
      <div className="row">
        <div className="col mt-3 glass px-5 py-3">
          <span className="display-5">{Name} </span>
          <span>{Symbol}</span> <br />
        </div>
      </div>

      {Object.keys(tradingData).length > 0 && (
        <div className="row mt-3">
          <div className="col col-md-4 glass px-5 py-3">
            <span>
              Price: <br /> {price}
            </span>
          </div>
          <div className="col col-md-4  glass px-5 py-3">
            <span>
              Volume: <br /> {volume}
            </span>
          </div>
          <div className="col col-md-4  glass px-5 py-3">
            <span>
              Latest Trading Day: <br /> {latestTradingDay}
            </span>
          </div>
          <div className="col col-md-4  glass px-5 py-3">
            <span>
              Open: <br /> {open}
            </span>
          </div>
          <div className="col col-md-4  glass px-5 py-3">
            <span>
              High: <br /> {high}
            </span>
          </div>
          <div className="col col-md-4  glass px-5 py-3">
            <span>
              Low: <br /> {low}
            </span>
          </div>
        </div>
      )}

      {Object.keys(historyData).length > 0 && (
        <div className="row">
          <div className="col mt-3 glass px-5 py-3">
            <span>12 Month Historical Data</span> <br />
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 5 }}
            >
              {/* <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} /> */}
              <VictoryAxis dependentAxis />
              <VictoryCandlestick
                candleColors={{ positive: "#548F14", negative: "#C70039" }}
                data={finalArrayLatestRight}
              />
            </VictoryChart>
          </div>
        </div>
      )}

      {Object.keys(data).length > 0 && (
        <div className="row">
          <div className="col mt-3 glass px-5 py-3">
            <small>{Description}</small>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
