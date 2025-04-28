import React from 'react';
import Chart from 'react-apexcharts';

const PiChart = () => {
  const options = {
    chart: {
      type: 'donut',
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
    labels: ['Category 1', 'Category 2', 'Category 3'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = [44, 55, 13];

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={210} />
    </div>
  );
};

export default PiChart;
