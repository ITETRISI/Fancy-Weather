import React from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        secondary: {
          main: '#32308d',
          contrastText: "#fff"
        },
        primary: {
          main: '#fdb927',
          contrastText: "#fff"
        },
      },
});


export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
};
