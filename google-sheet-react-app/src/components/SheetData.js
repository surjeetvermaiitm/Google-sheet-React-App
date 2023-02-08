import React, { useState, useEffect } from "react";

import "./SheetData.css";

// const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const SHEET_ID = "111GsFbwylyTka5JkgRm1ZKUrzvvnHgTpr8LDcOBNLYY";
const ACCESS_TOKEN =
  "ya29.a0AVvZVsrvBQNKJjMdktMsx5YWs0fqwuYF5BeFUh-iFO6NTQ8voCqV_RBYbqJjkiQdexukbhexWdEhUGku4Rfz1ndXJTN86K2X-6mcM7p1WXZlfQITdm99WM-e-kWtfmzdryPS2CD54mocs73spe2dwH0rGw5CFM4aCgYKASISAQASFQGbdwaI-tvazSIrUYrUDjdSsmOnsg0166";

const SheetData = () => {
  console.log(SHEET_ID);
  const [sheetData, setSheetData] = useState([[], []]);
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
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  return (
    <div>
      {console.log(sheetData)}
      <h1 className="title">Google Sheet API React APP</h1>
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
