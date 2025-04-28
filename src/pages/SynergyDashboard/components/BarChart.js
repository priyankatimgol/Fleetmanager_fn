import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({chartType, data}) => {

  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: [],
  });
  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const dataValues = [];
    const dataLabels = [];
    data.forEach(d => {
      dataValues.push(d.Hours);
      dataLabels.push(d.weekno);
    });

    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
  }, [data]);
  
  const formatXAxisLabel = (value) => {
    return value.length > 10 ? value.substring(0, 10) + '...' : value;
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
                  const fullLabel = [dataPointIndex];
                  return `<div style="font-size: 10px; padding: 5px">` +
                      `<span>Label: ${fullLabel}</span>` +
                      `<br />` +
                      `<span>Value: ${series[seriesIndex][dataPointIndex]}</span>` +
                      '</div>';
              }
          },
          
          xaxis: {
              categories: barData?.dataLabels ?? [],
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
                horizontal: true,
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
          // colors: barColors,
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
              data: barData?.dataValues ?? [],
          },
      ],
  };
      
    return (
      <Chart options={chartData.options} series={chartData.series} type="bar" height={250} />
    );
  };
  
export default BarChart;
  