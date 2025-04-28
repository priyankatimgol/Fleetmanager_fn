
import { getApiCall, postDataApi } from "../../../apiServices/apiUtils";
import {SHIFT_CYCLE_DROPDOWN, ROLE_DROPDOWN, TERBINE_DROPDOWN, ERROR_DROPDOWN,PASS_USAGE_DROPDOWN, 
  PASS_USAGEBY_DROPDOWN, ACTIVITY_DROPDOWN , FEEDER_DROPDOWN, GRID_REASON_DROPDOWN, ISSUE_DESC_DROPDOWN,
SHIFT_TAKEN_DROPDOWN, SHIFT_HANDED_DROPDOWN, WTGCLOSURE_DROPDOWN, CLOSURE_DROPDOWN, EMPCODE_DROPDOWN, 
GETMAINSITES, GETALLSTATES, GETALLAREAS, GETSITES, SCHEDULE_TURBINE, LOGBOOKCONFIG, BREAKDOWNCATEGORY, MANUALTURBINEDROP, TURBINEVALIDATION, SCHEDULEACTCARD, DROPDOWNLOADING} from "../../../types/actions/LogbookActions/DropdownMaster";
import { fetchError, showMessage } from "../Common";

export const setShiftCycleDrop = (payload: any) => ({
  type: SHIFT_CYCLE_DROPDOWN,
  payload,
});

export const setRoleDrop = (payload: any) => ({
  type: ROLE_DROPDOWN,
  payload,
});

export const setTerbineDrop = (payload: any) => ({
    type: TERBINE_DROPDOWN,
    payload
    
  });
  export const setScheduleTurbineDrop = (payload: any) => ({
    type:SCHEDULE_TURBINE,
    payload
  });


export const setErrorDrop = (payload: any) => ({
    type: ERROR_DROPDOWN,
    payload   
 });

 export const setPassUsageDrop = (payload: any) => ({
    type: PASS_USAGE_DROPDOWN,
    payload
    
  });

export const setPassUsageByDrop = (payload: any) => ({
    type: PASS_USAGEBY_DROPDOWN,
    payload   
 });

 export const setActivityDrop = (payload: any) => ({
    type: ACTIVITY_DROPDOWN,
    payload   
 });
 export const setFeederDrop = (payload: any) => ({
    type: FEEDER_DROPDOWN,
    payload   
 });
 export const setGridResonDrop = (payload: any) => ({
    type: GRID_REASON_DROPDOWN,
    payload   
 });
 export const setIssueDescDrop = (payload: any) => ({
  type: ISSUE_DESC_DROPDOWN,
  payload   
});
export const setShiftHandedDrop = (payload: any) => ({
  type: SHIFT_HANDED_DROPDOWN,
  payload   
});
export const setShiftTakenDrop = (payload: any) => ({
  type: SHIFT_TAKEN_DROPDOWN,
  payload   
});
export const setWTGClosureDrop = (payload: any) => ({
  type: WTGCLOSURE_DROPDOWN,
  payload   
});
export const setClosureDrop = (payload: any) => ({
  type: CLOSURE_DROPDOWN,
  payload   
});
export const setEmpData = (payload: any) => ({
  type: EMPCODE_DROPDOWN,
  payload   
});

export const setMainSites = (payload: any) => ({
  type: GETMAINSITES,
  payload   
});

export const setAllStates = (payload: any) => ({
  type: GETALLSTATES,
  payload   
});

export const setAllAreas = (payload: any) => ({
  type:GETALLAREAS,
  payload
})
export const setSites = (payload: any) => ({
  type:GETSITES,
  payload
})
export const setLogbookConfig = (payload:any) =>({
  type:LOGBOOKCONFIG,
  payload
})

export const setBreakdownCategeory = (payload:any) =>({
  type:BREAKDOWNCATEGORY,
  payload
})

export const setManualDrop = (payload:any) =>({
  type:MANUALTURBINEDROP,
  payload
})

export const setTurbineValidation = (payload:any) =>({
  type:TURBINEVALIDATION,
  payload
})

