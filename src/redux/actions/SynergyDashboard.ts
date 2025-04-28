import { getApiCall } from "apiServices/apiUtils";
import { fetchError, showMessage } from "./Common";
import { GET_AREADROPDOWN, GET_BDHRSBYWEEKGRID, GET_BDHRSBYWHYGRAPH, GET_BDHRSBYWHYGRID, GET_HOURSBYWEEK, GET_HOURSBYWTG, GET_HRSBYWTGCOUNT, GET_SITEDROPDOWN, GET_STATEDROPDOWN, GET_SYNERGYDASH_LOADER, GET_TOPDISTINCTWTG } from "types/actions/SynergyDashboard";


export const setStateDropdown = (payload) => ({
    type: GET_STATEDROPDOWN,
    payload,
});

export const setAreaDropdown = (payload) => ({
    type: GET_AREADROPDOWN,
    payload,
});

export const setSiteDropdown = (payload) => ({
    type: GET_SITEDROPDOWN,
    payload,
});

export const setSynergyDashCompLoader = (payload, category) => ({
  type: GET_SYNERGYDASH_LOADER,
  payload,
  category
});

export const setHoursByWeek = (payload) => ({
  type: GET_HOURSBYWEEK,
  payload,
});

export const setHoursByWTG = (payload) => ({
  type: GET_HOURSBYWTG,
  payload,
});

export const setBDHrsByWeekGrid = (payload) => ({
  type: GET_BDHRSBYWEEKGRID,
  payload,
});

export const setBDHrsByWhyGraph = (payload) => ({
  type: GET_BDHRSBYWHYGRAPH,
  payload,
});

export const setBDHrsByWhyGrid = (payload) => ({
  type: GET_BDHRSBYWHYGRID,
  payload,
});

export const setHrsByDistinctWTGCount = (payload) => ({
  type: GET_HRSBYWTGCOUNT,
  payload,
});

export const setTopDistinctWTG = (payload) => ({
  type: GET_TOPDISTINCTWTG,
  payload,
});

export const getStateDropdown = () => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetStateByUser`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setStateDropdown(response?.data || []));
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getAreaDropdown = (states) => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAreaByUser?stateName=${states}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setAreaDropdown(response?.data || []));
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getSiteDropdown = (areas) => {
    return (dispatch) => {
      getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetSiteByUser?areaName=${areas}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setSiteDropdown(response?.data || []));
            }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  export const getHoursByWeek = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "hoursWeek"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWeek?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWeek?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setHoursByWeek(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "hoursWeek"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "hoursWeek"))
        });
    };
  };

  export const getBDHrsByWeekGrid = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "HrsByWeekGrid_loader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWeekGrid?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWeekGrid?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setBDHrsByWeekGrid(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "HrsByWeekGrid_loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "HrsByWeekGrid_loader"))
        });
    };
  };

  export const getBDHrsByWTG = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "hrsByWTGLoader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWTG?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWTG?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setHoursByWTG(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "hrsByWTGLoader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "hrsByWTGLoader"))
        });
    };
  };

  export const GetBDHrsByWhyGraph = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "HrsByWhyGraph_Loader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWhyGraph?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWhyGraph?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setBDHrsByWhyGraph(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "HrsByWhyGraph_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "HrsByWhyGraph_Loader"))
        });
    };
  };

  export const GetBDHrsByWhyGrid = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "HrsByWhyGrid_Loader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWhyGrid?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByWhyGrid?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setBDHrsByWhyGrid(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "HrsByWhyGrid_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "HrsByWhyGrid_Loader"))
        });
    };
  };

  export const GetBDHrsByDistinctWTGCount = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "HrsByDistinctWTGCount_Loader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByDistinctWTGCount?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByDistinctWTGCount?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setHrsByDistinctWTGCount(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "HrsByDistinctWTGCount_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "HrsByDistinctWTGCount_Loader"))
        });
    };
  };

  export const GetBDHrsByTopDistinctWTG = (data, type) => {
    return (dispatch) => {
      dispatch(setSynergyDashCompLoader(true, "TopDistinctWTG_Loader"))
      getApiCall( type !== "default" ? `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByTopDistinctWTG?year=${data.year}&whyReason=${data.why1234}&state=${data.state}&area=${data.area}&site=${data.site}&week=${data.week}`:`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetBDHrsByTopDistinctWTG?year=2024`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setTopDistinctWTG(response?.data || []));
                dispatch(setSynergyDashCompLoader(false, "TopDistinctWTG_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setSynergyDashCompLoader(false, "TopDistinctWTG_Loader"))
        });
    };
  };
