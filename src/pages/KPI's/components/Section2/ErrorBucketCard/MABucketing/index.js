import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, Grid, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import Charts from './Components';
import { useSelector } from 'react-redux';

const barColors = ['#ED0944', '#C24E73', '#3D5E94', '#676A6F', '#C8B42F', '#8F60BC' ,'#40A480'];

const yAxisMaxConfigs = {
  max: 100,
  decimalsInFloat: 0,
  forceNiceScale: false,
  tickAmount: 5,
};
const yAxisConfigs = {
  decimalsInFloat: 0,
  forceNiceScale: false,
}
const MABucketingCard = ({ maBucket, icon, label, data }) => {
  const state = useSelector(state => state);
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'MA Bucketing')?.dbname
  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: [],
  });
  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const filteredData = data.filter(d => d.KPIType === "MA Bucketing");
    const dataValues = [];
    const dataLabels = [];
    filteredData.forEach(d => {
      if (label === "MA Bucketing") {
        dataValues.push(d.Value);
      } 
      dataLabels.push(d.FilterType);
    });

    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  }, [data]);

  return (
    <Card className="barCardWrapper">
      <CardContent sx={{height:"191px"}} className="barContentWrapper">
      <Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5, position: "relative" }}>
            <Tooltip title={dbSource}>
              {icon === "timer" ? (
                <TimerSVG style={{ width: "16px", height: "16.5px" }} />
              ) : (
                <TaskSVG style={{ width: "16px", height: "16.5px" }} />
              )}
              </Tooltip>
              <Typography className="kpi-label">{label}</Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{}}>
                <Charts
                  dataLabels={barData?.dataLabels}
                  dataValues={barData?.dataValues}
                  barColors={barColors}
                  showLabel={true}
                  // yAxisConfigs={ yAxisConfigs}
                />
            </Box>
          </Grid>
        </Grid>         
      </CardContent>
    </Card>
  );
};

export default MABucketingCard;
