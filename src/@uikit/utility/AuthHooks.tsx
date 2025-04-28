// ForJWT Auth
import { getUserFromJwtAuth } from "./helper/AuthHelper";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";

export const useAuthUser = () => {
  const { userInfo } = useSelector<AppState, AppState["user"]>(
    ({ user }) => user
  );

  var authStatus = userInfo !== null;

  return {
    isAuthenticatedToken: authStatus,
    user: getUserFromJwtAuth(userInfo),
  };
};



