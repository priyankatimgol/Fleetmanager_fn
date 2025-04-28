import { getApiCall, postDataApi } from "apiServices/apiUtils";
import { CIRCULAR_KPI, GET_TURBINES, PLANNING_KPI, SET_LOADING_FALSE, SET_LOADING_TRUE, SITE_INCHARGE_KPI, SET_WTG_CUSTOMERS, SET_USER_SITES, SET_SELECTED_SITE, SET_SELECTED_CUSTOMER, GET_KPIMAPLFPLANTCAPACITY, GET_TOP10ERROR, SETSELECTEDDROP, SETLSSELECTEDDROP, SETTCISELECTEDDROP, SETMTTR_MTBF, SET_SELECTED_TURBIN, GET_KPIYTDMA, GET_KPICALLSTATUS, GET_PMNCSTATUS, GET_KPIDATABASE, NO_COMM_API } from "types/actions/SiteHome";
import { fetchError, showMessage } from "./Common";
import { TURBINE_API } from "pages/KPI's/utils";

export const setSiteInchargeKpiData = (payload: any, label: string) => ({
  type: SITE_INCHARGE_KPI,
  label: label,
  payload,
});
export const setNoCommData = (payload: any, label: string) => ({
  type: NO_COMM_API,
  label: label,
  payload,
});

export const setLoadingTrue = (label: string) => ({
  type: SET_LOADING_TRUE,
  payload: label,
})

export const setLoadingFalse = (label: string) => ({
  type: SET_LOADING_FALSE,
  payload: label,
})

export const setPlanningKpiData = (payload: any) => ({
  type: PLANNING_KPI,
  payload,
});

export const setCircularKpiData = (payload: any, label: string) => ({
  type: CIRCULAR_KPI,
  label: label,
  payload,
});

export const setTurbinesData = (payload: any) => ({
  type: GET_TURBINES,
  payload
})

export const setWtgCustomers = (payload: any) => ({
  type: SET_WTG_CUSTOMERS,
  payload
})

export const setUserSites = (payload: any) => ({
  type: SET_USER_SITES,
  payload
})

export const setSelectedSite = (payload: string) => ({
  type: SET_SELECTED_SITE,
  payload
})

export const setSelectedCustomer = (payload: number) => ({
  type: SET_SELECTED_CUSTOMER,
  payload
})

export const setKpiMAPLFPlantCapacity = (payload: any) => ({
  type: GET_KPIMAPLFPLANTCAPACITY,
  payload
})

export const setTop10Error = (payload: any) => ({
  type: GET_TOP10ERROR,
  payload
})

export const getPmSelectedDrop = (payload: any) => ({
  type: SETSELECTEDDROP,
  payload
})

export const getLsSelectedDrop = (payload: any) => ({
  type: SETLSSELECTEDDROP,
  payload
})

export const getTciSelectedDrop = (payload: any) => ({
  type: SETTCISELECTEDDROP,
  payload
})

export const setMtrMtbf = (payload: any) => ({
  type: SETMTTR_MTBF,
  payload
})

export const setSelectedTurbin = (payload: any) => ({
  type: SET_SELECTED_TURBIN,
  payload
})

export const setKpiYTDMA = (payload: any) => ({
  type: GET_KPIYTDMA,
  payload
})

export const setKpiCallStatus = (payload: any) => ({
  type: GET_KPICALLSTATUS,
  payload
})

export const setPMNCStatus = (payload: any) => ({
  type: GET_PMNCSTATUS,
  payload
})

export const setKPIDatabase = (payload: any) => ({
  type: GET_KPIDATABASE,
  payload
})


export const getSiteInchargeKpiData = ({ parameter, filter, siteName = '' }) => {
  return (dispatch) => {
    dispatch(setLoadingTrue(parameter))
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpi${parameter}?filter=${filter}&userSite=${siteName}`
    )
      .then((response) => {
        dispatch(setSiteInchargeKpiData(response?.data, parameter ?? ""));
        setTimeout(() => dispatch(setLoadingFalse(parameter)), 500)
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingFalse(parameter));
      });
  };
};

export const getIDRVKpiData = (siteName: string) => {
  return (dispatch) => {
    dispatch(setLoadingTrue('IDRV'))
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiIDRV?SiteName=${siteName}`
    )
      .then((response) => {
        if (response?.status) {
          dispatch(setSiteInchargeKpiData(response?.data, 'IDRV' ?? ""));
          setTimeout(() => dispatch(setLoadingFalse('IDRV')), 500)
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingFalse("IDRV"));
      });
  }
}

