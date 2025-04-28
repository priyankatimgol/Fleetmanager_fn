import { Box, Grid } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    dataLabels,
    showLabel = false,
    showToolbar = false,
    dataValuesPY,
    dataValuesCY,
    distinctYear,
    barColors,
    yAxisConfigs
}) {
    const chartData = {
        options: {
            chart: {
                id: 'distributed-bar',
                toolbar: {
                    show: showToolbar,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: true,
                        reset: false,
                    },
                },
                offsetX: 0,
                offsetY: -19,
                height: 100,
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    fontFamily: '"Poppins", sans-serif'
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return '<div style={{ fontSize: "10px" }}>' +
                        '<span>' + '' + series[seriesIndex][dataPointIndex].toFixed(2)+ '%' +'</span>' +
                        '</div>'
                }
            },
            
            xaxis: {
                categories: dataLabels,
                axisTicks: false,
                labels: {
                    show: showLabel,
                    maxHeight: 15,
                    offsetY: -6,
                    style: {
                        fontSize: '10px'
                    },
                },
            },
            yaxis: {
                labels: {
                    offsetY: 2,
                    offsetX: -8,
                    style: {
                        colors: ['#000'],
                        fontFamily: "Poppins,sans-serif",
                        fontSize: 10
                    }
                },
               
                ...yAxisConfigs
            },
            legend: {
                show: !showLabel,
                // customLegendItems: dataLabels,
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
            markers: {
                size: 3,
            },
        },
        series: [
            {
                name: distinctYear[0],
                data: dataValuesPY
              },
              {
                name: distinctYear[1],
                data: dataValuesCY
              }
        ],
    };

    return (
        <div style={{ width: '100%', marginTop:0 }}>
            <Chart options={chartData.options}
                series={chartData.series}
                type="line"
                width="100%"
                height={165}
            />
        </div>
    );
}

export default Charts;