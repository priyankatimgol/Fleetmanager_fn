import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ReactComponent as PlanningSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-statistics.svg";
import "./styles.css";
import { styled } from "@mui/material/styles";
import { Circle } from "rc-progress";
import { useDispatch, useSelector } from "react-redux";
import { getCircularKpiData } from "redux/actions/SiteHomeActions";
import { circularBarLabels } from "../utils";

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

const CircleBarCard = ({ title, index }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const CircularBarData = state.siteHomeKpi.planningKpiCircularKpi;
  const parameterName = circularBarLabels[title];
  const [barData, setBarData] = useState(null);
  const [color, setColor] = useState("#7098FF");

  useEffect(() => {
    dispatch(getCircularKpiData(circularBarLabels[title]));
  }, [title]);

  useEffect(() => {
    if (CircularBarData[parameterName]) {
      setBarData(CircularBarData[parameterName])
    }

    if (index) {
      setColor(colors[(index + 1) % 2]);
    }

  }, [CircularBarData[parameterName], index])

  return (
    <>
      <Card className="cardWrapper-disabled">
        <CardContentNoPadding>
          <Box className="circleBarCardWrapper">
            <Box className="circlePercent-image-wrapper" sx={{ flex: 0.3 }}>
              <PlanningSVG style={{ width: '18px', height: '18px', fill: color }} />
            </Box>
            <Box className="circleBarCardTitle" sx={{ flex: 1.5 }}>
              <Typography fontSize={11}>{title}</Typography>
              <Typography fontSize={11}>{barData?.available} Available out of {barData?.total}</Typography>
            </Box>
            <Box sx={{ flex: 0.8, display: 'flex', justifyContent: 'end' }}>
              <Circle
                percent={barData?.percentage}
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
