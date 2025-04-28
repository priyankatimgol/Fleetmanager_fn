import {
  SLOW_MOVING_AND_NON_MOVING_CONFIG_DATA,
  SLOW_MOVING_AND_NON_MOVING_CONFIG_ERROR,
  SLOW_MOVING_AND_NON_MOVING_CONFIG_PENDING,
  SLOW_MOVING_AND_NON_MOVING_DATA,
  SLOW_MOVING_AND_NON_MOVING_ERROR,
  SLOW_MOVING_AND_NON_MOVING_PENDING,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_DATA,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_ERROR,
  SLOW_MOVING_AND_NON_MOVING_GRAPH_PENDING,
} from "../../../types/actions/Scm/SlowMAndNMoving";

const INIT_STATE = {
  slowMovingAndNonMovingData: [],
  loader: false,
  slowMovingAndNonMovingConfigData: [],
  slowMovingAndNonMovingConfigLoader: false,
  lowMovingAndNonMovingGraphData: [],
};

const SlowMovingAndNonMoving = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SLOW_MOVING_AND_NON_MOVING_DATA: {
      return {
        ...state,
        slowMovingAndNonMovingData: action?.payload || [],
        loader: false,
      };
    }

    case SLOW_MOVING_AND_NON_MOVING_ERROR: {
      return {
        ...state,
        slowMovingAndNonMovingData: [],
        loader: false,
      };
    }
    case SLOW_MOVING_AND_NON_MOVING_PENDING: {
      return {
        ...state,
        slowMovingAndNonMovingData: [],
        loader: true,
      };
    }

    case SLOW_MOVING_AND_NON_MOVING_CONFIG_DATA: {
      return {
        ...state,
        slowMovingAndNonMovingConfigData: action?.payload || [],
        slowMovingAndNonMovingConfigLoader: false,
      };
    }

    case SLOW_MOVING_AND_NON_MOVING_CONFIG_ERROR: {
      return {
        ...state,
        slowMovingAndNonMovingConfigData: [],
        slowMovingAndNonMovingConfigLoader: false,
      };
    }
    case SLOW_MOVING_AND_NON_MOVING_CONFIG_PENDING: {
      return {
        ...state,
        slowMovingAndNonMovingConfigData: [],
        slowMovingAndNonMovingConfigLoader: true,
      };
    }

    case SLOW_MOVING_AND_NON_MOVING_GRAPH_DATA: {
      return {
        ...state,
        lowMovingAndNonMovingGraphData: action?.payload || [],
      };
    }

    case SLOW_MOVING_AND_NON_MOVING_GRAPH_ERROR: {
      return {
        ...state,
        lowMovingAndNonMovingGraphData: [],
      };
    }
    case SLOW_MOVING_AND_NON_MOVING_GRAPH_PENDING: {
      return {
        ...state,
        lowMovingAndNonMovingGraphData: [],
      };
    }

    default:
      return state;
  }
};
export default SlowMovingAndNonMoving;
