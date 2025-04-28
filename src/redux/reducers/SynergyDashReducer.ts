import { GET_AREADROPDOWN, GET_BDHRSBYWEEKGRID, GET_BDHRSBYWHYGRAPH, GET_BDHRSBYWHYGRID, GET_HOURSBYWEEK, GET_HOURSBYWTG, GET_HRSBYWTGCOUNT, GET_SITEDROPDOWN, GET_STATEDROPDOWN, GET_SYNERGYDASH_LOADER, GET_TOPDISTINCTWTG } from "types/actions/SynergyDashboard";

const INIT_STATE = {
   stateDropdown:[],
   areaDropdown:[],
    siteDropdown:[],
    hoursByWeek:[],
    hoursByWTG: [],
    BDHrsByWeekGrid:[],
    BDHrsByWhyGraph: [],
    BDHrsByWhyGrid: [],
    HrsByWTGCount: [],
    TopDistinctWTG: []
};

const synergyDashReducer = (
    state = INIT_STATE,
    action
  ) => {
    switch (action.type) {
      case GET_STATEDROPDOWN: {
        return {
          ...state,
          stateDropdown: action?.payload
        }
      }

      case GET_AREADROPDOWN: {
        return {
          ...state,
          areaDropdown: action?.payload
        }
      }

      case GET_SITEDROPDOWN: {
        return {
          ...state,
          siteDropdown: action?.payload
        }
      }
      case GET_SYNERGYDASH_LOADER: {
        return {
          ...state,
          [action.category]: action?.payload,
        };
      }
      case GET_HOURSBYWEEK: {
        return {
          ...state,
          hoursByWeek: action?.payload
        }
      }
      case GET_HOURSBYWTG: {
        return {
          ...state,
          hoursByWTG: action?.payload
        }
      }
      case GET_BDHRSBYWEEKGRID: {
        return {
          ...state,
          BDHrsByWeekGrid: action?.payload
        }
      }
      case GET_BDHRSBYWHYGRAPH: {
        return {
          ...state,
          BDHrsByWhyGraph: action?.payload
        }
      }

      case GET_BDHRSBYWHYGRID: {
        return {
          ...state,
          BDHrsByWhyGrid: action?.payload
        }
      }

      case GET_HRSBYWTGCOUNT: {
        return {
          ...state,
          HrsByWTGCount: action?.payload
        }
      }

      case GET_TOPDISTINCTWTG: {
        return {
          ...state,
          TopDistinctWTG: action?.payload
        }
      }
      default:
        return state;
    }
  };
  export default synergyDashReducer;