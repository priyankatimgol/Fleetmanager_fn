import {GET_SEARCH_LOGBOOKDATA, DOWNLOAD_TO_PDF} from "../../../types/actions/LogbookActions/downloadView";

const INIT_STATE = {
    logbookDataListing: [],
         downloadToPdf: ""
};

const DownloadView = (
    state = INIT_STATE,
    action
) => {
    switch (action.type) {
        case GET_SEARCH_LOGBOOKDATA: {
            return {
                ...state,
                logbookDataListing: action?.payload
            }
        };
        case DOWNLOAD_TO_PDF: {
            return {
                ...state,
                downloadToPdf: action?.payload
            }
        };
        default:
            return state;
    }
};
export default DownloadView;