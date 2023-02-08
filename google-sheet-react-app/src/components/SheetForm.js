import React, { useState } from "react";

import "./SheetForm.css";

// const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const SHEET_ID = "111GsFbwylyTka5JkgRm1ZKUrzvvnHgTpr8LDcOBNLYY";
const ACCESS_TOKEN =
  "ya29.a0AVvZVsrvBQNKJjMdktMsx5YWs0fqwuYF5BeFUh-iFO6NTQ8voCqV_RBYbqJjkiQdexukbhexWdEhUGku4Rfz1ndXJTN86K2X-6mcM7p1WXZlfQITdm99WM-e-kWtfmzdryPS2CD54mocs73spe2dwH0rGw5CFM4aCgYKASISAQASFQGbdwaI-tvazSIrUYrUDjdSsmOnsg0166";

const SheetForm = () => {
  const [row, setRow] = useState(31);
  const [inputs, setInputs] = useState({
    "Student Name": "",
    Gender: "",
    "Class Level": "",
    "Home State": "",
    Major: "",
    "Extracurricular Activity": "",
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const updateSheetValues = async (event) => {
    event.preventDefault();
    const data = Object.values(inputs);
    console.log(data);
    setRow((prev) => prev + 1);
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A${row}:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          values: [data],
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Data added to Google Sheet successfully!");
    }
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     updateSheetValues;
  //   };
  // const updateSheetValues = (event) => {
  //   event.preventDefault();
  //   const data = Object.values(inputs).join(",");
  //   console.log(data);
  //   const response = fetch(
  //     `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         //update this token with yours.
  //         Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       },
  //       body: JSON.stringify({
  //         requests: [
  //           {
  //             insertRange: {
  //               range: {
  //                 sheetId: 1234567890,
  //                 startRowIndex: 32,
  //                 endRowIndex: 33,
  //               },
  //               shiftDimension: "ROWS",
  //             },
  //           },
  //           {
  //             pasteData: {
  //               data: data,
  //               type: "PASTE_NORMAL",
  //               delimiter: ",",
  //               coordinate: {
  //                 sheetId: 0,
  //                 rowIndex: 32,
  //               },
  //             },
  //           },
  //         ],
  //       }),
  //     }
  //   );
  //   if (!response.ok) {
  //     console.log("response", response);
  //     throw new Error("Data coud not be append!");
  //   } else {
  //     return response.json();
  //   }
  // };
  return (
    <form onSubmit={updateSheetValues}>
      <label htmlFor="Student Name">Student name: </label>
      <input
        type="text"
        name="Student Name"
        value={inputs["Student Name"]}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="Gender">Gender: </label>
      <input
        type="text"
        name="Gender"
        value={inputs["Gender"]}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="Major">Major: </label>
      <input
        type="text"
        name="Major"
        value={inputs["Major"]}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="Home State">Home State: </label>
      <input
        type="text"
        name="Home State"
        value={inputs["Home State"]}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="Class Level">Class Level: </label>
      <input
        type="text"
        name="Class Level"
        value={inputs["Class Level"]}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="Extracurricular Activity">
        Extracurricular Activity:{" "}
      </label>
      <input
        type="text"
        name="Extracurricular Activity"
        value={inputs["Extracurricular Activity"]}
        onChange={handleInputChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SheetForm;
