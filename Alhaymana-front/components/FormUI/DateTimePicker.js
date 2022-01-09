import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useField, useFormikContext } from "formik";

const DateTimePickerWrapper = ({
  name,
  label,
  legend,
  value,
  ...otherOptions
}) => {
  const [val, setVal] = useState(value);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const config = {
    type: "date",
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherOptions,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <DatePicker
        label={label}
        value={val}
        onChange={(newValue) => {
          setVal(newValue);
          setFieldValue(name, newValue);
          console.log("changed: ", newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    // <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
    //   <FormControl>
    //     <FormLabel component="legend">{legend}</FormLabel>
    //     <FormGroup>
    //       <DatePicker
    //         // mask="'__/__/____'"
    //         label={label}
    //         {...config}
    //         value={value}
    //         onChange={(newValue) => setValue(newValue)}
    //         renderInput={(params) => <TextField {...params} />}
    //       />
    //     </FormGroup>
    //   </FormControl>
    // </LocalizationProvider>
  );
};

export default DateTimePickerWrapper;
