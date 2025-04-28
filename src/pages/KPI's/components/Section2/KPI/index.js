import { Grid, Typography } from "@mui/material";
import BarChart from "./BarChart";
import PlanningKPI from "../Planning-KPI";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIDRVKpiData, getMAGAData, getPMLSTCIData } from "redux/actions/SiteHomeActions";
import BarChartMaGa from "./MaGaBarChart";
import IdrvChart from "./IDRVChart";
import { MTBFData, MTTRData } from "pages/KPI's/utils";
import BarChartMTBF from "./MTBFChart";
import PmLsTciChart from "./PmLsTciChart";
import GAChart from "./MAGAChart";
import BarChartPmLsTci from "./PMTCILSChart";
import MABucketingCard from "../ErrorBucketCard/MABucketing";

function KPI() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const pmDropdown = state?.siteHomeKpi?.SelectedDropdown;
  const lsDropdown = state?.siteHomeKpi?.SelectedLsDropdown;
  const tciDropdown = state?.siteHomeKpi?.SelectedTciDropdown;
  const SelSite = state.siteHomeKpi?.selSite;
   const MA_GA_DATA = state.siteHomeKpi.siteInchargeKpi?.MA_GA;
  const PM_LS_TCI_Data = state.siteHomeKpi.siteInchargeKpi?.PM_LS_TCI;
  const IDRV_DATA = state.siteHomeKpi.siteInchargeKpi?.IDRV;
  const [selectedPlanning, setSelectedPlanning] = useState({
    'PM Planning': '',
    'Lubrication Planning': '',
    'TCI Planning': ''
  })
  const [maData, setMaData] = useState([]);
  const [gaData, setGaData] = useState([]);
  const [pmData, setPmData] = useState([]);
  const [lsData, setLsData] = useState([]);
  const [tciData, setTciData] = useState([])
  const [maBucket, setMaBucket] = useState([])

  useEffect(() => {
    if (pmDropdown) {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'PM Planning': pmDropdown?.dropValue,
      }));
    }
    if (lsDropdown) {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'Lubrication Planning': lsDropdown?.dropValue,
      }));
    }
    if (tciDropdown) {
      setSelectedPlanning((prevState) => ({
        ...prevState,
        'TCI Planning': tciDropdown?.dropValue,
      }));
    }
  }, [pmDropdown, lsDropdown, tciDropdown,])

  useEffect(() => {
    if (MA_GA_DATA) {
      const maVals = MA_GA_DATA.filter(d => d.KPIType === "MA")?.sort((a, b) => a.Sequence - b.Sequence);
      setMaData(maVals);
      const gaVals = MA_GA_DATA.filter(d => d.KPIType === "GA")?.sort((a, b) => a.Sequence - b.Sequence);
      setGaData(gaVals);
      const maBucketVals = MA_GA_DATA.filter(d => d.KPIType === "MA Bucketing")?.sort((a, b) => a.Sequence - b.Sequence);
      setMaBucket(maBucketVals)
    }
  }, [MA_GA_DATA]);

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
      dispatch(getMAGAData(SelSite));
      dispatch(getIDRVKpiData(SelSite));
      // dispatch(getPMLSTCIData(SelSite))
    }
  }, [SelSite, dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9} md={8.5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} className="chartHt">
            <GAChart data={maData} icon="task" label="MA" showToolbar={true} />
          </Grid>
          <Grid item xs={12} md={12} className="chartHt">
            <GAChart data={gaData} icon="task" label="GA" showToolbar={true} />
          </Grid>
          <Grid item xs={12} md={12} className="chartHtMABucketing">
            <MABucketingCard data={maBucket} icon="task" label="MA Bucketing" showToolbar={true} />
          </Grid>
          {/* <Grid item xs={12} md={12} className="chartHt">
            <BarChartPmLsTci data={pmData} icon="task" label="PM" showToolbar={true} getPmSelectedDrop={getPmSelectedDrop}/>
          </Grid>
          <Grid item xs={12} md={12} className="chartHt">
            <BarChartPmLsTci data={tciData} icon="task" label="TCI" showToolbar={true} getPmSelectedDrop={getPmSelectedDrop}/>
          </Grid>
          <Grid item xs={12} md={12} className="chartHt">
            <BarChartPmLsTci data={lsData} icon="task" label="LS" showToolbar={true} getPmSelectedDrop={getPmSelectedDrop}/>
          </Grid> */}
          <Grid item xs={12} md={12} className="chartHtMABucketing">
            <IdrvChart data={IDRV_DATA} label="IDRV" color={["#4790C7", "#6ACD75"]}/>
          </Grid>

        </Grid>
      </Grid>
      <Grid item xs={3} md={3.5}>
        <div>
          <PlanningKPI
            selectedPlanning={selectedPlanning}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default KPI;
