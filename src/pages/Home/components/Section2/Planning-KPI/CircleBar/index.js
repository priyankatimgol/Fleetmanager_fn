import React, { useEffect, useState } from "react";
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

const colors = ["#69bc4b", "#7098FF",];

const CircleBarCard = ({ title, available, total, index }) => {
  const [color, setColor] = useState("#7098FF");
  const [value, setValue] = useState(0);

  const getPercent = (val, total) => {
    return (val / total * 100).toFixed(0);
  }

  useEffect(() => {
    if (available && total) {
      setValue(getPercent(available, total))
    }

    if (index) {
      setColor(colors[(index + 1) % 2]);
    }

  }, [available, total, index])

  return (
    <>
      <Card className="cardWrapper">
        <CardContentNoPadding>
          <Box className="circleBarCardWrapper">
            <Box className="circlePercent-image-wrapper" sx={{ flex: 0.3 }}>
              <PlanningSVG style={{ width: '18px', height: '18px', fill: color }} />
            </Box>
            <Box className="circleBarCardTitle" sx={{ flex: 1.5 }}>
              <Typography fontSize={11}>{title}</Typography>
              <Typography fontSize={11}>{available} Available out of {total}</Typography>
            </Box>
            <Box sx={{ flex: 0.8, display: 'flex', justifyContent: 'end' }}>
              <Circle
                percent={value}
                strokeWidth={12}
                strokeColor={color}
                trailColor="#FFBF00"
                trailWidth={8}
                height="50%"
                width="50%"
              />
            </Box>
          </Box>
        </CardContentNoPadding>
      </Card>
    </>
  );
};

export default CircleBarCard;
