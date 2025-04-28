import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReactComponent as PlanningSVG } from "../../../../../../assets/icon/planning-kpi-icon/10-planning.svg"
import { ReactComponent as StatisticsSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-statistics.svg"
import { Box, Grid } from '@mui/material';
import "./styles.css"
import { styled } from "@mui/material/styles";
import { Line, Circle } from 'rc-progress';
const data = [
    { icon: "planning", title: "Site To Do:", title1: "12 Open", color: "#7098FF", value: 40 },
    { icon: "statistics", title: "Special Project Inspection:", title1: "19 Open", color: "#69bc4b", value: 70 },
    { icon: "planning", title: "Work Order Management:", title1: "08 Open", color: "#ffbf00", value: 60 },
    { icon: "statistics", title: "PM Planning:", title1: "10 Open", color: "#36a98a", value: 90 },
    { icon: "planning", title: "Site To Do:", title1: "12 Open", color: "#7098FF", value: 25 },
    { icon: "statistics", title: "Special Project Inspection:", title1: "19 Open", color: "#69bc4b", value: 85 },
    { icon: "planning", title: "Work Order Management:", title1: "08 Open", color: "#ffbf00", value: 50 },
    { icon: "statistics", title: "PM Planning:", title1: "10 Open", color: "#36a98a", value: 95 },
]

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  },
  &:last-of-type {
    padding-bottom: 8px !important;
  }
`);

const ProgressBarCard = () => {

    return (
        <>
            {
                data && data.map((d) => {
                    return (
                        <Card className='percentWrapper'>
                            <CardContentNoPadding>
                                <Box className="percentContent">
                                    <Box className='image-wrapper'>
                                        {
                                            d.icon === 'planning' ? (
                                                <PlanningSVG style={{ width: '18px', height: '18px', fill: d.color }}/>
                                            ) : (
                                                <StatisticsSVG style={{ width: '18px', height: '18px', fill: d.color }}/>
                                            )
                                        }
                                    </Box>
                                    <Box className="percentLabelBar">
                                        <Box className="card-content-box">
                                            <Typography fontSize={11}>{d.title}</Typography>
                                            <Box className="card-content-title">
                                                <Typography fontSize={11}>{d.title1}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                                            <Box sx={{ width: "90%", }}>
                                                <Line
                                                    strokeWidth={5}
                                                    trailWidth={5}
                                                    percent={d.value}
                                                    strokeColor={d.color}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Box>
                                            <Box ml={2}>
                                                <Typography fontSize={11}>{d.value}%</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContentNoPadding>
                        </Card>
                    )
                })
            }
        </>
    );
};

export default ProgressBarCard;