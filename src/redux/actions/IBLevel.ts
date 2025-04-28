import { getApiCall } from "apiServices/apiUtils";
import { fetchError, showMessage } from "./Common";
import { GET_IBLEVEL_LOADER, GET_IB_CAMA, GET_IB_HT_FEEDERS, GET_IB_HV_EHV_PSS, GET_IB_LUBRICATION, GET_IB_MBDS, GET_IB_MTTR_MTBF, GET_IB_PM_QUALITY, GET_IB_SCORE_CARD, GET_IB_WTG, GET_IB_WTG_AND_DP, GET_MAPAREADETAILS, GET_MAPSTATEDETAILS, GET_MapTable } from "types/actions/IBLevel";

export const setIBLevelCompLoader = (payload, category) => ({
    type: GET_IBLEVEL_LOADER,
    payload,
    category
  });
  
export const setIB_HV_EHV_PSS = (payload) => ({
    type: GET_IB_HV_EHV_PSS,
    payload,
});

export const set_IB_PM_Quality = (payload) => ({
    type: GET_IB_PM_QUALITY,
    payload,
});

export const set_IB_Lubrication = (payload) => ({
    type: GET_IB_LUBRICATION,
    payload,
});

export const set_IB_MBDs = (payload) => ({
  type: GET_IB_MBDS,
  payload,
});

export const set_IB_Score_Card = (payload) => ({
  type: GET_IB_SCORE_CARD,
  payload,
});

export const setIB_MTTR_MTBF = (payload) => ({
  type: GET_IB_MTTR_MTBF,
  payload,
});
export const setIB_WTG = (payload) => ({
  type: GET_IB_WTG,
  payload,
});

export const set_IB_HT_Feeders = (payload) => ({
  type: GET_IB_HT_FEEDERS,
  payload,
});

export const set_IB_WTG_And_DP = (payload) => ({
  type: GET_IB_WTG_AND_DP,
  payload,
});

export const setMapStateDetails = (payload) => ({
  type: GET_MAPSTATEDETAILS,
  payload,
});

export const setMapAreaDetails = (payload) => ({
  type: GET_MAPAREADETAILS,
  payload,
});

export const set_IB_CAMA = (payload) => ({
  type: GET_IB_CAMA,
  payload,
});

export const set_MapTable = (payload) => ({
  type: GET_MapTable,
  payload,
});


export const getIB_HV_EHV_PSS = (state, area) => {
    return (dispatch) => {
      dispatch(setIBLevelCompLoader(true, "HV_EHV_PSS_LOADER"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_HV_EHV_PSS?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setIB_HV_EHV_PSS(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "HV_EHV_PSS_LOADER"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "HV_EHV_PSS_LOADER"))
        });
    };
  };

  export const Get_IB_PM_Quality = (state, area) => {
    return (dispatch) => {
      dispatch(setIBLevelCompLoader(true, "PM_Quality_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/PMQuality?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_PM_Quality(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "PM_Quality_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "PM_Quality_Loader"))
        });
    };
  };

  export const Get_IB_Lubrication = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "Lubrication_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_Lubrication?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_Lubrication(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "Lubrication_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "Lubrication_Loader"))
        });
    };
  };

  export const Get_IB_MBDs = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "MBD_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_MBDs?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_MBDs(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "MBD_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "MBD_Loader"))
        });
    };
  };

  export const Get_IB_Score_Card = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "scoreCard_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_Score_Card?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_Score_Card(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "scoreCard_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "scoreCard_Loader"))
        });
    };
  };

  export const GetIB_MTTR_MTBF = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "MTTR_MTBF_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetIB_MTTR_MTBF?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setIB_MTTR_MTBF(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "MTTR_MTBF_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "MTTR_MTBF_Loader"))
        });
    };
  };
  export const GetIB_WTG = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "WTG_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/PMH1H2`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setIB_WTG(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "WTG_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "WTG_Loader"))
        });
    };
  };

  export const Get_IB_HT_Feeders = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "htFeeders_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_HT_Feeders_Performance?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_HT_Feeders(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "htFeeders_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "htFeeders_Loader"))
        });
    };
  };

  export const Get_IB_WTG_And_DP = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "WTGDP_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_WTG_And_DP?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_WTG_And_DP(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
        });
    };
  };

  export const GetMapStateDetails = (state, area) => {
    return (dispatch) => {
    //  dispatch(setIBLevelCompLoader(true, "WTGDP_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/MapStateKpiDetails`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setMapStateDetails(response?.data || []));
                // dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          // dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
        });
    };
  };

  export const GetMapAreaKpiDetails = (state, area) => {
    return (dispatch) => {
    //  dispatch(setIBLevelCompLoader(true, "WTGDP_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/MapAreaKpiDetails`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(setMapAreaDetails(response?.data || []));
                // dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          // dispatch(setIBLevelCompLoader(false, "WTGDP_Loader"))
        });
    };
  };

  export const Get_IB_CAMA = (state, area) => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "CAMA_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get_IB_CAMA?StateName=${state}&AreaName=${area}`)
        .then((response) => {        
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_IB_CAMA(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "CAMA_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "CAMA_Loader"))
        });
    };
  };

  export const GetMapTableDetails = () => {
    return (dispatch) => {
     dispatch(setIBLevelCompLoader(true, "MapTable_Loader"))
      getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/MapTableKPIDetails`)
        .then((response) => {   
          console.log(response, "response");
               
            if(response?.status && response?.code === 200 && response?.data){
                dispatch(set_MapTable(response?.data || []));
                dispatch(setIBLevelCompLoader(false, "MapTable_Loader"))
            }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setIBLevelCompLoader(false, "MapTable_Loader"))
        });
    };
  };