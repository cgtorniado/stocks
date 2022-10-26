import React from "react";

const NoSearchResult = ({ data }) => {
  return (
    <div className="glass p-5 mt-5">
      {Object.keys(data).length === 0 ? (
        <>
          <div className="display-4">No Search Results.</div>
          <span>Please check your input</span>
        </>
      ) : (
        <span>
          This project is supported by a free api with limits. <br />
          Please wait for 1 minute before trying again
        </span>
      )}
    </div>
  );
};

export default NoSearchResult;
