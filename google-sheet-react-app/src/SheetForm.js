import React, { useState } from "react";

import "./SheetForm.css";

const SHEET_ID = "1SDFDKCFCtMuhmVtNq_arw45AS81_WDkQtAGxWjL7NWU";
const ACCESS_TOKEN =
  "ya29.a0AVvZVsqKX2Z6MGT-evzVDU_xl0OrGdM290PyMW8GUM_enWzTUL_b8w-ezCNdInEhbYttoJfd4PRXYEfleQAFnkvlU4X5BVrVh6Fz9gpu1OdM2xMzbHBJhIIwuKKltdkGq58gv8yr-9BMaB8tOplQchVIQZiEY9EaCgYKAZ4SAQASFQGbdwaIXIKqT5PRamzIMH9cpGnvCQ0166";

const SheetForm = () => {
  const [inputs, setInputs] = useState({
    "Student Name": "",
    Gender: "",
    "Class Level": "",
    "Home State": "",
    Major: "",
    "Extracurricular Activity": "",
  });
  const updateSheetValues = (event) => {
    event.preventDefault();
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //update this token with yours.
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          requests: [
            {
              appendCell: {
                range: {
                  startColumnIndex: 0,
                  endColumnIndex: 1,
                  startRowIndex: 32,
                  endRowIndex: 33,
                  sheetId: 0,
                },
                cell: {
                  userEnteredValue: {
                    numberValue: 10,
                  },
                },
                fields: "*",
              },
            },
          ],
          //   requests: [
          //     {
          //       sheetId: 0,
          //       rows: [
          //         {
          //           inputs,
          //         },
          //       ],
          //       fields: "*",
          //     },
          //   ],
        }),
      }
    );
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     updateSheetValues;
  //   };

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
