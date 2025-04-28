import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const monthOrder = {
  APR: 1,
  MAY: 2,
  JUN: 3,
  JUL: 4,
  AUG: 5,
  SEP: 6,
  OCT: 7,
  NOV: 8,
  DEC: 9,
  JAN: 10,
  FEB: 11,
  MAR: 12,
};

const StackGraphOMSPlant = ({ setFYear }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState<any>({
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom',
      },
    },
    colors: [
      '#30A4FC',
      '#30E8AA',
      '#FEBF44',
      '#FF687E',
      '#917BD9',
      '#1EAE98',
      '#FF4848',
      '#C9F704',
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return `₹${val.toLocaleString('en-IN')}`;
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      title: {
        text: 'Months',
      },
    },
    yaxis: {
      title: {
        text: 'Stock Value',
      },
      labels: {
        formatter: function (val) {
          return '₹' + (val / 10000000).toFixed(2) + ' Crs';
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 10,
      offsetX: 0,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=StockValueByState`,
    )
      .then((res) => res.json())
      .then((value) => {
        // Group the data by state
        const groupedData = value.reduce((acc, curr) => {
          if (!acc[curr.State]) {
            acc[curr.State] = [];
          }
          acc[curr.State].push(curr);
          return acc;
        }, {});

        // Convert the grouped data into the format needed for the series
        const newSeries = Object.keys(groupedData).map((state) => {
          return {
            name: state,
            data: groupedData[state].map((item) => item.Amount),
          };
        });

        setSeries(newSeries);

        const sortedData = value.sort((a, b) => {
          return monthOrder[a.MonthName] - monthOrder[b.MonthName];
        });

        let uniqueMonths = [];
        sortedData.forEach((item) => {
          const [startYear, endYear] = item.FYear.split('-');
          const shortFYear = `${startYear.slice(-2)}-${endYear.slice(-2)}`;
          const monthYear = `${item.MonthName}`;
          setFYear(shortFYear);
          if (!uniqueMonths.includes(monthYear)) {
            uniqueMonths.push(monthYear);
          }
        });

        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: uniqueMonths,
          },
        }));
      });
  }, []);

  return (
    <div style={{ width: '100%', background: '#fff' }}>
      <Chart options={options} series={series} type='bar' width='100%' />
    </div>
  );
};

export default StackGraphOMSPlant;
