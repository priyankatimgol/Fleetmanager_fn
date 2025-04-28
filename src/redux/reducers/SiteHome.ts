import {
  CIRCULAR_KPI,
  GET_KPICALLSTATUS,
  GET_KPIDATABASE,
  GET_KPIMAPLFPLANTCAPACITY,
  GET_KPIYTDMA,
  GET_PMNCSTATUS,
  GET_TOP10ERROR,
  GET_TURBINES,
  PLANNING_KPI,
  SETLSSELECTEDDROP,
  SETMTTR_MTBF,
  SETSELECTEDDROP,
  SETTCISELECTEDDROP,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SELECTED_CUSTOMER,
  SET_SELECTED_SITE,
  SET_SELECTED_TURBIN,
  SET_USER_SITES,
  SET_WTG_CUSTOMERS,
  SITE_INCHARGE_KPI,
  NO_COMM_API
} from "types/actions/SiteHome";

const INIT_STATE = {
  loading: [],
  siteInchargeKpi: {},
  wtgCustomers: [],
  planningKpiProgressBar: {},
  planningKpiCircularKpi: {},
  turbineData: [],
  userSites: [],
  selSite: '',
  selCustomer: 0,
  plantCapacityMaPlf:[],
  top10Error: [],
  mttrMtbf: [],
  SelectedDropdown: {},
  SelectedLsDropdown: {},
  SelectedTciDropdown: {},
  selectedTurbin:{},
  kpiYTDMA:[],
  callStatus: [],
  PMNCStatus: [],
  KPIDatabase: [],
  noCommData : []
};

const SiteHome = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SITE_INCHARGE_KPI: {
      return {
        ...state,
        siteInchargeKpi: action.label
          ? { ...state.siteInchargeKpi, [action.label]: action?.payload }
          : action?.payload,
      };
    }
    case NO_COMM_API: {
      return {
        ...state,
        noCommData:  action?.payload,
      };
    }
    case SET_LOADING_TRUE: {
      return {
        ...state,
        loading: [...state.loading, action.payload],
      };
    }
    case SET_LOADING_FALSE: {
      return {
        ...state,
        loading: [...state.loading.filter((d) => d !== action.payload)],
      };
    }
    case PLANNING_KPI: {
      return {
        ...state,
        planningKpiProgressBar: action.payload
      };
    }
    case SET_SELECTED_TURBIN: {
      return {
        ...state,
        selectedTurbin: action.payload
      };
    }
    case CIRCULAR_KPI: {
      return {
        ...state,
        planningKpiCircularKpi: action.label
          ? { ...state.planningKpiCircularKpi, [action.label]: action?.payload }
          : action?.payload,
      };
    }
    case GET_TURBINES: {
      return {
        ...state,
        turbineData: action?.payload,
      };
    }
    case SET_WTG_CUSTOMERS: {
      return {
        ...state,
        wtgCustomers: action?.payload
      }
    }
    case SET_USER_SITES: {
      return {
        ...state,
        userSites: action?.payload
      }
    }
    case SET_SELECTED_SITE: {
      return {
        ...state,
        selSite: action?.payload
      }
    }
    case SET_SELECTED_CUSTOMER: {
      return {
        ...state,
        selCustomer: action?.payload
      }
    }
    case GET_KPIMAPLFPLANTCAPACITY: {
      return {
        ...state,
        plantCapacityMaPlf: action.payload
      };
    }
    case GET_TOP10ERROR: {
      return {
        ...state,
        top10Error: action.payload
      };
    }
    case SETMTTR_MTBF: {
      return {
        ...state,
        mttrMtbf: action.payload
      };
    }
    case SETSELECTEDDROP: {
      return {
        ...state,
        SelectedDropdown: action.payload
      };
    }

    case SETLSSELECTEDDROP: {
      return {
        ...state,
        SelectedLsDropdown: action.payload
      };
    }
    case SETTCISELECTEDDROP: {
      return {
        ...state,
        SelectedTciDropdown: action.payload
      };
    }
    case GET_KPIYTDMA: {
      return {
        ...state,
        kpiYTDMA: action.payload ?? []
      };
    }
    case GET_KPICALLSTATUS: {
      return {
        ...state,
        callStatus: action.payload ?? []
      };
    }

    case GET_PMNCSTATUS: {
      return {
        ...state,
        PMNCStatus: action.payload ?? []
      };
    }
    
    case GET_KPIDATABASE: {
      return {
        ...state,
        KPIDatabase: action.payload ?? []
      };
    }

    default:
      return state;
  }
};
export default SiteHome;
