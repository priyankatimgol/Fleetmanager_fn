import React, { ReactNode } from "react";
import AppLoader from "@uikit/core/AppLoader";
import PropTypes from "prop-types";

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const isLoading  = true;
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
