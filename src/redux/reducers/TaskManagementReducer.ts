import {
  GET_TASK_DROPDOWN_VALUES,
  GET_TASK_STATUS,
  UPDATE_KANBAN_BOARD_CONTROLLER,
  GET_TASK_TICKET_BY_ID,
  GET_HISTORY_TASK,
  GET_SEARCHQUERY,
  SET_UPDATE_MODAL_STATUS,
  GET_TASK_DOCCUMNET,
  DOCLOADING,
  GET_BOARD_TYPE,
  GET_KANBAN_BOARD_CONTROLLER,
  GET_KANBAN_BOARD_CONTROLLER_RESET,
  GET_BOARD_TYPE_LIST_VIEW,
  GET_KANBAN_PAGINATION_CONTROLLER,
  GET_TASK_TYPE,
  UPDATE_KANBAN_BOARD_PAGINATION_CONTROLLER,
  GET_LOADER_UPDATE,
} from "types/actions/TaskManagement";

const INIT_STATE = {
  statusList: [],
  loader: false,
  kanbanContoller:[],
  kanbanPagination:[],
  tickets_details: [],
  ticketById: {},
  taskType:'',
  dropdowns: {},
  historyOfTask: [],
  searchData: "",
  updateModal: false,
  taskDoccuments:[],
  docLoading: false,
  boardType: 'Kanban'
};

const TaskManagementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TASK_STATUS: {
      return {
        ...state,
        statusList: action?.payload,
      };
    }
    case GET_LOADER_UPDATE: {
      return {
        ...state,
        loader: action?.payload,
      };
    }
    case GET_BOARD_TYPE: {
      return {
        ...state,
        boardType: action?.payload,
      };
    }
    case GET_TASK_TYPE: {
      return {
        ...state,
        taskType: action?.payload,
      };
    }
    case GET_BOARD_TYPE_LIST_VIEW: {
      return {
        ...state,
        tickets_details: action?.payload,
      };
    }
    case GET_KANBAN_BOARD_CONTROLLER: {
      return {
        ...state,
        kanbanContoller: { ...action?.payload, ...state.kanbanContoller }
      };
    }
    case GET_KANBAN_PAGINATION_CONTROLLER: {
      return {
        ...state,
        kanbanPagination: { ...action?.payload, ...state.kanbanPagination }
      };
    }
    case UPDATE_KANBAN_BOARD_CONTROLLER: {
      return {
        ...state,
        kanbanContoller: {...state.kanbanContoller,
          [action.category]: action?.payload},
      };
    }
    case UPDATE_KANBAN_BOARD_PAGINATION_CONTROLLER: {
      return {
        ...state,
        kanbanPagination: {...state.kanbanPagination,
          [action.category]: action?.payload},
      };
    }
    case GET_KANBAN_BOARD_CONTROLLER_RESET: {
      return {
        ...state,
        kanbanContoller: {},
        kanbanPagination: {},
      };
    }
    case GET_TASK_TICKET_BY_ID: {
      return {
        ...state,
        ticketById: action?.payload,
      };
    }
    case GET_TASK_DROPDOWN_VALUES: {
      return {
        ...state,
        dropdowns: {
          ...state.dropdowns,
          [action.category]: action?.payload?.commonMasterLists,
        },
      };
    }
    case GET_HISTORY_TASK: {
      return {
        ...state,
        historyOfTask: action?.payload,
      };
    }
    case GET_SEARCHQUERY: {
      return {
        ...state,
        searchData: action?.payload,
      };
    }
    case SET_UPDATE_MODAL_STATUS: {
      return {
        ...state,
        updateModal: action?.payload,
      }
    }

    case GET_TASK_DOCCUMNET: {
      return {
        ...state,
        taskDoccuments: action?.payload,
      };
    }
    case DOCLOADING: {
      return {
        ...state,
        docLoading: action?.payload,

      };
    }
    default:
      return state;
  }
};
export default TaskManagementReducer;
