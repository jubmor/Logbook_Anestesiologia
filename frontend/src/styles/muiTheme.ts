import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4fd1c5",
      "100": "#43b2a7"
    },
    background: {
      default: "#f4f6f8"
    },
    text: {
      primary: "#262626",
      secondary: "#666666"
    }
  },
  typography: {
    fontFamily: "Urbanist, sans-serif",
    fontSize: 15
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          display: "none"
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          padding: "15.5px 14px",
          borderRadius: "24px",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          "&.Mui-focused": {
            borderColor: "#4fd1c5"
          },
          "&:hover": {
            borderColor: "#4fd1c5"
          }
        },
        root: {
          borderRadius: "24px",
          backgroundColor: "#f4f6f8",
          "&:before": {
            borderBottom: "none"
          },
          "&:after": {
            borderBottom: "none"
          },
          "&:hover:before": {
            borderBottom: "none"
          },
          "&.Mui-focused": {
            borderColor: "#4fd1c5"
          }
        },
        underline: {
          "&:before": {
            borderBottom: "none"
          },
          "&:after": {
            borderBottom: "none"
          }
        },
        hiddenLabel: true
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px 14px",
          borderRadius: "24px"
        },
        root: {
          borderRadius: "4px",
          background: "white"
        },
        notchedOutline: {
          border: "1px solid rgba(0, 0, 0, 0.23)",
          "&:hover": {
            borderColor: "#4fd1c5" // Change hover color for outlined input
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4fd1c5" // Change border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4fd1c5" // Change border color on focus
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: "4px",
          width: "100%",
          height: "44.64px",
          textTransform: "none",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: 0.5
        },
        contained: {
          background: "#4fd1c5",
          "&:hover": {
            background: "#43b2a7"
          }
        },
        outlined: {
          color: "#4fd1c5",
          border: "2px solid #4fd1c5",
          "&:hover": {
            color: "#43b2a7",
            border: "2px solid #43b2a7"
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 20,
          overflowX: "hidden",
          transition: "width 0.3s"
        }
      }
    }
  }
});
