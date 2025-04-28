import {
  PM_CRITICAL_MATERIAL_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_CONFIG_ERROR,
  PM_CRITICAL_MATERIAL_CONFIG_PENDING,
  PM_CRITICAL_MATERIAL_DATA,
  PM_CRITICAL_MATERIAL_DATA_ERROR,
  PM_CRITICAL_MATERIAL_DATA_PENDING,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CATEGORIES_DATA_PENDING,
  PM_CRITICAL_MATERIAL_GRAPH_DATA,
  PM_CRITICAL_MATERIAL_GRAPH_ERROR,
  PM_CRITICAL_MATERIAL_GRAPH_PENDING,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_DATA,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_ERROR,
  PM_CRITICAL_MATERIAL_GRAPH_RERENDER_PENDING,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_PENDING,
  PM_CRITICAL_MATERIAL_OPR_DATA,
  PM_CRITICAL_MATERIAL_OPR_DATA_ERROR,
  PM_CRITICAL_MATERIAL_OPR_DATA_PENDING,
  PM_CRITICAL_MATERIAL_POD_DATA,
  PM_CRITICAL_MATERIAL_POD_DATA_ERROR,
  PM_CRITICAL_MATERIAL_POD_DATA_PENDING,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_PENDING,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_PENDING,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_ERROR,
  PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_PENDING,
} from "../../../types/actions/Scm/PMCriticalMaterial";

const INIT_STATE = {
  pmCriticalMaterial: [],
  loader: false,
  pmCriticalMatirialConfigData: [],
  pmGraphData: [],
  pmGraphDataLoader: false,
  categories: [],
  pmStocks: [],
  pmOPR: [],
  pmPOD: [],
  pmStocksConfig: [],
  pmOPRConfig: [],
  pmPODConfig: [],
};

const BatteryThreshold = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PM_CRITICAL_MATERIAL_DATA: {
      return {
        ...state,
        pmCriticalMaterial: action?.payload || [],
        loader: false,
      };
    }

    case PM_CRITICAL_MATERIAL_DATA_ERROR: {
      return {
        ...state,
        pmCriticalMaterial: [],
        loader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_DATA_PENDING: {
      return {
        ...state,
        pmCriticalMaterial: [],
        loader: true,
      };
    }

    case PM_CRITICAL_MATERIAL_CONFIG_DATA: {
      return {
        ...state,
        pmCriticalMatirialConfigData: action?.payload || [],
        loader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_CONFIG_ERROR: {
      return {
        ...state,
        pmCriticalMatirialConfigData: [],
        loader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_CONFIG_PENDING: {
      return {
        ...state,
        pmCriticalMatirialConfigData: [],
        loader: true,
      };
    }

    case PM_CRITICAL_MATERIAL_GRAPH_DATA: {
      return {
        ...state,
        pmGraphData: action?.payload || [],
        pmGraphDataLoader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_GRAPH_ERROR: {
      return {
        ...state,
        pmGraphData: [],
        pmGraphDataLoader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_GRAPH_PENDING: {
      return {
        ...state,
        pmGraphData: [],
        pmGraphDataLoader: true,
      };
    }

    case PM_CRITICAL_MATERIAL_GRAPH_RERENDER_DATA: {
      return {
        ...state,
        pmGraphData: action?.payload || [],
        pmGraphDataLoader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_GRAPH_RERENDER_ERROR: {
      return {
        ...state,
        pmGraphData: [],
        pmGraphDataLoader: false,
      };
    }
    case PM_CRITICAL_MATERIAL_GRAPH_RERENDER_PENDING: {
      return {
        ...state,
        pmGraphData: [],
        pmGraphDataLoader: true,
      };
    }

    case PM_CRITICAL_MATERIAL_CATEGORIES_DATA: {
      return {
        ...state,
        categories: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_CATEGORIES_DATA_ERROR: {
      return {
        ...state,
        categories: [],
      };
    }
    case PM_CRITICAL_MATERIAL_CATEGORIES_DATA_PENDING: {
      return {
        ...state,
        categories: [],
      };
    }

    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA: {
      return {
        ...state,
        pmStocks: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_ERROR: {
      return {
        ...state,
        pmStocks: [],
      };
    }
    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_DATA_PENDING: {
      return {
        ...state,
        pmStocks: [],
      };
    }

    case PM_CRITICAL_MATERIAL_OPR_DATA: {
      return {
        ...state,
        pmOPR: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_OPR_DATA_ERROR: {
      return {
        ...state,
        pmOPR: [],
      };
    }
    case PM_CRITICAL_MATERIAL_OPR_DATA_PENDING: {
      return {
        ...state,
        pmOPR: [],
      };
    }

    case PM_CRITICAL_MATERIAL_POD_DATA: {
      return {
        ...state,
        pmPOD: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_POD_DATA_ERROR: {
      return {
        ...state,
        pmPOD: [],
      };
    }
    case PM_CRITICAL_MATERIAL_POD_DATA_PENDING: {
      return {
        ...state,
        pmPOD: [],
      };
    }


    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA: {
      return {
        ...state,
        pmStocksConfig: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_ERROR: {
      return {
        ...state,
        pmStocksConfig: [],
      };
    }
    case PM_CRITICAL_MATERIAL_CURRENT_STOCK_CONFIG_DATA_PENDING: {
      return {
        ...state,
        pmStocksConfig: [],
      };
    }

    case PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA: {
      return {
        ...state,
        pmOPRConfig: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_ERROR: {
      return {
        ...state,
        pmOPRConfig: [],
      };
    }
    case PM_CRITICAL_MATERIAL_OPR_CONFIG_DATA_PENDING: {
      return {
        ...state,
        pmOPRConfig: [],
      };
    }

    case PM_CRITICAL_MATERIAL_POD_CONFIG_DATA: {
      return {
        ...state,
        pmPODConfig: action?.payload || [],
      };
    }
    case PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_ERROR: {
      return {
        ...state,
        pmPODConfig: [],
      };
    }
    case PM_CRITICAL_MATERIAL_POD_CONFIG_DATA_PENDING: {
      return {
        ...state,
        pmPODConfig: [],
      };
    }

    default:
      return state;
  }
};
export default BatteryThreshold;
