import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Grid, Tooltip } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import { DROPDOWNS } from '../constants';
import { useSelector } from 'react-redux';
import Charts from '../BarCharts';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 5px;
  }
`);

const barColors = ["#45C052", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A"];

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

const IdrvChart = ({ data, icon, label: Label, color }) => {
  const state = useSelector(state => state);
  const Loading = state.siteHomeKpi.loading;
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'IDRV')?.dbname
  
  const label = Label.replace(/\s/g, '');
  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: []
  });

  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const dataValues = [];
    const dataLabels = [];
    data.forEach(d => {
      dataValues.push(parseInt(d.TotalWTG));
      dataLabels.push(d.NCCategory);
    });
    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  }, [data]);

  return (
    <Card className="barCardWrapper">
      <CardContentNoPadding sx={{ height: "185px !important" }} className="barContentWrapper">
        <Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5, zIndex:"9"}}>
              <Tooltip title={dbSource}>
                {icon === "timer" ? (
                  <TimerSVG style={{ width: "16px", height: "16.5px" }} />
                ) : (
                  <TaskSVG style={{ width: "16px", height: "16.5px" }} />
                )}
              </Tooltip>
              <Typography className="kpi-label">{Label}</Typography>

            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            {barData?.dataValues && (
              <Charts
                dataLabels={barData.dataLabels}
                dataValues={barData.dataValues}
                barColors={color}
                showLabel={true}
                yAxisMaxConfigs={yAxisMaxConfigs}
              />
            )}
          </Grid>
        </Grid>
      </CardContentNoPadding>
    </Card>
  )
}

export default IdrvChart