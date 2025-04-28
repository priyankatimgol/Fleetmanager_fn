
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import {
  GET_ALL_EMPLOYEES,
  CREATE_EMPLOYEES,
  UPDATE_EMPLOYEE,
  SELECTEDEMP
} from "../../../types/actions/LogbookActions/EmployeeDetails";
import { fetchError, showMessage } from "../Common";

export const setAddEmployees = (payload: any) => ({
  type: CREATE_EMPLOYEES,
  payload,
});

export const setAllEmployeeList = (payload: any) => ({
  type: GET_ALL_EMPLOYEES,
  payload,
  
});

export const setUpdateEmployee = (payload: any) => ({
  type: UPDATE_EMPLOYEE,
  payload,
});

export const setSelctedEmp = (payload:any) =>({
  type:SELECTEDEMP,
  payload
})

export const getAllEmployees = (data) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetDetailsEmployee?logDate=${data?.logDate}&shiftCycle=${data?.shiftCycle}&siteName=${data?.siteName}`)
      .then((response) => {
        dispatch(setAllEmployeeList(response))     
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNewEmployees = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateEmployeeDetails`, payload)
      .then((response) => {
        if (response?.status) {
           dispatch(getAllEmployees(payload))
          dispatch(showMessage(response?.message || "Added the new employee successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateEmployee = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateEmployeeDetails`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllEmployees(payload));
          dispatch(
            showMessage(response?.message || "Updated employee successfully")
          );
          dispatch(setUpdateEmployee({}));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteEmployee = (payload) => { 
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/DeleteEmployee?id=${payload?.id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(getAllEmployees(payload))
          dispatch(showMessage(response?.message || "Delete employee successfully") );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
