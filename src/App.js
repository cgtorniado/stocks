import { useState } from "react";
import Header from "./components/Header";
import NoSearchResult from "./components/NoSearchResult";
import SearchHistory from "./components/SearchHistory";
import SearchResult from "./components/SearchResult";

const history = localStorage.getItem("searchHistory")
  ? JSON.parse(localStorage.getItem("searchHistory"))
  : [];

function App() {
  const [data, setData] = useState([]);
  const [tradingData, setTradingData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [term, setTerm] = useState();
  const [showResult, setShowResult] = useState(false);
  const [entryList, setEntryList] = useState(history);

  return (
    <div className="row">
      <Header
        data={data}
        setData={setData}
        term={term}
        setTerm={setTerm}
        setShowResult={setShowResult}
        entryList={entryList}
        setEntryList={setEntryList}
        tradingData={tradingData}
        setTradingData={setTradingData}
        historyData={historyData}
        setHistoryData={setHistoryData}
      />

      {showResult && Object.keys(data).length > 1 && (
        <SearchResult
          entryList={entryList}
          data={data}
          historyData={historyData}
          tradingData={tradingData}
        />
      )}

      {showResult && Object.keys(data).length <= 1 && (
        <NoSearchResult data={data} />
      )}

      {entryList.length > 0 && <SearchHistory entryList={entryList} />}
    </div>
  );
}

export default App;
