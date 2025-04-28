import { getApiCall } from "apiServices/apiUtils";
import {
  SLOW_MOVING_AND_NON_MOVING_CONFIG_DATA,
  SLOW_MOVING_AND_NON_MOVING_CONFIG_ERROR,
  SLOW_MOVING_AND_NON_MOVING_CONFIG_PENDING,
  SLOW_MOVING_AND_NON_MOVING_DATA,
  SLOW_MOVING_AND_NON_MOVING_ERROR,
  SLOW_MOVING_AND_NON_MOVING_PENDING,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_DATA,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_ERROR,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_PENDING,
} from "types/actions/Scm/SlowMAndNMoving";

export const setSlowMovingAndnonMovingData = (payload: any) => ({
  type: SLOW_MOVING_AND_NON_MOVING_DATA,
  payload,
});

export const slowMovingAndnonMovingError = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_ERROR,
});

export const slowMovingAndnonMovingPending = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_PENDING,
});

export const slowMovingAndnonMovingConfigData = (payload: any) => ({
  type: SLOW_MOVING_AND_NON_MOVING_CONFIG_DATA,
  payload,
});

export const slowMovingAndnonMovingConfigPending = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_CONFIG_PENDING,
});

export const slowMovingAndnonMovingConfigError = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_CONFIG_ERROR,
});

export const setSlowMovingAndNonMovingGraphData = (payload: any) => ({
  type: SLOW_MOVING_AND_NON_MOVING_GRAPH_DATA,
  payload,
});

export const slowMovingAndNonMovingGraphPending = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_GRAPH_PENDING,
});

export const slowMovingAndNonMovingGraphError = () => ({
  type: SLOW_MOVING_AND_NON_MOVING_GRAPH_ERROR,
});

export const getSlowMovingAndNonMovingData = () => {
  return (dispatch) => {
    dispatch(slowMovingAndnonMovingPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/getSlowMovingNonMoving?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setSlowMovingAndnonMovingData(resultParser));
        }
      })
      .catch((error) => {
        dispatch(slowMovingAndnonMovingError());
        console.log(error);
      });
  };
};

export const getSlowMovingAndNonMovingConfigData = () => {
  return (dispatch) => {
    dispatch(slowMovingAndnonMovingConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=SlowMovingNonMoving`
    )
      .then((response) => {
        dispatch(slowMovingAndnonMovingConfigData(response));
      })
      .catch((error) => {
        dispatch(slowMovingAndnonMovingConfigError());
        console.log(error);
      });
  };
};

export const getSlowMovingAndNonMovingGraphData = () => {
  return (dispatch) => {
    dispatch(slowMovingAndNonMovingGraphPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=SlowMovingNonMoving`
    )
      .then((response) => {
        dispatch(setSlowMovingAndNonMovingGraphData(response));
      })
      .catch((error) => {
        dispatch(slowMovingAndNonMovingGraphError());
        console.log(error);
      });
  };
};
