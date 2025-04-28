import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, Button, IconButton } from "@mui/material";
import "../style.css"
import ScadaForm from "./scada-form";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteScada } from "redux/actions/logbook/ScadaAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import { getIssueDescDrop } from "redux/actions/logbook/DropdownAction";


function ScadaDetails({ selectedDate, shiftCycle, siteName, scadaChecked, isSubmitted, configDate}) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const scadaData = state?.scadaDetails?.scadaListing;

    const [editData, setEditData] = useState(null);
    const handleEditData = (id) => {
        const data = scadaData.find(d => d.id === id)
        setEditData(data);
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteScada(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }
    useEffect(()=>{
        dispatch(getIssueDescDrop())
    },[])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {scadaData && scadaData.map((scada) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && scada?.id === editData?.id ? (
                            <ScadaForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="scada-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="Scada connectivity Details"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />
                                    { scada?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(scada?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(scada)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Issue Description</Typography>
                                                <Typography ><span className="card-value">{scada.issueDesc}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Action Taken</Typography>
                                                <Typography ><span className="card-value">{scada.actionTaken}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}

                {isAddForm && selectedDate > configDate &&
                    <ScadaForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                {scadaChecked !== false && selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="scada-card scada-height card-item">
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

export default ScadaDetails;
