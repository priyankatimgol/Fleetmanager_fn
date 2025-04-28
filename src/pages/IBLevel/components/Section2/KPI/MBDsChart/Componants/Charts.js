import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    data
}) {
    const chartData = {
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: data?.dataLabels ?? []
            },
        },
        series: [{
            name: 'series1',
            data: data?.dataValues ?? []
        }],
    };

    return (
        <Box>
            <Grid container-fluid spacing={2}>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={205}
                    width="100%"
                />
            </Grid>
        </Box>
    );
}

export default Charts;
