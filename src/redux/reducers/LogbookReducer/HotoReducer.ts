import {CREATE_HOTOS, GET_ALL_HOTOS} from "../../../types/actions/LogbookActions/HotoDetails";

const INIT_STATE = {
    hotoListing: [],
};

const HotoDetails = (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case GET_ALL_HOTOS: {
            return {
                ...state,
                hotoListing: action?.payload?.data
            }
        };

        default:
            return state;
    }
};
export default HotoDetails;
