
import moment from "moment";
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_SCHEDULE, CREATE_SCHEDULE, UPDATE_SCHEDULE, LOADING} from "../../../types/actions/LogbookActions/ScheduleActivity";
import { fetchError, showMessage } from "../Common";
import { getScheduleTerbine } from "./DropdownAction";

export const setAddSchedules = (payload: any) => ({
  type: CREATE_SCHEDULE,
  payload,
});

export const setAllScheduleList = (payload: any) => ({
  type: GET_ALL_SCHEDULE,
  payload,
});

export const setUpdateSchedule = (payload: any) => ({
  type: UPDATE_SCHEDULE,
  payload,
});

export const setLoading = (payload: any) => ({
  type:LOADING,
  payload,
});


export const getAllSchedules = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsScheduleMaintenance?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
       dispatch(setAllScheduleList(response))
       setTimeout(() => dispatch(setLoading(false)), 500) 
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false))
      });
  };
};

export const addNewSchedule = (payload) => {  
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateScheduleMnt`, payload)
      .then((response) => {
        if (response?.status) {
           dispatch(getAllSchedules(payload))
          dispatch(showMessage(response?.message || "Added schedule maintenance activity successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateSchedule = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateScheduleMnt`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllSchedules(payload));
          dispatch(
            showMessage(response?.message || "Updated schedule successfully")
          );
          dispatch(setUpdateSchedule({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteSchedule = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteScheduleMaintenance?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllSchedules(payload))
          dispatch(showMessage(response?.message || "Delete schedule successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
