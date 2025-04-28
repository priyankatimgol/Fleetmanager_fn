import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    dataLabels,
    dataValues,
    barColors,
}) {
    const chartData = {
        options: {
            chart: {
                id: 'distributed-bar',
                toolbar: {
                    show: false
                },
                offsetX: 0,
                height: 100
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    fontFamily: '"Poppins", sans-serif'
                },  
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return '<div style={{ fontSize: "10px" }}>' +
                        '<span>' + 'Value: ' + series[seriesIndex][dataPointIndex] + '</span>' +
                        '</div>'
                }
            },
            xaxis: {
                labels: {
                    show: false,
                    maxHeight: 15
                },
                categories: dataLabels,
                axisTicks: false,
            },
            yaxis: {
                labels: {
                    offsetY: 2,
                    offsetX: 2,
                    style: {
                        colors: ['#000'],
                        fontFamily: "Poppins,sans-serif",
                        fontSize: 10
                    }
                }
            },
            legend: {
                show: true,
                customLegendItems: dataLabels,
                fontFamily: "Poppins,sans-serif",
                fontWeight: 500,
                fontSize: '9px',
                markers: {
                    width: 8,
                    height: 8,
                    radius: '50%'
                }
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    columnWidth: '60%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: barColors,
            grid: {
                show: true,
                borderColor: '#e4e4e4',
            },
            fill: {
                opacity: 0.8,
            },
        },
        series: [
            {
                name: 'Value',
                data: dataValues,
            },
        ],
    };

    return (
        <Box mt={1} >
            <Grid container spacing={2}>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={155}
                    width='100%'
                />
            </Grid>
        </Box>
    );
}

export default Charts;