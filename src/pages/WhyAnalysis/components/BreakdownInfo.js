import { Box, Divider, Grid, TextField } from "@mui/material";
import { Formik, FieldArray, useFormikContext } from "formik";
import { BreakDownInputs } from "./BreakDownInputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addUpdateAnalysisDetails,
  getBreakdownData,
  getBreakdownDataByWeek,
  getTypeDropdwonData,
  getWhyDropdowns,
  setUpdatedId,
} from "redux/actions/WhyAnalysis";
import format from "date-fns/format";
import * as Yup from "yup";
import { Buttons } from "pages/common-components/Button";
import { ConfirmDialog } from "pages/common-components/ConfirmDialog";
import {
  FormTextField,
} from "pages/common-components/FormComponents";
import Spinner from "pages/common-components/Spinner";
import "../styles.css";
import { fetchError, showWarning } from "redux/actions";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { whyDropdown } from "../utils";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const initialParams = [
  {
    fkTypeId: null,
    hrs: "",
    ai: "",
    why1: "",
    why2: "",
    why3: "",
    why4: '',
    why5: '',
    why6: '',
    whyDrop1: null,
    whyDrop2: null,
    whyDrop3: null,
    whyDrop4: null,
    whyDrop5: null,
    whyDrop6: null,
  },
];

const validationSchema = Yup.object().shape({
  whyAnalysisDetailList: Yup.array().of(
    Yup.object().shape({
      fkTypeId: Yup.object().required("Required "),
      // hrs: Yup.number().required("Required"),
      // ai: Yup.string().required("Required"),
      // whyDrop1: Yup.object().required("Required").nullable(),
    })
  ),
});

