import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { ReactComponent as PlanningSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-statistics.svg";
import "./styles.css";
import { styled } from "@mui/material/styles";
import { Line, Circle } from "rc-progress";

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  },
  &:last-of-type {
    padding-bottom: 8px !important;
  }
`);

const CircleBarCard = () => {
  const data = [
    {
      icon: "planning",
      title: "Resource Planning",
      title1: "4 available out 10",
      color: "#7098FF",
      color1: "#FFBF00",
      value: 40,
    },
    {
      icon: "planning",
      title: "Resource Planning",
      title1: "8 available out 10",
      color: "#69bc4b",
      color1: "#FFBF00",
      value: 80,
    },
    {
      icon: "planning",
      title: "Resource Planning",
      title1: "6 available out 10",
      color: "#7098FF",
      color1: "#FFBF00",
      value: 60,
    },
  ];
  return (
    <>
      {data &&
        data.map((d) => {
          return (
            <Card className="cardWrapper">
              <CardContentNoPadding>
                <Box className="circleBarCardWrapper">
                  <Box className="circlePercent-image-wrapper" sx={{ flex: 0.3 }}>
                    <PlanningSVG style={{ width: '18px', height: '18px', fill: d.color }}/>
                  </Box>
                  <Box className="circleBarCardTitle" sx={{ flex: 1.5 }}>
                      <Typography fontSize={11}>{d.title}</Typography>
                      <Typography fontSize={11}>{d.title1}</Typography>
                  </Box>
                  <Box sx={{ flex: 0.8, display: 'flex', justifyContent: 'end' }}>
                    <Circle
                      percent={d.value}
                      strokeWidth={12}
                      strokeColor={d.color}
                      trailColor={d.color1}
                      trailWidth={8}
                      height="50%"
                      width="50%"
                    />
                  </Box>
                </Box>
              </CardContentNoPadding>
            </Card>
          );
        })}
    </>
  );
};

export default CircleBarCard;
