import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, Grid, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Charts from './Componants/Charts';

const barColors = ['#ED0944', '#C24E73', '#3D5E94', '#676A6F', '#C8B42F', '#8F60BC', '#40A480'];

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
const BDHrsByWhyGraph = ({ data, icon, label }) => {
    const [barData, setBarData] = useState({
        dataValues: [],
        dataLabels: [],
        stateLabels: []
    });

    useEffect(() => {
        if (!data || data?.length === 0) return setBarData({});
        const dataValues = [];
        const dataLabels = [];
        data.forEach(d => {
            dataValues.push(d.Hrs);
            dataLabels.push(d.Why);
        });

        setBarData({ dataValues: dataValues, dataLabels: dataLabels });
    }, [data]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
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
        </Grid>
    );
};

export default BDHrsByWhyGraph;
