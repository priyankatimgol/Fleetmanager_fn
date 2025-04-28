
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_HOTOS, CREATE_HOTOS,UPDATE_HOTOS} from "../../../types/actions/LogbookActions/HotoDetails";
import { fetchError, showMessage } from "../Common";

export const setAddHoto = (payload: any) => ({
  type: CREATE_HOTOS,
  payload,
});

export const setAllHotoList = (payload: any) => ({
  type: GET_ALL_HOTOS,
  payload
  
});

export const setUpdateHoto = (payload: any) => ({
  type: UPDATE_HOTOS,
  payload
  
});

export const getAllHotos = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsHoto?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
       dispatch(setAllHotoList(response))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNewHoto = (payload) => {  
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateHOTO`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllHotos(payload))
          dispatch(showMessage(response?.message || "Added HOTO details successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateHoto = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateHOTO`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllHotos(payload));
          dispatch(
            showMessage(response?.message || "Updated schedule successfully")
          );
          dispatch(setUpdateHoto({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteHoto = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteHoto?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllHotos(payload))
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
