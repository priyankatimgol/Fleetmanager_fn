import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, TextField, Typography } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormTextField } from "pages/common-components/FormComponents";
import { useDispatch, useSelector } from "react-redux";
import { addNewHoto, updateHoto } from "redux/actions/logbook/HotoAction";
import { getShiftHandedDrop, getShiftTakenDrop } from "redux/actions/logbook/DropdownAction";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { getApiCall } from "apiServices/apiUtils";
import { Buttons } from "pages/common-components/Button";
import { timeDiffernce } from "pages/Logbook/utils";
import moment from "moment";
import { setSelctedEmp } from "redux/actions/logbook/EmpolyeeDetails";
import { fetchError } from "redux/actions";

function HOTOForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData }) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [empCode, setEmpCode] = useState(null);
    const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
    const maxDate = new Date();
    const [startTime, setStartTime] = useState(null);
    const state = useSelector((state) => state);
    const employeeName = state?.employeeDetails?.selectedEmployee;
    const shiftCyleDrop = state?.dropdownMaster?.shiftCycleListing;

    const [shiftTime, setShiftTime] = useState("")
    useEffect(() => {
        if (shiftCyleDrop && shiftCycle) {
            const data = shiftCyleDrop?.find((d) => d.masterName === shiftCycle)
            setShiftTime(moment(data.createdDate).format('HH:mm'))
        }
    }, [shiftCyleDrop, shiftCycle])

    const intialVal = {
        shift_handed: editData ? editData?.shiftHandedOverBy : employeeName ? employeeName?.label : "",
        date_time: editData?.handedOverDateTime ?? null,
        shift_taken: editData?.shiftTakenOverBy ?? "",
        date_time1: editData?.takenOverDateTime ?? null,
        shift_hour: editData?.shiftHours ?? ""
    };

    const employeeFromValidation = Yup.object().shape({
        shift_handed: Yup.string().required("Select shift handed by"),
        date_time: Yup.string().required("Select date and time"),
        shift_taken: Yup.string().required("Select shift taken by"),
        date_time1: Yup.string().required("Select date and time"),
        shift_hour: Yup.string().required("Enter your shift hour"),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
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

    return (
        <>
            {isFormSubmitted && (
                <Grid item md={editData?.id ? 12 : 3} xs={12}>
                    <Formik
                        initialValues={intialVal}
                        validationSchema={employeeFromValidation}
                        onSubmit={(values, actions) => {
                            const data = {
                                fkSiteId: 1,
                                logDate: selectedDate,
                                siteName: siteName,
                                shiftCycle: shiftCycle,
                                shiftHandedOverBy: values?.shift_handed,
                                handedOverDateTime: values?.date_time,
                                shiftTakenOverBy: values?.shift_taken,
                                takenOverDateTime: values?.date_time1,
                                shiftHours: values?.shift_hour,
                            }
                            if (editData?.id) {
                                dispatch(updateHoto({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewHoto(data))
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
                                                <Box className="form-wrapper">
                                                    <MySelectAutoComplete
                                                        size="small"
                                                        toplabel="Shift Handed- Over By*"
                                                        placeholder="Select employee"
                                                        values={values?.shift_handed}
                                                        loading={isLoading}
                                                        onBlur={() => {
                                                            setEmpDropdownOptions([]);
                                                        }}
                                                        listing={empDropdownOptions}
                                                        sx={{ flex: "0.5" }}
                                                        onChangeDta={(e, value) => {
                                                            setFieldValue('shift_handed', value.label)
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
                                                        ErrorText={errors?.shift_handed && touched?.shift_handed ? errors?.shift_handed : ""}
                                                    />
                                                </Box>

                                                <Box className="form-wrapper">
                                                    <Typography variant="body2" className="bold-600">Date and time<span style={{ color: "#d32f2f", fontSize: "13px" }}>*</span></Typography>
                                                    <DateTimePicker
                                                        renderInput={(props) => <TextField {...props}
                                                            size="small"
                                                        />}
                                                        className={`default-textbox ${errors?.date_time ? 'AutoComplete' : ''}`}
                                                        minDate={maxDate}
                                                        value={values.date_time}
                                                        onChange={(value) => {
                                                            setStartTime(value)
                                                            setFieldValue('date_time', value)
                                                            const startMoment = moment(shiftTime, 'HH:mm');
                                                            const endMoment = moment(value, 'HH:mm');
                                                            const duration = endMoment.diff(startMoment);
                                                            const minutes = Math.round(duration / 60000);
                                                            const hours = Math.floor(minutes / 60);
                                                            const remainingMinutes = minutes % 60;
                                                            setFieldValue('shift_hour', `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`)
                                                        }}
                                                        label=""
                                                        name="date_time"
                                                    />
                                                </Box>
                                                {
                                                    touched?.date_time && errors && <span style={{ color: "#d32f2f", fontSize: "10px" }}>{errors.date_time ? "Select date time" : ""}</span>
                                                }
                                                <Box className="form-wrapper">
                                                    <MySelectAutoComplete
                                                        size="small"
                                                        toplabel="Shift Taken- Over By*"
                                                        placeholder="Select employee"
                                                        values={values?.shift_taken}
                                                        loading={isLoading1}
                                                        onBlur={() => {
                                                            setEmpDropdownOptions([]);
                                                        }}
                                                        listing={empDropdownOptions}
                                                        sx={{ flex: "0.5" }}
                                                        disabled={false}
                                                        onChangeDta={(e, value) => {
                                                            setFieldValue('shift_taken', value.label)
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
                                                        ErrorText={errors?.shift_taken && touched?.shift_taken ? errors?.shift_taken : ""}
                                                    />
                                                </Box>
                                                
                                                <Box className="form-wrapper">
                                                    <Typography variant="body2" className="bold-600">Date and time <span style={{ color: "#d32f2f", fontSize: "13px" }}>*</span></Typography>
                                                    <DateTimePicker
                                                        renderInput={(props) => <TextField {...props}
                                                            size="small"
                                                        />}
                                                        className={`default-textbox ${errors?.date_time1 ? 'AutoComplete' : ''}`}
                                                        value={values.date_time1}
                                                        minDate={maxDate}
                                                        onChange={(value) => {
                                                            setFieldValue('date_time1', value)
                                                        }}
                                                        label=""
                                                        name="date_time1"
                                                    />
                                                </Box>
                                                {
                                                    touched?.date_time1 && errors && <span style={{ color: "#d32f2f", fontSize: "10px" }}>{errors.date_time1 ? "Select date time" : ""}</span>
                                                }
                                                <Box className="form-wrapper">
                                                    <FormTextField
                                                        toplabel="Shift Hours*"
                                                        type="text"
                                                        placeholder="Shift Hours"
                                                        name="shift_hour"
                                                        disabled={true}
                                                        value={values.shift_hour}
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

export default HOTOForm;