export const BreakdownInfo = ({ selRow, date, closeDetails, gridRef, week, remainingHrs, weekYear }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const UpdatedId = state.whyAnalysis.updatedId
  const [showMore, setShowMore] = useState(false);
const [isDisabled, setIsDisabled] = useState(false)
  const TypeDropdown =
    state?.whyAnalysis?.dropdowns?.Why_Analysis_Type?.commonMasterLists;

  // const MainBucketData =
  //   state?.whyAnalysis?.dropdowns?.MainBucket?.commonMasterLists;

  // const SubBucketData =
  //   state?.whyAnalysis?.dropdowns?.SubBucket?.commonMasterLists;

  const AnalysisParams =
    state?.whyAnalysis?.analysisParams;
  const isLoading =
    state?.whyAnalysis?.loading;

  // const [subBucket, setSubBucket] = useState();
  // const [mainBucket, setMainBucket] = useState();
  const [paramsList, setParamsList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (!TypeDropdown) dispatch(getTypeDropdwonData("Why_Analysis_Type"));
    // dispatch(getTypeDropdwonData("MainBucket"));
    // dispatch(getTypeDropdwonData("SubBucket"));
  }, []);

  useEffect(() => {
    if (AnalysisParams?.length > 0) {
      const data = AnalysisParams.map((d) => {
        return {
          fkTypeId: d.fkTypeId,
          hrs: d.hrs,
          ai: d.ai,
          why1: d.why1,
          why2: d.why2,
          why3: d.why3,
          why4: d.why4,
          why5: d.why5,
          why6: d.why6,
          whyDrop1: d.whyDrop1,
          whyDrop2: d.whyDrop2,
          whyDrop3: d.whyDrop3,
          whyDrop4: d.whyDrop4,
          whyDrop5: d.whyDrop5,
          whyDrop6: d.whyDrop6,
          isApproval: d.isApproval,
        };
      });
      setParamsList(data);
    } else {
      setParamsList([]);
    }
  }, [AnalysisParams]);

  useEffect(() => {
    whyDropdown.forEach((parameter) => {
      dispatch(getWhyDropdowns(parameter))
    })
  }, [])

  const refreshComponent = (id) => {
    if (date) {
      setTimeout(() => {
        dispatch(getBreakdownData(format(date, "yyyy-MM-dd"), id));
        gridRef.current?.api?.refreshCells(true);
      }, 500);
      setModalOpen(false);
    } else {
      setTimeout(() => {
        dispatch(getBreakdownDataByWeek(week, id, weekYear));
      }, 500);
      setModalOpen(false);
    }

  }

  const validateForm = (formik) => {
    formik.validateForm();
    const data = formik.values.whyAnalysisDetailList;

    const errorArray = [];
    let totalHours = 0;

    data.forEach((d, index) => {
      // formik.setFieldTouched(`whyAnalysisDetailList.${index}.ai`, true);
      // formik.setFieldTouched(`whyAnalysisDetailList.${index}.hrs`, true);
      // formik.setFieldTouched(`whyAnalysisDetailList.${index}.whyDrop1`, true);
      totalHours += parseFloat(formik.values.whyAnalysisDetailList[index].hrs);
    });

    if (totalHours > parseFloat(selRow.grandTotal)) {
      dispatch(fetchError("Breakdown hours should not exceed Total Hrs."))
      return;
    }
    // if (data[0].ai && data[0].hrs && data[0].whyDrop1) {
    //   setModalOpen(true);
    // } else {
    //   dispatch(fetchError("Please fill all mandatory fields!"));
    // }

    // var flage = true;
    //  var message = "Please fill all mandatory fields!";
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].ai && data[i].hrs && data[i].whyDrop1) {
    //     if (data[i].ai && data[i].hrs && data[i].whyDrop1 && data[i].whyDrop1.name == 'Others') {
    //       if (data[i].why1) {
    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 1";
    //       }
    //     }

    //     if (data[i].ai && data[i].hrs && data[i].whyDrop2 && data[i].whyDrop2.name == 'Others') {
    //       if (data[i].why2) {

    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 2"
    //       }
    //     }

    //     if (data[i].ai && data[i].hrs && data[i].whyDrop3 && data[i].whyDrop3.name == 'Others') {
    //       if (data[i].why3) {

    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 3"
    //       }
    //     }

    //     if (data[i].ai && data[i].hrs && data[i].whyDrop4 && data[i].whyDrop4.name == 'Others') {
    //       if (data[i].why4) {

    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 4"
    //       }
    //     }

    //     if (data[i].ai && data[i].hrs && data[i].whyDrop5 && data[i].whyDrop5.name == 'Others') {
    //       if (data[i].why5) {

    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 5"
    //       }
    //     }

    //     if (data[i].ai && data[i].hrs && data[i].whyDrop6 && data[i].whyDrop6.name == 'Others') {
    //       if (data[i].why6) {

    //       } else {
    //         flage = false;
    //         message = "Please enter remark why 6"
    //       }
    //     }

    //   }
    //   else {
    //     flage = false;
    //   }
    // }
    // if (flage) {
    //   setModalOpen(true);
    // } else {
    //   dispatch(fetchError(message));
    // }
    setModalOpen(true);
  };

  const handleShowMore = () => {
    setShowMore(true);
  }

  const handleShowLess = () => {
    setShowMore(false);
  }
  
  return (
    <Box sx={{ position: "relative", height: "calc(100vh - 320px)" }}>
      {isLoading === false && (
        <Formik
          initialValues={{
            remarks1: selRow?.remarks1 ?? "",
            remarks2: selRow?.remarks2 ?? "",
            standardRemarks: selRow?.standardRemarks ?? "",
            overallActionItem: selRow?.overallActionItem ?? "",
            mainBucket: selRow?.mainBucket ?? "",
            subBucket: selRow?.subBucket ?? "",
            whyAnalysisDetailList: paramsList.length
              ? paramsList
              : initialParams,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const analysisDetails = values.whyAnalysisDetailList.map((d) => {
              return {
                ...d,
                hrs: d.hrs.toString(),
                fkTypeId: d.fkTypeId?.id,
                why1: d.why1 === undefined ? "" : d.why1,
                why2: d.why2 === undefined ? "" : d.why2,
                why3: d.why3 === undefined ? "" : d.why3,
                why4: d.why4 === undefined ? "" : d.why4,
                why5: d.why5 === undefined ? "" : d.why5,
                why6: d.why6 === undefined ? "" : d.why6,
                isApproval:d.isApproval,
              };
            });

            const payload = {
              tWhyAnalysisList: {
                ...selRow,
                remarks1: values.remarks1,
                remarks2: values.remarks2,
                standardRemarks: values.standardRemarks,
                overallActionItem: values.overallActionItem,
                mainBucket: values.mainBucket,
                subBucket: values.subBucket,
              },
              whyAnalysisDetailList: analysisDetails,
            };
            dispatch(setUpdatedId(selRow.sapCode));
            dispatch(addUpdateAnalysisDetails(payload, closeDetails, () => refreshComponent(selRow.sapCode)));
          }}
        >
          {(formik) => (
            <>
              <ConfirmDialog
                message="Proceed to submit Why Analysis Details ?"
                dialogStat={modalOpen}
                setDialogStat={setModalOpen}
                buttonLabel="Submit"
                onConfirmDialog={formik.handleSubmit}
                buttonClassName="button-color"
              />
              <div className="page-container">
                <form className="formWrapper">
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Remark Section</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <FormTextField
                            id="remarks1-multiline-flexible"
                            toplabel="Remarks 1"
                            multiline
                            name="remarks1"
                            onChange={formik.handleChange}
                            value={formik.values.remarks1}
                            size="small"
                            rows={2}
                            className="textAreaStyle"
                            placeholder="Enter remark here..."
                          />
                        </Grid>
                        <Grid item md={6}>
                          <span className="label-text">Remarks 2</span>
                          {showMore == false && <span className="label-show-more" onClick={() => { handleShowMore(); }}>Show More Column</span>}
                          {showMore == true && <span className="label-show-more" onClick={() => { handleShowLess(); }}>Show Less Column</span>}
                          <FormTextField
                            id="remarks2-multiline-flexible"
                            // toplabel="Remarks 2"
                            multiline
                            value={formik.values.remarks2}
                            name="remarks2"
                            onChange={formik.handleChange}
                            size="small"
                            rows={2}
                            className="textAreaStyle"
                            placeholder="Enter remark here..."
                          />

                        </Grid>
                        {showMore == true &&
                          <Grid item md={6}>
                            <FormTextField
                              id="standard-remark"
                              toplabel="Standard Remarks"
                              multiline
                              value={formik.values.standardRemarks}
                              name="standardRemarks"
                              onChange={formik.handleChange}
                              size="small"
                              rows={2}
                              className="textAreaStyle"
                              placeholder="Enter remark here..."
                            />
                          </Grid>
                        }
                        {showMore == true &&
                          <Grid item md={6}>
                            <FormTextField
                              id="overall-action-item"
                              toplabel="Overall Action Item"
                              multiline
                              value={formik.values.overallActionItem}
                              name="overallActionItem"
                              onChange={formik.handleChange}
                              size="small"
                              rows={2}
                              className="textAreaStyle"
                              placeholder="Enter remark here..."
                            />
                          </Grid>
                        }
                        {showMore == true &&
                          <Grid item md={6}>
                            <FormTextField
                              id="mainBucket"
                              toplabel="Bucketing by HO - Main Bucket"
                              // multiline
                              value={formik.values.mainBucket}
                              name="mainBucket"
                              onChange={formik.handleChange}
                              size="small"
                              rows={2}
                              className="textAreaStyle"
                              placeholder="Enter Main Bucket..."
                            />
                            {/* <MySelectAutoComplete
                      id="combo-box-demo"
                      options={MainBucketData}
                      getOptionLabel={(option) => option.masterName}
                      name="mainBucket"
                      toplabel="Bucketing by HO - Main Bucket"
                      onChange={(e, value) => {
                        setMainBucket(value);
                        formik.setFieldValue("mainBucket", value);
                      }}
                      className="fontSize-13"
                      value={mainBucket}
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      size="small"
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                          </Grid>
                        }
                        {showMore == true &&
                          <Grid item md={6}>
                            <FormTextField
                              id="subBucket"
                              toplabel="Bucketing by HO - Sub Bucket"
                              // multiline
                              value={formik.values.subBucket}
                              name="subBucket"
                              onChange={formik.handleChange}
                              size="small"
                              rows={2}
                              className="textAreaStyle"
                              placeholder="Enter Sub Bucket..."
                            />
                            {/* <MySelectAutoComplete
                      id="combo-box-demo"
                      options={SubBucketData}
                      getOptionLabel={(option) => option.masterName}
                      toplabel="Bucketing by HO - Sub Bucket"
                      value={subBucket}
                      name="subBucket"
                      onChange={(e, value) => {
                        setSubBucket(value);
                        formik.setFieldValue("subBucket", value);
                      }}
                      className="fontSize-13"
                      ListboxProps={{ style: { maxHeight: 150 } }}
                      size="small"
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                          </Grid>
                        }
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <FieldArray
                    name="whyAnalysisDetailList"
                    render={(arrayHelpers) => {
                      return (
                        <Box
                          sx={{
                            pr:
                              formik.values.whyAnalysisDetailList.length > 2
                                ? "7px"
                                : "0",
                          }}
                          className="whyAnalysisParamsWrapper"
                        >
                          <>
                            {formik.values.whyAnalysisDetailList.map(
                              (input, index) => (
                                <BreakDownInputs
                                setIsDisabled={setIsDisabled}
                                isDisabled={isDisabled}
                                  key={index}
                                  arrayHelpers={arrayHelpers}
                                  formik={formik}
                                  addButton={
                                    index ===
                                      formik.values.whyAnalysisDetailList.length - 1
                                      ? true
                                      : false
                                  }
                                  index={index}
                                  typeDropdown={
                                    TypeDropdown?.length > 0 ? TypeDropdown : []
                                  }
                                  remainingHrs={remainingHrs}
                                />
                              )
                            )}
                          </>
                        </Box>
                      );
                    }}
                  />

                </form>
                <div className="button-fix">
                  <Buttons
                    type="button"
                    onClick={() => validateForm(formik)}
                    variant="contained"
                    size="small"
                    className="button button-color"
                    name="Submit"
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </>
          )}
        </Formik>
      )}
      {isLoading && <Spinner />}
    </Box>
  );
};
