import { HANDLE_LOADER_SITE_MAPPING, SET_ROLE_NAME, SET_SEARCH_SELECTIONS, SET_SITE_MAPPING, SET_USER_MAPPING } from "types/actions/UserSiteMapping";


const INIT_STATE = {
  loader: false,
  userMapping: [],
  userSitesMapping:[],
  searchAbleSelections:{},
  roleNameSelection:[]
};

const UserSiteMapping = (state = INIT_STATE, action) => {
  switch (action.type) {
    case HANDLE_LOADER_SITE_MAPPING: {
      return {
        ...state,
        loader: action?.payload,
      };
    }
    case SET_SITE_MAPPING: {
      return {
        ...state,
        userSitesMapping: action?.payload,
      };
    }
    case SET_USER_MAPPING: {
      return {
        ...state,
        userMapping: action?.payload,
      };
    }
    case SET_SEARCH_SELECTIONS: {
      return {
        ...state,
        searchAbleSelections: action?.payload,
      };
    }
    case SET_ROLE_NAME: {
      return {
        ...state,
        roleNameSelection: action?.payload,
      };
    }
    default:
      return state;
  }
};
export default UserSiteMapping;
