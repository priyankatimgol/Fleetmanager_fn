import { HANDLE_ROLE_MASTER_MODAL, SET_ROLE_LISTING, UPDATE_ROLE } from "types/actions/RoleMaster";

const INIT_STATE = {
    modalOpen: false,
    rolesListing: [],
    editRole:{},
};

const RoleMaster = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case HANDLE_ROLE_MASTER_MODAL: {
            return {
                ...state,
                modalOpen: action?.payload
            }
        }
        case SET_ROLE_LISTING: {
            return {
                ...state,
                rolesListing: action?.payload
            }
        }
        case UPDATE_ROLE: {
            return {
                ...state,
                editRole: action?.payload
            }
        }
        default:
            return state;
    }
};
export default RoleMaster;
