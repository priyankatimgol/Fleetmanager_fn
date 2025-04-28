import Chart from "react-apexcharts";

const MultiBar = () => {
  const chartColors = ['#7098ff', '#ffbf00', '#69bc4b']
  const series = [
    {
      data: [10, 8, 9, 5, 7, 6, 9],
      type: 'column'
    },
    {
      data: [5, 7, 6, 8, 6, 4, 5],
      type: 'column'
    },
    {
      data: [6, 6, 5, 7, 4, 5, 7],
      type: 'column'
    },
    {
      data: [3, 9, 7, 11, 8, 4, 6],
      type: 'line',
    }
  ]

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    colors: chartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 2,
      colors: ['', '', '','#fd5454']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: [0, 1, 2, 3, 4, 5, 6],
    },
    legend: {
      show: false
    }
  }

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={210} />
    </>
  )
}

export default MultiBar