import { useEffect, useState } from "react";
import { CardContent, Typography, Card, Grid, Box, Divider, IconButton } from "@mui/material";
import "../style.css"
import EmpForm from "./emp-form";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline, MdDelete } from "react-icons/md"
import { deleteEmployee } from "redux/actions/logbook/EmpolyeeDetails";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import { getAllRole, getAllShiftCycle } from "redux/actions/logbook/DropdownAction";

function EmployeeSection({ selectedDate, siteName, shiftCycle, isSubmitted, configDate }) {
    const dispatch = useDispatch()
    const [isAddForm, setIsAddForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [dialogStat, setDialogStat] = useState(false);
    const [deletedata, setDeleteData] = useState(null)
    const state = useSelector((state) => state);
    const empDetail = state?.employeeDetails?.employeeListing;

    const handleEditData = (id) => {
        const data = empDetail.find(d => d.id === id)
        setEditData(data);
    }
    const onConfirmDialog = () => {
        try {
            setDialogStat(false);
            dispatch(deleteEmployee(deletedata))
        } catch (e) {
            setDialogStat(false);
        }
    };
    const handleDeleteData = (data) => {
        setDialogStat(true)
        setDeleteData(data)
    }

    useEffect(() => {
        dispatch(getAllShiftCycle())
        dispatch(getAllRole())
    }, [])

    return (
        <>
            <Divider />
            <Grid container spacing={4} alignItems="stretch" className="form-div">
                {empDetail && empDetail.map((empDetail) => <Grid item md={3} xs={12}>
                    {
                        editData !== null && empDetail?.id === editData?.id ? (
                            <EmpForm
                                isAddForm={false}
                                selectedDate={selectedDate}
                                siteName={siteName}
                                shiftCycle={shiftCycle}
                                editData={editData}
                                setEditData={setEditData}
                            />
                        ) : (
                            <Card className="card-item">
                                <CardContent>
                                    <ConfirmDialog
                                        title="Employee Details"
                                        message={`Are you sure to want delete`}
                                        dialogStat={dialogStat}
                                        buttonLabel="Delete"
                                        buttonClassName="Sub-btn-delete"
                                        setDialogStat={setDialogStat}
                                        onConfirmDialog={onConfirmDialog}
                                    />

                                    { empDetail?.logDate > configDate &&
                                        <Box className="card-actions">
                                            <IconButton onClick={() => handleEditData(empDetail?.id)} size="small" >
                                                <MdModeEditOutline style={{ fontSize: "17px" }} />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDeleteData(empDetail)}>
                                                <MdDelete style={{ fontSize: "17px" }} />
                                            </IconButton>
                                        </Box>}
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} mb={3}>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Employee Code</Typography>
                                                <Typography ><span className="card-value">{empDetail?.employeeCode}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Name of Employee</Typography>
                                                <Typography ><span className="card-value">{empDetail?.employeeName}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Shift Cycle</Typography>
                                                <Typography ><span className="card-value">{empDetail?.shiftCycle}</span></Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <Typography className="card-heading">Role</Typography>
                                                <Typography ><span className="card-value">{empDetail.role}</span></Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    }
                </Grid>)}

                {isAddForm && selectedDate > configDate &&
                    <EmpForm
                        isAddForm={isAddForm}
                        selectedDate={selectedDate}
                        siteName={siteName}
                        shiftCycle={shiftCycle}
                    />
                }

                { selectedDate > configDate &&
                    <Grid item md={3} xs={12}>
                        <Card className="card-item mn-h">
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

export default EmployeeSection;