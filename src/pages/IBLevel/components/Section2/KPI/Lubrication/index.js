import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, Grid, MenuItem, Select, Stack, Typography, IconButton, } from '@mui/material';
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Charts from './Componants/Charts';
import { ReactComponent as MoreSVG } from "../../../../../../assets/icon/more.svg";


const barColors = ['#ED0944', '#C24E73', '#3D5E94', '#676A6F', '#C8B42F', '#8F60BC', '#40A480'];

const yAxisMaxConfigs = {
    max: 100,
    decimalsInFloat: 0,
    forceNiceScale: false,
    tickAmount: 5,
};
const yAxisConfigs = {
    decimalsInFloat: 0,
    forceNiceScale: false,
}

const LubricationChart = ({data, icon, label }) => {
    const [lubrication, setLubrication] = useState([])
    useEffect(() => {
        if (!data || data?.length === 0) return setLubrication([]);
        const valuesArray = Object.values(data[0]).map(val => parseInt(val));
        setLubrication(valuesArray)
    }, [data]);
    return (

        <Grid>
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
                            {label}
                        </Typography>
                    </Box>

                    {data[1] &&
                        <div className="HV-titleflex">
                        <div className="annual-box">
                            <Typography variant="h4" fontSize={12} color="#6499E9">
                                Annual {parseInt(data[1]?.Annual)} %
                            </Typography>
                        </div>
                        <div>
                            <IconButton size="small" sx={{ padding: "4px" }}>
                                <MoreSVG style={{ width: "24px", height: "24px" }} />
                            </IconButton>
                        </div>
                    </div>
                    }
                </div>
            </Grid>
            <Grid container>
                {
                    lubrication?.length > 0 &&
                    <Grid item md={8} xs={8}>
                        <Charts data={lubrication} />
                    </Grid>
                }

                {data?.length > 0 &&
                <Grid item md={4} xs={4} mt={4}>
                  <Grid container>
                    <Grid item md={6} xs={6}>
                      <Stack spacing={1}>
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            style={{ height: "10px", width: "10px", color: "#FA5A5B" }}
                          />
                          <Typography variant="h3" fontSize={11} color="#a9a6a6" fontWeight={700}>
                            Q1
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            fontWeight={700}
                            fontSize={18}
                            color="#505050"
                          >
                             {parseInt(data[0].Q1_Percentage)}
                          </Typography>
                          <Typography variant="h3" fontSize="12px" color="#a9a6a6">
                            %
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
      
                    <Grid item md={6} xs={6}>
                      <Stack spacing={1}>
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            style={{ height: "10px", width: "10px", color: "#0FB7A8" }}
                          />
                          <Typography variant="h3" fontSize={11} fontWeight={700} color="#a9a6a6">
                            Q2
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            fontWeight={700}
                            fontSize={18}
                            color="#505050"
                          >
                              {parseInt(data[0].Q2_Percentage)}
                          </Typography>
                          <Typography variant="h3" fontSize="12px" color="#a9a6a6">
                            %
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
      
                    <Grid item md={6} xs={6} mt={3}>
                      <Stack spacing={1}>
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            style={{ height: "12px", width: "12px", color: "#FFB600" }}
                          />
                          <Typography variant="h3" fontSize={11} color="#a9a6a6" fontWeight={700}>
                            Q3
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            fontWeight={700}
                            fontSize={18}
                            color="#505050"
                          >
                             {parseInt(data[0].Q3_Percentage)}
                          </Typography>
                          <Typography variant="h3" fontSize="12px" color="#a9a6a6">
                            %
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
      
                    <Grid item md={6} xs={6} mt={3}>
                      <Stack spacing={1}>
                        <Box sx={{ display: "flex" }}>
                          <FiberManualRecordIcon
                            style={{ height: "12px", width: "12px", color: "#543186" }}
                          />
                          <Typography variant="h3" fontSize={11} color="#a9a6a6" fontWeight={700}>
                            Q4
                          </Typography>
                        </Box>
                        <Box ml={2} sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            fontWeight={700}
                            fontSize={18}
                            color="#505050"
                          >
                             {parseInt(data[0].Q4_Percentage)}
                          </Typography>
                          <Typography variant="h3" fontSize="12px" color="#a9a6a6">
                            %
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
      
                  </Grid>
                </Grid>
              }
            </Grid>
        </Grid>
    );
};

export default LubricationChart;
