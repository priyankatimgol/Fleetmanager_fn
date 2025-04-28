import { getApiCall, postDataApi } from "apiServices/apiUtils";
import { fetchError, showMessage } from "./Common";
import {
  GET_ROLE_PERMISSION_ACCORDING_ID,
  GET_ROLE_PERMISSION_LISTING,
  SET_ROLE_PERMISSION_ACCORDING_LOADER,
} from "types/actions/rolePermission";

export const setRolesPermissionListing = (payload: any) => ({
  type: GET_ROLE_PERMISSION_LISTING,
  payload,
});

export const setRolePermissionAccordId = (payload: any) => ({
  type: GET_ROLE_PERMISSION_ACCORDING_ID,
  payload,
});

export const setLoaderState = (payload: any) => ({
  type: SET_ROLE_PERMISSION_ACCORDING_LOADER,
  payload,
});

export const getRolePermissionListing = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/GetAllRoles`)
      .then((response) => {
        dispatch(setRolesPermissionListing(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRolePermissionWithId = (id) => {
  return (dispatch) => {
    dispatch(setRolePermissionAccordId([]));
    dispatch(setLoaderState(true));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Permission/GetPermissionByRole/${id}`)
      .then((response) => {
        if (response?.status && response?.code === 200) {
          dispatch(setRolePermissionAccordId(response?.data));
          dispatch(setLoaderState(false));
        } else {
          dispatch(setLoaderState(false));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRolePermissionUpdate = (Id) => {
  return (dispatch, getState) => {
    const data = getState()?.rolePermission?.assignedPermitions;
    const objPayload =
      data &&
      data.length > 0 &&
      data.map((i) => {
        return {
          fkRoleId: Id,
          fkPermissionId: i.id,
          status: i.status,
        };
      });
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Permission/Update_Role_Permission_Mapping`, objPayload)
      .then((response) => {
        if (response.status && response.code === 200) {
          //dispatch(getRolePermissionWithId(Id));
          dispatch(
            showMessage(response?.message || "Added the new role successfully")
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// export const addNewRole = (payload) => {
//   return (dispatch) => {
//     postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/AddRole`, payload)
//       .then((response) => {
//         if (response?.status) {
//           dispatch(getRoleListing());
//           dispatch(
//             showMessage(response?.message || "Added the new role successfully")
//           );
//           dispatch(setAddEditRoleMaster(false));
//         } else {
//           dispatch(fetchError(response?.message || "Error"));
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

// export const editRoleMaster = (payload) => {
//   return (dispatch) => {
//     postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/UpdateRole`, payload)
//       .then((response) => {
//         if (response?.status) {
//           dispatch(getRoleListing());
//           dispatch(
//             showMessage(response?.message || "Updated role successfully")
//           );
//           dispatch(setAddEditRoleMaster(false));
//           dispatch(updateRoleFor({}));
//         } else {
//           dispatch(fetchError(response?.message || "Error"));
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };
