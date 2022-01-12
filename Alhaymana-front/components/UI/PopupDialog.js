import React from "react";
import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function PopupDialog(props) {
  const { children, title, openPopup, onClose } = props;

  return (
    <div className="PopupDialog">
      {/* <Dialog open={openPopup} fullWidth maxWidth="md"> */}
      <Dialog open={openPopup} fullWidth maxWidth="lg">
        <h2 style={{ marginLeft: 25, marginBottom: 0 }}>{title}</h2>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Dialog>
    </div>
  );
}

export default PopupDialog;
