import {CREATE_SCHEDULE, GET_ALL_SCHEDULE, LOADING } from "../../../types/actions/LogbookActions/ScheduleActivity";

const INIT_STATE = {
    scheduleListing: [],
};

const ScheduleActivity = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_ALL_SCHEDULE: {
            return {
                ...state,
                scheduleListing: action?.payload?.data
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
export default ScheduleActivity;
