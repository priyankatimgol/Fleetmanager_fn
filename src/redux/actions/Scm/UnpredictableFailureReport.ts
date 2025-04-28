import { getApiCall } from "apiServices/apiUtils";
import {
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_BOXES,
  GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_PENDING,
} from "types/actions/Scm/UnpredictableFailureReport";

export const setUnpredictableFailureReportData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_DATA,
  payload,
});

export const unpredictableFailureReportError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_DATA_ERROR,
});

export const unpredictableFailureReportPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_DATA_PENDING,
});

export const setUnpredictableFailureReportConfigData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA,
  payload,
});

export const unpredictableFailureReportConfigError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_ERROR,
});

export const unpredictableFailureReportConfigPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_PENDING,
});

export const setUnpredictableFailureReportBoxesData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_BOXES,
  payload,
});

export const unpredictableFailureReportBoxesError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_ERROR,
});

export const unpredictableFailureReportBoxesPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_PENDING,
});

export const setUnpredictableFailureReportCompareQuantityData = (
  payload: any
) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA,
  payload,
});

export const unpredictableFailureReportCompareQuantityError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_ERROR,
});

export const unpredictableFailureReportCompareQuantityPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_PENDING,
});

export const setUnpredictableFailureReportCurrentFyData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA,
  payload,
});

export const unpredictableFailureReportCurrentFyError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_ERROR,
});

export const unpredictableFailureReportCurrentFyPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_PENDING,
});

export const setUnpredictableFailureReportLastThreeData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA,
  payload,
});

export const unpredictableFailureReportLastThreeError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_ERROR,
});

export const unpredictableFailureReportLastThreePending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_PENDING,
});

export const setUnpredictableFailureReportQuaterlyData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA,
  payload,
});

export const unpredictableFailureReportQuaterlyError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_ERROR,
});

export const unpredictableFailureReportQuaterlyPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_PENDING,
});

export const setUnpredictableFailureReportTotalYearsData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA,
  payload,
});

export const unpredictableFailureReportTotalYearsError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_ERROR,
});

export const unpredictableFailureReportTotalYearsPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_PENDING,
});

export const setUnpredictableFailureReportTopValuesData = (payload: any) => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA,
  payload,
});

export const unpredictableFailureReportTopValuesError = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_ERROR,
});

export const unpredictableFailureReportTopValuesPending = () => ({
  type: GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_PENDING,
});

export const getUnpredictableFailureReportData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReports?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setUnpredictableFailureReportData(resultParser));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportConfigData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=UnpredictableFailure`
    )
      .then((response) => {
        dispatch(setUnpredictableFailureReportConfigData(response));
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportConfigError());
        console.log(error);
      });
  };
};

export const getBatteryConsumptionVsReturnBoxes = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportBoxesPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=KPIBoxes`
    )
      .then((response) => {
        // const formattedData = response
        //   .map((item) =>
        //     Object.entries(item).map(([label, value]) => ({ label, value }))
        //   )
        //   .flat();
        dispatch(setUnpredictableFailureReportBoxesData(response));
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportBoxesError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportTotalYearsData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportTotalYearsPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=TotalConsumptionForYear`
    )
      .then((response) => {
        if (response) {
          dispatch(setUnpredictableFailureReportTotalYearsData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportTotalYearsError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportQuaterlyData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportQuaterlyPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=TotalConsumptionForQuarter`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setUnpredictableFailureReportQuaterlyData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportQuaterlyError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportLastThreeData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportLastThreePending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=ConsumptionAmountForLastThree`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setUnpredictableFailureReportLastThreeData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportLastThreeError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportCurrentFyData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportCurrentFyPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=ConsumptionAmountForCurrentFy`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setUnpredictableFailureReportCurrentFyData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportCurrentFyError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportCompareQuantityData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportCompareQuantityPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=CompareConsumptionQuantity`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setUnpredictableFailureReportCompareQuantityData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportCompareQuantityError());
        console.log(error);
      });
  };
};

export const getUnpredictableFailureReportTopValuesData = () => {
  return (dispatch) => {
    dispatch(unpredictableFailureReportTopValuesPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReportsKpi?reportType=Top10ConsumptionValue`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setUnpredictableFailureReportTopValuesData(response));
        }
      })
      .catch((error) => {
        dispatch(unpredictableFailureReportTopValuesError());
        console.log(error);
      });
  };
};
