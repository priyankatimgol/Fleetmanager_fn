import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProgressBarCard from './ProgressBar';
import CircleBarCard from './CircleBar';
import { useDispatch, useSelector } from 'react-redux';

const PlanningKPI = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const PlanningKPIData = state.siteHomeKpi.planningKpi;

  const [progressBarData, setProgressBarData] = useState([]);
  const [circularBarData, setCircularBarData] = useState([]);

  useEffect(() => {
    if (PlanningKPIData.length > 0) {
      const progressBarData = PlanningKPIData.filter(data => data.columnname === "Percentage Bar")
      setProgressBarData(progressBarData);
      const circularBarData = PlanningKPIData.filter(data => data.columnname === "Circular Bar")
      setCircularBarData(circularBarData);
    }
  },[PlanningKPIData])

  return (
    <>
      {
        progressBarData?.map((data, ind) => (
          <ProgressBarCard key={ind}
            icon={(ind + 1) % 2 === 0 ? 'planning' : 'statistics'}
            title={data.parameter}
            open={data.topen}
            total={data.total}
            index={ind}
          />
        ))
      }
      {
        circularBarData?.map((data, ind) => (
          <CircleBarCard key={ind}
            icon='planning'
            title={data.parameter}
            available={parseInt(data.value)}
            total={parseInt(data.total)}
            index={ind}
          />
        ))
      }
    </>
  );
};

export default PlanningKPI;