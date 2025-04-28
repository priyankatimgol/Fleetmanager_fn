import { Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

function Charts({
  dataLabels,
  showLabel = false,
  showToolbar = false,
  dataValues,
  barColors,
  yAxisMaxConfigs
}) {
  const options = {
      chart: {
        height: 350,
        type: 'line',
        offsetY:-5,
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
      },
      fill: {
        opacity: 1
      },
      tooltip: {
          enabled: false,
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
      plotOptions: {
        bar: {
          columnWidth: '60%',
      },
        dataLabels: {
          position: 'top',
        }
      },
     colors: barColors,
      stroke:{
          curve: 'smooth',
          width: [0, 4]
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        offsetY: -9
      },
      markers: {
        size: 3,
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
      xaxis: {
        categories: dataLabels,
        type: 'category',
      },
      yaxis: {
          maxWidth: 100,
          maxTicks: 4,
          decimalsInFloat: 0,
          forceNiceScale: false,
          tickAmount: 3,
          labels: {
              offsetY: 2,
              offsetX: 2,
              style: {
                  colors: ['#000'],
                  fontFamily: "Poppins,sans-serif",
                  fontSize: 10
              }
          },
          
      },
    };
  
    const series = [
      {
        name: '',
        type: 'column',
        data: dataValues,
      },
      {
        name: '',
        type: 'line',
        data: dataValues,
      },
    ];
  return (
      <div style={{ width: '100%' }}>
          <ReactApexChart
              options={options}
              series={series}
              type="line"
              width="100%"
              height={160}
          />
      </div>
  );
}

export default Charts;