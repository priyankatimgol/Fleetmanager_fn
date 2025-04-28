import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Tooltip } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import Charts from '../BarChart/components/chart';
import { DROPDOWNS } from '../constants';
import { useSelector } from 'react-redux';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 5px;
  }
`);

const barColors = ['#26A0FC', '#26E7A6', '#FEBC3B', '#FF6178', '#26A0FC', '#26E7A6', '#FEBC3B', '#FF6178'];

const yAxisMaxConfigs = {
  max: 100,
  decimalsInFloat: 0,
  forceNiceScale: false,
  tickAmount: 5,
};

const yAxisConfigs = {
  decimalsInFloat: 0,
  forceNiceScale: false,
  tickAmount: 5,
}

const BarChartMTBF = ({ data, icon, label: Label }) => {
  const state = useSelector(state => state);
  const Loading = state.siteHomeKpi.loading;
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'MTBF')?.dbname
  const label = Label.replace(/\s/g, '');

  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: []
  });

  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});

    const filteredData = data
    const dataValues = [];
    const dataLabels = [];
    filteredData.forEach(d => {
      dataValues.push(d.Value);
      dataLabels.push(d.ColName);
    });

    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  }, [data]);

  return (
    <Card className="barCardWrapper">
      <CardContentNoPadding sx={{ height: '145px !important' }} className="barContentWrapper">
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
          <Tooltip title={dbSource}>
            {icon === "timer" ? (
              <TimerSVG style={{ width: "16px", height: "16.5px" }} />
            ) : (
              <TaskSVG style={{ width: "16px", height: "16.5px" }} />
            )}
          </Tooltip>
          <Typography className="kpi-label">{Label}</Typography>
          <Box ml={2}>
            <Typography className="kpi-label">S9x and Above:140Hrs, S88 and Below:100Hrs</Typography>
          </Box>
        </Box>
        {Loading.includes('MA_GA') ? (
          <Spinner />
        ) : (
          <Box className="chartWrapper">
            {barData?.dataValues?.length > 0 && (
              <Charts
                dataLabels={barData.dataLabels}
                dataValues={barData.dataValues}
                barColors={barColors}
                showLabel={true}
                data={data}

              />
            )}
          </Box>
        )}
      </CardContentNoPadding>
    </Card>
  )
}

export default BarChartMTBF