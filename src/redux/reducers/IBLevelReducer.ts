import { GET_IBLEVEL_LOADER, GET_IB_CAMA, GET_IB_HT_FEEDERS, GET_IB_HV_EHV_PSS, GET_IB_LUBRICATION, GET_IB_MBDS, GET_IB_MTTR_MTBF, GET_IB_PM_QUALITY, GET_IB_SCORE_CARD, GET_IB_WTG, GET_IB_WTG_AND_DP, GET_MAPAREADETAILS, GET_MAPSTATEDETAILS, GET_MapTable } from "types/actions/IBLevel";

const INIT_STATE = {
    IB_HV_EHV_PSS:[],
    pmQuality: [],
    lubrication: [],
    MBDsData: [],
    scoreCardData: [],
    mttrMtbfData: [],
    htFeedersData:[],
    WTGAndDPData:[],
    mapStates: [],
    mapAreas: [],
    CAMAData: [],
    wtgData : [],
    mapTableData: []
};

const IBLevelReducer = (
    state = INIT_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_IBLEVEL_LOADER: {
        return {
          ...state,
          [action.category]: action?.payload,
        };
      }

      case GET_IB_HV_EHV_PSS: {
        return {
          ...state,
          IB_HV_EHV_PSS: action?.payload
        }
      }

      case GET_IB_PM_QUALITY: {
        return {
          ...state,
          pmQuality: action?.payload
        }
      }
      case GET_IB_LUBRICATION: {
        return {
          ...state,
          lubrication: action?.payload
        }
      }

      case GET_IB_MBDS: {
        return {
          ...state,
          MBDsData: action?.payload
        }
      }

      case GET_IB_SCORE_CARD: {
        return {
          ...state,
          scoreCardData: action?.payload
        }
      }

      case GET_IB_MTTR_MTBF: {
        return {
          ...state,
          mttrMtbfData: action?.payload
        }
      }
      case GET_IB_WTG: {
        return {
          ...state,
          wtgData: action?.payload
        }
      }

      case GET_IB_HT_FEEDERS: {
        return {
          ...state,
          htFeedersData: action?.payload
        }
      }

      case GET_IB_WTG_AND_DP: {
        return {
          ...state,
          WTGAndDPData: action?.payload
        }
      }

      case GET_MAPSTATEDETAILS : {
        return {
          ...state,
          mapStates: action?.payload
        }
      }

      case GET_MAPAREADETAILS : {
        return {
          ...state,
          mapAreas: action?.payload
        }
      }

      case GET_IB_CAMA : {
        return {
          ...state,
          CAMAData: action?.payload
        }
      }

      case GET_MapTable : {
        return {
          ...state,
          mapTableData: action?.payload
        }
      }

      default:
        return state;
    }
  };
  export default IBLevelReducer;