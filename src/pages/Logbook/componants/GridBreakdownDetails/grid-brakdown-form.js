import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, MenuItem, TextField, Button, Typography } from "@mui/material";
import "../style.css"
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormTextField, MySelect, MySelectAutoComplete } from "pages/common-components/FormComponents";
import { addNewGrid, updateGrid } from "redux/actions/logbook/GridBreakdownAction";
import { getFeederDrop, getGridResonDrop } from "redux/actions/logbook/DropdownAction";
import moment from "moment";
import { Buttons } from "pages/common-components/Button";
import { TimePickerComp } from "pages/common-components/DateAndTimePicker";
import { fetchError } from "redux/actions";

function GridBreakdownForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData }) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const state = useSelector((state) => state)
    const feederDrop = state?.dropdownMaster?.feederListing || [];
    const gridResonDrop = state?.dropdownMaster?.gridResonListing
    const [startTime, setStartTime] = useState(null);

    const intialVal = {
        feeder_no: editData ?? null,
        grid_reason: editData?.gridDropReason ?? "",
        from_time:editData?.timeFrom ?? "",
        to_time:editData?.timeTo ?? "",
        total_time: editData?.totalTime ?? "",
        action_taken: editData?.remarkAction ?? "",
        eptw_no: editData?.eptwNumber ?? "",
    };

    const breakdownFromValidation = Yup.object().shape({
        feeder_no: Yup.object().required("Select feeder number").nullable(),
        grid_reason: Yup.string().required("Select grid drop reason"),
        from_time: Yup.string().required("Select from time"),
        to_time: Yup
            .string()
            .required('To Time is required')
            .test('is-later', 'To Time must be later than From Time', function (toTime) {
                const { fromTime } = this.parent;
                if (!fromTime || !toTime) return true;
                const fromMoment = moment(startTime, 'HH:mm');
                const toMoment = moment(toTime, 'HH:mm');
                return toMoment.isAfter(fromMoment);
            }),
        // to_time: Yup.string().required("Select from time"),
        total_time: Yup.string().required(" Enter Total Time"),
        action_taken: Yup.string().required(" Write your action"),
        eptw_no: Yup.string().required(" Enter EPTW number"),
    });

    useEffect(() => {
        if (!isFormSubmitted) {
            setIsFormSubmitted(true);
        }
    }, [isAddForm]);

    return (
        <>
            {isFormSubmitted && (
                <Grid item md={editData?.id ? 12 : 3} xs={12}>
                    <Formik
                        initialValues={intialVal}
                        validationSchema={breakdownFromValidation}
                        onSubmit={(values, actions) => {
                            const data = {
                                fkSiteId: 1,
                                logDate: selectedDate,
                                siteName: siteName,
                                shiftCycle: shiftCycle,
                                feederName: values?.feeder_no?.masterName,
                                gridDropReason: values?.grid_reason,
                                remarkAction: values?.action_taken,
                                eptwNumber: values?.eptw_no,
                                totalTime: values?.total_time,
                                timeFrom:values?.from_time,
                                timeTo:values?.to_time,
                            }
                         
                            if (editData?.id) {
                                dispatch(updateGrid({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewGrid(data))
                            }
                            actions.resetForm(intialVal)
                            setIsFormSubmitted(false)
                        }}
                    >
                        {({ values, handleChange, handleSubmit, initialValues, resetForm, setFieldValue, errors, touched }) => (
                            <form onSubmit={handleSubmit} >
                                <Grid container>
                                    <Grid item md={12} xs={12}>
                                        <Card >
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={12} xs={12}>
                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                toplabel="Feeder Number/Sub Station*"
                                                                options={feederDrop}
                                                                getOptionLabel={(option) =>editData ? option?.feederName ||option.masterName : option.masterName}
                                                                name="feeder_no"
                                                                value={values?.feeder_no}
                                                                onChange={(e, value) => {
                                                                    setFieldValue('feeder_no', value)
                                                                }}
                                                                className='fontSize-13'
                                                                ListboxProps={{ style: { maxHeight: 150 } }}
                                                                size='small'
                                                                renderInput={(params) => <TextField  {...params} />}
                                                            />
                                                        </Box>

                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Grid Drop Reason*"
                                                                name="grid_reason"
                                                                value={values.grid_reason}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Grid Drop Reason
                                                                </MenuItem>
                                                                {gridResonDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
                                                        </Box>

                                                        <Box className="form-wrapper" sx={{ display: "flex" }}>
                                                            <Grid item md={6}>
                                                                <TimePickerComp
                                                                    toplabel="From Time*"
                                                                    size="small"
                                                                    name="from_time"
                                                                    format="hh:mm a"
                                                                    value={values?.from_time}
                                                                    handleOnChange={(value) => {
                                                                        console.log(value)
                                                                        setStartTime(value)
                                                                        setFieldValue('from_time', value)
                                                                    }}
                                                                    ErrorText={errors?.from_time && touched?.from_time ? "Select from date" : ""}
                                                                />
                                                            </Grid>

                                                            <Grid item md={6} ml={1}>
                                                                <TimePickerComp
                                                                    toplabel="To Time*"
                                                                    size="small"
                                                                    name="to_time"
                                                                    value={values?.to_time}
                                                                    handleOnChange={(value) => {
                                                                        const startCal=moment(startTime).format("HH:mm");
                                                                        const endCal=moment(value).format("HH:mm");
                                                                        if (startCal<endCal){
                                                                          setFieldValue('to_time', value)
                                                                          const startMoment = moment(startTime, 'HH:mm');
                                                                          const endMoment = moment(value, 'HH:mm');
                                                                          const duration = endMoment.diff(startMoment);
                                                                          const minutes = Math.round(duration / 60000);
                                                                          const hours = Math.floor(minutes / 60);
                                                                          const remainingMinutes = minutes % 60;
                                                                          setFieldValue('total_time', `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`)
                                                                        }else{
                                                                            dispatch(fetchError("To Time always grater then From Time"))
                                                                        }
                                                                      }}
                                                                    ErrorText={errors?.to_time && touched?.to_time ? "Select to date" : ""}
                                                                />

                                                            </Grid>
                                                        </Box>

                                                        <Box className="form-wrapper">
                                                            <FormTextField
                                                                toplabel="Total Time*"
                                                                type="text"
                                                                placeholder="Total Time"
                                                                name="total_time"
                                                                value={values.total_time}
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
                                                                toplabel="Action Taken*"
                                                                type="text"
                                                                placeholder="Action Taken"
                                                                name="action_taken"
                                                                multiline
                                                                rows={1}
                                                                value={values.action_taken}
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

export default GridBreakdownForm;
