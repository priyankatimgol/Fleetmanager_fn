import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton, } from "@mui/material";
import "../style.css"
import BreakdownForm from "./breakdown-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteBreakDown } from "redux/actions/logbook/WTGAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import { getBreakdownCatDrop, getErrorDrop, getManualTurbineDrop, getPassUsageByDrop, getPassUsageDrop, getTurbineDrop, getWTGClosureDrop } from "redux/actions/logbook/DropdownAction";
import Spinner from "pages/common-components/Spinner";
import moment from "moment";

function EmployeeSection({ selectedDate, siteName, shiftCycle, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    let wtgData = state?.wtgBreakdown?.wtgListing;
    const terbineDrop = state?.dropdownMaster?.terbineListing;
    const turbineValidation = state?.dropdownMaster?.turbineValidation;              
    const wtgLoading = state?.wtgBreakdown?.loading;

    const [editData, setEditData] = useState(null);
    const handleEditData = (id) => {
        const data = wtgData.find(d => d.id === id)
        wtgData = wtgData?.filter(d => d.id !== id)
        setEditData(data);
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteBreakDown(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }

    const handlePlusCard = () => {
        setIsAddForm(prevState => !prevState)
        if(turbineValidation?.validation === true && siteName){
            dispatch(getManualTurbineDrop(siteName))
        }
    }

    useEffect(() => {
        dispatch(getErrorDrop())
        dispatch(getPassUsageDrop())
        dispatch(getPassUsageByDrop())
        dispatch(getWTGClosureDrop())
        dispatch(getBreakdownCatDrop())
    }, [])

    // useEffect(() => {
    //     if (selectedDate, siteName, shiftCycle, wtgData) {
    //         dispatch(getTurbineDrop(siteName, selectedDate, shiftCycle, wtgData))
    //     }
    // }, [selectedDate, shiftCycle, siteName, wtgData])

    const [wtgTerbine, setWtgTerbine] = useState([])
    useEffect(() => {
        if (terbineDrop?.turbineLists) {
            if (terbineDrop?.errorLists === undefined) {
                const filteredArray1 = terbineDrop?.turbineLists.filter((item1) => {
                    return !wtgData?.some((item2) => item1?.turbine === item2?.turbine);
                });
                setWtgTerbine(filteredArray1)

            } else {
                setWtgTerbine([])
            }
        }
    }, [terbineDrop, wtgData])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {!wtgLoading && wtgData && wtgData.map((breakDetail) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && breakDetail?.id === editData?.id ? (
                            <BreakdownForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="breakdown-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="WTG Breakdown Details"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />
                                    {breakDetail?.closure !== "Handover to Next shift" && breakDetail?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(breakDetail?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(breakDetail)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={12}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Turbine Number</Typography>
                                                <Typography ><span className="card-value">{breakDetail.turbine}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Error</Typography>
                                                <Typography ><span className="card-value">{breakDetail.error}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">From Time</Typography>
                                                <Typography ><span className="card-value">{moment(breakDetail?.timeFrom).format("hh:mm a")}</span></Typography>

                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">To Time</Typography>
                                                <Typography ><span className="card-value">{moment(breakDetail?.timeTo).format("hh:mm a")}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Total Time</Typography>
                                                <Typography ><span className="card-value">{breakDetail.totalTime}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Action Taken</Typography>
                                                <Typography ><span className="card-value">{breakDetail.actionTaken}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">EPTW Number</Typography>
                                                <Typography ><span className="card-value">{breakDetail.eptwNumber}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Password Usage</Typography>
                                                <Typography ><span className="card-value">{breakDetail.passwordUsage}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Password Usage By</Typography>
                                                <Typography ><span className="card-value">{breakDetail.passwordUsageBy}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Closure</Typography>
                                                <Typography ><span className="card-value">{breakDetail.closure}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Stoppage Category</Typography>
                                                <Typography ><span className="card-value">{breakDetail.breakdownCategory}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }

                </Grid>)}
                {wtgLoading ? <Box sx={{ justifyContent: "center", width: "100%", height: "200px" }}>
                    <Spinner />
                </Box> : wtgTerbine && selectedDate > configDate &&
                wtgTerbine?.map(d => <BreakdownForm
                    isAddForm={isAddForm}
                    selectedDate={selectedDate}
                    siteName={siteName}
                    shiftCycle={shiftCycle}
                    wtgTerbineData={d}
                />)
                }
                {!wtgLoading && isAddForm && selectedDate > configDate &&
                    <BreakdownForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                {!wtgLoading && selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="breakdown-card card-item mn-h">
                            <CardContent>
                                <div onClick={handlePlusCard} className="plus-icon">
                                    +
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                }
            </Grid>
        </>
    );
}

export default EmployeeSection;
