import { GET_ROLE_PERMISSION_ACCORDING_ID, GET_ROLE_PERMISSION_LISTING, SET_ROLE_PERMISSION_ACCORDING_LOADER } from "types/actions/rolePermission";

const INIT_STATE = {
    rolesPermissionListing: [],
    assignedPermitions: [],
    loader: false,
    
};

const RolePermission = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ROLE_PERMISSION_LISTING: {
            return {
                ...state,
                rolesPermissionListing: action?.payload
            }
        }
        case GET_ROLE_PERMISSION_ACCORDING_ID: {
            return {
                ...state,
                assignedPermitions: action?.payload
            }
        }
        case SET_ROLE_PERMISSION_ACCORDING_LOADER: {
            return {
                ...state,
                loader: action?.payload
            }
        }
        default:
            return state;
    }
};
export default RolePermission;
