import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";
// import InputAdornment from "@mui/material/InputAdornment";
// import AccountCircle from "@mui/icons-material/AccountCircle";

const Select = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    setFieldValue(name, evt.target.value);
  };

  const config = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    // fullWidth: true,
    onChange: handleChange,
    // width: 245,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <div>
      <TextField {...config}>
        {Object.keys(options).map((item, pos) => (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default Select;
