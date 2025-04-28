import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { data } from "pages/Home/utils";
import CallStatusCharts from "./CallStatusChart/Index";
import PMNCChart from "./PMNCCharts/PMNCChart";
import { useDispatch, useSelector } from "react-redux";
import { getCallStatus, getPMNCStatus } from "redux/actions/SiteHomeActions";

function AdditionalKPI() {
  const dispatch = useDispatch()
  const state = useSelector(state => state);
  const SelSite = state.siteHomeKpi?.selSite;
  const callStatusData = state?.siteHomeKpi?.callStatus ?? [];
  const PMNCStatusData = state?.siteHomeKpi?.PMNCStatus ?? [];

  useEffect(() => {
    if (!SelSite) return;
    dispatch(getCallStatus(SelSite))
    dispatch(getPMNCStatus(SelSite))
  }, [SelSite])

  return (
    <Box>
      <Grid container sx={{ mt: "1px" }} spacing={2} className="bottomWrapper" >
        <Grid item xs={12} md={4.08} >
          <CallStatusCharts data={callStatusData} icon="task" label="CRMS HD Ticketing Status" showToolbar={true} />
        </Grid>
        <Grid item xs={12} md={3.95}>
          <PMNCChart data={PMNCStatusData} icon="task" label="PMNC Status" showToolbar={true} color={["#FEBC3B", "#6ACD75"]} />
        </Grid>
        {/* <Grid item xs={12} md={3.95} >
          <BarChartPmLsTci data={[]} icon="task" label="LS" showToolbar={true} color={["#FF8193", "#6ACD75"]}/>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default AdditionalKPI;
