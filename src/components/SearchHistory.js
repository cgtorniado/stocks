import React from "react";

const SearchHistory = ({ entryList }) => {
  const length = entryList.length;
  return (
    <>
      <div className="row mt-5 mb-3">
        <div className="col h4">Search History</div>
      </div>
      <div className="row">
        <div className="row flex-row-reverse">
          {entryList.slice(length - 10, length).map((entry, index) => (
            <div className="col" key={index}>
              {entry}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchHistory;
