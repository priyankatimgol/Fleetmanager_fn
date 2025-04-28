import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Charts from "./Componants/Charts";
import { ReactComponent as MoreSVG } from "../../../../../../assets/icon/more.svg";

const barColors = [
  "#ED0944",
  "#C24E73",
  "#3D5E94",
  "#676A6F",
  "#C8B42F",
  "#8F60BC",
  "#40A480",
];

const yAxisMaxConfigs = {
  max: 100,
  decimalsInFloat: 0,
  forceNiceScale: false,
  tickAmount: 5,
};
const yAxisConfigs = {
  decimalsInFloat: 0,
  forceNiceScale: false,
};
const HVEHvPSSChart = ({ data, icon, label }) => {
  const [annualData, setAnnualData] = useState({})
  const [barData, setBarData] = useState({
    dataValues: [],
    dataLabels: [],
  });
  useEffect(() => {
    if (!data || data?.length === 0) return setBarData({});
    const annualData = data?.filter((d) => d.FilterType === "Annual")
    setAnnualData(annualData)
    const filterdData = data?.filter((d) => d.FilterType === "Quarter")
    if (!filterdData || filterdData?.length === 0) return setBarData({});
    const dataValues = [];
    const dataLabels = [];
    filterdData.forEach((d) => {
      dataValues.push(parseInt(d.Value));
      dataLabels.push(d.Colname);
    });

    setBarData({ dataValues: dataValues, dataLabels: dataLabels });
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

          <div className="HV-titleflex">
            <div className="annual-box">
              <Typography variant="h4" fontSize={12} color="#6499E9">
                Annual {annualData[0]?.Value} %
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
      <Grid container>
        <Grid item md={8} xs={8}>
          <Charts data={barData} />
        </Grid>

        {barData?.dataValues?.length && 
          <Grid item md={4} xs={4} mt={8}>
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
                     {barData?.dataValues[0]}
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
                      {barData?.dataValues[1]}
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
                     {barData?.dataValues[2]}
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
                      {barData?.dataValues[3]}
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

export default HVEHvPSSChart;
