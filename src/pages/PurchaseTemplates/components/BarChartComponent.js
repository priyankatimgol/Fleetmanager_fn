import Chart from 'react-apexcharts';
import {useMemo} from 'react';
import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
const BarChartComponent = ({ stateLevelValue,GraphColor }:any) => {
  // stateLevelValue.sort((a, b) => b.Value - a.Value);
  const categories = stateLevelValue.map(item => item.Colname);
  const data = stateLevelValue.map(item => ({
    x: `${item.Value}`,  
    y: item.Value,  
    tooltip: formatAmountInINR(item.TootlTip)  
  }));

  const randomColors = useMemo(() => generateRandomColors(data.length), [data.length]);
  const options = {
    chart: {
      id: 'distributed-bar',
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
        return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
                  <span>  ${data[dataPointIndex].tooltip}</span></div>`;
      }
    
    },

    xaxis: {
      categories: categories,
      axisTicks: false,
      labels: {
        show: true,
        maxHeight: 15,
        offsetY: -6,
        style: {
          fontSize: '10px'
        },

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
        distributed: true,
        columnWidth: '80%',
        dataLabels: {
          position: 'top',
        }
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      formatter: function (val) {
        return  formatAmountInINR(val);
      },
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
      opacity: 1,
      colors: GraphColor?.map((col) =>col.color),
    },
    markers: {
      size: 5,
    },
    yaxis: {
      title: {
        text: 'Valuation - in ₹'
      },
    } 
  }
  const series = [
    {
      name: 'Value',
      data: data?.map(item => item.y)
    },
  ]

  console.log('series',data)
  return (
    <>
     {stateLevelValue.length > 0 ? (
        <Chart options={options} series={series} type="bar" height={350} />
      ) : (
        <div style={{minHeight:220 , fontWeight:"600",fontSize:"16px",padding:"9px"}}>No data found</div>
      )}
      {/* <Chart options={options} series={series} type="bar" height={200} /> */}
    </>
  );
};


export default BarChartComponent;
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}