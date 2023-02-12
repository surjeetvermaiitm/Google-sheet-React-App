import "./App.css";
import SheetData from "./components/SheetData";
import SheetForm from "./components/SheetForm";
import React, { useState } from "react";

function App() {
  const [inputs, setInputs] = useState({
    "Student Name": "",
    Gender: "",
    "Class Level": "",
    "Home State": "",
    Major: "",
    "Extracurricular Activity": "",
  });
  const [sheetData, setSheetData] = useState([[], []]);
  const [status, setStatus] = useState("Loading...");
  const [rowLength, setRowLength] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);

  return (
    <div>
      <SheetForm
        inputs={inputs}
        setInputs={setInputs}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
        rowLength={rowLength}
      />
      <SheetData
        sheetData={sheetData}
        setSheetData={setSheetData}
        status={status}
        setStatus={setStatus}
        isRefresh={isRefresh}
        setRowLength={setRowLength}
      />
    </div>
  );
}

export default App;
