import React from 'react';
import Chart from 'react-apexcharts';

const RadialStrok = () => {
  const options = {
    series: [67],
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10,
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
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + '%';
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Median Ratio'],
  };

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type={options.chart.type} height={2} />
    </div>
  );
};

export default RadialStrok;
