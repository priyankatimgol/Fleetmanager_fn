import { Add_FORMDATA, SET_HISTORY_DATA, SET_MASTER_UPLOAD_DATA } from "redux/actions/MasterUpload";

const INIT_STATE = {
    dropdownData : [],
    isLoading : false,
    historyData : [], 
    formData : {}
};

const masterUploadReducer = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        
        case SET_MASTER_UPLOAD_DATA: {
            
            return {
                ...state,
                dropdownData: action?.payload,
                isLoading : true
            }
        }
        case SET_HISTORY_DATA: {
            
            return {
                ...state,
                historyData: action?.payload,
                isLoading : true
            }
        }
        case Add_FORMDATA: {
        console.log("action", action?.payload)
            return {
                ...state,
                formData: action?.payload,
            }
        }
        
        default:
            return state;
    }
};
export default masterUploadReducer;
