import { Box, Typography, Grid, CardContent, Card, FormControl, Select, MenuItem } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import './styles.css'
import { useState } from "react";

const AreaChart = ({ dropDown }) => {
  const val = 10
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "area-chart",
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#505050'],
            fontFamily: 'Poppins, sans-serif',
          }
        }
      },
      xaxis: {
        categories: [1, 5, 10, 15, 20, 25, 30],
        labels: {
          style: {
            colors: ['#505050'],
            fontFamily: 'Poppins, sans-serif',
          }
        }
      },
      markers: {
        size: 0, // Hide the markers on the series lines
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 85, 100]
        }
      },
      stroke: {
        width: 1,
        dashArray: [0, 8]
      },
      colors: ["#FF5961", "#ff8012"],
    },
    series: [
      {
        data: [140, 170, 135, 210, 260, 185, 170, 210],
      },
      {
        data: [20, 35, 55, 70, 68, 80, 85, 90],
        type: "line",
        lineStyle: {
          // Set the line style to 'dotted'
          dashArray: [5, 2],
        },
      },
    ],
  });

  return (
    <>
      <Box className='circleBarHeader'>
        <Typography sx={{ color: "black", fontWeight: 700 }}>Power Curve</Typography>
        {
            dropDown && (
              <Box sx={{ ml: 'auto' }}>
                <FormControl
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '4px'
                    }
                  }}
                  variant='outlined'>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={val}
                    sx={{
                      fontSize: '11px',
                      '& .MuiSelect-select': {
                        padding: '2px 10px',
                      },
                    }}
                  >
                    <MenuItem value={10}>Linear</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )
          }
      </Box>
      <Box>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          width='100%'
          height={165}
        />
      </Box>
    </>
  );
};

export default AreaChart;
