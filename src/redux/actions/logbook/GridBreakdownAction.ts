
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_GRIDBREAKDOWN, CREATE_GRIDBREAKDOWN, UPDATE_GRIDBREAKDOWN} from "../../../types/actions/LogbookActions/GridBreakdown";
import { fetchError, showMessage } from "../Common";

export const setAddGridBreakdown = (payload: any) => ({
  type: CREATE_GRIDBREAKDOWN,
  payload,
});

export const setAllGridList = (payload: any) => ({
  type: GET_ALL_GRIDBREAKDOWN,
  payload,
  
});

export const setUpdateGrid = (payload: any) => ({
  type: UPDATE_GRIDBREAKDOWN,
  payload,
});

export const getAllGrids = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsGridBreakdown?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
        dispatch(setAllGridList(response))
        })
      .catch((error) => {
        console.log(error);
       
      });
  };
};

export const addNewGrid = (payload) => {  
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateGridBreakdown`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllGrids(payload));
          dispatch(showMessage(response?.message || "Added grid breakdown Details successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateGrid = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateGridBreakdown`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllGrids(payload));
          dispatch(
            showMessage(response?.message || "Updated grid breakdown successfully")
          );
          dispatch(setUpdateGrid({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteGrid = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteGridBreakdown?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllGrids(payload))
          dispatch(showMessage(response?.message || "Delete grid breakdown successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
