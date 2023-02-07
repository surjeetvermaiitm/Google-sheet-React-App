import React, { useState, useEffect } from "react";

import "./SheetData.css";

const SHEET_ID = "1SDFDKCFCtMuhmVtNq_arw45AS81_WDkQtAGxWjL7NWU";
const ACCESS_TOKEN =
  "ya29.a0AVvZVsqKX2Z6MGT-evzVDU_xl0OrGdM290PyMW8GUM_enWzTUL_b8w-ezCNdInEhbYttoJfd4PRXYEfleQAFnkvlU4X5BVrVh6Fz9gpu1OdM2xMzbHBJhIIwuKKltdkGq58gv8yr-9BMaB8tOplQchVIQZiEY9EaCgYKAZ4SAQASFQGbdwaIXIKqT5PRamzIMH9cpGnvCQ0166";

const SheetData = () => {
  const [sheetData, setSheetData] = useState([]);
  const getSheetValues = async () => {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:F31`,
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
        setSheetData(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  return (
    <div>
      {/* {console.log(sheetData.values)} */}
      <h1 className="title">Google Sheet API React APP</h1>

      {/* {console.log(sheetData.data)} */}
      <table className="table">
        <tr>
          {sheetData.values[0].map((key, i) => {
            return (
              <th className="table-document" key={i}>
                {key}
              </th>
            );
          })}
        </tr>

        {sheetData.values.slice(1).map((row, i) => {
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
