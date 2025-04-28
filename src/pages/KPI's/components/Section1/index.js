import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "./Components/card";
import WindSpeed from "./Components/windSpeed";
import { useDispatch, useSelector } from "react-redux";
import { getKpiMAPLFPlantCapacity, getKpiYTDMA, getSiteInchargeKpiData, getTopSectionData } from "redux/actions/SiteHomeActions";
import SelectSite from "./Components/selectSite";
import BoxComp from "./Components/BoxComp";

function TopSection() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const KPIData = state.siteHomeKpi.siteInchargeKpi;
  const SelSite = state.siteHomeKpi?.selSite;
  const plantCapacity_MA_PLF = state.siteHomeKpi?.plantCapacityMaPlf;
  const ytdMaValue = state?.siteHomeKpi?.kpiYTDMA ?? [];

  const [maData, setMaData] = useState(null)
  const [plfData, setPlfData] = useState(null)
  const [plantCapacity, setPlantCapacity] = useState(null)

  useEffect(() => {
    if (!SelSite) return;
    dispatch(getTopSectionData(SelSite))
    dispatch(getKpiMAPLFPlantCapacity(SelSite))
    dispatch(getKpiYTDMA(SelSite))
    // dispatch(getSiteInchargeKpiData({ parameter: "TotalGeneration"}))
    // dispatch(getSiteInchargeKpiData({ parameter: "CurrentActivePower"}))
  }, [SelSite])

  useEffect(() => {
    if (plantCapacity_MA_PLF) {
      const maVals = plantCapacity_MA_PLF.find(d => d.KPIType === "YTD_MA");
      setMaData(maVals)
      const plfVals = plantCapacity_MA_PLF.find(d => d.KPIType === "PLF");
      setPlfData(plfVals)
      const capacityVals = plantCapacity_MA_PLF.find(d => d.KPIType === "Plant Capacity");
      setPlantCapacity(capacityVals)
    }
  }, [plantCapacity_MA_PLF])

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <SelectSite />
      </Grid>

      <Grid item xs={3}>
        <WindSpeed data={ytdMaValue} />
      </Grid>

      <Grid item xs={3}>
        <Card data={plfData}  title="Total Generation" />
      </Grid>

      <Grid item xs={3}>
        <BoxComp data={plantCapacity}/>
      </Grid>

      {/* <Grid item xs={3}>
        <Card data={0} title="Reactive Power" />
      </Grid> */}

    </Grid>
  );
}

export default TopSection;
