import {
  GET_XY_AXIS_COLUMNS_ERROR,
  GET_XY_AXIS_COLUMNS_PENDING,
  GET_XY_AXIS_COLUMNS_RESPONSE,
  SUBMIT_XY_AXIS_COLUMNS_ERROR,
  SUBMIT_XY_AXIS_COLUMNS_PENDING,
  SUBMIT_XY_AXIS_COLUMNS_RESPONSE,
} from "types/actions/XYAxisMapping";

const INIT_STATE = {
  loader: false,
  getAxisLoader: false,
  xyAxisFilledColumns: {},
};

const XYAxisColumnsMappingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SUBMIT_XY_AXIS_COLUMNS_PENDING: {
      return {
        ...state,
        loader: true,
      };
    }
    case SUBMIT_XY_AXIS_COLUMNS_ERROR: {
      return {
        ...state,
        loader: false,
      };
    }
    case SUBMIT_XY_AXIS_COLUMNS_RESPONSE: {
      return {
        ...state,
        loader: false,
      };
    }

    case GET_XY_AXIS_COLUMNS_PENDING: {
      return {
        ...state,
        getAxisLoader: true,
        xyAxisFilledColumns: {},
      };
    }
    case GET_XY_AXIS_COLUMNS_ERROR: {
      return {
        ...state,
        getAxisLoader: false,
        xyAxisFilledColumns: {},
      };
    }
    case GET_XY_AXIS_COLUMNS_RESPONSE: {
      return {
        ...state,
        getAxisLoader: false,
        xyAxisFilledColumns: action?.payload || {},
      };
    }
    default:
      return state;
  }
};

export default XYAxisColumnsMappingReducer;
