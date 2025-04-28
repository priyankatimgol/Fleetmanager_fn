import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  PolarComponent,
  TitleComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { Box } from '@mui/material';
import '../styles.css'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PolarComponent,
  SVGRenderer,
]);

const chartColors = ['#36a98a', '#ffbf00', '#69bc4b', '#7098ff']

const Chart = () => {
  const options = {
    angleAxis: {
      type: 'category',
      data: ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW'],
      startAngle: 115,
      axisLabel: {
        fontSize: 10,
        color:'#505050',
      }
    },
    radiusAxis: {},
    polar: [{
      radius: '75%',
      center: ['35%', '50%']
    }],
    series: [
      {
        type: 'bar',
        data: [1, 2, 3, 4, 3, 5, 1],
        coordinateSystem: 'polar',
        name: '11-14 m/s',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'bar',
        data: [2, 4, 6, 1, 3, 2, 1],
        coordinateSystem: 'polar',
        name: '8-11 m/s',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'bar',
        data: [1, 2, 3, 4, 1, 2, 5],
        coordinateSystem: 'polar',
        name: '5-8 m/s',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      },
      {
        type: 'bar',
        data: [7, 6, 2, 5, 1, 3, 5],
        coordinateSystem: 'polar',
        name: '<5 m/s',
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      }
    ],
    color: chartColors,
    textStyle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize:'11px',
      fontWeight:400,
      color:'#505050',
    },
    legend: {
      show: true,
      orient: 'vertical',
      align: 'auto',
      right: 0,
      top: 25,
      data: [
        {
          name: '11-14 m/s',
          icon: 'circle'
        },
        {
          name: '8-11 m/s',
          icon: 'circle'
        },
        {
          name: '5-8 m/s',
          icon: 'circle'
        },
        {
          name: '<5 m/s',
          icon: 'circle'
        },
      ]
    }
  };

  return (
    <Box className="roseChartWrapper">
      <ReactEChartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        opts={{}}
        style={{ width: 'auto', height: '100%' }}
      />
    </Box>
  )
}

export default Chart