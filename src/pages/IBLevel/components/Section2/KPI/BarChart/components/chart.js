import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    dataLabels,
    dataValues,
    barColors,
    categories
}) {
    const chartData = {
        options: {
            chart: {
                id: 'distributed-bar',
                toolbar: {
                    show: false
                },
                type: 'bar',
                offsetX: 0,
                height: 100
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: categories ? categories : [],
                labels: {
                    show: categories ? true : false
                },
                offsetY: -5,
                axisTicks: false,
            },
            yaxis: {
                tickAmount: 5,
                labels: {
                    offsetY: 2,
                    offsetX: 2,
                    style: {
                        colors: ['#000'],
                        fontFamily: "Poppins,sans-serif",
                        fontSize: 10
                    }
                },
                axisBorder: {
                    color: 'red'
                }
            },
            legend: {
                show: dataLabels ? true : false,
                customLegendItems: dataLabels ?? "",
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
                name: 'Series 1',
                data: dataValues,
            },
        ],
    };

  return (
    <Box>
      <Grid container-fluid spacing={2}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={165}
          width="100%"
        />
      </Grid>
    </Box>
  );
}

export default Charts;