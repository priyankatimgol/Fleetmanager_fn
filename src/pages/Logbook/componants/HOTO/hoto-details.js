import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton } from "@mui/material";
import "../style.css"
import HOTOForm from "./hoto-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteHoto } from "redux/actions/logbook/HotoAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import moment from "moment";
import { getShiftHandedDrop, getShiftTakenDrop } from "redux/actions/logbook/DropdownAction";

function HOTODetails({ selectedDate, shiftCycle, siteName, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const hotoData = state?.hotoDetails?.hotoListing;
    const hotoCount = state?.hotoDetails?.hotoListing?.length;

    const [editData, setEditData] = useState(null);

    const handleEditData = (id) => {
        const data = hotoData.find(d => d?.id === id)
        setEditData(data);
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteHoto(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }

    useEffect(() => {
        dispatch(getShiftHandedDrop())
        dispatch(getShiftTakenDrop())
    }, [])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {hotoData && hotoData.map((hoto) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && hoto?.id === editData?.id ? (
                            <HOTOForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="hoto-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="HOTO"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />

                                    {hoto?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(hoto?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(hoto)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Shift Handed- Over By</Typography>
                                                <Typography ><span className="card-value">{hoto.shiftHandedOverBy}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Date and Time</Typography>
                                                <Typography ><span className="card-value">{moment(hoto.handedOverDateTime).format("DD-MM-YYYY hh:mm a")}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Shift Taken - Over By</Typography>
                                                <Typography ><span className="card-value">{hoto.shiftTakenOverBy}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Date and Time</Typography>
                                                <Typography ><span className="card-value">{moment(hoto.takenOverDateTime).format("DD-MM-YYYY hh:mm a")}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Shift Hours</Typography>
                                                <Typography ><span className="card-value">{hoto.shiftHours}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}
                {isAddForm && selectedDate > configDate &&
                    <HOTOForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                {hotoCount !== 1 && selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="hoto-card card-item mn-h">
                            <CardContent>
                                <div onClick={() => { setIsAddForm(prevState => !prevState) }} className="plus-icon">
                                    +
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>}
            </Grid>
        </>
    );
}

export default HOTODetails;
