import {
  DSC_FETCH_COLUMNS_ERROR,
  DSC_FETCH_COLUMNS_PENDING,
  DSC_FETCH_COLUMNS_RESPONSE,
  DSC_PREFILLED_COLUMNS_ERROR,
  DSC_PREFILLED_COLUMNS_PENDING,
  DSC_PREFILLED_COLUMNS_RESPONSE,
  DSC_SAVE_COLUMNS_ERROR,
  DSC_SAVE_COLUMNS_PENDING,
  DSC_SAVE_COLUMNS_RESPONSE,
  DSC_TABLES_VIEWS_ERROR,
  DSC_TABLES_VIEWS_PENDING,
  DSC_TABLES_VIEWS_RESPONSE,
} from "types/actions/DataSanityConfig.action";

const INIT_STATE = {
  viewsAndtablesDSCData: [],
  DSCLoader: false,

  DSCColumnsData: [],
  DSColumnsLoader: false,

  DSCSaveColumnsLoader: false,
  DSCPrefilledColumnsData: {},
};

const DataSanityConfigReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DSC_TABLES_VIEWS_PENDING: {
      return {
        ...state,
        DSCLoader: true,
        viewsAndtablesDSCData: [],
      };
    }
    case DSC_TABLES_VIEWS_ERROR: {
      return {
        ...state,
        DSCLoader: false,
        viewsAndtablesDSCData: [],
      };
    }
    case DSC_TABLES_VIEWS_RESPONSE: {
      return {
        ...state,
        DSCLoader: false,
        viewsAndtablesDSCData: action?.payload,
      };
    }

    case DSC_FETCH_COLUMNS_PENDING: {
      return {
        ...state,
        DSColumnsLoader: true,
        DSCColumnsData: [],
      };
    }
    case DSC_FETCH_COLUMNS_ERROR: {
      return {
        ...state,
        DSColumnsLoader: false,
        DSCColumnsData: [],
      };
    }
    case DSC_FETCH_COLUMNS_RESPONSE: {
      return {
        ...state,
        DSColumnsLoader: false,
        DSCColumnsData: action?.payload,
      };
    }

    case DSC_SAVE_COLUMNS_PENDING: {
      return {
        ...state,
        DSCSaveColumnsLoader: true,
      };
    }
    case DSC_SAVE_COLUMNS_ERROR: {
      return {
        ...state,
        DSCSaveColumnsLoader: false,
      };
    }
    case DSC_SAVE_COLUMNS_RESPONSE: {
      return {
        ...state,
        DSCSaveColumnsLoader: false,
      };
    }

    case DSC_PREFILLED_COLUMNS_PENDING: {
      return {
        ...state,
        DSCSaveColumnsLoader: true,
        DSCPrefilledColumnsData: {},
      };
    }
    case DSC_PREFILLED_COLUMNS_ERROR: {
      return {
        ...state,
        DSCSaveColumnsLoader: false,
        DSCPrefilledColumnsData: {},
      };
    }
    case DSC_PREFILLED_COLUMNS_RESPONSE: {
      return {
        ...state,
        DSCSaveColumnsLoader: false,
        DSCPrefilledColumnsData: action?.payload || {},
      };
    }
    default:
      return state;
  }
};

export default DataSanityConfigReducer;
