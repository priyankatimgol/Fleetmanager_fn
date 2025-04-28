import React from 'react';
import Chart from 'react-apexcharts';

const RadialBarChart = () => {
  const options = {
    series: [44, 55, 67, 83],
    chart: {
      height: 350,
      type: 'radialBar',
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
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return 249; // Customize the total value as needed
            },
          },
        },
      },
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  };

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type={options.chart.type} height={235} />
    </div>
  );
};

export default RadialBarChart;
