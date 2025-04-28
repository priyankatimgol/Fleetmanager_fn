import React, { useEffect, useState } from 'react'
import Spinner from "pages/common-components/Spinner";
import { Box, CardContent, FormControl, MenuItem, Select, Typography, Card, styled, Grid, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Charts from './Componants';
import { DROPDOWNS, performanceDrop } from 'pages/KPI\'s/components/Section2/KPI/constants';

const barColors = ["#33A5AD", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A"];
const yAxisConfigs = {
    max: 100,
    decimalsInFloat: 0,
    forceNiceScale: false,
    tickAmount: 5
};
const BarChartMaGa = ({ magaData, icon, label: Label }) => {
    const state = useSelector(state => state);
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
    const filterValues = {
        "Power": {
            name: "Power", value: "Power"
        },
        "MA": {
            name: "MA", value: "MA"
        },
        "GA": {
            name: "GA", value: "GA"
        },
    }

    const [selFilter, setSelFilter] = useState(filterValues['MA']);
    const onFilterClick = (value) => {
        setSelFilter(filterValues[value]);
    }

    useEffect(() => {
        if (!magaData || magaData?.length === 0) return setBarData({});
        const filterData = magaData.filter((obj) => {
            if (obj.KPIType === selFilter.name) {
                return obj;
            }
        })
        const filteredData = filterData?.filter(d => d.FilterType === selected);
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
    }, [magaData, selected, selFilter]);

    return (
        <Grid>
            <Grid item md={12} xs={12}>
                <Box ml={5} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box ml={0} mr={6} sx={{ display: "flex", width: "70%" }}>
                        <Typography sx={{ color: "black", fontWeight: 700 }}>Performance Report 1</Typography>
                        <Box ml={1} style={{ display: "flex" }}>
                            <FiberManualRecordIcon
                                style={{ height: "10px", width: "10px", marginTop: "3px", color: "#33A5AD" }}
                            />
                            <Typography ml={1} className="kpi-label">{` ${distinctYear[0]}`}</Typography>
                        </Box>
                        <Box ml={1} style={{ display: "flex" }}>
                            <FiberManualRecordIcon
                                style={{ height: "10px", width: "10px", marginTop: "3px", color: "#FFBF00" }}
                            />
                            <Typography ml={1} className="kpi-label">{`${distinctYear[1]}`}</Typography>
                        </Box>
                        <Box marginLeft={6} sx={{ width: "30%" }}>
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
                                        fontSize: "13px",
                                        "& .MuiSelect-select": {
                                            padding: "2px",
                                        },
                                    }}
                                >
                                    {performanceDrop?.map((d) => (
                                        <MenuItem value={d.value}>{d.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box mr={8} sx={{ display: "flex" }}>
                        <button name="MA" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "MA" && "selected"}`} >MA</button>&nbsp;
                        <button name="GA" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "GA" && "selected"}`} >GA</button>&nbsp;
                        <button name="Power" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "Power" && "selected"}`} >GENERATION</button>&nbsp;
                    </Box>
                </Box>
            </Grid>
            <Grid item md={12} xs={12} mb={2}>
                {selFilter.name === "Power" ? (
                    <Box ml={4} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box ml={0} mr={6}>
                            <Typography variant="h6" fontSize={14} color='#505050'>(kwh)</Typography>
                        </Box>
                    </Box>) : <Box ml={4} mb={8}>
                </Box>
                }
            </Grid>
            <Grid item md={12} xs={12}>
                <Box>
                    {barData?.dataValuesPY?.length > 0 && (
                        <Charts
                            dataLabels={barData.dataLabels}
                            dataValuesPY={barData.dataValuesPY}
                            dataValuesCY={barData.dataValuesCY}
                            distinctYear={distinctYear}
                            barColors={barColors}
                            showLabel={true}
                            yAxisConfigs={selFilter.name === "Power" ? {} : yAxisConfigs}
                            filter={selFilter.name}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}

export default BarChartMaGa