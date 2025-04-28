import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, MenuItem, TextField, Button, Typography, } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormTextField, MySelect } from "pages/common-components/FormComponents";
import { addNewWTG, updateBreakDown } from "redux/actions/logbook/WTGAction";
import { getBreakdownCatDrop, getErrorDrop, getManualTurbineDrop, getPassUsageByDrop, getPassUsageDrop, getTurbineDrop, getWTGClosureDrop } from "redux/actions/logbook/DropdownAction";
import { getApiCall } from "apiServices/apiUtils";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { Buttons } from "pages/common-components/Button";
import { TimePickerComp } from "pages/common-components/DateAndTimePicker";
import moment from "moment";
import { fetchError } from "redux/actions";


function BreakdownForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData, wtgTerbineData }) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [empCode, setEmpCode] = useState(null);
    const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
    const state = useSelector((state) => state);
    const ManualDrop = state?.dropdownMaster?.manualDrop;
    const terbineDrop = state?.dropdownMaster?.terbineListing;
    const passUsageDrop = state?.dropdownMaster?.passUsageListing;
    const wtgClosureDrop = state?.dropdownMaster?.wtgClosureListing;
    const breakdownCatDrop = state?.dropdownMaster?.breakdownCategory;
    const [startTime, setStartTime] = useState(null)
    const date = moment(selectedDate).format("MM/DD/YYYY");
    const wtgLoading = state?.wtgBreakdown?.loading;

    const [isPopUpClosed, setIsPopUpClosed] = useState({
        isStatus: false,
        isDateValid: true
    });

    const intialVal = {
        turbine_no: editData ? editData : wtgTerbineData ? wtgTerbineData : null,
        error: editData ? editData : wtgTerbineData ? wtgTerbineData : null,
        from_time: editData ? editData?.timeFrom : wtgTerbineData ? `${date},${wtgTerbineData?.timeFrom}` : null,
        to_time: editData ? editData?.timeTo : null,
        total_time: editData ? editData?.totalTime : "",
        action_taken: editData?.actionTaken ?? "",
        eptw_no: editData?.eptwNumber ?? "",
        pass_usage: editData?.passwordUsage ?? "",
        pass_usage_by: editData?.passwordUsageBy ?? "",
        closure: editData?.closure ?? "",
        brakdown_cat: editData?.breakdownCategory ?? ""
    };

    const breakdownFromValidation = Yup.object().shape({
        turbine_no: Yup.object().required("Select Turbine").nullable(),
        error: Yup.object().required("Select error").nullable(),
        from_time: Yup.string().required("Select From Time").nullable(),
        to_time: Yup.string().required("Select To Time").nullable(),
        total_time: Yup.string().required(" Enter Total Time").nullable(),
        action_taken: Yup.string().required(" Write your action"),
        eptw_no: Yup.string().required(" Enter EPTW number"),
        pass_usage: Yup.string().required("Select password usage"),
        pass_usage_by: Yup.string().required("Select employee"),
        closure: Yup.string().required("Select closure"),
        brakdown_cat: Yup.string().required("Select breakdown categeory"),
    });

    const timeValidation = (startMoment, endMoment) => {
        const duration = moment.duration(endMoment.diff(startMoment));
        const minutes = duration._data.minutes;
        const hours =duration._data.hours;
        const  second =duration._data.seconds > 1 ? 1: 0
        const min = minutes + second;
         return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    }

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (empCode === null) {
            setEmpDropdownOptions([]);
            return;
        } else {
            setIsLoading(true);
            getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/EmployeeDetails?EmployeeCode=${empCode}`)
                .then((response) => {
                    if (response?.data) {
                        const modifiedArray = response?.data?.map(response => ({
                            label: `${response.code} - ${response.name}`,
                            code: response.code,
                            name: response.name,
                            email: response.email
                        }));
                        setIsLoading(false);
                        setEmpDropdownOptions(modifiedArray);
                    } else {
                        setEmpDropdownOptions([]);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    }, [empCode])

    useEffect(() => {
        if (!isFormSubmitted) {
            setIsFormSubmitted(true);
        }
    }, [isAddForm]);

    useEffect(() => {
        if (isPopUpClosed.isStatus === true && isPopUpClosed.isDateValid === false) {
            dispatch(fetchError('To Time always grater then From Time'))
        }

        setIsPopUpClosed({
            isDateValid: true,
            isStatus: false
        })
    }, [isPopUpClosed.isDateValid, isPopUpClosed.isStatus]);


    const [errorDrop, setErrorDrop] = useState([])
    useEffect(() => {
        if (ManualDrop?.errorLists?.length > 0) {
            const arrayList = Array.from(new Set(ManualDrop?.errorLists.map(JSON.stringify)), JSON.parse)
            setErrorDrop(arrayList)
        } else {
            terbineDrop?.errorLists === undefined ? setErrorDrop(terbineDrop?.turbineLists) : setErrorDrop(terbineDrop?.errorLists)
        }

    }, [terbineDrop, ManualDrop])

    const [wtgTerbine, setWtgTerbine] = useState([])
    useEffect(() => {
        if (ManualDrop?.turbineLists?.length > 0) {
            setWtgTerbine(ManualDrop?.turbineLists)
        } else {
            terbineDrop?.errorLists === undefined ? setWtgTerbine(terbineDrop?.turbineLists) : setWtgTerbine(terbineDrop?.turbineLists)
        }
    }, [terbineDrop, ManualDrop])

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
                                siteName: siteName,
                                shiftCycle: shiftCycle,
                                turbine: values?.turbine_no?.turbine,
                                error: values?.error?.error,
                                timeFrom: values?.from_time,
                                timeTo: values?.to_time,
                                totalTime: values?.total_time,
                                actionTaken: values?.action_taken,
                                eptwNumber: values?.eptw_no,
                                passwordUsage: values?.pass_usage,
                                passwordUsageBy: values?.pass_usage_by,
                                closure: values?.closure,
                                breakdownCategory: values?.brakdown_cat
                            }

                            if (editData?.id) {
                                dispatch(updateBreakDown({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewWTG(data))
                            }
                            actions.resetForm(intialVal)
                            setIsFormSubmitted(false)
                        }}
                    >
                        {({ values, handleChange, handleSubmit, resetForm, setFieldValue, errors, touched }) => (
                            <form onSubmit={handleSubmit} >
                                <Grid container>
                                    <Grid item md={12} xs={12}>
                                        <Card >
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={12} xs={12}>
                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                toplabel="Turbine number*"
                                                                name="turbine_no"
                                                                value={values.turbine_no}
                                                                options={wtgTerbine || []}
                                                                getOptionLabel={(option) => option.turbine}
                                                                onChange={(e, value) => {
                                                                    setFieldValue('turbine_no', value)
                                                                }}
                                                                // disabled={terbineDrop?.errorLists === undefined ? true : false}
                                                                className='fontSize-13'
                                                                ListboxProps={{ style: { maxHeight: 150 } }}
                                                                size='small'
                                                                renderInput={(params) => <TextField  {...params} />}
                                                                ErrorText={errors?.turbine_no && touched?.turbine_no ? errors?.turbine_no : ""}
                                                            />
                                                        </Box>
                                                        {
                                                            errors && touched?.turbine_no && <span style={{ color: "#d32f2f", fontSize: "10px" }}>{errors.turbine_no}</span>
                                                        }
                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                toplabel="Error*"
                                                                options={errorDrop || []}
                                                                getOptionLabel={(option) => editData ? option?.error : option?.error}
                                                                name="error"
                                                                value={values?.error}
                                                                onChange={(e, value) => {
                                                                    setFieldValue('error', value)
                                                                }}
                                                                // disabled={terbineDrop?.errorLists === undefined ? true : false}
                                                                className='fontSize-13'
                                                                ListboxProps={{ style: { maxHeight: 150 } }}
                                                                size='small'
                                                                renderInput={(params) => <TextField  {...params} />}
                                                                ErrorText={errors?.error && touched?.error ? errors?.error : ""}
                                                            />
                                                            {touched?.error &&
                                                                errors && <span style={{ color: "#d32f2f", fontSize: "10px" }}>{errors.error}</span>
                                                            }
                                                        </Box>
                                                        <Box className="form-wrapper" sx={{ display: "flex" }}>
                                                            <Grid item md={6}>
                                                                <TimePickerComp
                                                                    toplabel="From Time*"
                                                                    size="small"
                                                                    name="from_time"
                                                                    value={values.from_time}
                                                                    handleOnChange={(value) => {
                                                                        setStartTime(value)
                                                                        setFieldValue('from_time', value)
                                                                    }}
                                                                    ErrorText={errors?.from_time && touched?.from_time ? "Select from time" : ""}
                                                                />

                                                            </Grid>
                                                            <Grid item md={6} ml={1}>
                                                                <TimePickerComp
                                                                    toplabel="To Time*"
                                                                    size="small"
                                                                    name="to_time"
                                                                    value={values.to_time}
                                                                    handleOnChange={(value) => {
                                                                        const startCal = values?.from_time ? new moment(values?.from_time) : new moment(startTime);
                                                                        const endCal = new moment(value);
                                                                        const startTime = values?.from_time ? moment(values?.from_time).format("HH:mm"): moment(startTime).format("HH:mm");
                                                                        const endTime = moment(value).format("HH:mm");
                                                                        if(startTime < endTime) {
                                                                            setFieldValue('to_time', value)
                                                                            const timeDifferance = timeValidation(startCal, endCal)
                                                                            setFieldValue('total_time', timeDifferance)
                                                                        } else {
                                                                            setIsPopUpClosed(prevValue => ({
                                                                                ...prevValue,
                                                                                isDateValid: false
                                                                              }))
                                                                        }
                                                                    }}
                                                                    handleOnClose={() => {
                                                                        setIsPopUpClosed(prevValue => ({
                                                                            ...prevValue,
                                                                            isStatus: true
                                                                          }))
                                                                    }}
                                                                    ErrorText={errors?.to_time && touched?.to_time ? "Select from time" : ""}
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
                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Password Usage*"
                                                                name="pass_usage"
                                                                value={values.pass_usage}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Password Usage
                                                                </MenuItem>
                                                                {passUsageDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
                                                        </Box>

                                                        <Box className="form-wrapper">
                                                            <MySelectAutoComplete
                                                                size="small"
                                                                toplabel="Password Usage By*"
                                                                placeholder="Select employee"
                                                                values={values?.pass_usage_by}
                                                                loading={isLoading}
                                                                onBlur={() => {
                                                                    setEmpDropdownOptions([]);
                                                                }}
                                                                listing={empDropdownOptions}
                                                                sx={{ flex: "0.5" }}
                                                                disabled={false}
                                                                onChangeDta={(e, value) => {
                                                                    setFieldValue('pass_usage_by', value.label)
                                                                    setEmpDropdownOptions([]);
                                                                }}
                                                                onInputChange={(e) => {
                                                                    if (e?.target?.value === "") {
                                                                        setEmpCode(null);
                                                                        setEmpDropdownOptions([]);
                                                                        return;
                                                                    }
                                                                    setEmpDropdownOptions([]);
                                                                    setEmpCode(e?.target?.value);
                                                                }}
                                                                ErrorText={errors?.pass_usage_by && touched?.pass_usage_by ? errors?.pass_usage_by : ""}
                                                            />
                                                        </Box>

                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Closure*"
                                                                name="closure"
                                                                value={values.closure}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Closure
                                                                </MenuItem>
                                                                {wtgClosureDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
                                                        </Box>

                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Stoppage Category*"
                                                                name="brakdown_cat"
                                                                value={values.brakdown_cat}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Stoppage Category
                                                                </MenuItem>
                                                                {breakdownCatDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
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

export default BreakdownForm;