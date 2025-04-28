import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import RightSideForm from "./loginScreen";

const Signin = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <RightSideForm />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
