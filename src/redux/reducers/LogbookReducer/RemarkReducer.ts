import {GET_ALL_REMARK} from "../../../types/actions/LogbookActions/Remark";

const INIT_STATE = {
    remarkListing: [],
};

const RemarkReducer = (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case GET_ALL_REMARK: {
            return {
                ...state,
                remarkListing: action?.payload?.data
            }
        };
        default:
            return state;
    }
};
export default RemarkReducer;
