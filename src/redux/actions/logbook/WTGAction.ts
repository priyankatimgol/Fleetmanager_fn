
import moment from "moment";
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_WTGBREAKDOWN, CREATE_WTGBREAKDOWN, UPDATE_WTGBREAKDOWN, LOADING} from "../../../types/actions/LogbookActions/WTGBreakdown";
import { fetchError, showMessage } from "../Common";
import { getTurbineDrop } from "./DropdownAction";
export const setAddWTG = (payload: any) => ({
  type: CREATE_WTGBREAKDOWN,
  payload,
});

export const setAllWTGList = (payload: any) => ({
  type: GET_ALL_WTGBREAKDOWN,
  payload,
  
});

export const setUpdateBreakdown = (payload: any) => ({
  type: UPDATE_WTGBREAKDOWN,
  payload,
  
});

export const setLoading = (payload: any) => ({
  type:LOADING,
  payload,
});


export const getAllWTGs = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsWtgBreakdown?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
       dispatch(setAllWTGList(response))
       setTimeout(() => dispatch(setLoading(false)), 500)
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false))
      });
  };
};

export const addNewWTG = (payload) => {  
  
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateWTGBreakdown`, payload)
      .then((response) => {
        dispatch(getAllWTGs(payload))
        //dispatch(getTurbineDrop(payload?.siteName, payload?.logDate, payload?.shiftCycle))
        if (response?.status) {
          dispatch(showMessage(response?.message || "Added WTG Breakdown Details successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateBreakDown = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateWTGBreakdown`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllWTGs(payload));
          //dispatch(getTurbineDrop(payload?.siteName, payload?.logDate, payload?.shiftCycle))
          dispatch(
            showMessage(response?.message || "Updated Breakdown successfully")
          );
          dispatch(setUpdateBreakdown({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteBreakDown = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteWtgBreakdown?id=${payload?.id}`)
      .then((response) => {
        dispatch(getAllWTGs(payload))
        //dispatch(getTurbineDrop(payload?.siteName, payload?.logDate, payload?.shiftCycle))
        if (response?.status) {
          dispatch(showMessage(response?.message || "Delete breakdown successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
