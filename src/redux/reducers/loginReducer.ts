import { SAVE_USER_INFO, SAVE_CURRENT_ROLE, LOGIN_STATUS, LOGIN_USER_DATA, LOADING_STATUS } from "types/actions/userInfoAction";

const INIT_STATE = {
    loading: false,
    userInfo: [],
    userRole: {},
    step:1,
    userData: {}
};

const userInfoReducer = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case SAVE_USER_INFO: {
            return {
                ...state,
                userInfo: action?.payload
            }
        }
        case SAVE_CURRENT_ROLE: {
            return {
                ...state,
                userRole: action?.payload

            }
        }
        case LOGIN_STATUS: {
            return {
                ...state,
                step: action?.payload
            }
        }
        case LOGIN_USER_DATA: {
            return {
                ...state,
                userData: action?.payload
            }
        }
        case LOADING_STATUS: {
            return {
                ...state,
                loading: action?.payload
            }
        }
        default:
            return state;
    }
};
export default userInfoReducer;
