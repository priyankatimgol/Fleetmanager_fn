
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_SCADA, CREATE_SCADA, UPDATE_SCADA} from "../../../types/actions/LogbookActions/ScadaDetails";
import { fetchError, showMessage } from "../Common";

export const setAddScada = (payload: any) => ({
  type: CREATE_SCADA,
  payload,
});

export const setAllScadaList = (payload: any) => ({
  type: GET_ALL_SCADA,
  payload,
});

export const setUpdateScada = (payload: any) => ({
  type: UPDATE_SCADA,
  payload,
});

export const getAllScadas = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsScada?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => { 
       dispatch(setAllScadaList(response))
            })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNewScada = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateScada`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllScadas(payload))
          dispatch(showMessage(response?.message || "Added scada connectivity details successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateScada = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateScada`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllScadas(payload));
          dispatch(
            showMessage(response?.message || "Updated scada connectivity details successfully")
          );
          dispatch(setUpdateScada({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteScada = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteScada?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllScadas(payload))
          dispatch(showMessage(response?.message || "Delete scada connectivity details successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
