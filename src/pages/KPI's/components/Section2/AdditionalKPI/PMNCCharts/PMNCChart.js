import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import Charts from './Components/Charts';
import { useSelector } from 'react-redux';

const barColors = ['#ED0944', '#C24E73', '#3D5E94', '#676A6F', '#C8B42F', '#8F60BC', '#40A480'];

const yAxisMaxConfigs = {
    max: 100,
    decimalsInFloat: 0,
    forceNiceScale: false,
    tickAmount: 5,
};

const PMNCChart = ({ data, icon, label }) => {
    const state = useSelector(state => state);
    const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
    const dbSource = kpiDatabase?.find((d) => d?.kpiname === 'PMNC Status')?.dbname
    const [selected, setSelected] = useState(null);
    const [dropDown, setDropDown] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [barData, setBarData] = useState({
        dataValues: [],
        dataLabels: [],
    });

    useEffect(() => {
        if (!data || data.length === 0) return setBarData({});
        const totalData = data.filter((d) => d.OrderStatus === "Total");
        setFilteredData(totalData);

        const uniqueOrderNos = [...new Set(totalData.map(item => item.order_no))];
        setSelected(uniqueOrderNos[0]);
        setDropDown(uniqueOrderNos);
    }, [data]);

    useEffect(() => {
        if (!filteredData || filteredData.length === 0) return setBarData({});
        const filterData = filteredData.filter(d => d.order_no === selected);
        const dataValues = filterData.map(d => d.Criticality_Count);
        const dataLabels = filterData.map(d => d.Criticality);
        setBarData({ dataValues, dataLabels });
    }, [filteredData, selected]);

    return (
        <Card className="barCardWrapper">
            <CardContent sx={{ height: "191px" }} className="barContentWrapper">
                <Box sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
                    <Tooltip title={dbSource}>
                        {icon === "timer" ? (
                            <TimerSVG style={{ width: "16px", height: "16.5px" }} />
                        ) : (
                            <TaskSVG style={{ width: "16px", height: "16.5px" }} />
                        )}
                    </Tooltip>
                    <Typography className="kpi-label">{label}</Typography>

                    <Box sx={{ width: "30%", ml: "auto" }}>
                        <FormControl variant="standard">
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selected}
                                onChange={(e) => {
                                    setSelected(e.target.value);
                                }}
                                sx={{
                                    fontSize: "11px",
                                    "& .MuiSelect-select": {
                                        padding: "2px",
                                    },
                                }}
                            >
                                {dropDown?.map((d, i) => (
                                    <MenuItem key={d} value={d}>
                                        {d}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Charts
                    dataLabels={barData.dataLabels}
                    dataValues={barData.dataValues}
                    barColors={barColors}
                    showLabel={true}
                // yAxisConfigs={ yAxisConfigs}
                />
            </CardContent>
        </Card>
    );
};

export default PMNCChart;
