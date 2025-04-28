import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Turbines from "./Turbines";
import KPI from "./KPI";
import { data } from "pages/Home/utils";
import TopSection from "../Section1";
import ErrorBucketCard from "./ErrorBucketCard";
import BarChartPmLsTci from "./KPI/PMTCILSChart";
import { getKPIDatabase, getPMLSTCIData } from "redux/actions/SiteHomeActions";
import { useDispatch, useSelector } from "react-redux";
import AdditionalKPI from "./AdditionalKPI/Index";


function MainSection() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const SelSite = state.siteHomeKpi?.selSite;
  const PM_LS_TCI_Data = state.siteHomeKpi.siteInchargeKpi?.PM_LS_TCI;
  const kpiDatabase = state.siteHomeKpi?.KPIDatabase ?? [];
  const [pmData, setPmData] = useState([]);
  const [lsData, setLsData] = useState([]);
  const [tciData, setTciData] = useState([])

  const [selectedPlanning, setSelectedPlanning] = useState({
    'PM Planning': '',
    'Lubrication Planning': '',
    'TCI Planning': ''
  })

  const getPmSelectedDrop = (data) => {
    if (data?.labelName === "PM") {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'PM Planning': data?.dropValue,
      }));
    }
    if (data?.labelName === "LS") {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'Lubrication Planning': data?.dropValue,
      }));
    }
    if (data?.labelName === "TCI") {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'TCI Planning': data?.dropValue,
      }));
    }
    // if(SelSite) {
    //   setSelectedPlanning((prevState) => ({
    //     ...prevState,  
    //     'Site To Do List': SelSite,
    //     'Special Project Inspection': SelSite,
    //     'Work Order Management': SelSite,
    //     'BD Planning':SelSite,
    //     'Oil Process Planning':SelSite,
    //     'Scada Infrastructure PM':SelSite,
    //     'Tranning Planning': SelSite
    //   }));
    // }
  }
  useEffect(() => {
    if (PM_LS_TCI_Data) {
      const pmVals = PM_LS_TCI_Data.filter(d => d.KPIType === "PM");
      setPmData(pmVals);
      const lsVals = PM_LS_TCI_Data.filter(d => d.KPIType === "LS");
      setLsData(lsVals);
      const tciVals = PM_LS_TCI_Data.filter(d => d.KPIType === "TCI");
      setTciData(tciVals);
    } else {
      setPmData();
      setLsData();
      setTciData();
    }
  }, [PM_LS_TCI_Data])

  useEffect(() => {
    if (SelSite) {
      dispatch(getPMLSTCIData(SelSite))
      dispatch(getKPIDatabase())
    }
  }, [SelSite]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} className="pt-5">
          <TopSection />
          <div>
            <Turbines />
          </div>
          <div style={{ marginTop: 10 }}>
            <ErrorBucketCard />
          </div>
        </Grid>
        <Grid item xs={12} md={5} className="pt-5">
          <KPI />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: "1px" }} spacing={2} className="bottomWrapper" >
        <Grid item xs={12} md={4.08} >
          <BarChartPmLsTci data={tciData} icon="task" label="TCI" showToolbar={true} color={["#51ECB8", "#6ACD75"]}/>
        </Grid>
        <Grid item xs={12} md={3.95}>
          <BarChartPmLsTci data={pmData} icon="task" label="PM" showToolbar={true}  color={["#FEBC3B", "#6ACD75"]}/>
        </Grid>
        <Grid item xs={12} md={3.95} >
          <BarChartPmLsTci data={lsData} icon="task" label="LS" showToolbar={true} color={["#FF8193", "#6ACD75"]}/>
        </Grid>
        <Grid item xs={12} md={12} >
         <AdditionalKPI />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainSection;
