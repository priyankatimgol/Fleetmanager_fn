import { Box, Grid } from "@mui/material";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TitleComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import '../styles.css'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    PieChart,
    SVGRenderer,
  ]);

const chartColors = ['#36a98a', '#ffbf00', '#7098ff', '#69bc4b']

const Chart = ({ data }) => {
    const options = {
        series: [
            {
                type: 'pie',
                radius: '40%',
                width: '150px',
                height: '125px',
                left: 'center',
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                },
                label: {
                    alignTo: 'edge',
                    formatter: '{c}',
                    minMargin: 5,
                    edgeDistance: 10,
                    lineHeight: 8,
                    rich: {
                        time: {
                            fontSize: 5,
                            color: '#999',
                        },
                    },
                },
                labelLine: {
                    length: 4,
                    length2: 0,
                    maxSurfaceAngle: 80,
                },
                labelLayout: function (params) {
                    const points = params.labelLinePoints;
                    // Update the end point.
                    points[2][0] = params.labelRect.x + params.labelRect.width;
                    return {
                        labelLinePoints: points,
                    };
                },
                data: data,
            },
        ],
        color: chartColors,
        textStyle: {
            fontSize: 11
        }
    }
    return (
        <Box>
            <Grid container spacing={3} sx={{position:'relative'}}>
                <Box className="pieChartWrapper">
                    <ReactEChartsCore
                        echarts={echarts}
                        option={options}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={'theme_name'}
                        opts={{}}
                    />
                    <Box className="legendWrapper">
                        <Grid alignItems='center' width='90%' container columnSpacing={1}>
                            {data?.map((dt, ind) => (
                                <Grid textAlign='center' className="legendText"  item md={6}>
                                    <Box className="legendIndicator" sx={{ backgroundColor: chartColors[ind] }} />{dt.name}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default Chart;
