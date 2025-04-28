import React from "react";
import Logo from "../../../assets/images/logo.svg";
import { Box } from "@mui/material";

const MainLogo = () => {
  return (
    <Box>
      <img src={Logo} alt="logo" style={{width:"175px", marginLeft:'23%'}}/>
    </Box>
  );
};

export default MainLogo;
