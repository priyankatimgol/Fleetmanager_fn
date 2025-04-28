import { postDataApi, postFormData } from "apiServices/apiUtils";
import {
  LOGIN_STATUS,
  LOGIN_USER_DATA,
  LOADING_STATUS,
} from "types/actions/userInfoAction";
import { fetchError, showMessage, showWarning } from "./Common";
import { getMenuList } from "./MenuAction";
import moment from "moment";

export const setUserInfo = (payload: any) => ({
  type: LOGIN_USER_DATA,
  payload,
});

export const getLoginStatus = (payload: any) => ({
  type: LOGIN_STATUS,
  payload,
});

export const setLoading = (payload: boolean) => ({
  type: LOADING_STATUS,
  payload,
});

export const checkAdminLoginStatus = (data, history) => {
  return (dispatch) => {
    dispatch(setUserInfo({}));
    dispatch(setLoading(true));
    postDataApi(`${process.env.REACT_APP_LOGIN}/api/Login`, data)
      .then((response) => {
        if (response?.code === 200 && response?.status) {
          localStorage.setItem(
            "accessToken",
            response?.data?.authenticationToken
          );
          dispatch(showMessage(response?.message));
          dispatch(setUserInfo(response?.data));
          dispatch(setLoading(false));
          history("/kpis");
        } else {
          dispatch(fetchError(response?.message || "Error"));
          dispatch(setLoading(false));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error?.message || "Error"));
        dispatch(setLoading(false));
      });
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    // const stateData = getState()?.user?.userData;
    var data = JSON.parse(localStorage.getItem("UserEngagement"));
    const postdata = data?.map((item)=>{
      return{
        ...item,
        endDateTime : moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
        screenName : item?.screenName || null,
      };
    });
    await dispatch(UserEngagement(postdata));
    dispatch(setUserInfo(null));
    localStorage.clear();
    window.location.href = "/signin";
  };
};

export const UserEngagement = (data) => {
  return(dispatch)=>{
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/InsertUserEngagement`, data)
    .then((response) => {
      if (response?.code === 200 && response?.status) {
        // dispatch(showMessage(response?.message));
      } else {
        // dispatch(fetchError(response?.message || "Error"));
      }
    })
    .catch((error) => {
      dispatch(fetchError(error?.message || "Error"));
    });
  }
}
