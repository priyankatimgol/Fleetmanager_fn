import { getApiCall } from "apiServices/apiUtils";
import {
  GET_BATTERY_THRESHOLD_DATA,
  GET_BATTERY_THRESHOLD_DATA_ERROR,
  GET_BATTERY_THRESHOLD_DATA_PENDING,
  BATTERY_THRESHOLD_CONFIG_DATA,
  BATTER_THRESHOLD_CONFIG_ERROR,
  BATTER_THRESHOLD_CONFIG_PENDING,
  BATTERY_THRESHOLD_GRAPH_DATA,
  BATTERY_THRESHOLD_GRAPH_ERROR,
  BATTERY_THRESHOLD_GRAPH_PENDING,
  GET_BATTERY_THRESHOLD_BOXES,
  GET_BATTERY_THRESHOLD_BOXES_ERROR,
  GET_BATTERY_THRESHOLD_BOXES_PENDING,
} from "types/actions/Scm/BatteryThreshold";

export const setBatterythresholdData = (payload: any) => ({
  type: GET_BATTERY_THRESHOLD_DATA,
  payload,
});

export const batteryThresholdDataError = () => ({
  type: GET_BATTERY_THRESHOLD_DATA_ERROR,
});

export const batteryThresholdDataPending = () => ({
  type: GET_BATTERY_THRESHOLD_DATA_PENDING,
});

export const batteryThresholdConfigData = (payload: any) => ({
  type: BATTERY_THRESHOLD_CONFIG_DATA,
  payload,
});

export const batteryThresholdConfigPending = () => ({
  type: BATTER_THRESHOLD_CONFIG_PENDING,
});

export const batteryThresholdConfigError = () => ({
  type: BATTER_THRESHOLD_CONFIG_ERROR,
});

export const setBatteryThresholdGraphData = (payload: any) => ({
  type: BATTERY_THRESHOLD_GRAPH_DATA,
  payload,
});

export const batteryThresholdGraphPending = () => ({
  type: BATTERY_THRESHOLD_GRAPH_PENDING,
});

export const batteryThresholdGraphError = () => ({
  type: BATTERY_THRESHOLD_GRAPH_ERROR,
});

export const setBatteryThresholdBoxes = (payload: any) => ({
  type: GET_BATTERY_THRESHOLD_BOXES,
  payload,
});

export const BatteryThresholdBoxesPending = () => ({
  type: GET_BATTERY_THRESHOLD_BOXES_PENDING,
});

export const BatteryThresholdBoxesError = () => ({
  type: GET_BATTERY_THRESHOLD_BOXES_ERROR,
});


export const getBatteryThresholdData = () => {
  return (dispatch) => {
    dispatch(batteryThresholdDataPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryThreashhold?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setBatterythresholdData(resultParser));
        }
      })
      .catch((error) => {
        dispatch(batteryThresholdDataPending());
        console.log(error);
      });
  };
};

export const getBatteryThresholdConfigData = () => {
  return (dispatch) => {
    dispatch(batteryThresholdConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=BatteryThreashold`
    )
      .then((response) => {
        dispatch(batteryThresholdConfigData(response));
      })
      .catch((error) => {
        dispatch(batteryThresholdConfigError());
        console.log(error);
      });
  };
};

export const getbatteryThresholdGraphData = () => {
  return (dispatch) => {
    dispatch(batteryThresholdGraphPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryThreashholdKpi?reportType=ThresholdGraph`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setBatteryThresholdGraphData(response));
        }
      })
      .catch((error) => {
        dispatch(batteryThresholdGraphError());
        console.log(error);
      });
  };
};

export const getBatteryThresholdBoxes = () => {
  return (dispatch) => {
    dispatch(BatteryThresholdBoxesPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryThreashholdKpi?reportType=KPIBoxes`
    )
      .then((response) => {
        const formattedData = response
          .map((item) =>
            Object.entries(item).map(([label, value]) => ({ label, value }))
          )
          .flat();
        dispatch(setBatteryThresholdBoxes(formattedData));
      })
      .catch((error) => {
        dispatch(BatteryThresholdBoxesError());
        console.log(error);
      });
  };
};
