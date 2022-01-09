import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AccountBox from "@mui/icons-material/AccountBox";
// import ImageIcon from '@mui/icons-material/Image'

import { getThumbnail } from "../../utils/urls";

const FileUploader = ({ legend, handleChange, image, ...otherOptions }) => {
  const [file, setFile] = useState(null);

  const internalHandleChange = (event) => {
    handleChange(event);
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    if (image !== null) {
      setFile(getThumbnail(image));
    }
  }, []);

  // console.log("image:", image);
  // console.log("file:", file);

  const config = {
    variant: "outlined",
    ...otherOptions,
    onChange: internalHandleChange,
  };

  return (
    <label htmlFor="icon-button-file">
      <input
        {...config}
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
      />
      <Icon color="primary" aria-label="upload picture" component="span">
        <AccountBox variant={config.variant} fontSize="medium" />
        {legend}
      </Icon>
      <img src={file} style={{ maxWidth: 250 }} />
    </label>
  );
};

const Icon = ({ children, ...otherProps }) => {
  return (
    <div>
      <IconButton {...otherProps}>{children}</IconButton>
    </div>
  );
};

export default FileUploader;
