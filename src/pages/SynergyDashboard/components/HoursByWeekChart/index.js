import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, Grid, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Charts from './Componant/Charts';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Colors = ['#ED0944', '#C24E73', '#3D5E94', '#676A6F', '#C8B42F', '#8F60BC', '#40A480'];

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
const HoursByWeekChart = ({ data, icon, label }) => {
    const [selected, setSelected] = useState("")
    const [barColors, setBarColors] = useState(['#ED0944'])
    const [barData, setBarData] = useState({
        dataValues: [],
        dataLabels: [],
        stateLabels: []
    });
    useEffect(()=>{
         setSelected(data[0]?.StateName);
    },[])

    useEffect(() => {
        if (!data || data?.length === 0) return setBarData({});
        const dataValues = [];
        const dataLabels = [];
        const stateLabels = [];
        data.forEach(d => {
            stateLabels.push(d.StateName)
        });
        const filteredData = data?.filter((d) => d?.StateName === selected)
        filteredData.forEach(d => {
            dataValues.push(d.Hrs);
            dataLabels.push(d.Weekno);
            stateLabels.push(d.StateName)
        });
        setBarData({ dataValues: dataValues, dataLabels: dataLabels, stateLabels: [...new Set(stateLabels)] });
    }, [data, selected]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
                >
                    <span style={{ padding: "0 5px", display: 'flex' }}>
                        <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                    </span>
                    BD Hours by Week
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <Box sx={{}}>
                    {/* Assuming Charts is a valid component */}
                    <Charts
                        dataLabels={barData?.dataLabels}
                        dataValues={barData?.dataValues}
                        barColors={barColors}
                        showLabel={true}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={3}>
                <Box sx={{ height: '250px', overflow: 'auto' }}>
                    <List>
                        {barData?.stateLabels?.map((state, index) => (
                            <Box ml={1} style={{ display: "flex" }} key={index}>
                                <FiberManualRecordIcon
                                    style={{ height: "14px", width: "15px", color: Colors[index] }}
                                />
                                <Typography
                                    ml={1}
                                    style={{ fontSize: "12px", cursor: "pointer" }}
                                    onClick={() => {
                                        setSelected(state);
                                        setBarColors(Colors[index]);
                                    }}
                                >
                                    {state}
                                </Typography>
                            </Box>
                        ))}
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
};

export default HoursByWeekChart;
