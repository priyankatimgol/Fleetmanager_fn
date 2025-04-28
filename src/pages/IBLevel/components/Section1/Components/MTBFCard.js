import { Grid, Typography, Box, IconButton } from "@mui/material";
// import Grennup from "../../../../../assets/icon/greenup.svg";
// import RedDown from "../../../../../assets/icon/redDown.svg";
// import MoreIcon from "../../../../../assets/icon/moreIcon.svg";
import { ReactComponent as MoreSVG } from "../../../../../assets/icon/more.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";

function MTBFCard({ data }) {
    const [mtbf, setMtbf] = useState({})
    useEffect(() => {
        if (!data || data?.length === 0) return setMtbf();
        const mttrData = data?.find((d) => d.KPIType === 'MTBF')
        setMtbf(mttrData)
    }, [data])
    return (
        <div>
            <Box className="">
                {
                    mtbf === undefined ? (
                        <Box>
                            <div className="title-morinfo">
                                <Typography className="ib-kpt-title mb-10">MTBF</Typography>
                                <div>
                                    <IconButton size="small" sx={{ padding: "4px" }}>
                                        <MoreSVG style={{ width: "24px", height: "24px" }} />
                                    </IconButton>
                                </div>
                            </div>
                            <Box mt={2}>
                                <Typography variant="body2">There is no data available</Typography>
                            </Box>
                        </Box>
                    ) : (<Box>
                        <div className="title-morinfo">
                            <Typography className="ib-kpt-title mb-10">{mtbf?.KPIType}</Typography>
                            <div>
                                <IconButton size="small" sx={{ padding: "4px" }}>
                                    <MoreSVG style={{ width: "24px", height: "24px" }} />
                                </IconButton>
                            </div>
                        </div>

                        <div className="ib-item-flex">
                            <div>
                                <Typography className={ parseInt(mtbf?.TrendTarget) > 0 ? "ib-kip-value-green mb-10":"ib-kip-value-red mb-10" }>
                                    {parseInt(mtbf?.Value)}
                                </Typography>

                                <div className="ib-item-flex-black">
                                    <Typography className="ib-kip-value-black">
                                        {mtbf?.Targets ? mtbf?.Targets : ""}
                                    </Typography>
                                    <Typography className="ib-kpt-subtitle pl-5">Target</Typography>
                                </div>
                            </div>

                            {/* <div className="GreenAlterBox">
                                <ArrowUpwardIcon className="UpArrow"></ArrowUpwardIcon>
                                <Typography className="TargetLossGreen">{mtbf?.TrendTarget ? mtbf?.TrendTarget: ""}%</Typography>
                            </div> */}

                            {
                                parseInt(mtbf?.TrendTarget) > 0 ? (
                                    <div className="GreenAlterBox">
                                        <ArrowUpwardIcon className="UpArrow"></ArrowUpwardIcon>
                                        <Typography className="TargetLossGreen">{parseInt(mtbf?.TrendTarget)}%</Typography>
                                    </div>
                                ) : (
                                    <div className="RedAlterBox">
                                        <ArrowDownwardIcon className="DownArrow"></ArrowDownwardIcon>
                                        <Typography className="TargetLoss">{parseInt(mtbf?.TrendTarget)}%</Typography>
                                    </div>
                                )
                            }
                        </div>
                    </Box>
                    )
                }
            </Box>
        </div>
    );
}

export default MTBFCard;
