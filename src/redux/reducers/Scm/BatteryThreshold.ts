import {
    GET_BATTERY_THRESHOLD_DATA,
    GET_BATTERY_THRESHOLD_DATA_ERROR,
    GET_BATTERY_THRESHOLD_DATA_PENDING,
    BATTERY_THRESHOLD_CONFIG_DATA,
    BATTER_THRESHOLD_CONFIG_ERROR,
    BATTER_THRESHOLD_CONFIG_PENDING,
    BATTERY_THRESHOLD_GRAPH_DATA,
    BATTERY_THRESHOLD_GRAPH_ERROR,
    BATTERY_THRESHOLD_GRAPH_PENDING,
    GET_BATTERY_THRESHOLD_BOXES,
    GET_BATTERY_THRESHOLD_BOXES_ERROR,
    GET_BATTERY_THRESHOLD_BOXES_PENDING,
  } from "../../../types/actions/Scm/BatteryThreshold";
  
  const INIT_STATE = {
    batteryThresholdData: [],
    loader: false,
    batteryThresholdConfigData: [],
    batteryThresholdGraphData: [],
    batteryThresholdLoader: false,
    betteryThresholdBoxes: [],
    boxesLoader: false,
  };
  
  const BatteryThreshold = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_BATTERY_THRESHOLD_DATA: {
        return {
          ...state,
          batteryThresholdData: action?.payload || [],
          loader: false,
        };
      }
  
      case GET_BATTERY_THRESHOLD_DATA_ERROR: {
        return {
          ...state,
          batteryThresholdData: [],
          loader: false,
        };
      }
      case GET_BATTERY_THRESHOLD_DATA_PENDING: {
        return {
          ...state,
          batteryThresholdData: [],
          loader: true,
        };
      }

      case BATTERY_THRESHOLD_CONFIG_DATA: {
        return {
          ...state,
          batteryThresholdConfigData: action?.payload || [],
          loader: false,
        };
      }
  
      case BATTER_THRESHOLD_CONFIG_ERROR: {
        return {
          ...state,
          batteryThresholdConfigData: [],
          loader: false,
        };
      }
      case BATTER_THRESHOLD_CONFIG_PENDING: {
        return {
          ...state,
          batteryThresholdConfigData: [],
          loader: true,
        };
      }


    case BATTERY_THRESHOLD_GRAPH_DATA: {
      return {
        ...state,
        batteryThresholdGraphData: action?.payload,
        batteryThresholdLoader: false,
      };
    }

    case BATTERY_THRESHOLD_GRAPH_ERROR: {
      return {
        ...state,
        batteryThresholdGraphData: [],
        batteryThresholdLoader: false,
      };
    }

    case BATTERY_THRESHOLD_GRAPH_PENDING: {
      return {
        ...state,
        batteryThresholdGraphData: [],
        batteryThresholdLoader: true,
      };
    }

    case GET_BATTERY_THRESHOLD_BOXES: {
      return {
        ...state,
        betteryThresholdBoxes: action?.payload,
        boxesLoader: false,
      };
    }

    case GET_BATTERY_THRESHOLD_BOXES_ERROR: {
      return {
        ...state,
        betteryThresholdBoxes: [],
        boxesLoader: false,
      };
    }

    case GET_BATTERY_THRESHOLD_BOXES_PENDING: {
      return {
        ...state,
        betteryThresholdBoxes: [],
        boxesLoader: true,
      };
    }
  
      default:
        return state;
    }
  };
  export default BatteryThreshold;
  