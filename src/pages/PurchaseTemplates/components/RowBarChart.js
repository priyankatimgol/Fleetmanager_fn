import { useState ,useMemo  } from 'react';
import Chart from 'react-apexcharts';

const RowBarChart = ({ materialValues ,GraphColor,title }:any) => {
  const [chartType, setChartType] = useState('value');
  const [filterType, setFilterType] = useState('All');

  const filterTypes = ['All', ...Array.from(new Set(materialValues.map(item => item.FilterType)))];

 
  // Filter materialValues based on selected filterType
  const filteredValues = filterType === 'All' ? materialValues : materialValues.filter(item => item.FilterType === filterType);
  console.log('filterTypes',materialValues)
  const valueData = filteredValues.map(item => ({
    x: `${item.Value}`,  
    y: item.Value,  
    tooltip:    item.TootlTip  
  }))
  const colnameData = filteredValues.map(item => item.Colname);

  const randomColors = useMemo(() => generateRandomColors(filteredValues.length), [filteredValues.length]);
 
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleYAxisHover = (event, tooltip) => {
    const yPos = event.clientY;
    setTooltipContent(tooltip);
    setTooltipPosition({ x: event.pageX, y: yPos });
  };

  const handleYAxisLeave = () => {
    setTooltipContent('');
  };

  console.log('tooltipContent',)
  const options = {
    chart: {
      type: 'bar',
      height: 350,
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
    legend: {
      show: false, // Remove the legend
    },
    yaxis: {
      labels: {
        enabled: true,
        formatter: function(value) {
          return value; // Return y-axis label text
        },
        onHover: (event) => {
          handleYAxisHover(event, valueData[event.target.innerText]?.tooltip || '');
        },
        onMouseOut: () => {
          handleYAxisLeave();
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
          fontSize: '10px',
          fontFamily: '"Poppins", sans-serif'
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {

        // console.log('___ser',w)
        //  const fullLabel = categories[dataPointIndex];
          return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
                <span>  ${valueData[dataPointIndex].tooltip}</span></div>`
      },
      x:{
show:false,
      },
      y: {
        show:true,
        formatter: undefined,
        title: {
            formatter: (seriesName) => seriesName,
        },
    },
  },
   plotOptions: {
      bar: {
          distributed: true, // this line is mandatory
          horizontal: true,
           
      },
  },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: colnameData,
    },
    yaxis: {
      labels: {
        enabled: true,
        formatter: function(value) {
          return value; // Return y-axis label text
        },
        onHover: (event) => {
          const tooltip = event.target.innerText;
          handleYAxisHover(event, tooltip);
          console.log("Hover event triggered")
        },
        onMouseOut: () => {
          handleYAxisLeave();
        }
      },
    },
    fill: {
      opacity: 1,
      colors: GraphColor.map((col) =>col.color),
    },
    title: {
      text: title ?? '',
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
    }
  };

  const series = [{ data: chartType === 'value' ?    valueData.map(item => item.y) : colnameData }];

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {!filterTypes.every((type) => type === "All") && (
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "2px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {filterTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}
      </div>
      <div id="chart">
        {
          materialValues.length > 0 ? <Chart options={options} series={series} type="bar" height={350} />: (<div style={{minHeight:200 , fontWeight:"600",fontSize:"16px",padding:"9px"}}>No data found</div>)
        }
        
      </div>
      {tooltipContent && (
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '5px',
            border: '1px solid #ccc'
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default RowBarChart;

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
