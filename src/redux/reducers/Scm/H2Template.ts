 
import { DOWNLOAD_EXCEL,DOWNLOAD_EXCEL_ERROR,DOWNLOAD_EXCEL_SUCCESS } from "types/actions/Scm/H2template";

const INIT_STATE = {
    
         downloadLoading:null,
};

const DownloadH2Reducer = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case DOWNLOAD_EXCEL: {
            return {
                ...state,
                downloadLoading:true,
            }
        };
        case DOWNLOAD_EXCEL_SUCCESS: {
            return {
                ...state,
                downloadLoading:false,
            }
        };
        case DOWNLOAD_EXCEL_ERROR: {
            return {
                ...state,
                downloadLoading:false,
            }
        };
        default:
            return state;
    }
};
export default DownloadH2Reducer;