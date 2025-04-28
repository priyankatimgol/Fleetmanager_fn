import React, { useEffect } from "react";
import AppContentView from "@uikit/core/AppContentView";
import {
  useLayoutContext,
} from "../../utility/AppContextProvider/LayoutContextProvider";
import Layouts from "./Layouts";
import AuthWrapper from "./AuthWrapper";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";
const AppLayout = () => {
  const { navStyle } = useLayoutContext();
  const { pathname } = useLocation();

  const AppLayout = Layouts[navStyle];


  return (
    <>
      {pathname === '/signin' ? 
        <AuthWrapper>
          <AppContentView />
        </AuthWrapper> :<AppLayout />
        }
    </>
  );
};

export default React.memo(AppLayout);
