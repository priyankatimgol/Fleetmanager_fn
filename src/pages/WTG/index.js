import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Stack,
} from "@mui/material";
import CircleBar from "./components/CircleBar";
import AreaChart from "./components/AreaChart";
import "./styles.css";
import RoseChart from "./components/RoseChart";
import MultiBarChart from "./components/MultipleBarChart";
import RedAlarm from "../../assets/icon/alarm-red.svg";
import Wind from "../../assets/icon/direction-wind.svg";
import Speed from "../../assets/icon/speed.svg";
import PowerIcon from "../../assets/icon/power-Icon.svg";
import Production from "../../assets/icon/production.svg";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getWTGTurbinesData,
  getWtgMAGAvsWind,
  getWtgMA_GA,
  getWtgMTTR_MTBF,
  getWtgTopErrors,
  getWtgWindPowerGen,
} from "redux/actions/WTGAction";
import BarChartMaGa from "./components/MAGAChart";
import Top10Errors from "./components/Top10Errors";
import Spinner from "pages/common-components/Spinner";
import MAGAvsWindChart from "./components/MultipleBarChart";
import MTBF_MTTRChart from "./components/MTBFchart";
import MTTRChart from "./components/MTTRChart";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
const windPowerGenerationData = {
  WindSpeed: 4.771,
  Current_Active_Power: 0.084,
  Total_Generation: 18.74,
  ControlDate: "2023-12-21T00:00:00",
  Main_SITE: "Ghatnandre",
};

const circularBarData = {
  first: {
    title: "MTBF Hrs",
    color: "#45C052",
    color1: "#D9DDDC",
    value: 20,
    valType: "number",
  },
  second: {
    title: "MTTR Hrs",
    color: "#ff8012",
    color1: "#D9DDDC",
    value: 50,
    valType: "number",
  },
  third: {
    title: "Data Availability",
    color: "#7098FF",
    color1: "#D9DDDC",
    value: 50,
    valType: "percent",
  },
};

