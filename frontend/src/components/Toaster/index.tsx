import React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Alert, Snackbar } from "@mui/material";
import { showToaster } from "@/store/features/toaster/module";

const Toaster = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.toaster);
  const { isVisible, message, severity, position } = toast;

  if (!isVisible || !severity) {
    return null;
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(showToaster(false));
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={7000}
      onClose={handleClose}
      anchorOrigin={position ? position : { vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
