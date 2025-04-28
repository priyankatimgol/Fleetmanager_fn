import React from "react";
import { useThemeContext } from "../../../../utility/AppContextProvider/ThemeContextProvider";
import { alpha, Box } from "@mui/material";
import Logo from "../../../../../assets/images/logo_suzlon.png";

interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ color }) => {
  return (
    <img src={Logo} alt="logo" width={120} className="logo"/>
  );
};

export default AppLogo;
