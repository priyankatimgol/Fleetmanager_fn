import {CREATE_GRIDBREAKDOWN, GET_ALL_GRIDBREAKDOWN} from "../../../types/actions/LogbookActions/GridBreakdown";

const INIT_STATE = {
    gridListing: [],
};

const GridBreakdown = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ALL_GRIDBREAKDOWN: {
            return {
                ...state,
                gridListing: action?.payload?.data
            }
        };

        default:
            return state;
    }
};
export default GridBreakdown;
