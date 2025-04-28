import React from 'react';
import Chart from 'react-apexcharts';

const BarChartHorizantal = ({chartType}) => {
    const options = {
        chart: {
          type: 'bar',
          height: 250,        
          offsetY: -15,
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
        }
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: false,
            columnWidth: 40,      
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Security', 'Engineering', 'MBD', 'Cust. Req. ', 'Material', 'Admin', 'connectivity', 'Vendor','Manpower', 
          ],
        },
      };
      
      const series = [{
        data: [200, 300, 448, 300,400,520,200,300,200],
      }];
      
    return (
      <Chart options={options} series={series} type="bar" height={250} />
    );
  };
  
export default BarChartHorizantal;
  