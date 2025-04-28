import { getApiCall } from "apiServices/apiUtils";
import {
  PM_CRITICAL_MATERIAL_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_CONFIG_ERROR,
  PM_CRITICAL_MATERIAL_CONFIG_PENDING,
  PM_CRITICAL_MATERIAL_DATA,
  PM_CRITICAL_MATERIAL_DATA_ERROR,
  PM_CRITICAL_MATERIAL_DATA_PENDING,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA_PENDING,
  PM_CRITICAL_MATERIAL_GRAPH_DATA,
  PM_CRITICAL_MATERIAL_GRAPH_ERROR,
  PM_CRITICAL_MATERIAL_GRAPH_PENDING,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_DATA,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_ERROR,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_PENDING,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_PENDING,
  PM_CRITICAL_MATERIAL_OPR_DATA,
  PM_CRITICAL_MATERIAL_OPR_DATA_ERROR,
  PM_CRITICAL_MATERIAL_OPR_DATA_PENDING,
  PM_CRITICAL_MATERIAL_POD_DATA,
  PM_CRITICAL_MATERIAL_POD_DATA_ERROR,
  PM_CRITICAL_MATERIAL_POD_DATA_PENDING,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_PENDING,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_PENDING,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_PENDING,
} from "types/actions/Scm/PMCriticalMaterial";

export const setPMCriticalMaterialData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_DATA,
  payload,
});

export const pmCriticalMaterialError = () => ({
  type: PM_CRITICAL_MATERIAL_DATA_ERROR,
});

export const pmCriticalMaterialPending = () => ({
  type: PM_CRITICAL_MATERIAL_DATA_PENDING,
});

export const pmCriticalMaterialConfigData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_CONFIG_DATA,
  payload,
});

export const pmCriticalMaterialConfigPending = () => ({
  type: PM_CRITICAL_MATERIAL_CONFIG_PENDING,
});

export const pmCriticalMaterialConfigError = () => ({
  type: PM_CRITICAL_MATERIAL_CONFIG_ERROR,
});

export const setPmCriticalMaterialGraphData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_DATA,
  payload,
});

export const pmCriticalMaterialGraphDataPending = () => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_PENDING,
});

export const pmCriticalMaterialGraphDataError = () => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_ERROR,
});

export const setPmCriticalMaterialGraphRerenderData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_RERENDER_DATA,
  payload,
});

export const pmCriticalMaterialGraphRerenderDataPending = () => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_RERENDER_PENDING,
});

export const pmCriticalMaterialGraphRerenderDataError = () => ({
  type: PM_CRITICAL_MATERIAL_GRAPH_RERENDER_ERROR,
});

export const setPmCriticalMaterialCategoriesData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_CATEGORIES_DATA,
  payload,
});

export const pmCriticalMaterialCategoriesDataPending = () => ({
  type: PM_CRITICAL_MATERIAL_CATEGORIES_DATA_PENDING,
});

export const pmCriticalMaterialCategoriesDataError = () => ({
  type: PM_CRITICAL_MATERIAL_CATEGORIES_DATA_ERROR,
});

export const setPMCriticalMaterialStockData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA,
  payload,
});

export const pmCriticalMaterialStockError = () => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_ERROR,
});

export const pmCriticalMaterialStockPending = () => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_PENDING,
});

export const setPMCriticalMaterialPODData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_POD_DATA,
  payload,
});

export const pmCriticalMaterialPODError = () => ({
  type: PM_CRITICAL_MATERIAL_POD_DATA_ERROR,
});

export const pmCriticalMaterialPODPending = () => ({
  type: PM_CRITICAL_MATERIAL_POD_DATA_PENDING,
});

export const setPMCriticalMaterialOPRData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_OPR_DATA,
  payload,
});

export const pmCriticalMaterialOPRError = () => ({
  type: PM_CRITICAL_MATERIAL_OPR_DATA_ERROR,
});

export const pmCriticalMaterialOPRPending = () => ({
  type: PM_CRITICAL_MATERIAL_OPR_DATA_PENDING,
});

export const setPMCriticalMaterialStockConfigData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA,
  payload,
});

