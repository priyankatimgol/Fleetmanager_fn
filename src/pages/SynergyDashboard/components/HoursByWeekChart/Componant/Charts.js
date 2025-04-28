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
    function abbreviateResolution(input) {
        let words = input.split(' ');
        if (words.length > 1) {
            let abbreviation = words.map(word => word.charAt(0)).join('. ');
            abbreviation += '' + words[words.length - 1].substring(1);
            return abbreviation;
        } else {
            return input;
        }
    }
    
    const formatXAxisLabel = (value) => {
        return value.length > 10 ? abbreviateResolution(value) : value;
      };

      const chartData = {
        options: {
            chart: {
                id: 'distributed-bar',
                toolbar: {
                    show: true,
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
                    const fullLabel = `Week ${dataLabels[dataPointIndex]}`;
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
                    show: true,
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
               
                // ...yAxisConfigs
            },
            legend: {
                show: false,
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
                  horizontal: false,
                    columnWidth: '80%',
                    // dataLabels:{
                    //     position: 'top',
                    // }
                },
            },
            dataLabels: {
                enabled: false,
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
        <div style={{ width: '100%', marginTop:0 }}  >
            <Chart options={chartData.options}
                series={chartData.series}
                type="bar"
                width="100%"
                height={260}
            />
        </div>
    );
}

export default Charts;