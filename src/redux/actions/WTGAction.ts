import { getApiCall } from "apiServices/apiUtils";
import { fetchError, showMessage } from "./Common";
import {
  GET_MAGAVSWIND,
  GET_WTGMA_GA,
  GET_WTGMTTR_MTBF,
  GET_WTGTOPERRORS,
  GET_WTGWINDPOWERGENERATION,
  GET_WTG_COMPONET_LOADER,
  GET_WTG_LOADER_UPDATE,
  GET_WTG_TURBINS,
} from "types/actions/WTGConstants";
import { setSelectedTurbin } from "./SiteHomeActions";

export const setWtgWindPowerGeneration = (payload) => ({
  type: GET_WTGWINDPOWERGENERATION,
  payload,
});

export const setWtgMttrMtbf = (payload) => ({
  type: GET_WTGMTTR_MTBF,
  payload,
});

export const setWtgMA_GA = (payload) => ({
  type: GET_WTGMA_GA,
  payload,
});

export const setWtgTopError = (payload) => ({
  type: GET_WTGTOPERRORS,
  payload,
});

export const setWtgTurbinData = (payload) => ({
  type: GET_WTG_TURBINS,
  payload,
});

export const setWtgLoader = (payload) => ({
  type: GET_WTG_LOADER_UPDATE,
  payload,
});

export const setWtgCompLoader = (payload, category) => ({
  type: GET_WTG_COMPONET_LOADER,
  payload,
  category
});

export const setWtgMAGAvsWind = (payload) => ({
  type: GET_MAGAVSWIND,
  payload,
});

export const getWTGTurbinesData = (siteName, setTerbineNo, searchStatus="Total WTG") => {
  return (dispatch, getState) => {
    const selectedTurbin = getState()?.siteHomeKpi?.selectedTurbin;
    dispatch(setWtgLoader(true));
    dispatch(setWtgTurbinData([]));
    getApiCall(
      `${
        process.env.REACT_APP_LOGBOOK_SERVER_CODE
      }/api/Logbook/GetKpiDetails?userSite=${
        siteName || ""
      }&searchStatus=${searchStatus}`
    )
      .then((response) => {
        dispatch(setWtgTurbinData(response?.data));
        const val = selectedTurbin?.turbine
          ? selectedTurbin
          : response?.data?.turbineNames?.length > 0 &&
            response?.data?.turbineNames[0];
        setTerbineNo(val);
        dispatch(getWtgMTTR_MTBF(val.turbine));
        dispatch(getWtgMA_GA(val.turbine));
        dispatch(getWtgTopErrors(val.turbine));
        dispatch(setWtgLoader(false));
        dispatch(getWtgMAGAvsWind(val.turbine));
        dispatch(setSelectedTurbin({}));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setWtgLoader(false));
      });
  };
};

export const getWtgWindPowerGen = (siteName: string) => {
  return (dispatch) => {
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiWindPowerGeneration?site=${siteName}`
    )
      .then((response) => {
        dispatch(setWtgWindPowerGeneration(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWtgMTTR_MTBF = (turbineNo: string) => {
  return (dispatch) => {
    dispatch(setWtgCompLoader(true, "wtgMttrMtbfLoader"));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWTGKpiMTTR_MTBF?TurbineNo=${turbineNo}`
    )
      .then((response) => {
        dispatch(setWtgMttrMtbf(response?.data));
        dispatch(setWtgCompLoader(false, "wtgMttrMtbfLoader"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWtgMA_GA = (turbineNo: string) => {
  return (dispatch) => {
    dispatch(setWtgCompLoader(true, "wtgMA_GALoader"));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWTGKpiMA_GA?TurbineNo=${turbineNo}`
    )
      .then((response) => {
        dispatch(setWtgMA_GA(response?.data));
        dispatch(setWtgCompLoader(false, "wtgMA_GALoader"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWtgTopErrors = (turbineNo: string) => {
  return (dispatch) => {
    dispatch(setWtgCompLoader(true, "top10ErrorsLoader"));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/WTGTop10Error?TurbineNo=${turbineNo}`
    )
      .then((response) => {
        dispatch(setWtgTopError(response?.data));
        dispatch(setWtgCompLoader(false, "top10ErrorsLoader"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWtgMAGAvsWind = (turbineNo: string) => {
  return (dispatch) => {
    dispatch(setWtgCompLoader(true, "MAGAvsWindLoader"));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetWTGPowerWSPerformance?TurbineNo=${turbineNo}`
    )
      .then((response) => {
        dispatch(setWtgMAGAvsWind(response?.data));
        dispatch(setWtgCompLoader(false, "MAGAvsWindLoader"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
