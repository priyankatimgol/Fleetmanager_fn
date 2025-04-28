import Chart from 'react-apexcharts';
import React from 'react';

const LineChartMultiple = ( {GraphColor}) => {

    let data = [
        {
            "name": "Andra Pradesh",
            "data": [
                216.57,
                256.41,
                13.18
            ],
            "tooltips": [
                "21657298.00",
                "25640781.00",
                "1317672.00"
            ]
        },
        {
            "name": "Daman OMS",
            "data": [
                1.79,
                75.33,
                0.62,
                33.56
            ],
            "tooltips": [
                "178562.00",
                "7532817.00",
                "62492.00",
                "3356024.00"
            ]
        },
        {
            "name": "GJ-Kutchh",
            "data": [
                755.12,
                137.59,
                8.98,
                1.03,
                2.49
            ],
            "tooltips": [
                "75511842.00",
                "13758669.00",
                "897952.00",
                "103004.00",
                "248526.00"
            ]
        },
        {
            "name": "GJ-Saurashtra",
            "data": [
                238.58,
                219.25,
                0.28,
                6.93,
                25.83
            ],
            "tooltips": [
                "23858181.00",
                "21925154.00",
                "28461.00",
                "693107.00",
                "2583116.00"
            ]
        },
        {
            "name": "Karanataka",
            "data": [
                313.4,
                222.87,
                6.2
            ],
            "tooltips": [
                "31340411.00",
                "22286760.00",
                "619940.00"
            ]
        },
        {
            "name": "Maharashtra",
            "data": [
                493.85,
                101.07,
                8,
                0.02,
                85.22
            ],
            "tooltips": [
                "49384770.00",
                "10106540.00",
                "800000.00",
                "2000.00",
                "8521780.00"
            ]
        },
        {
            "name": "Rajasthan",
            "data": [
                374.95,
                115.02,
                13.95
            ],
            "tooltips": [
                "37495214.00",
                "11502134.00",
                "1395224.00"
            ]
        },
        {
            "name": "Tamilnadu",
            "data": [
                644.2,
                115.89,
                1.62,
                0.84,
                7.37
            ],
            "tooltips": [
                "64420487.00",
                "11588901.00",
                "161947.00",
                "84400.00",
                "736500.00"
            ]
        }
    ]

    
  
    const stateColorMap = {};
    GraphColor.forEach(item => { 
      stateColorMap[item.state] = item.color;
    });

    const series = data.map((item, index) => ({
        name: item.name,
        data: item.data,
        color: stateColorMap[item.name] // Assigning color from GraphColor array
      }));


      console.log("series__",series)

  const options :any = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar:{
        show:false,
      }
    },
    xaxis: {
      categories: ['0-30', '30-60', '60-90', '90-120', '>120']
    },
    legend: {
        show:false,
      position: 'top'
    },
    tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const tooltip = data[seriesIndex].tooltips[dataPointIndex];
          
       

             let state =w.config.series[seriesIndex].name;
    
        
      //  const label = w.config.series[seriesIndex].tooltips[dataPointIndex];
        return `<div style="font-size: 12px; padding: 5px; background-color:#F9F9F9;font-weight:600"> 
        <span> ${state}  : ${  tooltip }</span></div>`;
        }
      },
      colors: GraphColor,
  };

  return (
    <div id="chart">
      <Chart 
      
      options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChartMultiple;
