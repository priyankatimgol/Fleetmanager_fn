import React from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import TurbinIcon from "../../../../../../assets/icon/iconT.svg";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "pages/common-components/Spinner";
import { TURBINE_API } from "pages/KPI's/utils";
import { useNavigate } from "react-router-dom";
import { setSelectedTurbin } from "redux/actions/SiteHomeActions";

const convertTime = (time) => {
  const [hours, minutes] = time.split(':');
  const value = String(hours).slice(0, 2);
  return`${value}:${minutes}`;
}


function TurbinCard({ data }) {
  const state = useSelector((state) => state);
  const Loading = state.siteHomeKpi?.loading;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const turbineInfo = (data) => {
    if (!data) return null;
    return (
      <Box sx={{ fontSize: "0.9rem" }}>
        <ul style={{ listStyleType: "none" }}>
          <li>Name : {data.turbine} </li>
          <li>Windspeed : {data.windSpeed} </li>
          <li>Active Power : {data.currentActivePower} </li>
          {data.errorDescription && (
            <li>Alarm : {data.errorDescription} </li>
          )}
        </ul>
      </Box>
    );
  };

  const handleOnClick = (item) => {
    dispatch(setSelectedTurbin(item));
    navigate(`/wtg`);
  }

  return (
    <div className="turbines-wrapper">
        <Grid
          container
          columnSpacing={1}
          rowSpacing={3}
          className="turbine-wrepper"
        >
          {data?.map((item, ind) => {
            return (
              <Grid key={item?.name} item md={1.5}>
                <Tooltip title={turbineInfo(item)}>
                  <div
                    className={`turbine-highlight ${item.statusName?.replace(
                      /\s/g,
                      ""
                    )}`}
                    style={{ position: "relative", cursor:"pointer"}}
                    onClick={()=> handleOnClick(item)}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, position: "absolute", left: 10, top: 25, fontSize:"10px"}}>
                      {item?.breakdownCategory}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, position:"absolute", right:15, top:5, fontSize:"11px" }}>
                      {item?.downTimeCount.length > 2 ? `${convertTime(item?.downTimeCount)} Hr`:""}
                    </Typography>
                    <Box sx={{marginTop:"20px"}}>
                    <img src={TurbinIcon} alt="" />
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, position: "absolute", top: "53px", fontSize:"11px"}}>
                      {item?.name}
                    </Typography>
                  </div>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
    </div>
  );
}

export default TurbinCard;
