import { getApiCall } from "apiServices/apiUtils";
import {
  GET_CONSTUMTION_VS_RETURN_ERROR,
  GET_CONSTUMTION_VS_RETURN_PENDING,
  GET_ACTUAL_CONSTUMTION_VS_RETURN_DATA_FOR_PLANT,
  COSUMPTION_VS_RETURN_GRAPH_DATA,
  COSUMPTION_VS_RETURN_GRAPH_ERROR,
  COSUMPTION_VS_RETURN_GRAPH_PENDING,
  GET_ACTUAL_CONSTUMTION_VS_RETURN_CONFIG_DATA,
  GET_CONSUMPTION_VS_RETURN_BOXES,
  GET_CONSUMPTION_VS_RETURN_BOXES_ERROR,
  GET_CONSUMPTION_VS_RETURN_BOXES_PENDING,
} from "types/actions/Scm/ConsumptionVsReturn";

export const setBatteryConsumptionVsReturnDataForPlant = (payload: any) => ({
  type: GET_ACTUAL_CONSTUMTION_VS_RETURN_DATA_FOR_PLANT,
  payload,
});

export const batteryConsumptionVsReturnDataPending = () => ({
  type: GET_CONSTUMTION_VS_RETURN_PENDING,
});

export const batteryConsumptionVsReturnDataError = () => ({
  type: GET_CONSTUMTION_VS_RETURN_ERROR,
});

export const setBatteryConsumptionVsReturnGraphData = (payload: any) => ({
  type: COSUMPTION_VS_RETURN_GRAPH_DATA,
  payload,
});

export const batteryConsumptionVsReturnGraphPending = () => ({
  type: COSUMPTION_VS_RETURN_GRAPH_PENDING,
});

export const batteryConsumptionVsReturnGraphError = () => ({
  type: COSUMPTION_VS_RETURN_GRAPH_ERROR,
});

export const setBatteryConsumptionVsReturnConfigData = (payload: any) => ({
  type: GET_ACTUAL_CONSTUMTION_VS_RETURN_CONFIG_DATA,
  payload,
});

export const setBatteryConsumptionVsReturnBoxes = (payload: any) => ({
  type: GET_CONSUMPTION_VS_RETURN_BOXES,
  payload,
});

export const batteryConsumptionVsReturnBoxesPending = () => ({
  type: GET_CONSUMPTION_VS_RETURN_BOXES_PENDING,
});

export const batteryConsumptionVsReturnBoxesError = () => ({
  type: GET_CONSUMPTION_VS_RETURN_BOXES_ERROR,
});

export const getBatteryConsumptionVsReturnData = () => {
  return (dispatch) => {
    dispatch(batteryConsumptionVsReturnDataPending());
    dispatch(batteryConsumptionVsReturnGraphPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryConsumptionVsReturn?reportType=plant&pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setBatteryConsumptionVsReturnDataForPlant(resultParser));
        }
      })
      .catch((error) => {
        dispatch(batteryConsumptionVsReturnDataError());
        dispatch(batteryConsumptionVsReturnGraphError());
        console.log(error);
      });
  };
};

export const getBatteryConsumptionVsReturnGraphData = () => {
  return (dispatch) => {
    dispatch(batteryConsumptionVsReturnGraphPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryConsumptionVsReturnKpi?reportType=ConsumptionVsRetunGraph`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setBatteryConsumptionVsReturnGraphData(response));
        }
      })
      .catch((error) => {
        dispatch(batteryConsumptionVsReturnGraphError());
        console.log(error);
      });
  };
};

export const getBatteryConsumptionVsReturnConfigData = () => {
  return (dispatch) => {
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=BatteryConsumptionVsReturn`
    )
      .then((response) => {
        dispatch(setBatteryConsumptionVsReturnConfigData(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBatteryConsumptionVsReturnBoxes = () => {
  return (dispatch) => {
    dispatch(batteryConsumptionVsReturnBoxesPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getBatteryConsumptionVsReturnKpi?reportType=KPIBoxes`
    )
      .then((response) => {
        const formattedData = response
          .map((item) =>
            Object.entries(item).map(([label, value]) => ({ label, value }))
          )
          .flat();
        dispatch(setBatteryConsumptionVsReturnBoxes(formattedData));
      })
      .catch((error) => {
        dispatch(batteryConsumptionVsReturnBoxesError());
        console.log(error);
      });
  };
};
