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
  const INIT_STATE = {
    weeklyLUB: [],
    loader: false,
    weeklyLUBConfigData: [],

    SLweeklyLUB: [],
    SLloader: false,
    SLweeklyLUBConfigData: [],

    // pmGraphData: [],
    // pmGraphDataLoader: false,
    // categories: [],
  };

 const WeeklyLUB = (state = INIT_STATE, action) => {
    switch (action.type) {
        case WEEKLY_LUB_STATE_LEVEL_DATA: {
          return {
            ...state,
            SLweeklyLUB: action?.payload || [],
            SLloader: false,
          };
        }
    
        case WEEKLY_LUB_STATE_LEVEL_ERROR: {
          return {
            ...state,
            SLweeklyLUB: [],
            SLloader: false,
          };
        }
        case WEEKLY_LUB_STATE_LEVEL_PENDING: {
          return {
            ...state,
            SLweeklyLUB: [],
            SLloader: true,
          };
        }
    
        case WEEKLY_LUB_STATE_LEVEL_CONFIG_DATA: {
          return {
            ...state,
            SLweeklyLUBConfigData: action?.payload || [],
            SLloader: false,
          };
        }
    
        case WEEKLY_LUB_STATE_LEVEL_CONFIG_ERROR: {
          return {
            ...state,
            SLweeklyLUBConfigData: [],
            SLloader: false,
          };
        }
        case WEEKLY_LUB_STATE_LEVEL_CONFIG_PENDING: {
          return {
            ...state,
            SLweeklyLUBConfigData: [],
            SLloader: true,
          };
        }
 //IB level   
        case WEEKLY_LUB_IBLEVEL_DATA: {
          return {
            ...state,
            weeklyLUB: action?.payload || [],
            loader: false,
          };
        }
    
        case WEEKLY_LUB_IBLEVEL_ERROR: {
          return {
            ...state,
            weeklyLUB: [],
            loader: false,
          };
        }
        case WEEKLY_LUB_IBLEVEL_PENDING: {
          return {
            ...state,
            weeklyLUB: [],
            loader: true,
          };
        }
    
        case WEEKLY_LUB_IBLEVEL_CONFIG_DATA: {
          return {
            ...state,
            weeklyLUBConfigData: action?.payload || [],
            loader: false,
          };
        }
    
        case WEEKLY_LUB_IBLEVEL_CONFIG_ERROR: {
          return {
            ...state,
            weeklyLUBConfigData: [],
            loader: false,
          };
        }
        case WEEKLY_LUB_IBLEVEL_CONFIG_PENDING: {
          return {
            ...state,
            weeklyLUBConfigData: [],
            loader: true,
          };
        }
    default:
      return state;
  }
 };
 export default WeeklyLUB;