const WTG = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const wtgScreen = state?.wtgScreen;
  const MA_GA_DATA = wtgScreen?.wtgMA_GA ?? [];
  const MTTR_MTBF_DATA = wtgScreen?.wtgMttrMtbf ?? [];
  const top10Erroors = wtgScreen?.top10Errors ?? [];
  const TurbineData = wtgScreen?.wtgTurbinData;
  const wtgLoader = wtgScreen?.wtgLoader;
  const turbines = TurbineData?.turbineNames;
  const SelSite = state?.siteHomeKpi?.selSite;
  const magaVsWindData = wtgScreen?.magaVsWind ?? [];
  const [terbineNo, setTerbineNo] = useState("");
  const MTTRData = MTTR_MTBF_DATA?.find((d) => d.KPIType == "MTTR")
  const MTBFData = MTTR_MTBF_DATA?.find((d) => d.KPIType == "MTBF")
  useEffect(() => {
    if (SelSite) {
      dispatch(getWTGTurbinesData(SelSite, setTerbineNo));
      dispatch(getWtgWindPowerGen(SelSite));
    }
  }, [SelSite, dispatch]);

  const handleTurbinChanges = (val) => {
    setTerbineNo(val);
    dispatch(getWtgMTTR_MTBF(val.turbine));
    dispatch(getWtgMA_GA(val.turbine));
    dispatch(getWtgTopErrors(val.turbine));
    dispatch(getWtgMAGAvsWind(val.turbine))
  };

  const handleTurbinImg = () => {
    if (
      terbineNo?.statusName === "Generating" ||
      terbineNo?.statusName === "Idling"
    ) {
      return true;
    }
    return false;
  };

  const handleLoader = () => {
    return (
      <Stack alignContent="center" style={{ marginTop: '10%' }}>
        <Spinner />
      </Stack>
    );
  };

  if (wtgLoader) {
    return handleLoader();
  }

  return (
    <>
      <Box mr={4} sx={{ display: 'flex', marginLeft: 'auto' }}>
        <Link to="/kpis" style={{ textDecoration: 'none', color: '#019E89' }}>
          <HomeIcon />
        </Link>
      </Box>
      <div style={{ padding: "0 10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <div className="wtg-card-wrapper" style={{ marginBottom: "0px" }}>
                  <Box sx={{ width: "50%" }}>
                    <MySelectAutoComplete
                      size="small"
                      placeholder="Enter SiteName"
                      values={terbineNo}
                      disablePortal={false}
                      listing={turbines || []}
                      getOptionLabel={(option) => option.turbine}
                      disabled={false}
                      onChange={(e, value) => handleTurbinChanges(value)}
                      ListboxProps={{ style: { maxHeight: 170 } }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="wtg-card-wrapper" style={{ height: "220px" }}>
                  {wtgScreen?.wtgMttrMtbfLoader ? (
                    handleLoader()
                  ) : (
                    <>
                      <MTBF_MTTRChart data={MTBFData} />
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="wtg-card-wrapper" style={{ height: "220px" }}>
                  {wtgScreen?.wtgMttrMtbfLoader ? (
                    handleLoader()
                  ) : (
                    <>
                      <MTTRChart data={MTTRData} />
                    </>
                  )}
                </div>
              </Grid>

            </Grid>
            <div
              className={`wtg-card-wrapper h-280 ${handleTurbinImg() ? "wind-image" : "wind-image-stop"
                }`}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontSize={14} color="#505050">
                  {terbineNo?.turbine?.split("-")[3]}
                </Typography>
              </div>

              <div>
                {terbineNo &&
                  <>
                    <Box className="alarm-card">
                      <Typography
                        fontSize={12}
                        color="#505050"
                        className="Icon-text"
                      >
                        <img src={RedAlarm} className="mr-5" alt="" />
                        {terbineNo?.statusName}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontSize={14}
                        color="#505050"
                        className="flex-item"
                      >
                        <span>{terbineNo?.errorCode}</span>:{terbineNo?.errorDescription}
                      </Typography>
                    </Box>
                    <div className="card-wrap" style={{ marginTop: "20px" }}>
                      <Box className="windcard">
                        <Typography
                          fontSize={12}
                          color="#505050"
                          className="Icon-text"
                        >
                          <img src={Wind} alt="" />
                          Installed Capacity
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize={14}
                          color="#505050"
                          className="flex-item"
                        >
                          <span>{terbineNo?.installedCapacity}&nbsp;</span>
                        </Typography>

                      </Box>
                      <Box className="windspeed">
                        <Typography
                          fontSize={12}
                          color="#505050"
                          className="Icon-text"
                        >
                          <img src={Speed} className="mr-5" alt="" />
                          Windspeed(m/s)
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize={14}
                          color="#505050"
                          className="flex-item"
                        >
                          <span>{terbineNo?.windSpeed}</span>
                        </Typography>
                      </Box>
                    </div>
                    <div className="card-wrap" style={{ marginTop: "20px" }}>
                      <Box className="power">
                        <Typography
                          fontSize={12}
                          color="#505050"
                          className="Icon-text"
                        >
                          <img src={PowerIcon} className="mr-5" alt="" />
                          Power(Kw)
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize={14}
                          color="#505050"
                          className="flex-item"
                        >
                          <span>{terbineNo?.currentActivePower}</span>
                        </Typography>
                      </Box>
                      <Box className="production">
                        <Typography
                          fontSize={12}
                          color="#505050"
                          className="Icon-text"
                        >
                          <img src={Production} className="mr-5" alt="" />
                          Production(GWh)
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize={14}
                          color="#505050"
                          className="flex-item"
                        >
                          <span>{terbineNo?.production}</span>
                        </Typography>
                      </Box>
                    </div>
                  </>
                }
              </div>
            </div>
            <div className="wtg-card-wrapper h-340">
              {wtgScreen?.top10ErrorsLoader ? (
                handleLoader()
              ) : (
                <Top10Errors data={top10Erroors} />
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <div className="wtg-card-wrapper" style={{ height: "285px", marginBottom: "0px" }}>
                  {wtgScreen?.wtgMA_GALoader ? (
                    handleLoader()
                  ) : (
                    <BarChartMaGa
                      magaData={MA_GA_DATA}
                      label="MA"
                      showToolbar={true}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="wtg-card-wrapper" style={{ height: "285px" }}>
                  {wtgScreen?.MAGAvsWindLoader ? (
                    handleLoader()
                  ) : (
                    <MAGAvsWindChart magaData={magaVsWindData} label="MA" showToolbar={true} />
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <div className="wtg-card-wrapper" style={{ height: "220px" }}>
                  <AreaChart dropDown={true} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="wtg-card-wrapper" style={{ height: "220px" }}>
                  <RoseChart />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="wtg-card-wrapper" style={{ height: "100px", marginBlockStart:"0px !important" }}>
                  {/* <CircleBar data={circularBarData.third} /> */}
                  <Typography align="left" sx={{ color: "black", fontWeight: 700 }}>Data Availability</Typography>
                  <Box sx={{ height: "80%", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Box sx={{ pl: 1, display: 'flex' }} >
                      <Typography className="kip-value" >123</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'end' }} >
                        <Typography className="kip-units" sx={{ pl: 1 }}>Unit</Typography>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default WTG;
