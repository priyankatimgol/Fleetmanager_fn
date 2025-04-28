import { getApiCall, postDataApi } from "apiServices/apiUtils";
import {
  GET_XY_AXIS_COLUMNS_ERROR,
  GET_XY_AXIS_COLUMNS_PENDING,
  GET_XY_AXIS_COLUMNS_RESPONSE,
  SUBMIT_XY_AXIS_COLUMNS_ERROR,
  SUBMIT_XY_AXIS_COLUMNS_PENDING,
  SUBMIT_XY_AXIS_COLUMNS_RESPONSE,
} from "types/actions/XYAxisMapping";
import { showMessage } from "./Common";

const saveXYAxisColumns = ({ payload }) => ({
  type: SUBMIT_XY_AXIS_COLUMNS_RESPONSE,
  payload,
});

const saveXYAxisColumnsError = () => ({
  type: SUBMIT_XY_AXIS_COLUMNS_ERROR,
});

const saveXYAxisColumnsPending = () => ({
  type: SUBMIT_XY_AXIS_COLUMNS_PENDING,
});

const getXYAxisColumns = ({ payload }) => ({
  type: GET_XY_AXIS_COLUMNS_RESPONSE,
  payload,
});

const getXYAxisColumnsError = () => ({
  type: GET_XY_AXIS_COLUMNS_ERROR,
});

const getXYAxisColumnsPending = () => ({
  type: GET_XY_AXIS_COLUMNS_PENDING,
});

export const submitColumnsData = ({ payload }) => {
  return (dispatch) => {
    dispatch(saveXYAxisColumnsPending());
    postDataApi(`${process.env.REACT_APP_KPI_ANALYZER}/api/Analyzer/AddOrUpdateColumnXYMapping`, payload)
      .then((response) => {
        if (response?.code === 200) {
          dispatch(saveXYAxisColumns(response?.data));
          dispatch(showMessage(response?.message || "Data saved successfully!"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(saveXYAxisColumnsError());
      });
  };
};

export const getXYColumns = ({ tableName }) => {
  return (dispatch) => {
    dispatch(getXYAxisColumnsPending());
    getApiCall(`${process.env.REACT_APP_KPI_ANALYZER}/api/Analyzer/GetColumnXYMapping?tableName=${tableName}`)
      .then((response) => {
        if (response?.code === 200) {
          dispatch(getXYAxisColumns({ payload: response?.data }));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(getXYAxisColumnsError());
      });
  };
};
