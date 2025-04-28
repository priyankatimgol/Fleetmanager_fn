import { Grid, Typography, Box, IconButton } from "@mui/material";
// import Grennup from "../../../../../assets/icon/greenup.svg";
// import RedDown from "../../../../../assets/icon/redDown.svg";
// import MoreIcon from "../../../../../assets/icon/moreIcon.svg";
import { ReactComponent as MoreSVG } from "../../../../../assets/icon/more.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";

function MTTRCard({ data }) {
    const [mttr, setMttr] = useState({})
 
    useEffect(() => {
        if (!data || data?.length === 0) return setMttr();
        const mttrData = data?.find((d) => d.KPIType === 'MTTR')
        setMttr(mttrData)
    }, [data])
    return (
        <div>
            <Box className="">
                {
                    mttr === undefined ? (
                        <Box>
                            <div className="title-morinfo">
                                <Typography className="ib-kpt-title mb-10">MTTR</Typography>
                                <div>
                                    <IconButton size="small" sx={{ padding: "4px" }}>
                                        <MoreSVG style={{ width: "24px", height: "24px" }} />
                                    </IconButton>
                                </div>
                            </div>
                            <Box mt={4}>
                               <Typography variant="body2">There is no data available</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <div className="title-morinfo">
                                <Typography className="ib-kpt-title mb-10">{mttr?.KPIType}</Typography>
                                <div>
                                    <IconButton size="small" sx={{ padding: "4px" }}>
                                        <MoreSVG style={{ width: "24px", height: "24px" }} />
                                    </IconButton>
                                </div>
                            </div>

                            <div className="ib-item-flex">
                                <div>
                                    <Typography className="ib-kip-value-red mb-10">
                                        {parseInt(mttr?.Value)}
                                    </Typography>

                                    {/* <div className="ib-item-flex-black">
                                <Typography className="ib-kip-value-black">
                                    {mttr?.targets ? mttr?.targets + "%":""}
                                </Typography>
                                <Typography className="ib-kpt-subtitle pl-5">Target{}</Typography>
                            </div> */}
                                </div>

                                {/* <div className="RedAlterBox">
                            <ArrowDownwardIcon className="DownArrow"></ArrowDownwardIcon>
                            <Typography className="TargetLoss">95%</Typography>
                        </div> */}
                            </div>
                        </Box>
                    )
                }
            </Box>
        </div>
    );
}

export default MTTRCard;
