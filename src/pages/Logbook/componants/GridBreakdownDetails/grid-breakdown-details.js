import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton } from "@mui/material";
import "../style.css"
import GridBreakdownForm from "./grid-brakdown-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteGrid } from "redux/actions/logbook/GridBreakdownAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import moment from "moment";
import { getFeederDrop, getGridResonDrop } from "redux/actions/logbook/DropdownAction";

function GridBreakdownDetails({ selectedDate, shiftCycle, siteName, gridChecked, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const gridData = state?.gridBreakdown?.gridListing;

    const [editData, setEditData] = useState(null);
    const handleEditData = (id) => {
        const data = gridData.find(d => d.id === id)
        setEditData(data);
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteGrid(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }

    useEffect(() => {
        dispatch(getFeederDrop())
        dispatch(getGridResonDrop())
    }, [])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {gridData && gridData.map((grid) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && grid?.id === editData?.id ? (
                            <GridBreakdownForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="grid-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="Grid breakdown Details"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />
                                   { grid?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(grid?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(grid)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Feeder Number</Typography>
                                                <Typography ><span className="card-value">{grid.feederName}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Grid drop Reason</Typography>
                                                <Typography ><span className="card-value">{grid.gridDropReason}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">From Time</Typography>
                                                <Typography ><span className="card-value">{moment(grid.timeFrom).format("hh:mm a")}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">To Time</Typography>
                                                <Typography ><span className="card-value">{moment(grid.timeTo).format("hh:mm a")}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Total Time</Typography>
                                                <Typography ><span className="card-value">{grid.totalTime}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Action Taken</Typography>
                                                <Typography ><span className="card-value">{grid.remarkAction}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">EPTW Number</Typography>
                                                <Typography ><span className="card-value">{grid.eptwNumber}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}

                { isAddForm && selectedDate > configDate &&
                    <GridBreakdownForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }
                { gridChecked !== false && selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="grid-card card-item mn-h">
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

export default GridBreakdownDetails;
