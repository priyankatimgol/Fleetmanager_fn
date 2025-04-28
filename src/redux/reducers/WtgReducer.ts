import {
  GET_MAGAVSWIND,
  GET_WTGMA_GA,
  GET_WTGMTTR_MTBF,
  GET_WTGTOPERRORS,
  GET_WTGWINDPOWERGENERATION,
  GET_WTG_COMPONET_LOADER,
  GET_WTG_LOADER_UPDATE,
  GET_WTG_TURBINS,
} from "types/actions/WTGConstants";

const INIT_STATE = {
  wtgWindPowerGeneration: {},
  wtgTurbinData: [],
  wtgLoader: true,
  wtgMttrMtbf: [],
  wtgMttrMtbfLoader: true,
  wtgMA_GA: [],
  wtgMA_GALoader: true,
  top10Errors: [],
  top10ErrorsLoader: true,
  magaVsWind: [],
  MAGAvsWindLoader: true
};

const WTGScreen = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WTGWINDPOWERGENERATION: {
      return {
        ...state,
        wtgWindPowerGeneration: action?.payload,
      };
    }
    case GET_WTG_TURBINS: {
      return {
        ...state,
        wtgTurbinData: action?.payload,
      };
    }
    case GET_WTG_LOADER_UPDATE: {
      return {
        ...state,
        wtgLoader: action?.payload,
      };
    }
    case GET_WTG_COMPONET_LOADER: {
      return {
        ...state,
        [action.category]: action?.payload,
      };
    }
    case GET_WTGMTTR_MTBF: {
      return {
        ...state,
        wtgMttrMtbf: action?.payload,
      };
    }

    case GET_WTGMA_GA: {
      return {
        ...state,
        wtgMA_GA: action?.payload,
      };
    }

    case GET_WTGTOPERRORS: {
      return {
        ...state,
        top10Errors: action?.payload,
      };
    }
    case GET_MAGAVSWIND: {
      return {
        ...state,
        magaVsWind: action?.payload,
      };
    }

    default:
      return state;
  }
};
export default WTGScreen;
