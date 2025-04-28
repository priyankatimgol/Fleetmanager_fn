import { SUBMITLOGBOOK, GETSUBMITSTATUS} from "types/actions/LogbookActions/SubmitButton";

const INIT_STATE = {
    submitLogbookStatus: [],
};

const  SubmitReducer= (
    state = INIT_STATE,
    action
) => {
    
    switch (action.type) {
        case GETSUBMITSTATUS: {
            return {
                ...state,
                submitLogbookStatus: action?.payload        
            }
        };
        default:
            return state;
    }
};
export default SubmitReducer;
