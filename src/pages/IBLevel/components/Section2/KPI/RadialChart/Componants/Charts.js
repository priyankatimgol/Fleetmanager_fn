import { Box, Grid } from "@mui/material";
import Chart from "react-apexcharts";

function Charts({
    data
}) {
    const chartData = {
        series: data?.dataValues ??  [],
        options: {
          chart: {
            height: 390,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 360,
              hollow: {
                margin: 5,
                size: '20%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#FA5A5B', '#0FB7A8', '#FFB600', '#543186'],
          labels: data?.dataLabels ?? [],
          legend: {
            show: false,
            floating: true,
            fontSize: '12px',
            position: 'left',
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: false,
            },
            markers: {
              size: 0
            },
            // formatter: function(seriesName, opts) {
            //   return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            // },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: false
              }
            }
          }]
        },
          
          };
   

    return (
        <div style={{ width: '100%', marginTop:0 }}>
            <Chart options={chartData.options}
                series={chartData.series}
                type="radialBar"
                width="100%"
                height={200}
            />
        </div>
    );
}

export default Charts;