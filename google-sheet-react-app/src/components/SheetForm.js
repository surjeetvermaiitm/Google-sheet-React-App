import React from "react";

import "./SheetForm.css";
import { SHEET_ID, ACCESS_TOKEN } from "../data/credential";
// const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const SheetForm = (props) => {
  const { inputs, setInputs, isRefresh, setIsRefresh, rowLength } = props;
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
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A${
        rowLength + 1
      }:append?valueInputOption=RAW`,
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
      setInputs({
        "Student Name": "",
        Gender: "",
        "Class Level": "",
        "Home State": "",
        Major: "",
        "Extracurricular Activity": "",
      });
      setIsRefresh(!isRefresh);
      console.log("Data added to Google Sheet successfully!");
    }
  };

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
