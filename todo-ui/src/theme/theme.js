import { createTheme } from "@mui/material/styles";

export const buildTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
      background: {
        default: mode === "light" ? "#f7f9fb" : "#0b0f14",
        paper: mode === "light" ? "#ffffff" : "#11161c",
      },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
      MuiTextField: { defaultProps: { size: "small" } },
      MuiCard: { styleOverrides: { root: { boxShadow: "0 6px 24px rgba(0,0,0,0.06)" } } },
    },
    typography: {
      fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
      h4: { fontWeight: 700 },
    },
  });