import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const MTTRChart = ({ data }) => {
    const [speedValue, setSpeedValue] = useState(0)
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography align="left" sx={{ color: "black", fontWeight: 700 }}>MTTR</Typography>
            </Box>
            <ReactSpeedometer
                value={data?.Value}
                needleHeightRatio={0.7}
                minValue={0}
                maxValue={30}
                needleColor="grey"
                startColor="green"
                endColor="red"
                height={140}
                width={230}
                ringWidth={30}
                maxSegmentLabels={0}
                textColor={"#AAA"}
                segments={555}
            />
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <FiberManualRecordIcon style={{ height: "15px", width: "15px", color: "#FF2A27", marginTop: "2px" }} />&nbsp;
                    <Typography > Greater 20</Typography>
                </Box>
                <Box ml={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <FiberManualRecordIcon style={{ height: "15px", width: "15px", color: "#FFFF00", marginTop: "2px" }} />&nbsp;
                    <Typography > 10-20</Typography>
                </Box>
                <Box ml={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <FiberManualRecordIcon style={{ height: "15px", width: "15px", color: "#5DBB63", marginTop: "2px" }} />&nbsp;
                    <Typography > 0-10</Typography>
                </Box>
            </Box>
        </div>
    );
}

export default MTTRChart;
