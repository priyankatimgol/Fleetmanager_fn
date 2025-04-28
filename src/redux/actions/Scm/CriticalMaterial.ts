import { getApiCall } from "apiServices/apiUtils";
import {
    CRITICAL_MATERIAL_DATA,
    CRITICAL_MATERIAL_PENDING,
    CRITICAL_MATERIAL_ERROR,
    CRITICAL_MATERIAL_CONFIG_ERROR,
    CRITICAL_MATERIAL_CONFIG_PENDING,
    CRITICAL_MATERIAL_CONFIG_DATA,
} from "types/actions/Scm/CriticalMaterial";

export const setCriticalMaterialData = (payload: any) => ({
  type: CRITICAL_MATERIAL_DATA,
  payload,
});

export const criticalMaterialError = () => ({
  type: CRITICAL_MATERIAL_ERROR,
});

export const criticalMaterialPending = () => ({
  type: CRITICAL_MATERIAL_PENDING,
});

export const criticalMaterialConfigData = (payload: any) => ({
  type: CRITICAL_MATERIAL_CONFIG_DATA,
  payload,
});

export const criticalMaterialConfigPending = () => ({
  type: CRITICAL_MATERIAL_CONFIG_PENDING,
});

export const criticalMaterialConfigError = () => ({
  type: CRITICAL_MATERIAL_CONFIG_ERROR,
});

export const getCriticalMaterialData = () => {
  return (dispatch) => {
    dispatch(criticalMaterialPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/scm/get441CriticalMaterial?pageNumber=1&pageSize=1000&JsonOutput=true`
    )
      .then((response) => {
        if (response?.responseCode === 200) {
          let parserObj = JSON.parse(response?.responseObject);
          let resultParser = JSON.parse(parserObj.results);
          dispatch(setCriticalMaterialData(resultParser));
        }
      })
      .catch((error) => {
        dispatch(criticalMaterialError());
        console.log(error);
      });
  };
};

export const getCriticalMaterialConfigData = () => {
  return (dispatch) => {
    dispatch(criticalMaterialConfigPending());
    getApiCall(
      `${process.env.REACT_APP_SCM_PORT}/api/SCM/GetColumnConfigurations?template=SCM_441_Critical_Material`
    )
      .then((response) => {
        dispatch(criticalMaterialConfigData(response));
      })
      .catch((error) => {
        dispatch(criticalMaterialConfigError());
        console.log(error);
      });
  };
};
