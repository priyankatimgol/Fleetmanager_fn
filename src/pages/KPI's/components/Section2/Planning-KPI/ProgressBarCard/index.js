import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactComponent as PlanningSVG } from "../../../../../../assets/icon/planning-kpi-icon/10-planning.svg";
import { ReactComponent as StatisticsSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-statistics.svg";
import { Box } from "@mui/material";
import "../ProgressBar/styles.css";
import { styled } from "@mui/material/styles";
import { Line } from "rc-progress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const colors = ["#36a98a", "#ffbf00", "#69bc4b", "#7098FF"];

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  },
  &:last-of-type {
    padding-bottom: 8px !important;
  }
`);

const ProgressBar = ({ icon, title, index }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const ProgressBar = state.siteHomeKpi.planningKpiProgressBar ?? [];
  const [barData, setBarData] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (Object.values(ProgressBar).length > 0) {
        const filterData = ProgressBar?.find((d) => d?.KpiType === title)
        setBarData(filterData)
    }
    if (index) {
      const color = colors[index % 4];
      setColor(color);
    }
  }, [ProgressBar, index])

  const handleCardClick = (type) => {
    if (barData?.KpiType === title) {
      if(type && type.length>0)
      {
        const encodedTaskType = encodeURIComponent(type);

        const queryParams = new URLSearchParams({
          taskType: encodedTaskType,
        });
        window.open(`/task-management?${queryParams.toString()}`, '_blank');
      }else{
        window.open(`/task-management`, '_blank');
      }
    }
  };
  return (
    <Card onClick={()=>handleCardClick(barData?.TaskType)} className={barData?.KpiType === title ? "percentWrapper-false" :"percentWrapper-disabled"}>
      <CardContentNoPadding>
        <Box className="percentContent">
          <Box className="image-wrapper">
            {icon === "planning" ? (
              <PlanningSVG
                style={{ width: "18px", height: "18px", fill: color }}
              />
            ) : (
              <StatisticsSVG
                style={{ width: "18px", height: "18px", fill: color }}
              />
            )}
          </Box>
          <Box className="percentLabelBar">
            <Box className="card-content-box">
              <Typography fontSize={11} className="card-content-box-text">{barData?.KpiType}</Typography>
              <Box className="card-content-title">
                <Typography fontSize={11}>{barData?.Open} Open</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "end" }}>
              <Box sx={{ width: "90%" }}>
                <Line
                  strokeWidth={5}
                  trailWidth={5}
                  percent={barData?.Percentage}
                  strokeColor={color}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box ml={2}>
                <Typography fontSize={11}>{barData?.Percentage}%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContentNoPadding>
    </Card>
  );
};

export default ProgressBar;
