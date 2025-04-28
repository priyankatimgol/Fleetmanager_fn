import React, { useEffect, useState } from "react";
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Box, TextField, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Button, Switch, Autocomplete } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmployeeSection from "./componants/EmployeeDetails/employee-section"
import { DatePicker } from '@mui/x-date-pickers';
import BreakdownDetailsForm from "./componants/WTGBreakdowndetails/breakdown-details-form";
import ScheduleActivity from "./componants/ScheduleActivity/schedule-maintenance-activity";
import GridBreakdownDetails from "./componants/GridBreakdownDetails/grid-breakdown-details";
import HOTODetails from "./componants/HOTO/hoto-details";
import ScadaDetails from "./componants/ScadaDetails/scada-connectivity-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "redux/actions/logbook/EmpolyeeDetails";
import { getAllSchedules } from "redux/actions/logbook/ScheduleAction";
import { getAllGrids } from "redux/actions/logbook/GridBreakdownAction";
import { getAllWTGs } from "redux/actions/logbook/WTGAction";
import { getAllScadas } from "redux/actions/logbook/ScadaAction";
import { getAllHotos } from "redux/actions/logbook/HotoAction";
import Remark from "./componants/Remarks/remark";
import { getAllShiftCycle, getMainSites, getScheduleTerbine, getSites, getTurbineDrop, logbookConfiguration } from "redux/actions/logbook/DropdownAction";
import { getAllRemarks } from "redux/actions/logbook/RemarkAction";
import { getSubmitStatus, logbookSubmit, updateWtgAPI } from "redux/actions/logbook/SubmitButton";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import moment from "moment";
import { getUserSites } from "redux/actions/SiteHomeActions";
import Spinner from "pages/common-components/Spinner";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

