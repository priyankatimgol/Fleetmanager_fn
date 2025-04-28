import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, Typography, Grid } from '@mui/material';
import Charts from './components/Charts';

const MAGAvsWindChart = ({ magaData, icon, label: Label }) => {
  const [barData, setBarData] = useState({
    dataWinds: [],
    dataColumn: [],
    dataPowers: []
  });

  const filterValues = {
    "1D": {
      name: "Day", value: "1D"
    },
    "1W": {
      name: "Week", value: "1W"
    },
    "1M": {
      name: "Month", value: "1M"
    },
    "3M": {
      name: "3 Month", value: "3M"
    },
    "6M": {
      name: "6 Month", value: "6M"
    },
  }
  const [selFilter, setSelFilter] = useState(filterValues['1M']);
  const onFilterClick = (value) => {
    setSelFilter(filterValues[value]);
  }

  useEffect(() => {
    const filterData = magaData.filter((obj) => {
      if (obj.filtertype === selFilter.name) {
        return obj;
      }
    })
    console.log(filterData, "filterData");
    if (!filterData || filterData?.length === 0) return setBarData({});
    const dataWinds = [];
    const dataColumn = [];
    const dataPowers = [];

    filterData.forEach(d => {
      dataWinds.push(d.wind_speed);
      dataColumn.push(d.x_colms);
      dataPowers.push(d.powers);
    });
    setBarData({ dataWinds: dataWinds, dataColumn: dataColumn, dataPowers: dataPowers });
  }, [magaData, selFilter]);

  return (
    <Grid>
      <Grid item md={12} xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "black", fontWeight: 700 }}>Performance Report 2</Typography>
          <Box mr={4} marginBottom={2} sx={{ display: "flex" }}>
            <button name="1D" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1D" && "selected"}`} >1D</button>&nbsp;
            <button name="1W" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1W" && "selected"}`} >1W</button>&nbsp;
            <button name="1M" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1M" && "selected"}`} >1M</button>&nbsp;
            <button name="3M" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "3M" && "selected"}`} >3M</button>&nbsp;
            <button name="6M" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "6M" && "selected"}`} >6M</button>&nbsp;
          </Box>
        </Box>
        <Box ml={5} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box ml={0} mr={6} mb={2}>
            <Typography variant="h6" fontSize={14} color='#505050'>Power(kwh)</Typography>
          </Box>
          <Box mr={6}>
            <Typography variant="h6" fontSize={14} color='#505050'>WindSpeed</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item md={12} xs={12}>
        <Box sx={{}}>
          {barData?.dataWinds?.length > 0 && (
            <Charts
              dataWinds={barData.dataWinds}
              dataColumn={barData.dataColumn}
              dataPowers={barData.dataPowers}
              showLabel={true}
            // yAxisConfigs={ yAxisConfigs}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default MAGAvsWindChart