import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = ({ open, onClose, message, slide, ...otherProps }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    onClose(false);
  };

  const config = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    severity: "success",
    direction: "up",
    autoHideDuration: 3000,
    ...otherProps,
  };

  //   const transition = (props) => (
  //     <Slide {...props} direction={config.direction} />
  //   );

  return (
    <div>
      {open ? (
        <Snackbar
          {...config}
          open={open}
          onClose={handleClose}
          //   TransitionComponent={transition}
        >
          <Alert onClose={handleClose} severity={config.severity}>
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default Snack;
