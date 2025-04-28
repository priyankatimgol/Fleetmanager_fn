import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, MenuItem } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { FormTextField, MySelect } from "pages/common-components/FormComponents";
import { addNewEmployees, setSelctedEmp, updateEmployee } from "../../../../redux/actions/logbook/EmpolyeeDetails"
import { useDispatch, useSelector } from "react-redux";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { getAllRole, getAllShiftCycle } from "redux/actions/logbook/DropdownAction";
import { getApiCall } from "apiServices/apiUtils";
import { Buttons } from "pages/common-components/Button";

function EmpForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData }) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [empCode, setEmpCode] = useState(null);
    const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState()

    const state = useSelector((state) => state);
    const shiftCyleDrop = state?.dropdownMaster?.shiftCycleListing;
    const roleDrop = state?.dropdownMaster?.roleListing;

    const intialVal = {
        emp_Code: editData?.employeeCode ?? "",
        emp_name: editData?.employeeName ?? "",
        shift_cycle: editData?.shiftCycle ?? "",
        role: editData?.role ?? "",
    };

    const employeeFromValidation = Yup.object().shape({
        emp_Code: Yup.string().required("Enter your employee code"),
        emp_name: Yup.string().required("Enter your employee name"),
        shift_cycle: Yup.string().nullable(),
        role: Yup.string().required("Select your role"),
    });

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if ( empCode === null) {
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
                                employeeCode: values?.emp_Code,
                                employeeName: values?.emp_name,
                                role: values?.role,
                                shiftCycle: shiftCycle
                            }
                            if (editData?.id) {
                                dispatch(updateEmployee({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewEmployees(data))
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
                                                        toplabel="Employee Code*"
                                                        placeholder="Enter Employee Code"
                                                        values={values?.emp_Code}
                                                        loading={isLoading}
                                                        onBlur={() => {
                                                            setEmpDropdownOptions([]);
                                                        }}
                                                        listing={empDropdownOptions}
                                                        sx={{ flex: "0.5" }}
                                                        disabled={false}
                                                        onChangeDta={(e, value) => {
                                                            setFieldValue('emp_Code', value?.code)
                                                            setFieldValue('emp_name', value?.name)
                                                            setSelectedEmp(value)
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
                                                        ErrorText={errors?.emp_Code && touched?.emp_Code ? errors?.emp_Code : ""}
                                                    />
                                                </Box>
                                                <Box className="form-wrapper">
                                                    <FormTextField
                                                        toplabel="Name of Employee*"
                                                        type="text"
                                                        placeholder="Name of Employee"
                                                        name="emp_name"
                                                        disabled={true}
                                                        value={values?.emp_name}
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
                                                        toplabel="Shift Cycle*"
                                                        name="shift_cycle"
                                                        value={shiftCycle}
                                                        onChange={handleChange}
                                                        disabled={true}
                                                    >
                                                        <MenuItem className="color-appgrey" value="" disabled>
                                                            Select Shift Cycle
                                                        </MenuItem>
                                                        {shiftCyleDrop?.map((item) => {
                                                            return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                        })}
                                                    </MySelect>
                                                </Box>
                                                <Box className="form-wrapper">
                                                <MySelect
                                                        toplabel="Role*"
                                                        name="role"
                                                        value={values.role}
                                                        onChange={(e) => {
                                                            if (e?.target?.value === "Shift Incharge") {
                                                                dispatch(setSelctedEmp(selectedEmp))
                                                            } else {
                                                                dispatch(setSelctedEmp())
                                                            }
                                                            setFieldValue("role", e?.target?.value)
                                                        }}
                                                    >
                                                        <MenuItem className="color-appgrey" value="" disabled>
                                                        Select Role
                                                        </MenuItem>
                                                        {roleDrop?.map((item) => {
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

export default EmpForm;