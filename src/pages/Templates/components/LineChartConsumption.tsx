import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
import { useState } from 'react'
import Chart from "react-apexcharts";

const LineChartConsumption = ({data}) =>{
  // Group data by FYear
  const sortedData = data.sort((a, b) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months.indexOf(a.MonthName) - months.indexOf(b.MonthName);
  });

 // Group data by FYear
  const groupedData = sortedData.reduce((acc, curr) => {
    if (!acc[curr.FYear]) {
      acc[curr.FYear] = [];
    }
    acc[curr.FYear].push(curr);
    return acc;
  }, {});


  // Extract data for each year
  const years = Object.keys(groupedData);
  // const series = years.map(year => {
  //   return {
  //     name: year  ,
  //     data: groupedData[year].map(item => ({
  //        x: item.MonthName,
  //         y:parseFloat(item.ShortValues.toFixed(2)),
  //       tooltip:item.Tooltip,
  //       }))
  //   };
  // });

  const series = years.map(year => {
    return {
      name: year,
      data: groupedData[year].map(item => ({ x: item.MonthName, y:parseFloat(item.ShortValues.toFixed(2)), tooltip:item.Tooltip, })),
      dataLabels: {
        enabled: true,
        position: year === years[0] ? 'top' : 'bottom', // Set position of data labels based on the year
        style: {
          colors: ['#333']
        }
      }
    };
  });

  const options :any= {
    chart: {
      id: 'line-graph',
      toolbar: {
        show: true
      },
      
    },
    xaxis: {
      categories: sortedData.map(item => item.MonthName),
      title: {
        text: ''
      }
    },
    stroke: { 
      curve: 'smooth',
      width: 2,
    },
    yaxis: {
      title: {
        text: 'Amount'
      }
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled:true,
      formatter: function (val) {
        return  formatAmountInINR(val);
      },
      offsetY: -6,
      
      enabledOnSeries: [0, 1]
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
  
      
           
          let data =w.config.series[seriesIndex].data;
          //let tooltipVal=datasets[state].tooltips[dataPointIndex];
          
          console.log("__w",{w:w.config.series[seriesIndex]})
        //  const label = w.config.series[seriesIndex].tooltips[dataPointIndex];
          return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
          <span>   ${formatAmountInINR(data[dataPointIndex].tooltip)}</span></div>`;
          
      }
  },
  };

  return (
    <div className="line-graph">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChartConsumption;
