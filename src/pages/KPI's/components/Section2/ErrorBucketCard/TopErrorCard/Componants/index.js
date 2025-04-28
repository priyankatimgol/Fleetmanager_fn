import { Box, Grid } from "@mui/material";
import Chart from "react-apexcharts";
import '../styles.css'

function Charts({
  dataLabels,
  showLabel = false,
  showToolbar = false,
  dataValues,
  barColors,
  yAxisConfigs
}) {
  const series = [{
    data: dataValues
  }]
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      offsetX: 0,
      offsetY: -30,
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
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusWhenStacked: 'last',
        horizontal: true,
        colors: {
          ranges: [
            {
              from: dataValues[0],
              to: dataValues[0],
              color: '#aa2e25'
            },
            {
              from: dataValues[1],
              to: dataValues[1],
              color: '#c3352b'
            },
            {
              from: dataValues[2],
              to: dataValues[2],
              color: '#db3c30'
            },
            {
              from: dataValues[3],
              to: dataValues[3],
              color: '#f44336'
            },
            {
              from: dataValues[4],
              to: dataValues[4],
              color: '#f5554a'
            },
            {
              from: dataValues[5],
              to: dataValues[5],
              color: '#f6685e'
            },
            {
              from: dataValues[6],
              to: dataValues[6],
              color: '#f77b72'
            },
            {
              from: dataValues[7],
              to: dataValues[7],
              color: '#f88e86'
            },
            {
              from: dataValues[8],
              to: dataValues[8],
              color: '#f9a19a'
            },
            {
              from: dataValues[9],
              to: dataValues[9],
              color: '#fab3ae'
            }
          ]
        },
        // hideOverflowingLables: false,
        dataLabels: {
          position: "center",
          total: {
            enabled: true,
            offsetX: 5,
          }
        }
      }
    },

    stroke: {
      width: 0
    },
    dataLabels: {
      enabled: false,
      offsetY: 7,
    },
    xaxis: {
      categories: dataLabels,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.length > 10 ? value.slice(0, 15) + '...' : value;
        },
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: '"Poppins", sans-serif',
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          const label = w.globals.labels[dataPointIndex];
          return label;
        },
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
    enabled: true,
    style: {
      fontSize: '12px',
      fontFamily: '"Poppins", sans-serif',
    },
    y: {
      formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
        const label = w.globals.labels[dataPointIndex];
        return label;
      },
      title: {
        formatter: function () {
          return '';
        },
      },
    },
  }

  return (
    <div>
      <div style={{ width: '100%', marginTop: 0 }}>
        <Chart options={options}
          series={series}
          type="bar"
          width="100%"
          height={340}
        />
      </div>
    </div>
  );
}

export default Charts;