export const setScheduleActCard = (payload:any) =>({
  type:SCHEDULEACTCARD,
  payload
})

export const setDropdownLoading = (payload: any) => ({
  type:DROPDOWNLOADING,
  payload,
});

export const getAllShiftCycle = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=ShiftCycle`)
        .then((response) => {
          dispatch(setShiftCycleDrop(response?.data?.commonMasterLists));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  export const getAllRole = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=LogbookRole`)
        .then((response) => {
          dispatch(setRoleDrop(response?.data?.commonMasterLists));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

    export const getTurbineDrop = (siteName, date, shiftCycle,  wtgData?) => {
        return (dispatch) => {
          dispatch(setDropdownLoading(true))
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/WTGLogbook?siteName=${siteName}&LogDate=${date}&shiftCycle=${shiftCycle }`)
            .then((response) => {
              dispatch(setTerbineDrop(response?.data));
              dispatch(setTurbineValidation(response))
              setTimeout(() => dispatch(setDropdownLoading(false)), 500)
            })
            .catch((error) => {
              console.log(error);
              dispatch(setDropdownLoading(false))
            });
        };
      };

      export const getManualTurbineDrop = (siteName) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/ManualWTGLogbook?siteName=${siteName}`)
            .then((response) => {
             dispatch(setManualDrop(response?.data))
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getScheduleTerbine = (logDate, siteName) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/ScheduleLogbook?siteName=${siteName}&LogDate=${logDate}`)
            .then((response) => {
              dispatch(setScheduleTurbineDrop(response));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
    
      export const getErrorDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Error`)
            .then((response) => {
              dispatch(setErrorDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getPassUsageDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Password Usage`)
            .then((response) => {
              dispatch(setPassUsageDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
    
      export const getPassUsageByDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Password Usage By`)
            .then((response) => {
              dispatch(setPassUsageByDrop (response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getActivityDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Activity`)
            .then((response) => {
              dispatch(setActivityDrop (response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getFeederDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Feeder Number`)
            .then((response) => {
              dispatch(setFeederDrop (response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getGridResonDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Grid Drop Reason`)
            .then((response) => {
              dispatch(setGridResonDrop (response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getIssueDescDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Issue_Description`)
            .then((response) => {
               dispatch(setIssueDescDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getShiftHandedDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Shift_Handed_OverBy`)
            .then((response) => {
               dispatch(setShiftHandedDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getShiftTakenDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Shift_Taken_OverBy`)
            .then((response) => {
               dispatch(setShiftTakenDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getWTGClosureDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=wtgClosure`)
            .then((response) => {
               dispatch(setWTGClosureDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getBreakdownCatDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Breakdown%20Category`)
            .then((response) => {
               dispatch(setBreakdownCategeory(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
      export const getClosureDrop = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=Closure`)
            .then((response) => {
               dispatch(setClosureDrop(response?.data?.commonMasterLists));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getEmpCodeDrop = (empCode) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetEmployeeMaster?employeeCode=${empCode}`)
            .then((response) => { 
            dispatch(setEmpData(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getMainSites = (areaCode) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetSiteByAreaCode?areaCode=${areaCode}`)
            .then((response) => { 
            dispatch(setMainSites(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getAllState = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetScStateOmsPbi`)
            .then((response) => { 
            dispatch(setAllStates(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
      export const getAllAreas = (stateCode) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetAreaByStateCode?stateCode=${stateCode}`)
            .then((response) => { 
               dispatch(setAllAreas(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };
     
       export const getSites = () => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetMainSite`)
            .then((response) => { 
               dispatch(setSites(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const logbookConfiguration = (code) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetLogConfig?Code=${code}`)
            .then((response) => { 
              dispatch(setLogbookConfig(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };

      export const getScheduleActCard = (siteName, logDate, shiftCycle) => {
        return (dispatch) => {
          getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/ScheduleActCard?siteName=${siteName}&date=${logDate}&shiftCycle=${shiftCycle}`)
            .then((response) => { 
               dispatch(setScheduleActCard(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
        };
      };