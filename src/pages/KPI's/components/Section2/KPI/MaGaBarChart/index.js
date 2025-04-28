import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Grid } from '@mui/material';
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

const BarChartMaGa = ({ data, icon, label: Label }) => {
  const state = useSelector(state => state);
  const Loading = state.siteHomeKpi.loading;
  const label = Label.replace(/\s/g, '');

  const [selected, setSelected] = useState(
    DROPDOWNS[label][1].value
  );
  const [barData, setBarData] = useState({
    dataValues: [20, 50, 70, 40, 30, 40, 50, 60, 70, 80, 90, 100],
    dataLabels: ["Jan", "Feb", "Mar", "Apl", 'May', 'Jun', 'Jully', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  });

  // useEffect(() => {
  //   if (!data || data?.length === 0) return setBarData({});

  //   const filteredData = data.filter(d => d.FilterType === selected);
  //   const dataValues = [];
  //   const dataLabels = [];
  //   filteredData.forEach(d => {
  //     if (label === 'Below95') {
  //       dataValues.push(parseInt(d.Value));
  //     } else {
  //       dataValues.push(d.Value);
  //     }
  //     dataLabels.push(d.ColName);
  //   });

  //   setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  // }, [data, selected]);

  return (
    <Card >
      <Grid className="barContentWrapper">
      <Grid item md={12} xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
            {icon === "timer" ? (
              <TimerSVG style={{ width: "16px", height: "16.5px" }} />
            ) : (
              <TaskSVG style={{ width: "16px", height: "16.5px" }} />
            )}
            <Typography className="kpi-label">{Label}</Typography>
            <Box sx={{ width: "50%", ml: "auto" }}>
              <FormControl variant="standard">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  style={{ zIndex: '9' }}
                  value={selected}
                  onChange={(newVal) => {
                    setSelected(newVal.target.value);
                  }}
                  sx={{
                    fontSize: "11px",
                    "& .MuiSelect-select": {
                      padding: "2px",
                    },
                  }}
                >
                  {DROPDOWNS[label]?.map((d) => (
                    <MenuItem value={d.value}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
       <Grid item md={12} xs={12}>
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
                yAxisConfigs={Label === "Below 95" ? yAxisConfigs : yAxisMaxConfigs}
              />
            )}
          </Box>
        )}
       </Grid>
      </Grid>
    
    </Card>
  )
}

export default BarChartMaGa