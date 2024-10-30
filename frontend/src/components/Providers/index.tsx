import { Provider } from "react-redux";

import { store } from "@/store/store";

import { ThemeProvider } from "@mui/material";

import { BrowserRouter } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { theme } from "@/styles/muiTheme";

import dayjs from "dayjs";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>{children}</BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
