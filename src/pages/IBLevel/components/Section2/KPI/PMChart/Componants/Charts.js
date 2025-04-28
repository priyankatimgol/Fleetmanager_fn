import React from 'react';
import Chart from 'react-apexcharts';

const BubbleChart = ({dataLabels, dataValues}) => {
    const convertArray = (val, index) => {
        return {
            x: index,
            y: parseInt(val),
            z: parseInt(val),
        }
    }
    const result = dataValues?.map((val, index) => convertArray(val, index))
    const options = {
        chart: {
            height: 200,
            type: 'bubble',
            toolbar: {
                show: false,
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
            offsetY: -20,
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '10px',
                fontFamily: '"Poppins", sans-serif'
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `<div style="font-size: 12px; padding: 5px">` +
                    `<span>PM: ${series[seriesIndex][dataPointIndex]} </span>` +
                    '</div>';
            }
        },
        xaxis: {
            labels: {
                formatter: function (val) {
                    const months = dataLabels ?? [];
                    return months[val];
                },
            },

        },
        yaxis: {
            tickAmount: 5,
            labels: {
                formatter: function (val) {
                    return val;
                },
            },
            max: 110,
            min:0
        },
        plotOptions: {
            bubble: {
              zScaling: true,
              minBubbleRadius: 20,
              maxBubbleRadius: 20,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (series, { dataPointIndex }) {
                return parseInt(dataValues[dataPointIndex])
            },
            style: {
                colors: ['#777575'],
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                postion:"absolute"
            },
        },
        fill: {
            type: 'gradient',
          },
    };

    const series = [{
        name: 'PM',
        data: result ?? [],
    }];
    return (
        <div id="chart">
            <Chart
                options={options}
                series={series}
                type="bubble"
                height={240}
            />
        </div>
    );
};

export default BubbleChart;
