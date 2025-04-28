
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import { GET_ALL_REMARK, CREATE_REMARK, UPDATE_REMARK} from "../../../types/actions/LogbookActions/Remark";
import { fetchError, showMessage } from "../Common";

export const setAddRemark = (payload: any) => ({
  type: CREATE_REMARK,
  payload,
});

export const setAllRemarkList = (payload: any) => ({
  type: GET_ALL_REMARK,
  payload,
});

export const setUpdateRemark = (payload: any) => ({
  type: UPDATE_REMARK,
  payload,
});

export const getAllRemarks = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetRemarks?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => { 
       dispatch(setAllRemarkList(response))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNewRemark = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateRemarks`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllRemarks(payload))
          dispatch(showMessage(response?.message || "Added Remarks successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateRemark = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateRemarks`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllRemarks(payload));
          dispatch(
            showMessage(response?.message || "Updated scada connectivity details successfully")
          );
          dispatch(setUpdateRemark({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteRemark = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteRemarks?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllRemarks(payload))
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
