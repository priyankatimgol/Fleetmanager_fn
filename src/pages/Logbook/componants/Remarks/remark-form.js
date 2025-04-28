import { useEffect, useState } from "react";
import { CardContent, Card, Grid, Box, Button, Typography } from "@mui/material";
import "../style.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { FormTextField, } from "pages/common-components/FormComponents";
import { useDispatch } from "react-redux";
import { addNewRemark, updateRemark } from "redux/actions/logbook/RemarkAction";
import { Buttons } from "pages/common-components/Button";

function RemarkForm({ isAddForm, selectedDate, siteName, shiftCycle, editData, setEditData }) {
    const dispatch = useDispatch()
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);

    const intialVal = {
        remark: editData?.remarks ?? ""
    };

    const breakdownFromValidation = Yup.object().shape({
        remark: Yup.string().required("Write your remark"),
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
                                remarks: values?.remark
                            }
                            if (editData?.id) {
                                dispatch(updateRemark({ ...data, id: editData?.id }))
                                setEditData(null)
                            } else {
                                dispatch(addNewRemark(data))
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
                                                            <FormTextField
                                                                toplabel="Remark*"
                                                                type="text"
                                                                placeholder="Write your remark(Max: 250 char)"
                                                                name="remark"
                                                                multiline
                                                                rows={2}
                                                                value={values?.remark}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                inputProps={{ maxLength: 250}}
                                                                sx={{
                                                                    width: "100%",
                                                                    "& .MuiInputBase-input": {
                                                                        height: "3px",
                                                                    },
                                                                }}
                                                            />
                                                           <Typography style={{textAlign:"end", fontSize:"13px"}}>{values?.remark?.length}/250</Typography>
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

export default RemarkForm;
