import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Grid, Tooltip } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import { DROPDOWNS } from '../constants';
import { useSelector } from 'react-redux';
import Charts from '../TrendChart';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'MA')?.dbname
  const Loading = state.siteHomeKpi.loading;
  const label = Label.replace(/\s/g, '');
  const [distinctYear, setDistinctYear] = useState([])
  const [selected, setSelected] = useState(
    DROPDOWNS[label][0].value
  );
  const [barData, setBarData] = useState({
    dataValuesCY: [],
    dataValuesPY: [],
    dataLabels: [],
  });

  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const filteredData = data?.filter(d => d.FilterType === selected);
    const dataValuesPY = [];
    const dataValuesCY = [];
    const dataLabels = [];
    const distinctY = new Set(filteredData.map(entry => entry.YearCol));
    const distinctYears = [...distinctY];
    setDistinctYear(distinctYears)
    filteredData.forEach(d => {
      if (d.YearCol === distinctYears[0]) {
        dataValuesPY.push(d.Value);
        dataLabels.push(d.ColName);
      } else {
        dataValuesCY.push(d.Value);
      }
    });
    setBarData({ dataValuesPY: dataValuesPY, dataLabels: dataLabels, dataValuesCY: dataValuesCY });
  }, [data, selected]);

  return (
    <Card className="barCardWrapper">
      <CardContentNoPadding sx={{ height: "150px !important" }} className="barContentWrapper">
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
              <Typography className="kpi-label">{Label}</Typography>
              {
                distinctYear?.length > 0 &&
                <>
                  <Box ml={1} style={{ display: "flex" }}>
                    <FiberManualRecordIcon
                      style={{ height: "10px", width: "10px", marginTop: "3px", color: "#45C052" }}
                    />
                    <Typography ml={1} className="kpi-label">{` ${distinctYear[0]}`}</Typography>
                  </Box>
                  <Box ml={1} style={{ display: "flex" }}>
                    <FiberManualRecordIcon
                      style={{ height: "10px", width: "10px", marginTop: "3px", color: "#FFBF00" }}
                    />
                    <Typography ml={1} className="kpi-label">{`${distinctYear[1]}`}</Typography>
                  </Box>
                </>
              }

              <Box sx={{ width: "30%", ml: "auto" }}>
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
            <Box sx={{}}>
              {barData?.dataValuesPY?.length > 0 && (
                <Charts
                  dataLabels={barData.dataLabels}
                  dataValuesPY={barData.dataValuesPY}
                  dataValuesCY={barData.dataValuesCY}
                  distinctYear={distinctYear}
                  barColors={barColors}
                  showLabel={true}
                // yAxisConfigs={ yAxisConfigs}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContentNoPadding>
    </Card>
  )
}

export default BarChartMaGa
