import {CREATE_WTGBREAKDOWN, GET_ALL_WTGBREAKDOWN, LOADING } from "../../../types/actions/LogbookActions/WTGBreakdown";

const INIT_STATE = {
    wtgListing: [],
};

const wtgBreakdown = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ALL_WTGBREAKDOWN: {
            return {
                ...state,
                wtgListing: action?.payload?.data
            }
        };
        case LOADING: {
            return {
                ...state,
                loading:action?.payload
            }
        };
        default:
            return state;
    }
};
export default wtgBreakdown;
