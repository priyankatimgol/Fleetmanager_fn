import { PRIORITY_LIST,POD_LIST, GET_PODTYPES, GET_PODSTATUSES, GET_PODTASKBYID } from "types/actions/POD";

const INIT_STATE = {
    priorityList: [],
    podList:[],
    podTypes: [],
    podSatuses: [],
    podTaskById:{}
};

const PODReducer = (
    state = INIT_STATE,
    action
  ) => {
    switch (action.type) {
      case PRIORITY_LIST: {
        return {
          ...state,
          priorityList: action?.payload
  
        }
      }
      case POD_LIST: {
        return {
          ...state,
          podList: action?.payload
  
        }
      }
      case GET_PODTYPES: {
        return {
          ...state,
          podTypes: action?.payload
  
        }
      }
      case GET_PODSTATUSES: {
        return {
          ...state,
          podSatuses: action?.payload
  
        }
      }
      case GET_PODTASKBYID: {
        return {
          ...state,
          podTaskById: action?.payload
        }
      }
  
      default:
        return state;
    }
  };
  export default PODReducer;