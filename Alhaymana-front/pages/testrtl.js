import React, { createRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
// import DatePicker from "@mui/lab/DatePicker";

const inputRef = createRef();

const testrtl = () => {
  useEffect(() => {
    if (inputRef) inputRef.current.dir = "auto";
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <div dir="rtl">
        <TextField name="nom_arab" label="اللقب بالعربي" dir="rtl" />
      </div>
      <TextField
        name="prenom_arab"
        label="الاسم بالعربي"
        inputRef={inputRef}
        a
      />
      {/* </div> */}
      <input dir="rtl" placeholder="zzzz"></input>
      {/* <DatePicker
        inputFormat="MM/dd/yyyy"
        // value={date}
        onChange={(value) => setDate(value)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      /> */}
    </div>
  );
};

export default testrtl;
