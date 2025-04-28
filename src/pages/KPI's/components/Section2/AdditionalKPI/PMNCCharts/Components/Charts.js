import { Box, Grid } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    dataLabels,
    showLabel = false,
    showToolbar = false,
    dataValues,
    barColors,
    yAxisConfigs
}) {
    const formatXAxisLabel = (value) => {
        return value.length > 10 ? value.substring(0, 10) + '...' : value;
      };
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
                offsetY: -5,
                height: 100,
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    fontFamily: '"Poppins", sans-serif'
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const fullLabel = dataLabels[dataPointIndex];
                    return `<div style="font-size: 10px; padding: 5px">` +
                        `<span>Label: ${fullLabel}</span>` +
                        `<br />` +
                        `<span>Value: ${series[seriesIndex][dataPointIndex]}</span>` +
                        '</div>';
                }
            },
            
            xaxis: {
                categories: dataLabels ?? [],
                axisTicks: false,
                labels: {
                    show: showLabel,
                    maxHeight: 15,
                    offsetY: -6,
                    style: {
                        fontSize: '10px'
                    },
                    formatter: formatXAxisLabel,
                },
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
                    columnWidth: '80%',
                    dataLabels:{
                        position: 'top',
                    }
                },
            },
            dataLabels: {
                enabled: true,
                offsetY:-20,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: ["#000"]
                },
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
                size: 5,
            },
        },
        series: [
            {
                name: 'Value',
                data: dataValues ?? [],
            },
        ],
    };

    return (
        <div style={{ width: '100%', marginTop:0 }}>
            <Chart options={chartData.options}
                series={chartData.series}
                type="bar"
                width="100%"
                height={160}
            />
        </div>
    );
}

export default Charts;