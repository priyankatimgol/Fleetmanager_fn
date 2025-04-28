import { useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton } from "@mui/material";
import "../style.css"
import { useDispatch, useSelector } from "react-redux";
import RemarkForm from "./remark-form";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { deleteRemark } from "redux/actions/logbook/RemarkAction";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";


function Remark({ selectedDate, siteName, shiftCycle, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const remarkData = state?.remark?.remarkListing;

    const [editData, setEditData] = useState(null);
    const handleEditData = (id) => {
        const data = remarkData.find(d => d.id === id)
        setEditData(data);
    }

    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteRemark(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {remarkData && remarkData.map((remark) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && remark?.id === editData?.id ? (
                            <RemarkForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="remark-card">
                                <CardContent>
                                    <ConfirmDialog
                                        title="Remark"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />
                                    { remark?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(remark?.id)} size="small">
                                                <MdModeEditOutline color="#000" fontSize="17px" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(remark)}>
                                                <MdDelete color="#000" fontSize="17px" />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Remark</Typography>
                                                <Typography ><span className="card-value">{remark.remarks}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}

                {isAddForm &&  selectedDate > configDate &&
                    <RemarkForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                { selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="remark-card scada-height card-item">
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

export default Remark;
