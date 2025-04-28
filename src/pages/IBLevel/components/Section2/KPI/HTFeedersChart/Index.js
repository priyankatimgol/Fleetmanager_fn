import { Typography, Box, IconButton, Grid } from "@mui/material";
import { ReactComponent as MoreSVG } from "../../../../../../assets/icon/more.svg";
import { ReactComponent as TaskSVG } from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { ReactComponent as TimerSVG } from "../../../../../../assets/icon/planning-kpi-icon/timer.svg";
import { useEffect, useState } from "react";
import Charts from "./Componants/Chart";


const HTFeedersChart = ({ data, icon, label }) => {
    const [annualData, setAnnualData] = useState({})
    const [quarterData, setQuarterData] = useState([])

    useEffect(() => {
        if (!data || data?.length === 0) return setQuarterData([]);
        const annualData = data?.filter((d) => d.FilterType === "Annual")
        setAnnualData(annualData)
        const filterdData = data?.filter((d) => d.FilterType === "Quarter")
        setQuarterData(filterdData)
    }, [data]);
    return (
        <Grid container >
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
            <Grid item md={12}>
                {quarterData?.length > 0 &&
                    <Charts
                        data={quarterData}
                    />}
            </Grid>
        </Grid>
    );
};
export default HTFeedersChart;