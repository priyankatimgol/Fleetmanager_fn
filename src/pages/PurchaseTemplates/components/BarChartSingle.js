import Chart from 'react-apexcharts';
import React, { useState, useRef } from 'react';
 
import { formatAmountInINR , formatNumber } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import usePurchase from '../hooks/usePurchase';
const BarChartSingle = ({ chartType, setChartType, ageingValue,GraphColor }:any) => {

   const {formatIndianNumber}=usePurchase()

  const [checked, setChecked] = useState(false);
  const chartRef = useRef(null);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      setChartType('Quantity')
    }else{
      setChartType('Value')
    }
  };

  const filteredData = ageingValue.filter(item => item.FilterType === chartType);

  console.log('filteredData',filteredData)
  const chartData = {
   // data: filteredData.map((item) => ({item.Value})),
    data : filteredData.map(item => ({
      x: `${item.Value}`,  
      y: item.Value,  
      tooltip: item.FilterType==="Quantity" ?  item.TootlTip : formatAmountInINR(item.TootlTip)  
    })),
    colors:  ['#00ab94'],
  };
 


 

// Create an empty object to store the result
const result = {};

// Loop through the data array
filteredData.forEach(item => {
    const colname = item.Colname;

    // Check if the colname exists in the result object
    if (!result[colname]) {
        // If not, initialize it as an array
        result[colname] = [];
    }

    // Push the current item to the corresponding colname array
    result[colname].push(item);
});

// Convert the result object into an array of objects
const newArray = Object.entries(result).map(([colname, values]) => ({
    Colname: colname,
    Values: values
}));
const labels = [];
const datasets = {};

// Loop through the data to prepare labels and datasets
newArray.forEach(item => {
  labels.push(item.Colname);
  item.Values.forEach(valueItem => {
      if (!datasets[valueItem.StakName]) {
          datasets[valueItem.StakName] = {
              data: [],
              tooltips: []
          };
      }
      datasets[valueItem.StakName].data.push(valueItem.Value);
      datasets[valueItem.StakName].tooltips.push(valueItem.TootlTip);
  });
});

const stateColorMap = {};
GraphColor.forEach(item => {
  stateColorMap[item.state] = item.color;
});

// Convert datasets object into array format
let chartDatasets = Object.keys(datasets).map(key => ({
  name: key,
  data: datasets[key].data,
  tooltips: datasets[key].tooltips,
  color: stateColorMap[key]
}));

console.log('chartDatasets',chartDatasets)
const options = {
  chart: {
      type: 'bar',
      stacked: true,
      height: 350,
      width: '100%',
      toolbar: {
        show: false, // Hide the toolbar (hamburger icon)
      },
  },
  plotOptions: {
      bar: {
          horizontal: false,
      },
  },
  stroke: {
      width: 1,
      colors: ['#fff']
  },
  title: {
      
  },
  xaxis: {
      categories: labels,
  },
  yaxis: {
    title: {
      text:  `Valuation - in ${!checked ? '₹' :'Quantity'}`
    },
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {

    
         
        let state =w.config.series[seriesIndex].name;
        let tooltipVal=datasets[state].tooltips[dataPointIndex];
        
      //  const label = w.config.series[seriesIndex].tooltips[dataPointIndex];
        return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
        <span> ${state}  : ${checked ?  formatIndianNumber(tooltipVal) : formatAmountInINR(tooltipVal)}</span></div>`;
        
    }
},
  legend: {
     show:false
  },
  dataLabels: {
    enabled: true,
     
    formatter: function (val) {
      return  chartType==='Value' ? formatAmountInINR(val) : formatIndianNumber(val);
    },
    style: {
      fontSize: '10px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ["#000"]
    },
  },
   fill: {
    opacity: 1,
    colors: GraphColor,
  },
};
///
 

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div style={styles.buttonContainer}>
       
         <Stack direction="row" spacing={1} alignItems="center">
      <Typography>Value</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'ant design' }}
      />
      <Typography>Quantity</Typography>
    </Stack>
      </div>
      
      <div id="chart">
        {
          newArray.length > 0 ?  <Chart options={options} series={chartDatasets} type="bar" height={350} 
          ref={chartRef}
          events={{
            updated: () => chartRef.current.chart.refresh(),
          }} /> : <div style={{minHeight:220 , fontWeight:"600",fontSize:"16px",padding:"9px"}}>No data found</div>
        }
       
      </div>
    </>
  );
};

export default BarChartSingle;


const styles = {
  buttonContainer: {
    position: 'absolute',
    top: '5px',
    right: '20px',
    display: 'flex',
  },
  button: {
    marginRight: '10px',
    fontSize: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    border: 'none',
    backgroundColor: 'transparent',

  },
  selectedButton: {
    color: '#3490B8',
    border: '1px solid grey',
    backgroundColor: '#0000ff1d',
    padding: '2px',
    borderRadius: '4px',
    fontWeight: '600',
    marginRight: '5px'
  },
};