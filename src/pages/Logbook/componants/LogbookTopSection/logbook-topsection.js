import React, { useState } from "react";
import { Formik } from "formik";
import { shiftCycleList, siteNameList } from "../utils";
import { MySelect } from "pages/common-components/FormComponents";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function LogbookTopSection() {
    const [logData, setLogData] = useState(null)

    const intialVal = {
        site_name: "",
        shiftCycle: "",
        logDate: null
    };

    return (
        <Formik
            initialValues={intialVal}
        >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    {setLogData(values)}
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item md={3} xs={12}>
                            <Box>
                                <MySelect
                                    toplabel="Site Name"
                                    name="site_name"
                                    value={values.site_name}
                                    onChange={handleChange}
                                >
                                    <MenuItem className="color-appgrey" value="" disabled>
                                        Select Site Name
                                    </MenuItem>
                                    {siteNameList?.map((item) => {
                                        return <MenuItem value={item}>{item}</MenuItem>;
                                    })}
                                </MySelect>
                            </Box>
                        </Grid>
                        <Grid item md={3} xs={12} ml={4}>
                            <Box>
                                <MySelect
                                    toplabel="Shift Cycle"
                                    name="shiftCycle"
                                    value={values.shiftCycle}
                                    onChange={handleChange}
                                >
                                    <MenuItem className="color-appgrey" value="" disabled>
                                        Select Shift Cycle
                                    </MenuItem>
                                    {shiftCycleList?.map((item) => {
                                        return <MenuItem value={item}>{item}</MenuItem>;
                                    })}
                                </MySelect>
                            </Box>
                        </Grid>
                        <Grid item md={3} xs={12} ml={4}>
                            <Box>
                                <Typography variant="body2" className="bold-600">Logdate</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props}
                                            size="small"
                                        />}
                                        value={values.logDate}
                                        onChange={(value) => {
                                            setFieldValue('logDate', value.toLocaleString())
                                        }}
                                        label=""
                                        name=""
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Grid>

                    </Grid>
                </form>
            )}
        </Formik>

    );
}

export default LogbookTopSection;
