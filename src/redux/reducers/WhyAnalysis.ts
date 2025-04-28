import { GET_BREAKDOWN_DATA, GET_DROPDOWN, GET_ANALYSIS_PARAMS, SET_LOADING, SET_LOADING_BREAKDOWN_DATA, GETWHYDROPDOWN, SETUPDATEDID, GET_SYNERGYYEAR, GET_EDITWHYSDROPDOWN } from "types/actions/WhyAnalysis";

const INIT_STATE = {
  loading: false,
  loadingBreakDownData: false,
  breakdownData: [],
  dropdowns: {},
  analysisParams: [],
  whyReasonsDropdown : {},
  updatedId: null,
  synergyYear : [],
  editWhysDropdown: []
}

const WhyAnalysis = (
  state = INIT_STATE,
  action
) => {
  switch(action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: action?.payload
      }
    }
    case SET_LOADING_BREAKDOWN_DATA: {
      return {
        ...state,
        loadingBreakDownData: action?.payload
      }
    }
    case GET_BREAKDOWN_DATA: {
      return {
        ...state,
        breakdownData: action?.payload
      }
    }
    case GET_DROPDOWN: {
      return {
        ...state,
        dropdowns: { ...action?.payload, ...state.dropdowns }
      }
    }
    case GET_ANALYSIS_PARAMS: {
      return {
        ...state,
        analysisParams : action?.payload !== null ? action?.payload : []
      }
    }
    case GETWHYDROPDOWN: {
      return {
        ...state,
        whyReasonsDropdown: { ...state.whyReasonsDropdown, [action?.parameter] : action?.payload }
      }
    }
    case SETUPDATEDID: {
      return {
        ...state,
        updatedId: action?.payload
      }
    }

    case GET_SYNERGYYEAR: {
      return {
        ...state,
        synergyYear: action?.payload
      }
    }

    case GET_EDITWHYSDROPDOWN: {
      return {
        ...state,
        editWhysDropdown: action?.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default WhyAnalysis;