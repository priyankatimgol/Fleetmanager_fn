import { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const StackInventoryUsableDamageValue = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=InventoryUsableDamageValue`,
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
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

          return (
            monthOrder.indexOf(a.MonthName) - monthOrder.indexOf(b.MonthName)
          );
        });

        setSeries(
          sortedData.map((item) => ({
            x: item.MonthName.substring(0, 3),
            UsableQuantity: item.UsableQuantity,
            DamagedQuantity: item.DamageQuantity,
            OtherQuantity: item.OtherQuantity,
            ScrapQuantity: item.ScrapQuantity,
          })),
        );
      });
  }, []);

  const options: any = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: series.map((data) => data.x),
      title: {
        text: 'Months',
        align: 'center',
        margin: 10,
      },
    },
    yaxis: {
      title: {
        text: 'Stock Value (₹)',
        align: 'left',
        margin: 10,
      },
    },
    series: [
      {
        name: 'Usable Quantity',
        data: series.map((data) => data.UsableQuantity),
      },
      {
        name: 'Damaged Quantity',
        data: series.map((data) => data.DamagedQuantity),
      },
      {
        name: 'Other Quantity',
        data: series.map((data) => data.OtherQuantity),
      },
      {
        name: 'Scrap Quantity',
        data: series.map((data) => data.ScrapQuantity),
      },
    ],
    colors: ['#30A4FC', '#30E8AA', '#FEBF44', '#FF687E'],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 10,
      offsetX: 0,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return (
    <div style={{ background: '#fff', width: '100%' }}>
      <ApexCharts
        options={options}
        series={options.series}
        type='bar'
        height={350}
      />
    </div>
  );
};

export default StackInventoryUsableDamageValue;
