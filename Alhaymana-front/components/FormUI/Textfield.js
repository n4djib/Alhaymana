import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const Textfield = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const config = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} autoComplete="off" fullWidth />;
};

export default Textfield;
