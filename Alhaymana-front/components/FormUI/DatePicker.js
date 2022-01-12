import React from "react";

import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useField, useFormikContext } from "formik";
import { TextField, FormControl, FormGroup, FormLabel } from "@mui/material";

const DatePickerWrapper = ({ name, label, legend, value, ...otherOptions }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const config = {
    ...field,
    ...otherOptions,
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
    label: label,
    onChange: (newValue) => setFieldValue(name, newValue),
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <FormControl>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <DatePicker
            {...config}
            renderInput={(params) => <TextField value={value} {...params} />}
          />
        </FormGroup>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DatePickerWrapper;
