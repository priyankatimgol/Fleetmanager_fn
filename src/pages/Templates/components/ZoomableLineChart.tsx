import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
import React from 'react';
import Chart from 'react-apexcharts';

const DateTimeAreaChart = ({data}:any) => {
 

  
      
  const sortedData = data.sort((a: any, b: any) => {
    const yearA = parseInt(a.FYear.split('-')[0]);
    const yearB = parseInt(b.FYear.split('-')[0]);
    return yearA - yearB;
  });
  
  const options = {
    chart: {
      id: 'area-chart',
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: sortedData.map((item: any) => item.FYear),
      title: {
        text: 'FYear'
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
      
       
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
  
      
           
          //let data =w.config.series[seriesIndex].data;
          let tooltipVal=sortedData[dataPointIndex].Tooltip;
          
          console.log("__w",{sortedData,dataPointIndex})
        //  const label = w.config.series[seriesIndex].tooltips[dataPointIndex];
          return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
          <span>  ${formatAmountInINR(tooltipVal)}</span></div>`;
          
      }
  },
    yaxis: {
      title: {
        text: 'Amount'
      }
    }
  };

  const series = [{
    name: 'Amount',
    data: sortedData.map((item: any) =>  item.Amount),
    tooltips:sortedData.map((item: any) =>  item.Tooltip
    )
  }];

  console.log("series",series)

  // const series = [
  //   {
  //     name: 'Amount',
  //     data: data.map(item => item.Amount)
  //   },
  //   {
  //     name: 'Quantity',
  //     data: data.map(item => item.QUANTITY)
  //   }
  // ];

  

  console.log('seriesData',series)
  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default DateTimeAreaChart;
