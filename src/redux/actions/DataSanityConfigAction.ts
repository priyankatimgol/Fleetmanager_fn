import { getApiCall, postDataApi } from "apiServices/apiUtils";
import {
  DSC_FETCH_COLUMNS_ERROR,
  DSC_FETCH_COLUMNS_PENDING,
  DSC_FETCH_COLUMNS_RESPONSE,
  DSC_PREFILLED_COLUMNS_ERROR,
  DSC_PREFILLED_COLUMNS_PENDING,
  DSC_PREFILLED_COLUMNS_RESPONSE,
  DSC_SAVE_COLUMNS_ERROR,
  DSC_SAVE_COLUMNS_PENDING,
  DSC_SAVE_COLUMNS_RESPONSE,
  DSC_TABLES_VIEWS_ERROR,
  DSC_TABLES_VIEWS_PENDING,
  DSC_TABLES_VIEWS_RESPONSE,
  SAVE_NO_COMM_DATA,
} from "types/actions/DataSanityConfig.action";
import { showMessage } from "./Common";
import { getNoCommData } from "./SiteHomeActions";

export const setTablesAndViewsDSC = (payload: any) => ({
  type: DSC_TABLES_VIEWS_RESPONSE,
  payload,
});

export const setTablesAndViewsDSCPending = () => ({
  type: DSC_TABLES_VIEWS_PENDING,
});

export const setTablesAndViewsDSCError = () => ({
  type: DSC_TABLES_VIEWS_ERROR,
});

export const fetchColumnsDataForDSC = (payload: any) => ({
  type: DSC_FETCH_COLUMNS_RESPONSE,
  payload,
});

export const fetchColumnsDataForDSCPending = () => ({
  type: DSC_FETCH_COLUMNS_PENDING,
});

export const fetchColumnsDataForDSCError = () => ({
  type: DSC_FETCH_COLUMNS_ERROR,
});

export const saveColumnsDataForDSC = (payload: any) => ({
  type: DSC_SAVE_COLUMNS_RESPONSE,
  payload,
});
export const saveNoCommData = (payload: any) => ({
  type: SAVE_NO_COMM_DATA,
  payload,
});

export const saveColumnsDataForDSCPending = () => ({
  type: DSC_SAVE_COLUMNS_PENDING,
});

export const saveColumnsDataForDSCError = () => ({
  type: DSC_SAVE_COLUMNS_ERROR,
});

export const getPrefilledColumnsDataForDSC = (payload: any) => ({
  type: DSC_PREFILLED_COLUMNS_RESPONSE,
  payload,
});

export const getPrefilledColumnsDataForDSCPending = () => ({
  type: DSC_PREFILLED_COLUMNS_PENDING,
});

export const getPrefilledColumnsDataForDSCError = () => ({
  type: DSC_PREFILLED_COLUMNS_ERROR,
});

export const getTablesAndViewsDSC = () => {
  return (dispatch) => {
    dispatch(setTablesAndViewsDSCPending());
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Analyzer/GetTablesandViewNames`)
      .then((response) => {
        if (response?.code === 200) {
          let manipulatedTablesAndViews = [];
          // eslint-disable-next-line array-callback-return
          response?.data?.map((item) => {
            manipulatedTablesAndViews?.push({ label: item, value: item });
          });

          dispatch(setTablesAndViewsDSC(manipulatedTablesAndViews));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setTablesAndViewsDSCError());
      });
  };
};

export const fetchColumnsData = ({ tableName }) => {
  return (dispatch) => {
    dispatch(fetchColumnsDataForDSCPending());
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Analyzer/GetTableOrViewColumns?tableName=${tableName}`
    )
      .then((response) => {
        if (response?.code === 200) {
          dispatch(fetchColumnsDataForDSC(response?.data));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchColumnsDataForDSCError());
      });
  };
};

export const saveColumnsData = ({ payload }) => {
  return (dispatch) => {
    dispatch(saveColumnsDataForDSCPending());
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Analyzer/AddorUpdateData`, payload)
      .then((response) => {
        if (response?.code === 200) {
          dispatch(saveColumnsDataForDSC(response?.data));
          dispatch(showMessage(response?.message || "Data saved successfully!"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(saveColumnsDataForDSCError());
      });
  };
};
export const noCommSave = (body) => {
  return (dispatch) => {
    // dispatch(saveColumnsDataForDSCPending());
    postDataApi(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/AddorUpdateNoCommReport`, body)
      .then((response) => {
        if (response?.code === 200) {
          console.log("response",response)
          // dispatch(saveNoCommData(response?.data));
          dispatch(getNoCommData());
          dispatch(showMessage(response?.message || "Data saved successfully!"));
        }
      })
      .catch((error) => {
        console.log("response",error)

        // dispatch(saveColumnsDataForDSCError());
      });
  };
};

export const getPrefilledColumnsData = ({ tableName }) => {
  return (dispatch) => {
    dispatch(getPrefilledColumnsDataForDSCPending());
    getApiCall(
      `${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Analyzer/GetDataFilterConditions?tableName=${tableName}`
    )
      .then((response) => {
        if (response?.code === 200) {
          dispatch(getPrefilledColumnsDataForDSC(response?.data));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(getPrefilledColumnsDataForDSCError());
      });
  };
};
