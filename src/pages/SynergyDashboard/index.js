import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, TextField, MenuItem, Select, FormControl, InputLabel, Card, Autocomplete, Stack, Tooltip, Button } from "@mui/material";
import "./style.css";
import * as Yup from "yup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BarChart from "./components/BarChart";
import MyAgGridComponent from "./components/AgGrid";
import BarChartHorizantal from "./components/BarChartHorizantal";
import { useDispatch, useSelector } from "react-redux";
import { getEditWhysDrop, getSynergyYear } from "redux/actions/WhyAnalysis";
import { getAllAreas, getAllState, getMainSites } from "redux/actions/logbook/DropdownAction";
import { Formik } from "formik";
import { Buttons } from "pages/common-components/Button";
import { MySelectAutoComplete } from "pages/common-components/FormComponents";
import {  weeks } from "./utils";
import { GetBDHrsByDistinctWTGCount, GetBDHrsByTopDistinctWTG, GetBDHrsByWhyGraph, GetBDHrsByWhyGrid, getAreaDropdown, getBDHrsByWTG, getBDHrsByWeekGrid, getHoursByWeek, getSiteDropdown, getStateDropdown } from "redux/actions/SynergyDashboard";
import Spinner from "pages/common-components/Spinner";
import HoursByWeekChart from "./components/HoursByWeekChart";
import HrsByWTGAggrid from "./components/HoursByWTGAggrid";
import BDHrsByWhyGraph from "./components/BDHrsByWhyGraph";
import BDHrsByWhyGrid from "./components/BDHrsByWhyGrid";
import HrsByWTGCountGrid from "./components/HrsByWTGCountGrid";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import TopDistinctWTGAgGrid from "./components/TopDistinctWTGAggrid";


const sampleOptions = [
  { label: "Option 1", value: "Maharastra" },
  { label: "Option 2", value: "Gujarat" },
  { label: "Option 3", value: "Gao" },
];

const data = []

const SynergyDashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const editWhysDropdown = state?.whyAnalysis?.editWhysDropdown ?? [];
  const stateDrop = state?.synergyDashboard?.stateDropdown ?? [];
  const areaDrop = state?.synergyDashboard?.areaDropdown ?? [];
  const mainSiteDrop = state?.synergyDashboard?.siteDropdown ?? [];
  const synergyYear = state?.whyAnalysis?.synergyYear ?? [];
  const hoursByWeek = state?.synergyDashboard?.hoursByWeek ?? [];
  const hoursByWTG = state?.synergyDashboard?.hoursByWTG ?? [];
  const BDHrsByWeekGrid = state?.synergyDashboard?.BDHrsByWeekGrid ?? [];
  const BDHrsByWeekGridData = state?.synergyDashboard?.BDHrsByWhyGraph ?? [];
  const BDHrsByWhyGridData = state?.synergyDashboard?.BDHrsByWhyGrid ?? [];
  const HrsByWTGCountData = state?.synergyDashboard?.HrsByWTGCount ?? [];
  const TopDistinctWTGData = state?.synergyDashboard?.TopDistinctWTG ?? [];
  const hoursWeekLoader = state?.synergyDashboard?.hoursWeek;
  
  const hrsByWTGLoader = state?.synergyDashboard?.hrsByWTGLoader;
  const HrsByWeekGrid_loader = state?.synergyDashboard?.HrsByWeekGrid_loader;
  const HrsByWhyGraph_Loader = state?.synergyDashboard?.HrsByWhyGraph_Loader;
  const HrsByWhyGrid_Loader = state?.synergyDashboard?.HrsByWhyGrid_Loader;
  const DistinctWTGCount_Loader = state?.synergyDashboard?.HrsByDistinctWTGCount_Loader;
  const TopDistinctWTG_Loader = state?.synergyDashboard?.TopDistinctWTG_Loader;

  const intialVal = {
    why1234: null,
    state: null,
    area: null,
    site: null,
    year: 2024,
    week: null,
  };

  const SearchValidation = Yup.object().shape({
    // why1234: Yup.array().required("Select whys").nullable(),
    // state: Yup.object().required("Select State").nullable(),
    // area: Yup.object().required("Select Area").nullable(),
    // site: Yup.object().required("Select site name").nullable(),
    // year: Yup.string().required("Select year").nullable(),
    // week: Yup.array().required("Select week").nullable()
  });

  const handleLoader = () => {
    return (
      <Stack alignContent="center" style={{ marginTop: '10%' }}>
        <Spinner />
      </Stack>
    );
  };

  useEffect(() => {
    dispatch(getEditWhysDrop())
    dispatch(getAllState())
    dispatch(getSynergyYear())
    dispatch(getStateDropdown())
    dispatch(getHoursByWeek(data, "default"))
    dispatch(getBDHrsByWTG(data, "default"))
    dispatch(getBDHrsByWeekGrid(data, "default"))
    dispatch(GetBDHrsByWhyGraph(data, "default"))
    dispatch(GetBDHrsByWhyGrid(data, "default"))
    dispatch(GetBDHrsByDistinctWTGCount(data, "default"))
    dispatch(GetBDHrsByTopDistinctWTG(data, "default"))
  }, [])

  return (
    <div>
      <Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Synergy-50 Dashboard</Typography>
          <Box >
            <Link to="/kpis">
              <HomeIcon style={{ color: '#019E89' }} />
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <Box sx={{ py: 3 }}>
            <Formik
              initialValues={intialVal}
              validationSchema={SearchValidation}
              onSubmit={(values, actions) => {
                const data = {
                  area: values?.area?.join("") !== undefined ? values?.area?.join(",") : "",
                  site: values?.site?.join("") !== undefined ? values?.site?.join(",") : "",
                  state: values?.state?.join("") !== undefined ? values?.state?.join(",") : "",
                  week: values?.week?.map(obj => obj.id).join(',') !== undefined ? values?.week?.map(obj => obj.id).join(', ') : "",
                  why1234: values?.why1234?.map(item => item.name).join("|") !== undefined ? values?.why1234?.map(item => item.name).join("|") : "",
                  year: values?.year
                }
                dispatch(getHoursByWeek(data, "payload"))
                dispatch(getBDHrsByWTG(data, "payload"))
                dispatch(getBDHrsByWeekGrid(data, "payload"))
                dispatch(GetBDHrsByWhyGraph(data, "payload"))
                dispatch(GetBDHrsByWhyGrid(data, "payload"))
                dispatch(GetBDHrsByDistinctWTGCount(data, "payload"))
                dispatch(GetBDHrsByTopDistinctWTG(data, "payload"))
                // actions.resetForm(intialVal)
              }}
            >
              {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <Grid>
                    <Grid item xs={12} md={12} >
                      <Box className="cards-wrep1">
                        {/* sx={{ height: '90px' }} */}
                        <Grid container spacing={2}>
                          <Grid item md={3.5} xs={12}>
                            <MySelectAutoComplete
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
                              toplabel="Why1 Why2 Why3 Why4"
                              name="why1234"
                              multiple={true}
                              values={values && values.why1234 ? values.why1234 : []}
                              listing={editWhysDropdown || []}
                              getOptionLabel={(option) => option.name || ''}
                              onChangeDta={(e, value) => {
                                setFieldValue("why1234", value);
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={1.5} xs={12}>
                            <MySelectAutoComplete
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
                              toplabel="State"
                              name="state"
                              multiple={true}
                              values={values && values.state ? values.state : []}
                              listing={stateDrop || []}
                              // getOptionLabel={(option) => option.state}
                              onChangeDta={(e, value) => {
                                const states = value;
                                const result = states.join(',');
                                dispatch(getAreaDropdown(result))
                                setFieldValue("state", value)
                                setFieldValue("area", null)
                                setFieldValue("site", null)
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={1.5} xs={12}>
                            <MySelectAutoComplete
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
                              toplabel="Area"
                              name="area"
                              multiple={true}
                              values={values && values.area ? values.area : []}
                              listing={areaDrop || []}
                              // getOptionLabel={(option) => option.area}
                              onChangeDta={(e, value) => {
                                const sites = value;
                                const result = sites?.join(', ');
                                dispatch(getSiteDropdown(result))
                                setFieldValue("area", value)
                                setFieldValue("site", null)
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={1.5} xs={12}>
                            <MySelectAutoComplete
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
                              toplabel="Site"
                              name="site"
                              multiple={true}
                              values={values && values.site ? values.site : []}
                              listing={mainSiteDrop || []}
                              // getOptionLabel={(option) => option.mainSite}
                              onChangeDta={(e, value) => {
                                dispatch(getMainSites(value?.areaCode))
                                setFieldValue("site", value)
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={1} xs={12}>
                            <MySelectAutoComplete
                              toplabel="Year"
                              name="year"
                              values={values?.year}
                              listing={synergyYear || []}
                              onChangeDta={(e, value) => {
                                setFieldValue("year", value)
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={2} xs={12}>
                            <MySelectAutoComplete
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
                              toplabel="Week"
                              name="week"
                              multiple={true}
                              values={values && values.week ? values.week : []}
                              listing={weeks || []}
                              getOptionLabel={(option) => option.name}
                              onChangeDta={(e, value) => {
                                setFieldValue("week", value)
                              }}
                              size="small"
                              ListboxProps={{ style: { maxHeight: 170 } }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Grid>

                          <Grid item md={1} xs={12}>
                            <Box ml={5} mt={4}>
                              <Buttons
                                variant="contained"
                                type="submit"
                                className="Sub-btn"
                                name="Search"
                              />
                            </Box>
                          </Grid>

                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
        <div className="mb-10"></div>
        <Grid container spacing={2} sx={{ pb: 3 }}>
          <Grid item xs={12} md={5}>
            <Box className="cards-wrep" sx={{ height: "300px" }}>
              {/* {hoursWeekLoader ? (
                    handleLoader()
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
                      >
                        <span style={{ padding: "0 5px", display: 'flex' }}>
                          <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                        </span>
                        BD Hours by Week
                      </Typography>
                      <div>
                        <BarChart chartType="true" data={hoursByWeek?.Table1} />
                      </div>
                    </>
                  )} */}

              {hoursWeekLoader ? (
                handleLoader()
              ) : (
                <HoursByWeekChart label="BD Hours by Week" data={hoursByWeek} />
              )}

            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className="cards-wrep" sx={{ height: "300px" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                <span style={{ padding: "0 5px", display: 'flex' }}>
                  <AvTimerIcon style={{ fontSize: 20, color: '#019e89' }} />
                </span>
                BD Hours by Week
              </Typography>
              <div>
                {HrsByWeekGrid_loader ? (
                  handleLoader()
                ) : (
                  <MyAgGridComponent data={BDHrsByWeekGrid} />
                )}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box className="cards-wrep" sx={{ height: "300px" }}>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
                  >
                    <span style={{ padding: "0 5px", display: 'flex' }}>
                      <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                    </span>
                    Most Effected WTG by Hours
                  </Typography>
                  <div>
                    {hrsByWTGLoader ? (
                      handleLoader()
                    ) : (
                      <HrsByWTGAggrid data={hoursByWTG} />
                    )}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={7}>
            <Box className="cards-wrep" sx={{ height: "300px" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                <span style={{ padding: "0 5px", display: 'flex' }}>
                  <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                </span>
                BD Hours by Why Why
              </Typography>
              <div>
                {HrsByWhyGraph_Loader ? (
                  handleLoader()
                ) : (
                  <BDHrsByWhyGraph data={BDHrsByWeekGridData} />
                )}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} md={5}>
            <Box className="cards-wrep" sx={{ height: "300px" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                <span style={{ padding: "0 5px", display: 'flex' }}>
                  <AvTimerIcon style={{ fontSize: 20, color: '#019e89' }} />
                </span>
                BD Hours by Why Why Grid
              </Typography>
              <div>
                {HrsByWhyGrid_Loader ? (
                  handleLoader()
                ) : (
                  <BDHrsByWhyGrid data={BDHrsByWhyGridData} />
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
        <div className="mb-10"></div>
        <Grid container spacing={2} sx={{ pb: 3 }}>
          <Grid item xs={6} md={6}>
            <Box className="cards-wrep" sx={{ height: "300px" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                <span style={{ padding: "0 5px", display: 'flex' }}>
                  <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                </span>
                Distinct WTG count Weekwise/Buckting
              </Typography>
              <div>
                {/* <HrsByWTGCountGrid data={HrsByWTGCountData} /> */}
                {DistinctWTGCount_Loader ? (
                  handleLoader()
                ) : (
                  <HrsByWTGCountGrid data={HrsByWTGCountData} />
                )}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box className="cards-wrep">
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
              >
                <span style={{ padding: "0 5px", display: 'flex' }}>
                  <AccessTimeIcon style={{ fontSize: 20, color: '#019e89' }} />
                </span>
                Top Repeating WTG
              </Typography>
              <div>
                {TopDistinctWTG_Loader ? (
                  handleLoader()
                ) : (
                  <TopDistinctWTGAgGrid data={TopDistinctWTGData} />
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
        <div className="mb-10"></div>
        <Grid container spacing={2} sx={{ pb: 3 }}>
        </Grid>
      </Grid>
    </div >
  );
};

export default SynergyDashboard;
