import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReactComponent as PlanningSVG } from "../../../../../../assets/icon/planning-kpi-icon/10-planning.svg"
import { ReactComponent as StatisticsSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-statistics.svg"
import { Box, Grid } from '@mui/material';
import "./styles.css"
import { styled } from "@mui/material/styles";
import { Line, Circle } from 'rc-progress';
import { useEffect, useState } from 'react';

const colors = [ "#36a98a", "#ffbf00", "#69bc4b", "#7098FF" ]

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  },
  &:last-of-type {
    padding-bottom: 8px !important;
  }
`);

const ProgressBarCard = ({
  icon,
  title,
  open,
  total,
  index
}) => {
  const [value, setValue] = useState(0);
  const [color, setColor] = useState("#36a98a");

  const getPercent = (val, total) => {
    return (val/total * 100).toFixed(0);
  }

  useEffect(() => {
    if (open && total) {
      const percentVal = getPercent(open, total);
      setValue(percentVal);
    }

    if (index) {
      const color = colors[(index) % 4]
      setColor(color);
    }
  },[open, total, index])

  return (
    <Card className='percentWrapper'>
      <CardContentNoPadding>
        <Box className="percentContent">
          <Box className='image-wrapper'>
            {
              icon === 'planning' ? (
                <PlanningSVG style={{ width: '18px', height: '18px', fill: color }} />
              ) : (
                <StatisticsSVG style={{ width: '18px', height: '18px', fill: color }} />
              )
            }
          </Box>
          <Box className="percentLabelBar">
            <Box className="card-content-box">
              <Typography fontSize={11}>{title}</Typography>
              <Box className="card-content-title">
                <Typography fontSize={11}>{open} Open</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'end' }}>
              <Box sx={{ width: "90%", }}>
                <Line
                  strokeWidth={5}
                  trailWidth={5}
                  percent={value}
                  strokeColor={color}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box ml={2}>
                <Typography fontSize={11}>{value}%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContentNoPadding>
    </Card>
  )
};

export default ProgressBarCard;