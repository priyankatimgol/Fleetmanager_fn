import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import { ReactComponent as MoreSVG } from "../../../../../../../assets/icon/more.svg";
import { ReactComponent as TaskSVG } from "../../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../../assets/icon/planning-kpi-icon/timer.svg";

const data = [90, 95, 96, 97, 68, 59, 100, 91, 92, 73, 94, 96]
const BubbleChart = ({icon, label}) => {
    const convertArray = (val, index) => {
        return {
            x: index,
            y: val,
            z: val,
        }
    }
    const result = data?.map((val, index) => convertArray(val, index))
    const options = {
        chart: {
            height: 350,
            type: 'bubble',
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
            },
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '10px',
                fontFamily: '"Poppins", sans-serif'
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `<div style="font-size: 12px; padding: 5px">` +
                    `<span>PM: ${series[seriesIndex][dataPointIndex]} </span>` +
                    '</div>';
            }
        },
        xaxis: {
            labels: {
                formatter: function (val) {
                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                    return months[val];
                },
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        // plotOptions: {
        //     bubble: {
        //       zScaling: true,
        //       minBubbleRadius: 20,
        //       maxBubbleRadius: 30,
        //     }
        // },
        dataLabels: {
            enabled: true,
            formatter: function (series, { dataPointIndex }) {
                return ''
            },
            style: {
                colors: ['#000'],
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                postion:"absolute"
            },
        },
        fill: {
            type: 'gradient',
          },
    };

    const series = [{
        name: 'PM',
        data: result ?? [],
    }];

    return (
        <>
            <Grid container sx={{ maxHeight: "280px", width: "100%" }}>
                <Grid item md={12} xs={12}>
                    <div className="HV-titleflex">
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: 0.5,
                            }}
                        >
                            {icon === "timer" ? (
                                <TimerSVG style={{ width: "16px", height: "16.5px" }} />
                            ) : (
                                <TaskSVG style={{ width: "16px", height: "16.5px" }} />
                            )}

                            <Typography
                                variant="h6"
                                fontSize={14}
                                color="#505050"
                                fontWeight="600"
                            >
                                PM Quality
                            </Typography>
                        </Box>

                        <div className="HV-titleflex">
                            <div className="annual-box">
                                <Typography variant="h4" fontSize={12} color="#6499E9">
                                    Annual 55 %
                                </Typography>
                            </div>
                            <div>
                                <IconButton size="small" sx={{ padding: "4px" }}>
                                    <MoreSVG style={{ width: "24px", height: "24px" }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item md={12}>
                    <Chart
                        options={options}
                        series={series}
                        type="bubble"
                        height={200}
                    />
                </Grid>
            </Grid>
            {/* <div id="chart">
            <Chart
                options={options}
                series={series}
                type="bubble"
                height={250}
            />
        </div> */}
        </>
    );
};

export default BubbleChart;
