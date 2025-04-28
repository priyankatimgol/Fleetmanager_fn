import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnpredictableFailureReportData,
  getUnpredictableFailureReportConfigData,
  getBatteryConsumptionVsReturnBoxes,
  getUnpredictableFailureReportCompareQuantityData,
  getUnpredictableFailureReportCurrentFyData,
  getUnpredictableFailureReportLastThreeData,
  getUnpredictableFailureReportQuaterlyData,
  getUnpredictableFailureReportTotalYearsData,
  getUnpredictableFailureReportTopValuesData,
} from "redux/actions/Scm/UnpredictableFailureReport";

const useUnpredictable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnpredictableFailureReportData());
    dispatch(getUnpredictableFailureReportConfigData());
    dispatch(getBatteryConsumptionVsReturnBoxes());
    dispatch(getUnpredictableFailureReportCompareQuantityData());
    dispatch(getUnpredictableFailureReportCurrentFyData());
    dispatch(getUnpredictableFailureReportLastThreeData());
    dispatch(getUnpredictableFailureReportQuaterlyData());
    dispatch(getUnpredictableFailureReportTotalYearsData());
    dispatch(getUnpredictableFailureReportTopValuesData());
  }, []);

  const {
    unpredictableData,
    unpredictableLoader,
    unpredictableConfigData,
    unpredictableConfigLoader,
    unpredictableDataBoxes,
    unpredictableCompareQuantity,
    unpredictableCurrentFy,
    unpredictableLastThree,
    unpredictableQuaterly,
    unpredictableTotalYears,
    unpredictableTopValuesData,
  } = useSelector((state: any) => state.UnpredictableFailureReport);

  return {
    unpredictableData,
    unpredictableLoader,
    unpredictableConfigData,
    unpredictableConfigLoader,
    unpredictableDataBoxes,
    unpredictableCompareQuantity,
    unpredictableCurrentFy,
    unpredictableLastThree,
    unpredictableQuaterly,
    unpredictableTotalYears,
    unpredictableTopValuesData,
  };
};

export default useUnpredictable;
