import { getApiCall, postDataApi } from "apiServices/apiUtils";
import {
  HANDLE_LOADER,
  SET_ROLE_BY_GROUP,
  SET_USER_MASTER_LISTING,
} from "types/actions/UserMaster";
import { fetchError, showMessage } from "./Common";

export const setLoaderState = (payload: any) => ({
  type: HANDLE_LOADER,
  payload,
});

export const setRoleByGroup = (payload: any) => ({
  type: SET_ROLE_BY_GROUP,
  payload,
});

export const setUserMasterListing = (payload: any) => ({
  type: SET_USER_MASTER_LISTING,
  payload,
});

export const getUserMasterListing = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/GetGroupMasterList`)
      .then((response) => {
        dispatch(setUserMasterListing(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRoleByGroup = (groupname) => {
  return (dispatch) => {
    dispatch(setLoaderState(true));
    dispatch(setRoleByGroup([]));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/GetGroupDetailsByGroupCode?groupCode=${groupname}`)
      .then((response) => {
        dispatch(setRoleByGroup(response?.data));
        dispatch(setLoaderState(false));
      })
      .catch((error) => {
        dispatch(setLoaderState(false));
        console.log(error);
      });
  };
};

export const updateGroupMaster = (payload, grpCode) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/AddGroup?groupCode=${grpCode}`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getRoleByGroup(grpCode));
          dispatch(
            showMessage(response?.message || "Updated Group Master successfully")
          );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
