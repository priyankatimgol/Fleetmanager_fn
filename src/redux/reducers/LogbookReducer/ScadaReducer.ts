import {CREATE_SCADA, GET_ALL_SCADA } from "../../../types/actions/LogbookActions/ScadaDetails";

const INIT_STATE = {
    scadaListing: [],
};

const ScadaDetails = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ALL_SCADA: {
            return {
                ...state,
                scadaListing: action?.payload?.data
            }
        };
        default:
            return state;
    }
};
export default ScadaDetails;
