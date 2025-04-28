import { getApiCall, postDataApi } from '../../../../apiServices/apiUtils';
import {
  GET_KPI_BOXES,
  REQUEST_CALL,
  GET_CONSMPTION_BY_PLANT_YEAR,
  COMPARE_CONSUMPTION_QUANTITY,
  CONSUMPTION_AMOUNT_FOR_LAST_THREE,
  CONSUMPTION_AMOUNT_FOR_CURRENCY,
  TOP10_CONSUMPTION_VALUE,
  GET_CONSUMPTION,
  GET_COLUMN_CONFIG,
  GET_CONSUMPTION_QUARTER,
} from 'types/actions/Scm/TopFifty/index';

export const setKPI_Tiles = (payload: any) => ({
  type: GET_KPI_BOXES,
  payload: payload,
});

export const setTotalConsumptionForYear = (payload: any) => ({
  type: GET_CONSMPTION_BY_PLANT_YEAR,
  payload: payload,
});

export const setLoader = () => ({
  type: REQUEST_CALL,
});

export const setCompareConsumptionQuantity = (payload: any) => ({
  type: COMPARE_CONSUMPTION_QUANTITY,
  payload: payload,
});

export const setConsumptionAmountForLastThree = (payload: any) => ({
  type: CONSUMPTION_AMOUNT_FOR_LAST_THREE,
  payload: payload,
});

export const setConsumptionAmountForCurrentFy = (payload: any) => ({
  type: CONSUMPTION_AMOUNT_FOR_CURRENCY,
  payload: payload,
});

//

export const setTop10ConsumptionValue = (payload: any) => ({
  type: TOP10_CONSUMPTION_VALUE,
  payload: payload,
});

export const setConsumption = (payload: any) => ({
  type: GET_CONSUMPTION,
  payload: payload,
});

//setColumnConfigurations
export const setColumnConfigurations = (payload: any) => ({
  type: GET_COLUMN_CONFIG,
  payload: payload,
});

export const setConsumptionForQuarter = (payload: any) => ({
  type: GET_CONSUMPTION_QUARTER,
  payload: payload,
});
//Kpi boxes api for titles
export const getKPI_Tiles = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=KPIBoxes`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setKPI_Tiles(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//Total Consumption By State,plant For Year Begin
export const getTotalConsumptionForYear = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=TotalConsumptionForYear`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setTotalConsumptionForYear(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//This Year Consumption Quantity Vs Last Year By Month
export const getCompareConsumptionQuantity = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=CompareConsumptionQuantity`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setCompareConsumptionQuantity(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Consumption Amount For Last Three Year
export const getConsumptionAmountForLastThree = () => {
  //http://fleetmanager.mindnerves.com:10006/api/SCM/

  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=ConsumptionAmountForLastThree`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setConsumptionAmountForLastThree(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Consumption Amount For Current FY Year By State

export const getConsumptionAmountForCurrentFy = () => {
  //http://fleetmanager.mindnerves.com:10006/api/SCM/

  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=ConsumptionAmountForCurrentFy`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setConsumptionAmountForCurrentFy(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Top 10 Ytd Consumption Value By Material Descriptio
export const getTop10ConsumptionValue = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=Top10ConsumptionValue`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setTop10ConsumptionValue(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//http://fleetmanager.mindnerves.com:10006/api/SCM/GetColumnConfigurations?template=Consumption
//http://fleetmanager.mindnerves.com:10006/api/scm/
export const getConsumption = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/getTop50CriticalMaterial`,
    )
      .then((response) => {
        dispatch(getColumnConfigurations());
        let parseObject = JSON.parse(response.responseObject);
        let resultObj = parseObject.results;

        let result = JSON.parse(resultObj);
        dispatch(setConsumption(result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//GetColumnConfigurations?template=Consumption
export const getColumnConfigurations = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=Top50Consumption`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setColumnConfigurations(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

///http://fleetmanager.mindnerves.com:10006/api/SCM/
export const getConsumptionForQuarter = () => {
  return (dispatch) => {
    dispatch(setLoader());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getTop50CriticalMaterialKpi?reportType=TotalConsumptionForQuarter`,
    )
      .then((response) => {
        //     console.log('response',response)
        //   const parsedData = JSON.parse(response);
        dispatch(setConsumptionForQuarter(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