export const getMAGAData = (siteName: string) => {
  return (dispatch) => {
    dispatch(setLoadingTrue('MA_GA'));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiMA_GA?SiteName=${siteName}`
    )
      .then((response) => {
        if(response?.code) {
          dispatch(setSiteInchargeKpiData(response?.data, 'MA_GA'))
          setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
        } else {
          setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
      })
  }
}
export const getNoCommData = () => {
  return (dispatch) => {
    // dispatch(setLoadingTrue('MA_GA'));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetNoCalmReportData`
    )
      .then((response) => {
        if(response?.code) {
          dispatch(setNoCommData(response?.data, 'noComm'))
          // setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
        } else {
          // setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
        }
      })
      .catch((error) => {
        console.log(error);
        // setTimeout(() => dispatch(setLoadingFalse('MA_GA')), 500)
      })
  }
}

export const getPMLSTCIData = (siteName: string) => {
  return (dispatch) => {
    dispatch(setLoadingTrue('PM_LS_TCI'));
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiPM_LS_TCI?SiteName=${siteName}`
    )
      .then((response) => {
        if(response?.code) {
          dispatch(setSiteInchargeKpiData(response?.data, 'PM_LS_TCI'))
          setTimeout(() => dispatch(setLoadingFalse('PM_LS_TCI')), 500)
        } else {
          setTimeout(() => dispatch(setLoadingFalse('PM_LS_TCI')), 500)
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => dispatch(setLoadingFalse('PM_LS_TCI')), 500)
      })
  }
}


export const getTopSectionData = (siteName: string) => {
  return (dispatch) => {
    dispatch(setLoadingTrue('TOP_SECTION'))
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiWindPowerGeneration?site=${siteName}`
    )
      .then((response) => {
        dispatch(setSiteInchargeKpiData(response?.data, 'TOP_SECTION'));
        setTimeout(() => dispatch(setLoadingFalse('TOP_SECTION')), 500)
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoadingFalse('TOP_SECTION'));
      })
  }
}

export const getPlanningKpiData = (siteName: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/KpiPlanning?siteName=${siteName}`)
      .then((response) => {
        dispatch(setPlanningKpiData(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCircularKpiData = (params: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Get${params}`)
      .then((response) => {        
       dispatch(setCircularKpiData(response?.data, params));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTurbinesData = (filter: string = '', customerFilter = '', siteName = '', selected = '') => {
  return (dispatch) => {
    dispatch(setLoadingTrue(TURBINE_API))
    dispatch(setTurbinesData([]))
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiDetails?searchQuery=${filter}&customerFilter=${customerFilter}&userSite=${siteName}&searchStatus=${selected}`)
      .then((response) => {
        dispatch(setTurbinesData(response?.data))
        setTimeout(() => dispatch(setLoadingFalse(TURBINE_API)), 500)
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => dispatch(setLoadingFalse(TURBINE_API)), 500)
      });
  }
}

export const getWtgCustomers = (userSite: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/WTGCustomerbyPlantId?userSite=${userSite}`)
      .then((response) => {
        dispatch(setWtgCustomers(response?.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const getUserSites = (payload) => {
  return (dispatch) => {
    dispatch(setUserSites([]));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/User/GetSiteByUser?userName=${payload?.user}&employeeCode=${payload?.employeeCode}&countryName=${payload?.country||''}&stateName=${payload?.state||''}&areaName=${payload?.area||''}&siteName=${payload?.site ||''}`)
      .then((response) => {
        const filterData = response?.data?.userSiteResponses.filter(site => site.status === "Active");
        dispatch(setUserSites(filterData));
        dispatch(setSelectedSite(filterData[0]?.siteName));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getKpiMAPLFPlantCapacity = (siteName: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Kpi_Type_Capacity_PLF_MA?siteName=${siteName}`)
      .then((response) => {
        dispatch(setKpiMAPLFPlantCapacity(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTop10Error = (siteName: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/Top10Error?SiteName=${siteName}`)
      .then((response) => {
        dispatch(setTop10Error(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMTTR_MTBF = (site:string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKpiMTTR_MTBF?SiteName=${site}`)
      .then((response) => {
        dispatch(setMtrMtbf(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getKpiYTDMA = (site:string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/KPI_YTD_MA?siteName=${site}`)
      .then((response) => {
        dispatch(setKpiYTDMA(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCallStatus = (site:string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/CallStatusKPI?siteName=${site}`)
      .then((response) => {
        dispatch(setKpiCallStatus(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPMNCStatus = (site:string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/PMNCStatusKPI?siteName=${site}`)
      .then((response) => {
        dispatch(setPMNCStatus(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getKPIDatabase = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetKPIDBName`)
      .then((response) => {
        dispatch(setKPIDatabase(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
