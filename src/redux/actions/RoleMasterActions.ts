import { getApiCall, postDataApi } from "apiServices/apiUtils";
import {
  HANDLE_ROLE_MASTER_MODAL,
  SET_ROLE_LISTING,
  UPDATE_ROLE,
} from "types/actions/RoleMaster";
import { fetchError, showMessage } from "./Common";

export const setAddEditRoleMaster = (payload: any) => ({
  type: HANDLE_ROLE_MASTER_MODAL,
  payload,
});

export const setRoleMasterListing = (payload: any) => ({
  type: SET_ROLE_LISTING,
  payload,
});

export const updateRoleFor = (payload: any) => ({
  type: UPDATE_ROLE,
  payload,
});

export const getRoleListing = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/GetAllRoles`)
      .then((response) => {
        dispatch(setRoleMasterListing(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRoleListingById = (id) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/GetRoleById/${id}`)
      .then((response) => {
        dispatch(updateRoleFor(response?.data));
        dispatch(setAddEditRoleMaster(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNewRole = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/AddRole`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getRoleListing());
          dispatch(
            showMessage(response?.message || "Added the new role successfully")
          );
          dispatch(setAddEditRoleMaster(false));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editRoleMaster = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/UpdateRole`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getRoleListing());
          dispatch(
            showMessage(response?.message || "Updated role successfully")
          );
          dispatch(setAddEditRoleMaster(false));
          dispatch(updateRoleFor({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
