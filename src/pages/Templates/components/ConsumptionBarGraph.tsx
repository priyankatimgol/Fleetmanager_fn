import { useState } from 'react';
import Chart from 'react-apexcharts';
import usePurchase from 'pages/PurchaseTemplates/hooks/usePurchase';
import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
const BarChartStates = ({data}:any) => {

  const {generateRandomColors}=usePurchase()
 
  const sortedData = data.sort((a, b) => b.Amount - a.Amount);
  const [options, setOptions] = useState<any>({
    chart: {
      id: 'basic-bar', 
      toolbar:{
        show:false
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: '80%',
        dataLabels: {
          position: 'top',
        }
      },
    },
    xaxis: {
      categories: sortedData.map(item => item.State)  ,
      title: {
        text: 'States',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#000'
        }
      }
    },
    
     
    fill: {
      opacity: 1,
      colors: generateRandomColors(sortedData)?.map((col) =>col.color),
    },
    legend:{
        show:false,
    },
    title: {
      text: '',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#000'
      }
    },
    markers: {
      size: 5,
    },
    yaxis: {
      title: {
        text: 'Valuation - in ₹'
      },
    },
    
    dataLabels: {
      enabled: true,
      offsetY: -20,
      formatter: function (val) {
        return  formatAmountInINR(val);
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ["#000"]
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '10px',
        fontFamily: '"Poppins", sans-serif'
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {

        console.log('dataPointIndex',dataPointIndex)
        return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
                  <span>  ${formatAmountInINR(sortedData[dataPointIndex].Tooltip) }</span></div>`;
      }
    
    },
  });
 
  const [series, setSeries] = useState([
    {
      name: 'Amount',
      data:  sortedData.map(item => item.Amount)
    }
  ]);

  return (
    <div className="mixed-chart">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default BarChartStates;
