import { Grid, Typography, Box, IconButton } from "@mui/material";
// import Grennup from "../../../../../assets/icon/greenup.svg";
// import RedDown from "../../../../../assets/icon/redDown.svg";
// import MoreIcon from "../../../../../assets/icon/moreIcon.svg";
import { ReactComponent as MoreSVG } from "../../../../../assets/icon/more.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function MTTRMTBFCard({ item }) {
  return (
    <div>
      <Box className="">
        <Box>
          <div className="title-morinfo">
            <Typography className="ib-kpt-title mb-10">{item?.KPIType}</Typography>
            <div>
              <IconButton size="small" sx={{ padding: "4px" }}>
                <MoreSVG style={{ width: "24px", height: "24px" }} />
              </IconButton>
            </div>
          </div>

          <div className="ib-item-flex">
            <div>
              <Typography className="ib-kip-value-red mb-10">
                {item?.Value}
              </Typography>

              <div className="ib-item-flex-black">
                <Typography className="ib-kip-value-black">
                  {item?.Targets}
                </Typography>
                <Typography className="ib-kpt-subtitle pl-5">Target</Typography>
              </div>
            </div>

            <div className="RedAlterBox">
              <ArrowDownwardIcon className="DownArrow"></ArrowDownwardIcon>
              <Typography className="TargetLoss">90%</Typography>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default MTTRMTBFCard;
