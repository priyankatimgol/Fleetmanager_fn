import { Grid, Typography, Box, IconButton } from "@mui/material";
// import Grennup from "../../../../../assets/icon/greenup.svg";
// import RedDown from "../../../../../assets/icon/redDown.svg";
// import MoreIcon from "../../../../../assets/icon/moreIcon.svg";
import { ReactComponent as MoreSVG } from "../../../../../assets/icon/more.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


function WTGCard({ item, handleLoader, WTG_Loader }) {
  return (
    <Grid item xs={12} className="inside-card-ib pt-5">

      {WTG_Loader ? handleLoader() : <Box className="">
        <Box>
          <div className="title-morinfo">
            <Typography className="ib-kpt-title mb-10">{item?.filterType == "H1" ? "PM Quality -H1" : "PM Quality -H2"}</Typography>
            <div>
              <IconButton size="small" sx={{ padding: "4px" }}>
                <MoreSVG style={{ width: "24px", height: "24px" }} />
              </IconButton>
            </div>
          </div>

          <div className="ib-item-flex">
            <div>
              <Typography className={item?.trend > 0 ? "ib-kip-value-green mb-10":"ib-kip-value-red mb-10" }>
                {item?.PMVlaue?.toFixed(2)}%
              </Typography>

              <div className="ib-item-flex-black">
                <Typography className="ib-kip-value-black">
                  {item?.target}%
                </Typography>
                <Typography className="ib-kpt-subtitle pl-5">Target</Typography>
              </div>
            </div>

            <div className={item?.trend < 0 ? "RedAlterBox" : "GreenAlterBox"}>
              {item?.trend < 0 ? <ArrowDownwardIcon className="DownArrow"></ArrowDownwardIcon> :

                <ArrowUpwardIcon className="UpArrow"></ArrowUpwardIcon>
              }
              <Typography className={item?.trend < 0 ? "TargetLoss" : "TargetLossGreen"}>{item?.trend < 0 ? item?.trend?.toString()?.replaceAll("-", "") : item?.trend}%</Typography>
            </div>

            {/* <div className="ib-icon">
              {item?.redIcon && (
                <img src={RedDown} alt="" style={{ margin: "0" }} />
              )}
              {item?.greenIcon && (
                <img src={Grennup} alt="" style={{ margin: "0" }} />
              )}

              <IconButton
                size="small"
                sx={{ width: "30px", height: "30px", background: "whitesmoke" }}
              >
                <img
                  src={MoreIcon}
                  alt=""
                  style={{ width: "15px", height: "15px", margin: "0" }}
                />
              </IconButton>
            </div> */}
          </div>
        </Box>
        {/* <Typography className="kpi-title">
              <img src={item?.icon} alt="icon"/>
             {item?.name}
             </Typography> */}
      </Box>}

    </Grid>
  );
}

export default WTGCard;
