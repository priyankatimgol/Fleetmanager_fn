import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

function Charts({
    dataColumn,
    showLabel = false,
    showToolbar = false,
    dataWinds,
    dataPowers,
    barColors,
    yAxisConfigs
}) {
    const chartData = {
        series: [
            {
                name: 'Power(kwh)',
                type: 'column',
                data: dataPowers
            },
            {
                name: 'wind speed',
                type: 'line',
                data: dataWinds
            },
            
        ],
        options: {
            chart: {
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
                type: 'line',
                // offsetX: 0,
                offsetY: -25,
            },
            tooltip: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    fontFamily: '"Poppins", sans-serif'
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return '<div style={{ fontSize: "10px" }}>' +
                        '<span>' + '' + series[seriesIndex][dataPointIndex].toFixed(2)+'</span>' +
                        '</div>'
                }
            },
            legend: {
                show: !showLabel,
                // customLegendItems: dataLabels,
                fontFamily: "Poppins,sans-serif",
                fontWeight: 500,
                fontSize: '9px',
                markers: {
                    width: 4,
                    height: 4,
                    radius: '50%'
                }
            },
            stroke: {
                width: [0, 2]
            },
            fill: {
                opacity: 0.8,
            },
            markers: {
                size: 5,
            },
            dataLabels: {
                enabled: false,
                enabledOnSeries: [1]
            },
            labels: dataColumn,
            colors: ['#008F98', '#FFC926'],
            yaxis: [{
                // labels: {
                //     formatter: function (value) {
                //         return Math.round(value);
                //     },
                // },

            }, {
                opposite: true,
                // labels: {
                //     formatter: function (value) {
                //         return Math.round(value);
                //     },
                // },
            }]
        },
    };

    return (
        <div style={{ width: '100%', marginTop: 0 }}>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={245}
                width="100%"
            />
        </div>
    );
}

export default Charts;