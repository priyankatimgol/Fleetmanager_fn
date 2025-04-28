import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Turbines from "./Turbines";
import KPI from "./KPI";
import { data } from "pages/Home/utils";
import TopSection from "../Section1";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getAreaDropdown,
  getStateDropdown,
} from "redux/actions/SynergyDashboard";
import PMQualityChart from "../Section2/KPI/PMChart";
import KpiGridView from "./KPI/KpiGrideView";
import { GetIB_MTTR_MTBF, GetIB_WTG, GetMapAreaKpiDetails, GetMapStateDetails, Get_IB_CAMA, Get_IB_HT_Feeders, Get_IB_Lubrication, Get_IB_MBDs, Get_IB_PM_Quality, Get_IB_Score_Card, Get_IB_WTG_And_DP, getIB_HV_EHV_PSS } from "redux/actions/IBLevel";
import HTFeedersChart from "./KPI/HTFeedersChart/Index";
import WTGandDPChart from "./KPI/WTGandDPChart";
import Spinner from "pages/common-components/Spinner";
import RadialChart from "./KPI/PMChart/Componants/RadialChart";
import BubbleChart from "./KPI/PMChart/Componants/RadialChart";
import CylindricalChart from "./KPI/CylindricalChart";



function MainSection() {
  const dispatch = useDispatch();
  const [stateName, setStateName] = useState([]);
  const [area, setArea] = useState([]);
  const state = useSelector((state) => state);
  const stateDropdown = state?.synergyDashboard?.stateDropdown ?? [];
  const areaDrop = state?.synergyDashboard?.areaDropdown ?? [];
  // const IB_HV_EHV_PSS_DATA = state?.IBLevel?.IB_HV_EHV_PSS ?? [];
  const pmQualityData = state?.IBLevel?.pmQuality ?? [];
  // const lubricationData  = state?.IBLevel?.lubrication ?? [];
  const htFeedersData = state?.IBLevel?.htFeedersData ?? [];
  const WTGAndDPData = state?.IBLevel?.WTGAndDPData ?? [];


  const htFeeders_Loader = state?.IBLevel?.htFeeders_Loader ?? [];
  const WTGDP_Loader = state?.IBLevel?.WTGDP_Loader ?? [];
  const PM_Quality_Loader = state?.IBLevel?.PM_Quality_Loader ?? [];

  const handleLoader = () => {
    return (
      <Stack alignContent="center" style={{ marginTop: '10%' }}>
        <Spinner />
      </Stack>
    );
  };

  useEffect(() => {
    const states = stateName?.join(', ');
    const areas = area?.join(', ');
    dispatch(getIB_HV_EHV_PSS(states, areas))
    dispatch(Get_IB_PM_Quality(states, areas))
    dispatch(Get_IB_Lubrication(states, areas))
    dispatch(Get_IB_MBDs(states, areas))
    dispatch(Get_IB_Score_Card(states, areas))
    dispatch(GetIB_MTTR_MTBF(states, areas))
    dispatch(GetIB_WTG(states, areas))
    dispatch(Get_IB_HT_Feeders(states, areas))
    dispatch(Get_IB_WTG_And_DP(states, areas))
    dispatch(GetMapStateDetails())
    dispatch(GetMapAreaKpiDetails())
    dispatch(Get_IB_CAMA(states, areas))
  }, [])

  const handleSearch = () => {
    const states = stateName?.join(', ');
    const areas = area?.join(', ');
    dispatch(getIB_HV_EHV_PSS(states, areas))
    dispatch(Get_IB_PM_Quality(states, areas))
    dispatch(Get_IB_Lubrication(states, areas))
    dispatch(Get_IB_MBDs(states, areas))
    dispatch(Get_IB_Score_Card(states, areas))
    dispatch(GetIB_WTG(states, areas))
    dispatch(GetIB_MTTR_MTBF(states, areas))
    dispatch(Get_IB_HT_Feeders(states, areas))
    dispatch(Get_IB_WTG_And_DP(states, areas))
    dispatch(Get_IB_CAMA(states, areas))
  }

  useEffect(() => {
    dispatch(getStateDropdown());
  }, [dispatch]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="state-area-wrapper">
            <Grid item xs={12} md={12} className="pt-5">
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} md={5}>
                  <Box>
                    <MySelectAutoComplete
                      size="small"
                      toplabel="State"
                      placeholder="Enter state"
                      values={stateName}
                      multiple={true}
                      disablePortal={false}
                      listing={stateDropdown || []}
                      disabled={false}
                      onChange={(e, value) => {
                        setStateName(value);
                        const states = value;
                        const result = states.join(", ");
                        dispatch(getAreaDropdown(result));
                        setArea([]);
                      }}
                      className="fontSize-13"
                      ListboxProps={{ style: { maxHeight: 170 } }}
                      renderInput={(params) => <TextField {...params} />}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "4px",
                        maxHeight: "40px",
                        overflowX: "hidden",
                        overflowY: "scroll",
                        scrollbarWidth: "thin",
                        "::-webkit-scrollbar": {
                          width: "4px",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box>
                    <MySelectAutoComplete
                      size="small"
                      toplabel="Area"
                      placeholder="Enter area"
                      values={area}
                      multiple={true}
                      disablePortal={false}
                      listing={areaDrop || []}
                      disabled={false}
                      onChange={(e, value) => {
                        setArea(value);
                      }}
                      className="fontSize-13"
                      ListboxProps={{ style: { maxHeight: 170 } }}
                      renderInput={(params) => <TextField {...params} />}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "4px",
                        maxHeight: "40px",
                        overflowX: "hidden",
                        overflowY: "scroll",
                        scrollbarWidth: "thin",
                        "::-webkit-scrollbar": {
                          width: "4px",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={2} mt={4}>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ float: "right", color: "#00a18b" }}
                    type="submit"
                    className="Sub-btn"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div>
            <Turbines data={data?.section2} />
          </div>
          <Grid item xs={12} md={12} mt={2}>
          <div className="ib-wtg-card-wrapper" style={{height:"264px"}}>
            {PM_Quality_Loader ? (
              handleLoader()
            ) : (
              <PMQualityChart data={pmQualityData} icon="task" label="PM Quality" showToolbar={true} />
            )}
          </div>
        </Grid>

          <Grid item xs={12} md={12} mt={2}>
            <div className="ib-wtg-card-wrapper" style={{height:"235px"}}>
              {WTGDP_Loader ? (
                handleLoader()
              ) : (
                <WTGandDPChart data={WTGAndDPData} icon="task" label="WTG & DP" showToolbar={true} />
              )}
            </div>
          </Grid>
          {/* <Grid item xs={12} md={12} mt={2}>
            <div className="ib-wtg-card-wrapper">
             <BubbleChart icon="task" label="PM Quality"/>
            </div>
          </Grid> */}
          {/* <Grid item xs={12} md={12} mt={2}>
            <div className="ib-wtg-card-wrapper">
             <CylindricalChart />
            </div>
          </Grid> */}

        </Grid>
        <Grid item xs={12} md={6} className="pt-5 mt-5">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} className="pt-5">
              <KPI />
            </Grid>

            <Grid item xs={12} md={4} className="pt-5">
              <TopSection />
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop:"-6px"}}>
              <div className="ib-wtg-card-wrapper">
                <KpiGridView />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainSection;
