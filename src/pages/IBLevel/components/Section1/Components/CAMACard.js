import { Grid, Typography, Box, IconButton } from "@mui/material";
// import Grennup from "../../../../../assets/icon/greenup.svg";
// import RedDown from "../../../../../assets/icon/redDown.svg";
// import MoreIcon from "../../../../../assets/icon/moreIcon.svg";
import { ReactComponent as MoreSVG } from "../../../../../assets/icon/more.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function CAMACard({ data, label }) {

    return (
        <div>
            <Box className="">
                <Box>
                    <div className="title-morinfo">
                        <Typography className="ib-kpt-title mb-10">{label}</Typography>
                        <div>
                            <IconButton size="small" sx={{ padding: "4px" }}>
                                <MoreSVG style={{ width: "24px", height: "24px" }} />
                            </IconButton>
                        </div>
                    </div>

                    <div className="ib-item-flex">
                        <div>
                            <Typography className={data?.Trend > 0 ? "ib-kip-value-green mb-10":"ib-kip-value-red mb-10" }>
                                {label === 'CAMA (%)-H1' ? Number(data?.MA_H1).toFixed(2) : Number(data?.MA_H2).toFixed(2)}%
                            </Typography>

                            <div className="ib-item-flex-black">
                                <Typography className="ib-kip-value-black">
                                    {data?.Target}
                                </Typography>
                                <Typography className="ib-kpt-subtitle pl-5">Target</Typography>
                            </div>
                        </div>

                        {data?.Trend > 0 ? (
                            <div className="GreenAlterBox">
                                <ArrowUpwardIcon className="UpArrow"></ArrowUpwardIcon>
                                <Typography className="TargetLossGreen">{data?.Trend !== null ? parseInt(data?.Trend):""}%</Typography>
                            </div>
                        ) : (
                            <div className="RedAlterBox">
                                <ArrowDownwardIcon className="DownArrow"></ArrowDownwardIcon>
                                <Typography className="TargetLoss">{data?.Trend !== null ? parseInt(data?.Trend?.toString()?.replaceAll("-", "")):""}%</Typography>
                            </div>
                        )
                        }

                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default CAMACard;
