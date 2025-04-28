import { getApiCall } from "apiServices/apiUtils";
import {
    WEEKLY_LUB_IBLEVEL_DATA,
    WEEKLY_LUB_IBLEVEL_PENDING,
    WEEKLY_LUB_IBLEVEL_ERROR,
    WEEKLY_LUB_IBLEVEL_CONFIG_DATA,
    WEEKLY_LUB_IBLEVEL_CONFIG_PENDING,
    WEEKLY_LUB_IBLEVEL_CONFIG_ERROR,

    WEEKLY_LUB_STATE_LEVEL_DATA,
    WEEKLY_LUB_STATE_LEVEL_PENDING,
    WEEKLY_LUB_STATE_LEVEL_ERROR,
    WEEKLY_LUB_STATE_LEVEL_CONFIG_DATA,
    WEEKLY_LUB_STATE_LEVEL_CONFIG_PENDING,
    WEEKLY_LUB_STATE_LEVEL_CONFIG_ERROR,

  } from "types/actions/Scm/WeeklyLUB";

  export const setWeeklyLUB_IBLevelData = (payload: any) => ({
    type: WEEKLY_LUB_IBLEVEL_DATA,
    payload,
  });
  
  export const WeeklyLUB_IBLevelPending = () => ({
    type:  WEEKLY_LUB_IBLEVEL_PENDING,
  });
  
  export const WeeklyLUB_IBLevelError = () => ({
    type: WEEKLY_LUB_IBLEVEL_ERROR,
  });
  

  export const setWeeklyLUB_IBLevelConfigData = (payload: any) => ({
    type: WEEKLY_LUB_IBLEVEL_CONFIG_DATA,
    payload,
  });
  
  export const WeeklyLUB_IBLevelConfigPending = () => ({
    type:  WEEKLY_LUB_IBLEVEL_CONFIG_PENDING,
  });
  
  export const WeeklyLUB_IBLevelConfigError = () => ({
    type: WEEKLY_LUB_IBLEVEL_CONFIG_ERROR,
  });
 // FOR STATELEVEL

 
  export const setWeeklyLUB_StateLevelData = (payload: any) => ({
    type: WEEKLY_LUB_STATE_LEVEL_DATA,
    payload,
  });
  
  export const WeeklyLUB_StateLevelPending = () => ({
    type:  WEEKLY_LUB_STATE_LEVEL_PENDING,
  });
  
  export const WeeklyLUB_StateLevelError = () => ({
    type: WEEKLY_LUB_STATE_LEVEL_ERROR,
  });
  

  export const setWeeklyLUB_StateLevelConfigData = (payload: any) => ({
    type: WEEKLY_LUB_STATE_LEVEL_CONFIG_DATA,
    payload,
  });
  
  export const WeeklyLUB_StateLevelConfigPending = () => ({
    type:  WEEKLY_LUB_STATE_LEVEL_CONFIG_PENDING,
  });
  
  export const WeeklyLUB_StateLevelConfigError = () => ({
    type: WEEKLY_LUB_STATE_LEVEL_CONFIG_ERROR,
  });

//for State Level
  export const getWeeklyLUB_StateLevelData = () => {
    return (dispatch) => {
      dispatch(WeeklyLUB_StateLevelPending());
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/scm/getWeeklyLUBStateLevel?pageNumber=1&pageSize=1000&JsonOutput=true`
      )
        .then((response) => {
          if (response?.responseCode === 200) {
            let parserObj = JSON.parse(response?.responseObject);
            let resultParser = JSON.parse(parserObj.results);
            dispatch(setWeeklyLUB_StateLevelData(resultParser));
          }
        })
        .catch((error) => {
          dispatch(WeeklyLUB_StateLevelConfigError());
          console.log(error);
        });
    };
  };
  
  export const getWeeklyLUB_StateLevelConfigData = () => {
    return (dispatch) => {
      dispatch(WeeklyLUB_StateLevelConfigPending());
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=WeeklyLUB_StateLevel`
      )
        .then((response) => {
          dispatch(setWeeklyLUB_StateLevelConfigData(response));
        })
        .catch((error) => {
          dispatch(WeeklyLUB_StateLevelConfigError());
          console.log(error);
        });
    };
  };
  







  export const getWeeklyLUB_IBLevelData = () => {
    return (dispatch) => {
      dispatch(WeeklyLUB_IBLevelPending());
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/SCM/getWeeklyLUBIBLevel?pageNumber=1&pageSize=1000&JsonOutput=true`
      )
        .then((response) => {
          if (response?.responseCode === 200) {
            let parserObj = JSON.parse(response?.responseObject);
            let resultParser = JSON.parse(parserObj.results);
            dispatch(setWeeklyLUB_IBLevelData(resultParser));
          }
        })
        .catch((error) => {
          dispatch(WeeklyLUB_IBLevelError());
          console.log(error);
        });
    };
  };
  
  export const getWeeklyLUB_IBLevelConfigData = () => {
    return (dispatch) => {
      dispatch(WeeklyLUB_IBLevelConfigPending());
      getApiCall(
        `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=WeeklyLUB_IB_Level`
      )
        .then((response) => {
          dispatch(setWeeklyLUB_IBLevelConfigData(response));
        })
        .catch((error) => {
          dispatch(WeeklyLUB_IBLevelConfigError());
          console.log(error);
        });
    };
  };
  