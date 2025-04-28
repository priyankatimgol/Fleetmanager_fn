import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppContextProvider from "@uikit/utility/AppContextProvider";
import AppThemeProvider from "@uikit/utility/AppThemeProvider";
import AppStyleProvider from "@uikit/utility/AppStyleProvider";
import AppLayout from "@uikit/core/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { AppInfoView } from "@uikit";
import Loader from "@uikit/common/ApplicationLoader";

const App = () => {
  return (
    <AppContextProvider>
      <AppThemeProvider>
        <AppStyleProvider>
          <BrowserRouter>
            <CssBaseline />
            <Loader />
            <AppLayout />
            <AppInfoView />
          </BrowserRouter>
        </AppStyleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
};

export default App;