export const pmCriticalMaterialStockConfigError = () => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_ERROR,
});

export const pmCriticalMaterialStockConfigPending = () => ({
  type: PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_PENDING,
});

export const setPMCriticalMaterialPODConfigData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_POD_CONFIG_DATA,
  payload,
});

export const pmCriticalMaterialPODConfigError = () => ({
  type: PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_ERROR,
});

export const pmCriticalMaterialPODConfigPending = () => ({
  type: PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_PENDING,
});

export const setPMCriticalMaterialOPRConfigData = (payload: any) => ({
  type: PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA,
  payload,
});

export const pmCriticalMaterialOPRConfigError = () => ({
  type: PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_ERROR,
});

export const pmCriticalMaterialOPRConfigPending = () => ({
  type: PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_PENDING,
});

export const getPMCriticalMaterialData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/getCriticalMaterialWeekly?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setPMCriticalMaterialData(resultParser));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialConfigData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=PMCriticalMaterialWeekly`
    )
      .then((response) => {
        dispatch(pmCriticalMaterialConfigData(response));
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialConfigError());
        console.log(error);
      });
  };
};

export const getPmCriticalMaterialGraphData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialGraphDataPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getCriticalMaterialWeeklyKpi?reportType=graph`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setPmCriticalMaterialGraphData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialGraphDataError());
        console.log(error);
      });
  };
};

export const getPmCriticalMaterialGraphRerenderData = (category: string) => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialGraphRerenderDataPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getCriticalMaterialWeeklyKpi?reportType=graph&category=${category}`
    )
      .then((response) => {
        if (response?.length > 0) {
          dispatch(setPmCriticalMaterialGraphRerenderData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialGraphRerenderDataError());
        console.log(error);
      });
  };
};

export const getPmCriticalMaterialCategorisData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialCategoriesDataPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/getCriticalMaterialWeeklyKpi?reportType=categories`
    )
      .then((response) => {
        if (response?.length > 0) {
          let finalArr = [];
          response.forEach((item) => {
            finalArr.push({
              label: item["PM Category"],
              value: item["PM Category"],
            });
          });

          dispatch(setPmCriticalMaterialCategoriesData(finalArr));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialCategoriesDataError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialStockData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialStockPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/GetPMCurrentStock?queryParam=%7B"startRow"%3A0%2C"endRow"%3A3%2C"rowGroupCols"%3A%5B%5D%2C"valueCols"%3A%5B%5D%2C"pivotCols"%3A%5B%5D%2C"pivotMode"%3Afalse%2C"groupKeys"%3A%5B%5D%2C"filterModel"%3A%7B%7D%2C"sortModel"%3A%5B%5D%7D`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialStockData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialStockError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialPODData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialPODPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/getCriticalMaterialWeekly?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialPODData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialPODError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialOPRData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialOPRPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/GetOpenPurchaseRequisition?queryParam=%7B"startRow"%3A0%2C"endRow"%3A3%2C"rowGroupCols"%3A%5B%5D%2C"valueCols"%3A%5B%5D%2C"pivotCols"%3A%5B%5D%2C"pivotMode"%3Afalse%2C"groupKeys"%3A%5B%5D%2C"filterModel"%3A%7B%7D%2C"sortModel"%3A%5B%5D%7D`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialOPRData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialOPRError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialStockConfigData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialStockConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=SCM_PM_current_stock`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialStockConfigData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialStockConfigError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialPODConfigData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialPODConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/getCriticalMaterialWeekly?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialPODConfigData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialPODConfigError());
        console.log(error);
      });
  };
};

export const getPMCriticalMaterialOPRConfigData = () => {
  return (dispatch) => {
    dispatch(pmCriticalMaterialOPRConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=SCM_Open_Purchase_Requisition`
    )
      .then((response) => {
        if (response) {
          dispatch(setPMCriticalMaterialOPRConfigData(response));
        }
      })
      .catch((error) => {
        dispatch(pmCriticalMaterialOPRConfigError());
        console.log(error);
      });
  };
};
