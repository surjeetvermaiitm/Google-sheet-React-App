import React, { useEffect } from "react";

import "./SheetData.css";
import { SHEET_ID, ACCESS_TOKEN } from "../data/credential";

// const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const SheetData = (props) => {
  // console.log(SHEET_ID);
  const {
    sheetData,
    setSheetData,
    status,
    setStatus,
    isRefresh,
    setRowLength,
  } = props;
  const getSheetValues = async () => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:F${100}`,
      {
        // method: "GET",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    // console.log("response", response);
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    getSheetValues()
      .then((res) => {
        setSheetData(res.values);
        setRowLength(sheetData.length);
        setStatus("Data Loaded Successfully");
      })
      .catch((e) => {
        setStatus(e.message + " 404 error");
        console.log(e.message);
      });
  }, [isRefresh]);

  return (
    <div>
      {console.log(sheetData)}
      <h1 className="title">Google Sheet API React APP</h1>
      <h2>{status}</h2>
      <table className="table">
        <tr>
          {sheetData[0].map((key, i) => {
            return (
              <th className="table-document" key={i}>
                {key}
              </th>
            );
          })}
        </tr>

        {sheetData.slice(1).map((row, i) => {
          return (
            <tr className="table-row" key={i}>
              {row.map((key, i) => (
                <td className="table-document" key={i}>
                  {key}
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
