import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getKPI_Tiles,
  getTotalConsumptionForYear,
  getCompareConsumptionQuantity,
  getConsumptionAmountForLastThree,
  getConsumptionAmountForCurrentFy,
  getTop10ConsumptionValue,
  getConsumption,
  getConsumptionForQuarter,
} from 'redux/actions/Scm/TopFifty';

const useTopfifty = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKPI_Tiles());
    dispatch(getTotalConsumptionForYear());
    dispatch(getCompareConsumptionQuantity());
    dispatch(getConsumptionAmountForLastThree());
    dispatch(getConsumptionAmountForCurrentFy());
    dispatch(getTop10ConsumptionValue());
    // dispatch(getConsumption())
    dispatch(getConsumptionForQuarter());
  }, []);

  const {
    KPI_tiles,
    loading,
    CompareConsumptionQuantity,
    Top10ConsumptionValue,
    TotalConsumptionForYear,
    ConsumptionAmountForLastThree,
    ConsumptionAmountForCurrentFy,
    Consumption,
    ColumnDef,
    ConsumptionForQuarter,
  } = useSelector((state: any) => state.ConsumptionReducer);

  return {
    KPI_tiles,
    loading,
    CompareConsumptionQuantity,
    Top10ConsumptionValue,
    TotalConsumptionForYear,
    ConsumptionAmountForLastThree,
    ConsumptionAmountForCurrentFy,
    Consumption,
    ColumnDef,
    ConsumptionForQuarter,
  };
};

export default useTopfifty;
