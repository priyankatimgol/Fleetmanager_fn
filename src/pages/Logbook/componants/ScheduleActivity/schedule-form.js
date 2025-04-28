import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, MenuItem, Button, Typography, TextField } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { FormTextField, MySelect, MySelectAutoComplete } from "pages/common-components/FormComponents";
import { useDispatch, useSelector } from "react-redux";
import { addNewSchedule, updateSchedule } from "redux/actions/logbook/ScheduleAction";
import { getActivityDrop, getClosureDrop, getScheduleTerbine } from "redux/actions/logbook/DropdownAction";
import { DatePicker } from "@mui/x-date-pickers";
import { Buttons } from "pages/common-components/Button";
import moment from "moment";

function ScheduleForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData, scheduleTerbineData }) {
    const dispatch = useDispatch()
    const today = new Date();
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const state = useSelector((state) => state)
    const terbineDrop = state?.dropdownMaster?.scheduleTerbineListing;
    const activityDrop = state?.dropdownMaster?.activityListing;
    const closureDrop = state?.dropdownMaster?.closureListing;
    const [dateClosure, setDateClosure] = useState(null)

    const formatedDate = (date) => {
        const components = date.toLocaleString().split(',')[0];
        const formatDate = components.split('/');
        const convertedDate = formatDate[2] + '-' + formatDate[0].padStart(2, '0') + '-' + formatDate[1].padStart(2, '0');
        return convertedDate;
    }

    const intialVal = {
        turbine_no: editData ? editData : scheduleTerbineData ? scheduleTerbineData : null,
        activity: editData ? editData : scheduleTerbineData ? scheduleTerbineData : null,
        observation: editData?.observation ?? "",
        eptw_no: editData?.eptwNumber ?? "",
        closure: editData?.closure ?? "",
        schedule_date: editData?.rescheduleDate ?? null
    };

    const breakdownFromValidation = Yup.object().shape({
        turbine_no: Yup.object().required("Select turbine number").nullable(),
        activity: Yup.object().required("Select activity").nullable(),
        observation: Yup.string().required("Write your observation"),
        eptw_no: Yup.string().required("Enter EPTW number"),
        closure: Yup.string().required("Select closure"),
        schedule_date: Yup.string().when("closure", {
            is: (closure) => closure === "Reschedule",
            then: Yup.string().required("Schedule Date is required"),
            otherwise: Yup.string().nullable(),
        }),
    });

    useEffect(() => {
        if (selectedDate, siteName) {
            dispatch(getScheduleTerbine(selectedDate, siteName))
        }
    }, [selectedDate, siteName])

    useEffect(() => {
        if (!isFormSubmitted) {
            setIsFormSubmitted(true);
        }
    }, [isAddForm]);

    return (
        <>
            {isFormSubmitted && (
                <Grid item md={editData?.turbine ? 12 : 3} xs={12}>
                    <Formik
                        initialValues={intialVal}
                        validationSchema={breakdownFromValidation}
                        onSubmit={(values, actions) => {
                            const data = {
                                fkSiteId: 1,
                                logDate: selectedDate,
                                shiftCycle: shiftCycle,
                                siteName: siteName,
                                turbine: values?.turbine_no?.turbine,
                                activity: values?.activity?.masterName,
                                observation: values?.observation,
                                eptwNumber: values?.eptw_no,
                                closure: values?.closure,
                                rescheduleDate: values?.schedule_date === null ? null : formatedDate(values?.schedule_date)
                            }
                            if (editData?.id) {
                                dispatch(updateSchedule({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewSchedule(data))
                            }
                            actions.resetForm(intialVal)
                            setIsFormSubmitted(false)
                        }}
                    >
                        {({ values, handleChange, handleSubmit, initialValues, resetForm, setFieldValue, errors, touched }) => (
                            <form onSubmit={handleSubmit} >
                                <Grid container>
                                    <Grid item md={12} xs={12}>
                                        <Card  >
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={12} xs={12}>
                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                toplabel="Turbine number*"
                                                                name="turbine_no"
                                                                value={values?.turbine_no}
                                                                options={terbineDrop?.data || []}
                                                                getOptionLabel={(option) => option?.turbine}
                                                                onChange={(e, value) => {
                                                                    setFieldValue('turbine_no', value)
                                                                }}
                                                                className='fontSize-13'
                                                                ListboxProps={{ style: { maxHeight: 150 } }}
                                                                size='small'
                                                                renderInput={(params) => <TextField  {...params} />}
                                                            />
                                                        </Box>
                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                toplabel="Activity*"
                                                                name="activity"
                                                                value={values.activity}
                                                                options={activityDrop || []}
                                                                getOptionLabel={(option) => editData ? option?.activity :option?.masterName}
                                                                onChange={(e, value) => {
                                                                    setFieldValue('activity', value)
                                                                }}
                                                                className='fontSize-13'
                                                                ListboxProps={{ style: { maxHeight: 150 } }}
                                                                size='small'
                                                                renderInput={(params) => <TextField  {...params} />}
                                                            />
                                                        </Box>
                                                        <Box className="form-wrapper">
                                                            <FormTextField
                                                                toplabel="Observation*"
                                                                type="text"
                                                                placeholder="Write your observation"
                                                                name="observation"
                                                                multiline
                                                                rows={1}
                                                                value={values.observation}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                sx={{
                                                                    width: "100%",
                                                                    "& .MuiInputBase-input": {
                                                                        height: "3px",
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box className="form-wrapper">
                                                            <FormTextField
                                                                toplabel="EPTW Number*"
                                                                type="text"
                                                                placeholder="EPTW Number"
                                                                name="eptw_no"
                                                                value={values.eptw_no}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                sx={{
                                                                    width: "100%",
                                                                    "& .MuiInputBase-input": {
                                                                        height: "3px",
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Closure*"
                                                                name="closure"
                                                                value={values.closure}
                                                                onChange={(value) => {
                                                                    setDateClosure(value.target.value)
                                                                    setFieldValue('closure', value.target.value)
                                                                }}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Closure
                                                                </MenuItem>
                                                                {closureDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName} >{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
                                                        </Box>

                                                        {dateClosure && dateClosure === "Reschedule" && (
                                                            <Box>
                                                                <Typography variant="body2" className="bold-600">Schedule Date</Typography>
                                                                <DatePicker
                                                                    label=""
                                                                    name="schedule_date"
                                                                    inputFormat="dd/MM/yyyy"
                                                                    className={`default-textbox ${errors?.schedule_date ? 'AutoComplete' : ''}`}
                                                                    value={values.schedule_date}
                                                                    minDate={today}
                                                                    onChange={(value) => {
                                                                        setFieldValue('schedule_date', value)
                                                                    }}
                                                                    renderInput={(params) => <TextField {...params}
                                                                        size="small"
                                                                    />}
                                                                />
                                                                {touched?.schedule_date && errors?.schedule_date ? <span style={{ color: "#d32f2f", fontSize: "10px" }}>Select reschedule date</span> : ""}
                                                            </Box>
                                                        )}

                                                        <Box className="button-background" sx={{ display: "flex", justifyContent: editData?.id ? "space-between" : "flex-end", width: "100%", marginTop: "10px" }}>
                                                            {
                                                                editData?.id && (
                                                                    <Buttons
                                                                        variant="outlined"
                                                                        className="sub-btn-cancel"
                                                                        type="submit"
                                                                        name="Cancel"
                                                                        size="small"
                                                                        fontSize="13px"
                                                                        onClick={() => setEditData(null)}
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                editData?.id ? (
                                                                    <Buttons
                                                                        variant="contained"
                                                                        type="submit"
                                                                        className="Sub-btn"
                                                                        name="Update"
                                                                        size="small"
                                                                    />
                                                                ) : (
                                                                    <Buttons
                                                                        variant="contained"
                                                                        type="submit"
                                                                        className="Sub-btn"
                                                                        name="Save"
                                                                        size="small"
                                                                    />
                                                                )
                                                            }
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik >
                </Grid>
            )}
        </>
    );
}

export default ScheduleForm;
