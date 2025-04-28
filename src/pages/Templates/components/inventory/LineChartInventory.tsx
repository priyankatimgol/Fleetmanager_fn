import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const LineChartInventory = () => {
  const [series, setSeries] = useState([]);
  const [months, setMonths] = useState([]);

  const monthOrder = [
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
    'JAN',
    'FEB',
    'MAR',
  ];

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=CompareInventoryQuantity`,
    )
      .then((response) => response.json())
      .then((data) => {
        data.sort(
          (a, b) =>
            monthOrder.indexOf(a.MonthName) - monthOrder.indexOf(b.MonthName),
        );
        const thisYearData = data
          .filter((item) => item.FYear === '2022-2023')
          .map((item) => item.Amount);
        const lastYearData = data
          .filter((item) => item.FYear === '2023-2024')
          .map((item) => item.Amount);

        // get unique months name
        const monthsData = data
          .map((item) => item.MonthName)
          .filter((value, index, self) => self.indexOf(value) === index);

        setSeries([
          { name: 'This Year', data: thisYearData },
          { name: 'Last Year', data: lastYearData },
        ]);
        setMonths(monthsData);
      });
  }, []);

  const options: any = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
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
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return '₹' + (val / 10000000).toFixed(2) + ' Crs';
      },
      style: {
        // colors: ['#000']
      },
      offsetY: -6,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          let formattedValWithCommas = parseFloat(val).toLocaleString('en-IN');
          return '₹' + formattedValWithCommas;
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Months',
      },
    },
    yaxis: {
      title: {
        text: 'Inventory Value (in Crs)',
      },
      labels: {
        formatter: function (val) {
          return '₹' + (val / 10000000).toFixed(2) + ' Crs';
        },
      },
    },
    markers: {
      size: 5,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 10,
      offsetX: 0,
    },
  };

  return (
    <div className='row' style={{ background: '#fff', width: '100%' }}>
      <Chart options={options} series={series} type='line' height={350} />
    </div>
  );
};

export default LineChartInventory;
