import { useState, useMemo } from "react";
import Chart from "react-apexcharts";

const ConsumptionRowBarChart = ({ materialValues }: any) => {
  console.log("materialValues", materialValues);

  const options: any = {
    chart: {
      id: "horizontal-bar-chart",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "10px",
        fontFamily: '"Poppins", sans-serif',
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
                    <span>  ${materialValues[dataPointIndex].Tooltip}</span></div>`;
      },
      x: {
        show: false,
      },
      y: {
        show: true,
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    xaxis: {
      categories: materialValues.map((item) => item.Material),
      title: {
        text: "",
      },
    },
    legend: { show: false },
  };

  const series = [
    {
      data: materialValues.map((item) => item.Amount),
    },
  ];

  return (
    <div className="horizontal-bar-chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ConsumptionRowBarChart;
