import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton } from "@mui/material";
import "../style.css"
import ScheduleForm from "./schedule-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteSchedule } from "redux/actions/logbook/ScheduleAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import { getActivityDrop, getClosureDrop, getScheduleActCard, getScheduleTerbine } from "redux/actions/logbook/DropdownAction";
import moment from "moment";
import Spinner from "pages/common-components/Spinner";


function ScheduleActivity({ selectedDate, siteName, shiftCycle, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const scheduleData = state?.scheduleActivity?.scheduleListing;
    const scheduleTerbineDrop = state?.dropdownMaster?.scheduleTerbineListing;
    const scheduleLoading = state?.scheduleActivity?.loading;
    const scheduleActCard = state?.dropdownMaster?.scheduleActCard ?? [];

    const dateConvert = (date) => {
        var components = date.toLocaleDateString().split('/');
        var convertedDate = components[2] + '-' + components[0].padStart(2, '0') + '-' + components[1].padStart(2, '0');
        return convertedDate;
    };

    const [editData, setEditData] = useState(null);
    const handleEditData = (id) => {
        const data = scheduleData.find(d => d.id === id)
        setEditData(data)
    }

    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteSchedule(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };

    useEffect(() => {
        dispatch(getActivityDrop())
        dispatch(getClosureDrop())
    }, [])

    const [scheduleTerbine, setScheduleTerbine] = useState([])
    useEffect(() => {
        if (scheduleActCard) {
            const filteredArray1 = scheduleActCard?.filter((item1) => {
                return !scheduleData?.some((item2) => item1?.turbine === item2?.turbine);
            });
             setScheduleTerbine(filteredArray1)
        }
    }, [scheduleActCard, scheduleData])

    useEffect(() => {
        dispatch(getScheduleActCard(siteName, selectedDate, shiftCycle))
    }, [siteName, selectedDate, shiftCycle])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {!scheduleLoading && scheduleData && scheduleData.map((schedule) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && schedule?.id === editData?.id ? (
                            <ScheduleForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="schedule-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="Grid Breakdown Details"
                                        message={`Are you sure to want delete`}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        dialogStat={dialogStat}
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />
                                    {schedule?.closure !== "Reschedule" && schedule?.closure !== "Reschedule" && schedule?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(schedule?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(schedule)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={4}>
                                                <Typography className="card-heading">Turbine Number</Typography>
                                                <Typography ><span className="card-value">{schedule?.turbine}</span></Typography>
                                            </Box>
                                            <Box mt={4}>
                                                <Typography className="card-heading">Activity</Typography>
                                                <Typography ><span className="card-value">{schedule?.activity}</span></Typography>
                                            </Box>
                                            <Box mt={4}>
                                                <Typography className="card-heading">Observation</Typography>
                                                <Typography ><span className="card-value">{schedule?.observation}</span></Typography>
                                            </Box>
                                            <Box mt={4}>
                                                <Typography className="card-heading">EPTW Number</Typography>
                                                <Typography ><span className="card-value">{schedule?.eptwNumber}</span></Typography>
                                            </Box>
                                            <Box mt={4}>
                                                <Typography className="card-heading">Closure</Typography>
                                                <Typography ><span className="card-value">{schedule?.closure}</span></Typography>
                                            </Box>
                                            {schedule?.rescheduleDate !== null &&
                                                <Box mt={4}>
                                                    <Typography className="card-heading">Reschedule Date</Typography>
                                                    <Typography ><span className="card-value">{schedule?.rescheduleDate?.split("T")[0]}</span></Typography>
                                                </Box>}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}


                {scheduleLoading ? <Box sx={{ justifyContent: "center", width: "100%", height: "200px" }}>
                    <Spinner />
                </Box> : scheduleTerbine && selectedDate > configDate &&
                scheduleTerbine?.map(d => <ScheduleForm
                    isAddForm={isAddForm}
                    selectedDate={selectedDate}
                    siteName={siteName}
                    shiftCycle={shiftCycle}
                    scheduleTerbineData={d}
                />)
                }

                {isAddForm && selectedDate > configDate &&
                    <ScheduleForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                {!scheduleLoading && selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="schedule-card card-item mn-h">
                            <CardContent>
                                <div onClick={() => { setIsAddForm(prevState => !prevState) }} className="plus-icon">
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

export default ScheduleActivity;
