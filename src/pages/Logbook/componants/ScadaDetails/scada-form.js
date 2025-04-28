import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, MenuItem, Button } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { FormTextField, MySelect } from "pages/common-components/FormComponents";
import { useDispatch, useSelector } from "react-redux";
import { addNewScada, updateScada } from "redux/actions/logbook/ScadaAction";
import { getIssueDescDrop } from "redux/actions/logbook/DropdownAction";
import { Buttons } from "pages/common-components/Button";

function ScadaForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData}) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const state = useSelector((state)=>state)
    const issueDescDrop = state?.dropdownMaster?.issueDescListing;

    const intialVal = {
        issue_desc: editData?.issueDesc || "",
        action_taken: editData?.actionTaken || ""
    };

    const breakdownFromValidation = Yup.object().shape({
        issue_desc: Yup.string().required("Select issue description"),
        action_taken: Yup.string().required("Write your action"),
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
                                fkSiteId:1,
                                logDate:selectedDate,
                                siteName:siteName,
                                shiftCycle:shiftCycle,
                                issueDesc:values?.issue_desc,
                                actionTaken:values?.action_taken,
                            }
                            if(editData?.id){
                                dispatch(updateScada({...data, id:editData?.id}))
                                setEditData(null)
                            } else{
                                dispatch(addNewScada(data))
                            }
                            actions.resetForm(intialVal)
                            setIsFormSubmitted(false)
                        }}
                    >
                        {({ values, handleChange, handleSubmit, initialValues, resetForm, setFieldValue }) => (
                            <form onSubmit={handleSubmit} >
                                <Grid container>
                                    <Grid item md={12} xs={12}>
                                        <Card >
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={12} xs={12}>
                                                        <Box className="form-wrapper">
                                                            <MySelect
                                                                toplabel="Issue Description*"
                                                                name="issue_desc"
                                                                value={values.issue_desc}
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem className="color-appgrey" value="" disabled>
                                                                    Select Issue Description
                                                                </MenuItem>
                                                                {issueDescDrop?.map((item) => {
                                                                    return <MenuItem value={item?.masterName}>{item?.masterName}</MenuItem>;
                                                                })}
                                                            </MySelect>
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

export default ScadaForm;
