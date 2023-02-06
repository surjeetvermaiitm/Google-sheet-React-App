import "./SheetData.css";
import React, { useState } from "react";
import useGoogleSheets from "use-google-sheets";

const SheetData = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_API_KEY,
    sheetId: process.env.REACT_APP_SHEET_ID,
  });
  const sheetData = data[0];
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }
  return (
    <div>
      <h1 className="title">Google Sheet API React APP</h1>
      {console.log(sheetData.data)}
      <table className="table">
        <tr>
          {Object.keys(sheetData.data[0]).map((key, i) => {
            return (
              <th className="table-document" key={i}>
                {key}
              </th>
            );
          })}
        </tr>

        {sheetData.data.map((row, i) => {
          return (
            <tr className="table-row" key={i}>
              {Object.keys(row).map((key, i) => (
                <td className="table-document" key={i}>
                  {row[key]}
                </td>
              ))}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default SheetData;
