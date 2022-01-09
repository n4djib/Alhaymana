import React from "react";

import frLocale from "date-fns/locale/fr";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useField, useFormikContext } from "formik";

import {
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

const DateTimePickerWrapper = ({
  name,
  label,
  legend,
  value,
  ...otherOptions
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const config = {
    // type: "date",
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...otherOptions,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <FormControl>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <DatePicker
            {...config}
            label={label}
            onChange={(newValue) => {
              setFieldValue(name, newValue);
            }}
            renderInput={(params) => (
              <TextField value={value} {...params} autoComplete="off" />
            )}
          />
        </FormGroup>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateTimePickerWrapper;
