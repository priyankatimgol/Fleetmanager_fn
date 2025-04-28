
import { SUBMITLOGBOOK, GETSUBMITSTATUS } from "types/actions/LogbookActions/SubmitButton";
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { fetchError, showMessage } from "../Common";
import { getAllWTGs } from "./WTGAction";

export const setSubmitLogbook = (payload: any) => ({
  type: GETSUBMITSTATUS,
  payload,
});

export const logbookSubmit = (data) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/LogbookSubmitButton?ShiftCycle=${data?.shiftCycle}&SiteName=${data?.siteName}&LogDate=${data?.logDate}&status=${data?.status}&GridBreakdownNoActivity=${data?.gridNoActivity}&ScadaNoActivity=${data?.scadaNoActivity}`)
      .then((response) => {
        // dispatch(getAllWTGs({ logDate: payload[0]?.logDate, siteName: payload[0]?.siteName, shiftCycle: payload[0]?.shiftCycle }))
        dispatch(getSubmitStatus(data))
        if (response?.status) {           
            dispatch(showMessage(response?.message) );
          } else {
            dispatch(fetchError(response?.message || "Error"));
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSubmitStatus = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetLogbookSubmitStatus?ShiftCycle=${data?.shiftCycle}&SiteName=${data?.siteName}&LogDate=${data?.logDate}`)
      .then((response) => { 
        dispatch(setSubmitLogbook(response))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateWtgAPI = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/UpdateWTGBreakdownList`, payload)
      .then((response) => {
        if (response?.status) {  
          dispatch(getAllWTGs({ logDate: payload[0]?.logDate, siteName: payload[0]?.siteName, shiftCycle: payload[0]?.shiftCycle }))
            dispatch(showMessage(response?.message) );
          } else {
            dispatch(fetchError(response?.message || "Error"));
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};