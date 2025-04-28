import React from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import AppSuspense from "@uikit/core/AppSuspense";
import AppFooter from "../AppLayout/components/AppFooter";
import AppErrorBoundary from "../AppErrorBoundary";
import Box from "@mui/material/Box";
import AppContentViewWrapper from "./AppContentViewWrapper";
import { SxProps } from "@mui/system";
import { initialUrl } from "../../../shared/constants/AppConst";
import { routeConfigs } from "pages/Routes";
interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  const routes = useRoutes(routeConfigs);
  
  const isSignIn = () => {
    const currentRoute = routes.props.match.pathname;
    if (currentRoute === "/signin") {
      return 0;
    } else {
      return { xs: 5, md: 7.5, xl: 12.5 };
    }
  }

  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: isSignIn(),
          ...sxStyle,
      
        }}
        className="app-content pt-0"
      >
        <AppSuspense>
          <AppErrorBoundary>
            {routes}
            <Routes>
              <Route path="/" element={<Navigate to={initialUrl} />} />
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;