function LogbookMaster() {
    const dispatch = useDispatch()
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [siteName, setSiteName] = useState(null)
    const [shiftCycle, setShiftCycle] = useState(null)
    const [gridChecked, setGridChecked] = useState(true)
    const [scadaChecked, setScadaChecked] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [siteCode, setSiteCode] = useState()
    const state = useSelector((state) => state);
    const logbookConfig = state?.dropdownMaster?.logbookConfig;
    const submitStatus = state?.submitLogbook?.submitLogbookStatus;
    const mainSiteDrop = state?.dropdownMaster?.siteListing;
    const shiftCyleDrop = state?.dropdownMaster?.shiftCycleListing;
    const updateWtg = state?.wtgBreakdown?.wtgListing;
    const terbineDrop = state?.dropdownMaster?.terbineListing || [];
    const terbine_count = terbineDrop?.turbineLists?.length !== undefined ? terbineDrop?.turbineLists?.length : 0;
    const scheduleTerbineDrop = state?.dropdownMaster?.scheduleTerbineListing;
    const scheduleTerbineCount = scheduleTerbineDrop?.data?.length !== undefined ? scheduleTerbineDrop?.data?.length : 0;
    const wtgCardCount = state?.wtgBreakdown?.wtgListing?.length !== undefined ? state?.wtgBreakdown?.wtgListing?.length : 0;
    const scheduleCount = state?.scheduleActivity?.scheduleListing?.length !== undefined ? state?.scheduleActivity?.scheduleListing?.length : 0;
    const empDetailsCount = state?.employeeDetails?.employeeListing?.length !== undefined ? state?.employeeDetails?.employeeListing?.length : 0;
    const gridCount = state?.gridBreakdown?.gridListing?.length !== undefined ? state?.gridBreakdown?.gridListing?.length : 0;
    const scadaCount = state?.scadaDetails?.scadaListing?.length !== undefined ? state?.scadaDetails?.scadaListing?.length : 0;
    const hotoCount = state?.hotoDetails?.hotoListing?.length !== undefined ? state?.hotoDetails?.hotoListing?.length : 0;
    const remarkCount = state?.remark?.remarkListing?.length !== undefined ? state?.remark?.remarkListing?.length : 0;
    const scheduleValition = scheduleTerbineCount !== 0 ? (scheduleTerbineCount - (scheduleTerbineCount <= scheduleCount ? scheduleTerbineCount : scheduleCount)) === 0 ? "" : (scheduleTerbineCount - (scheduleTerbineCount <= scheduleCount ? scheduleTerbineCount : scheduleCount)) + " Pending" : "No schedule maintenance activity data available"
    const turbineValidation = state?.dropdownMaster?.turbineValidation;
    const SiteState = useSelector((state) => {
        return state?.siteHomeKpi;
    });
    const UserSites = SiteState?.userSites || [];
    const dropdownLoading = state?.dropdownMaster?.dropdownLoading;
    // const wtgValidation = terbine_count !== 0 ? terbine_count + ` Pending` : wtgCardCount === 0 ? "No wtg breakdown data available" : ""
    const wtgValidation = () => {
        if (terbine_count !== 0) {
            return (terbine_count - wtgCardCount) + ` Pending`
        } else {
            if (wtgCardCount === 0) {
                return "No wtg breakdown data available"
            } else {
                return ""
            }
        }
    }

    const customSwitchStyle = {
        color: '#019e89',
        '&.Mui-checked': {
            color: '#019e89',
        },
        '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#019e89',
        },
    }
    const [configDate, setConfigDate] = useState(0)
    const [configuredDate, setConfiguredDate] = useState(null)
    useEffect(() => {
        if (configDate) {
            const validDate = new Date(today.setDate(today.getDate() - configDate));
            const newDate = moment(validDate).format("YYYY-MM-DD")
            setConfiguredDate(newDate)
        }
    }, [configDate, selectedDate])
    const handleSubmit = () => {
        if (terbine_count === 0) {
            if (selectedDate && siteName && shiftCycle) {
                dispatch(logbookSubmit({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName, status: terbine_count === 0 ? "Completed" : "NotComplaince", gridNoActivity: gridChecked, scadaNoActivity: scadaChecked }))
                setUpdateStatus(true)
            }
        }

        if (turbineValidation?.validation === false && terbine_count > 0) {
            if (selectedDate && siteName && shiftCycle) {
                dispatch(logbookSubmit({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName, status: terbine_count === 0 ? "Completed" : "NotComplaince", gridNoActivity: gridChecked, scadaNoActivity: scadaChecked }))
                setUpdateStatus(true)
            }
        }

        if (selectedDate && siteName && shiftCycle && updateWtg && terbineDrop?.turbineLists && turbineValidation?.validation === true && terbine_count > 0) {
            const data = terbineDrop?.turbineLists;
            data.forEach(function (item) {
                item['siteName'] = siteName?.siteName;
                item['logDate'] = dateConvert(selectedDate);
                item['shiftCycle'] = shiftCycle?.masterName;
                item['closure'] = "";
            });
            let mergedArray = [...updateWtg, ...data];
            dispatch(updateWtgAPI(mergedArray))
            setUpdateStatus(true)
        }
    }

    useEffect(() => {
        if (submitStatus?.data?.gridBreakdownNoActivity != null && submitStatus?.data?.scadaNoActivity != null) {
            setGridChecked(submitStatus?.data?.gridBreakdownNoActivity)
            setScadaChecked(submitStatus?.data?.scadaNoActivity)
        } else {
            setGridChecked(true)
            setScadaChecked(true)
        }
    }, [submitStatus])

    useEffect(() => {
        if (logbookConfig) {
            logbookConfig?.map((d) => {
                if (d?.category === "Site Wise days") {
                    setConfigDate(d?.value)
                } else {
                    if (d?.category === "Default Days") {
                        setConfigDate(d?.value)
                    }
                }
            })
        }
    }, [logbookConfig])

    useEffect(() => {
        if (siteCode && selectedDate && shiftCycle) {
            dispatch(logbookConfiguration(siteCode))
        }
    }, [siteCode, selectedDate, shiftCycle])

    useEffect(() => {
        if (selectedDate && siteName && shiftCycle) {
            dispatch(getSubmitStatus({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
        }
    }, [selectedDate, siteName, shiftCycle, updateStatus])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };
    const dateConvert = (date) => {
        var convertedDate = moment(date).format("YYYY-MM-DD")
        return convertedDate;
    };

    useEffect(() => {
        if (empDetailsCount > 0 && (gridChecked !== true || gridCount > 0) &&
            (scadaChecked !== true || scadaCount > 0) && hotoCount > 0 && remarkCount > 0
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [empDetailsCount, terbine_count, scheduleTerbineCount, wtgCardCount, scheduleCount, gridCount, scadaCount, hotoCount, remarkCount, gridChecked, scadaChecked])

    useEffect(() => {
        dispatch(getAllShiftCycle())
        dispatch(getSites())
    }, [])

    useEffect(() => {
        if (selectedDate, siteName, shiftCycle) {
            dispatch(getTurbineDrop(siteName?.siteName, dateConvert(selectedDate), shiftCycle?.masterName))
            dispatch(getScheduleTerbine(dateConvert(selectedDate), siteName?.siteName))
        }
    }, [selectedDate, siteName, shiftCycle])

    useEffect(() => {
        if (selectedDate && siteName && shiftCycle) {
            dispatch(getAllEmployees({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllSchedules({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllGrids({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllWTGs({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllScadas({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllHotos({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
            dispatch(getAllRemarks({ logDate: dateConvert(selectedDate), siteName: siteName?.siteName, shiftCycle: shiftCycle?.masterName }))
        }
    }, [selectedDate, siteName, shiftCycle])

    return (
        <>
            <Grid>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4">Logbook</Typography>
                        <Link to="/kpis">
                            <HomeIcon style={{ color: '#019E89' }} />
                        </Link>
                </Box>
            </Grid>
            <Card>
                <CardContent>
                    <Grid container spacing={2} className="log-book-page">
                        <Grid item md={2} xs={12}>
                            <Box>
                                <MySelectAutoComplete
                                    size="small"
                                    toplabel="Site Name"
                                    placeholder="Enter SiteName"
                                    values={siteName}
                                    disablePortal={false}
                                    listing={UserSites || []}
                                    getOptionLabel={(option) => option.siteName}
                                    disabled={false}
                                    onChange={(e, value) => {
                                        setSiteCode(value?.siteName, "site name");
                                        setSiteName(value)
                                    }}
                                    className='fontSize-13'
                                    ListboxProps={{ style: { maxHeight: 170 } }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>

                        </Grid>

                        <Grid item md={2} xs={12}>
                            <Box>
                                <MySelectAutoComplete
                                    size="small"
                                    toplabel="Shift Cycle"
                                    placeholder="Enter Shift Cycle"
                                    values={shiftCycle}
                                    disablePortal={false}
                                    listing={shiftCyleDrop || []}
                                    getOptionLabel={(option) => option.masterName}
                                    disabled={false}
                                    onChange={(e, value) => setShiftCycle(value)}
                                    className='fontSize-13'
                                    ListboxProps={{ style: { maxHeight: 170 } }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Typography variant="body2" className="bold-600">Log Date</Typography>
                            <DatePicker
                                label=""
                                value={selectedDate}
                                inputFormat="dd/MM/yyyy"
                                onChange={handleDateChange}
                                maxDate={today}
                                renderInput={(params) => <TextField {...params}
                                    size="small"
                                />}
                            />
                        </Grid>

                        {!dropdownLoading ?
                            <>
                                {selectedDate && siteName && shiftCycle &&
                                    <Grid item md={12} xs={12} mt={4} className="logBookAccordian">
                                        <Accordion className={empDetailsCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography >Employee Details</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <EmployeeSection
                                                    selectedDate={dateConvert(selectedDate)}
                                                    siteName={siteName?.siteName}
                                                    shiftCycle={shiftCycle?.masterName}
                                                    configDate={configuredDate}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={terbine_count === 0 ? "accordian-background-success" : "accordian-background-danger"} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                className="pending-side"
                                            >
                                                <Typography style={{ display: "flex", justifyContent: "space-between" }}><span>Stoppage details</span> <span>{submitStatus?.data?.status === "NotComplaince" ? " Non Complaince" : terbineDrop?.errorLists === undefined ? wtgValidation() : ""}  </span></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <BreakdownDetailsForm
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={scheduleTerbineDrop?.validation === true ? scheduleTerbineCount <= scheduleCount ? "accordian-background-success" : "accordian-background-danger" : scheduleCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                className="pending-side"
                                            >
                                                <Typography style={{ display: "flex", justifyContent: "space-between" }}><span>Schedule Maintenance Activity</span> <span>{scheduleTerbineDrop?.validation === true ? scheduleValition : ""} </span></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <ScheduleActivity
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={gridChecked !== true || gridCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                className="pending-side"
                                            >
                                                <Typography style={{ display: "flex", justifyContent: "space-between" }}><span>Grid Breakdown Details <strong style={{ marginLeft: 5 }}>Note:</strong>For no activity toggle left</span>
                                                    <span>{gridChecked === false ? "No Activity" : ""}
                                                        <Switch
                                                            style={customSwitchStyle}
                                                            color="success"
                                                            size="small"
                                                            disabled={gridCount > 0 ? true : false}
                                                            checked={gridChecked}
                                                            onChange={(event) => setGridChecked(!gridChecked)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </span></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <GridBreakdownDetails
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        gridChecked={gridChecked}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={scadaChecked !== true || scadaCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                                className="pending-side"
                                            >
                                                <Typography style={{ display: "flex", justifyContent: "space-between" }}><span>Scada Connectivity details/ Scada BD Details <strong style={{ marginLeft: 5 }}>Note:</strong>For no activity toggle left</span> <span>{scadaChecked === false ? "No Activity" : ""}
                                                    <Switch
                                                        color="success"
                                                        size="small"
                                                        disabled={scadaCount > 0 ? true : false}
                                                        style={customSwitchStyle}
                                                        checked={scadaChecked}
                                                        onChange={(event) => setScadaChecked(event.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </span></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <ScadaDetails
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        scadaChecked={scadaChecked}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={hotoCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                            >
                                                <Typography>HOTO</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <HOTODetails
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className={remarkCount > 0 ? "accordian-background-success" : "accordian-background-danger"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                            >
                                                <Typography>Shift Remark</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <Remark
                                                        selectedDate={dateConvert(selectedDate)}
                                                        siteName={siteName?.siteName}
                                                        shiftCycle={shiftCycle?.masterName}
                                                        configDate={configuredDate}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Box sx={{ textAlign: "right" }}>
                                            <Button
                                                variant="contained"
                                                disabled={submitStatus?.message === "Completed" ? true : disabled}
                                                className="Sub-btn"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grid>
                                }
                            </> : (
                                <Box sx={{ justifyContent: "center", width: "100%", height: "70px" }}>
                                    <Spinner />
                                </Box>
                            )
                        }
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default LogbookMaster;
