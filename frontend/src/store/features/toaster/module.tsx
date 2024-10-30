import { statusToString } from "@/hooks/helperFunctions";
import { SnackbarOrigin } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type toasterProps = {
  toaster: ToasterOptionProps;
};

type ToasterOptionProps = {
  isVisible: boolean;
  message: string;
  severity: ToasterSeverity;
  position?: SnackbarOrigin;
};

const initialState: toasterProps = {
  toaster: {
    isVisible: false,
    message: "",
    severity: "info",
    position: undefined
  }
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    showToaster: (state, action: PayloadAction<ToasterOptionPayload | false>) => {
      if (action.payload === false) {
        state.toaster = initialState.toaster;
      } else {
        state.toaster = {
          isVisible: true,
          message: action.payload.message,
          severity: action.payload.severity ?? "info",
          position: action.payload.position
        };
      }
    }
  },
  extraReducers: () => {}
});

export const { showToaster } = toasterSlice.actions;

export default toasterSlice.reducer;

export type ToasterSeverity = "info" | "error" | "warning" | "success";

type ToasterOptionPayload = {
  message: string;
  severity: ToasterSeverity;
  position?: SnackbarOrigin;
};
