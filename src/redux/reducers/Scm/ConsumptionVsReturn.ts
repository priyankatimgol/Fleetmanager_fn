import {
  GET_ACTUAL_CONSTUMTION_VS_RETURN_DATA_FOR_PLANT,
  GET_CONSTUMTION_VS_RETURN_ERROR,
  GET_CONSTUMTION_VS_RETURN_PENDING,
  COSUMPTION_VS_RETURN_GRAPH_DATA,
  COSUMPTION_VS_RETURN_GRAPH_ERROR,
  COSUMPTION_VS_RETURN_GRAPH_PENDING,
  GET_ACTUAL_CONSTUMTION_VS_RETURN_CONFIG_DATA,
  GET_CONSUMPTION_VS_RETURN_BOXES,
  GET_CONSUMPTION_VS_RETURN_BOXES_ERROR,
  GET_CONSUMPTION_VS_RETURN_BOXES_PENDING,
} from "../../../types/actions/Scm/ConsumptionVsReturn";

const INIT_STATE = {
  consumptionVsReturnDataForPlant: [],
  loader: false,
  consuptionVsReturnGraphData: [],
  consVsReturnLoader: [],
  consumptionVsReturnConfigData: [],
  constumptionVsReturnBoxes: [],
  boxesLoader: false,
};

const ConsumptionVsReturn = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ACTUAL_CONSTUMTION_VS_RETURN_DATA_FOR_PLANT: {
      return {
        ...state,
        consumptionVsReturnDataForPlant: action?.payload || [],
        loader: false,
      };
    }

    case GET_CONSTUMTION_VS_RETURN_ERROR: {
      return {
        ...state,
        consumptionVsReturnDataForPlant: [],
        loader: false,
      };
    }
    case GET_CONSTUMTION_VS_RETURN_PENDING: {
      return {
        ...state,
        consumptionVsReturnDataForPlant: [],
        loader: true,
      };
    }

    case COSUMPTION_VS_RETURN_GRAPH_DATA: {
      return {
        ...state,
        consuptionVsReturnGraphData: action?.payload,
        consVsReturnLoader: false,
      };
    }

    case COSUMPTION_VS_RETURN_GRAPH_ERROR: {
      return {
        ...state,
        consuptionVsReturnGraphData: [],
        consVsReturnLoader: false,
      };
    }

    case COSUMPTION_VS_RETURN_GRAPH_PENDING: {
      return {
        ...state,
        consuptionVsReturnGraphData: [],
        consVsReturnLoader: true,
      };
    }

    case GET_ACTUAL_CONSTUMTION_VS_RETURN_CONFIG_DATA: {
      return {
        ...state,
        consumptionVsReturnConfigData: action?.payload || [],
      };
    }

    case GET_CONSUMPTION_VS_RETURN_BOXES: {
      return {
        ...state,
        constumptionVsReturnBoxes: action?.payload,
        boxesLoader: false,
      };
    }

    case GET_CONSUMPTION_VS_RETURN_BOXES_ERROR: {
      return {
        ...state,
        constumptionVsReturnBoxes: [],
        boxesLoader: false,
      };
    }

    case GET_CONSUMPTION_VS_RETURN_BOXES_PENDING: {
      return {
        ...state,
        constumptionVsReturnBoxes: [],
        boxesLoader: true,
      };
    }

    default:
      return state;
  }
};
export default ConsumptionVsReturn;
