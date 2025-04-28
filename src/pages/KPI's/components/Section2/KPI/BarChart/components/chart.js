import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import Chart from "react-apexcharts";

function Charts({
    showLabel = false,
    showToolbar = false,
    dataValues,
    barColors,
    yAxisConfigs,
    data
}) {

    const createObj = (name, actual, target) => {
        return {
            x: name,
            y: actual,
            goals: [
                {
                    name: 'Expected',
                    value: target ?? '',
                    strokeHeight: 3,
                    strokeColor: '#775DD0'
                }
            ]
        }
    }
    const newData = data?.map((data) => createObj(data.ColName, data.Value, data.Targets))
    const newObj = (actual_data, target_data) => {
        return {
            actualVal: actual_data,
            targetVal: target_data,
        }
    }
    const newObjData = data?.map((d) => newObj(d.Value, d.Targets))
    const colorObj = (actual_data, target_data) => {
        return {
            from: actual_data,
            to: actual_data,
            color: +target_data > +actual_data ? '#FFBF00' : '#6ACD75'
        }
    }
    const barColor = newObjData?.map((d) => colorObj(d.actualVal, d.targetVal))
    const options = {
        series: [
            {
                name: 'Actual',
                data: newData
            }
        ],
        chart: {
            height: 135,
            type: 'bar',
            offsetX: -5,
            offsetY: 0,
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
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                horizontal: false,
                colors: {
                    ranges: barColor,
                },
                dataLabels: {
                    position: 'top',
                }
            }
        },
        colors: ['#00E396'],
        dataLabels: {
            enabled: true,
            offsetX: 0,
            offsetY: -15,
            style: {
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ["#000"]
            },
        },
        xaxis: {
            labels: {
                show: showLabel,
                rotate: -25,
                rotateAlways: dataValues.length > 4 ? true : false,
                maxHeight: 15,
                offsetY: -6,
                style: {
                    fontSize: dataValues.length > 4 ? '8px' : "10px"
                },
            },
            axisTicks: false,
        },
        yaxis: {
            labels: {
                offsetX: 0,
                offsetY: 0,
                style: {
                    fontSize: "9px"
                },
            },
            crosshairs: {
                show: false
            }
        },
        legend: {
            show: false,
            showForSingleSeries: true,
            customLegendItems: ['Actual', 'Expected'],
            markers: {
                fillColors: ['#00E396', '#775DD0']
            }
        },
    };

    return <Chart options={options} series={options.series} type="bar" height={155} width="100%"/>;

}

export default Charts;