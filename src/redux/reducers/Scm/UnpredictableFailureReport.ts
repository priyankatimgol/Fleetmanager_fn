import {
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_PENDING,
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA,
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA_ERROR,
  GET_UNPREDICTABLE_FAILURE_REPORT_DATA_PENDING,
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
} from "../../../types/actions/Scm/UnpredictableFailureReport";

const INIT_STATE = {
  unpredictableData: [],
  unpredictableLoader: false,
  unpredictableConfigData: [],
  unpredictableConfigLoader: false,
  unpredictableDataBoxes: [],
  unpredictableCompareQuantity: [],
  unpredictableCurrentFy: [],
  unpredictableLastThree: [],
  unpredictableQuaterly: [],
  unpredictableTotalYears: [],
  unpredictableTopValuesData: [],
};

const UnpredictableFailureReport = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_UNPREDICTABLE_FAILURE_REPORT_DATA: {
      return {
        ...state,
        unpredictableData: action?.payload || [],
        unpredictableLoader: false,
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_DATA_ERROR: {
      return {
        ...state,
        unpredictableData: [],
        unpredictableLoader: false,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_DATA_PENDING: {
      return {
        ...state,
        unpredictableData: [],
        unpredictableLoader: true,
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA: {
      return {
        ...state,
        unpredictableConfigData: action?.payload || [],
        unpredictableConfigLoader: false,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_ERROR: {
      return {
        ...state,
        unpredictableConfigData: [],
        unpredictableConfigLoader: false,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_CONFIG_DATA_PENDING: {
      return {
        ...state,
        unpredictableConfigData: [],
        unpredictableConfigLoader: true,
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_BOXES: {
      return {
        ...state,
        unpredictableDataBoxes: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_ERROR: {
      return {
        ...state,
        unpredictableDataBoxes: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_BOXES_PENDING: {
      return {
        ...state,
        unpredictableDataBoxes: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA: {
      return {
        ...state,
        unpredictableCompareQuantity: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_ERROR: {
      return {
        ...state,
        unpredictableCompareQuantity: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_COMPARE_QUANTITY_DATA_PENDING: {
      return {
        ...state,
        unpredictableCompareQuantity: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA: {
      return {
        ...state,
        unpredictableCurrentFy: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_ERROR: {
      return {
        ...state,
        unpredictableCurrentFy: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_CURRENT_FY_DATA_PENDING: {
      return {
        ...state,
        unpredictableCurrentFy: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA: {
      return {
        ...state,
        unpredictableLastThree: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_ERROR: {
      return {
        ...state,
        unpredictableLastThree: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_LAST_THREE_DATA_PENDING: {
      return {
        ...state,
        unpredictableLastThree: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA: {
      return {
        ...state,
        unpredictableQuaterly: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_ERROR: {
      return {
        ...state,
        unpredictableQuaterly: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_QUATERLY_DATA_PENDING: {
      return {
        ...state,
        unpredictableQuaterly: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA: {
      return {
        ...state,
        unpredictableTotalYears: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_ERROR: {
      return {
        ...state,
        unpredictableTotalYears: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_TOTAL_YEARS_DATA_PENDING: {
      return {
        ...state,
        unpredictableTotalYears: [],
      };
    }

    case GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA: {
      return {
        ...state,
        unpredictableTopValuesData: action?.payload,
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_ERROR: {
      return {
        ...state,
        unpredictableTopValuesData: [],
      };
    }
    case GET_UNPREDICTABLE_FAILURE_REPORT_TOP_VALUES_DATA_PENDING: {
      return {
        ...state,
        unpredictableTopValuesData: [],
      };
    }

    default:
      return state;
  }
};

export default UnpredictableFailureReport;
