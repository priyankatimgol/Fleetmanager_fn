import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Grid, Tooltip } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import { DROPDOWNS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import Charts from '../BarCharts';
import { getLsSelectedDrop, getPmSelectedDrop, getTciSelectedDrop } from 'redux/actions/SiteHomeActions';

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

const BarChartPmLsTci = ({ data, icon, label: Label, color }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state);
  const Loading = state.siteHomeKpi.loading;
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'PM')?.dbname
  const label = Label.replace(/\s/g, '');
  const [dropDown, setDropDown] = useState(null);
  const [selected, setSelected] = useState(null);
  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: []
  });
  useEffect(() => {
    if (!data || data?.length === 0) return setBarData([]);
    if (data?.length > 0) {
      const dropDown = data.map((d) => {
        return { name: d.FilterType, value: d.FilterType, KPIType: d.KPIType };
      });
      var uniqueObjectMap = {};
      var uniqueObjects = [];
      dropDown?.forEach((d) => {
        var key = JSON.stringify(d);
        if (!uniqueObjectMap[key]) {
          uniqueObjectMap[key] = true;
          uniqueObjects.push(d);
        }
      })
      const pmDropdown = uniqueObjects?.filter((d) => d?.KPIType === "PM")
      if (pmDropdown?.length > 0) {
        dispatch(getPmSelectedDrop({ dropValue: pmDropdown[0]?.value, labelName: label }))
      }
      const lsDropdown = uniqueObjects?.filter((d) => d?.KPIType === "LS")
      if (lsDropdown?.length > 0) {
        dispatch(getLsSelectedDrop({ dropValue: lsDropdown[0]?.value, labelName: label }))
      }
      const tciDropdown = uniqueObjects?.filter((d) => d?.KPIType === "TCI")
      if (tciDropdown?.length > 0) {
        dispatch(getTciSelectedDrop({ dropValue: tciDropdown[0]?.value, labelName: label }))
      }
      setSelected(data[0].FilterType);
      setDropDown(null)
      setDropDown(uniqueObjects);
    } else {
      setDropDown(null);
    }
  }, [data]);

  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const filteredData = data.filter(d => d.FilterType === selected);
    const dataValues = [];
    const dataLabels = [];
    const seqObj = {
      "Total WTG": '',
      "Planned": '',
      "Completed": '',
      "Pending": ''
    };
    Object.keys(seqObj).forEach((key) => {
      for (let i = 0; i <= filteredData.length; i++) {
        if (filteredData[i]?.ColumnName && filteredData[i]?.ColumnName === key) {
          // seqObj[key] = filteredData[i].Value;
          dataLabels.push(key);
          dataValues.push(filteredData[i].Value);
          return;
        } else {
          continue;
        }
      }
    })

    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  }, [data, selected]);

  return (
    <Card className="barCardWrapper">
      <CardContentNoPadding sx={{ height: "155px !important" }} className="barContentWrapper">
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
              {
                dropDown && (<Box sx={{ width: "30%", ml: "auto" }}>
                  <FormControl variant="standard">
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      style={{ zIndex: '9' }}
                      value={selected}
                      onChange={(newVal) => {
                        if (label === "PM") {
                          dispatch(getPmSelectedDrop({ dropValue: newVal.target.value, labelName: label }))
                        }
                        if (label === "LS") {
                          dispatch(getLsSelectedDrop({ dropValue: newVal.target.value, labelName: label }))
                        }
                        if (label === "TCI") {
                          dispatch(getTciSelectedDrop({ dropValue: newVal.target.value, labelName: label }))
                        }
                        setSelected(newVal.target.value);
                      }}
                      sx={{
                        fontSize: "11px",
                        "& .MuiSelect-select": {
                          padding: "2px",
                        },
                      }}
                    >
                      {dropDown.map((d) => (
                        <MenuItem key={d.name} value={d.value}>
                          {d.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>)
              }

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

export default BarChartPmLsTci