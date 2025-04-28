import {
  HANDLE_LOADER,
  SET_ROLE_BY_GROUP,
  SET_USER_MASTER_LISTING
} from "types/actions/UserMaster";

const INIT_STATE = {
  loader: false,
  roleByGroup: [],
  selectListing: [],
};

const GroupMaster = (state = INIT_STATE, action) => {
  switch (action.type) {
    case HANDLE_LOADER: {
      return {
        ...state,
        loader: action?.payload,
      };
    }
    case SET_ROLE_BY_GROUP: {
      return {
        ...state,
        roleByGroup: action?.payload,
      };
    }
    case SET_USER_MASTER_LISTING: {
      return {
        ...state,
        selectListing: action?.payload,
      };
    }
    default:
      return state;
  }
};
export default GroupMaster;
