import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
//import '@ag-grid-enterprise/all-modules';
import { Link } from "react-router-dom";
import ExcelImage from "../.../../../assets/images/xls.png";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import AgGridTable from "pages/common-components/AgGridTable";
import Spinner from "pages/common-components/Spinner";
import moment from "moment";
import { noCommaReportDefs } from "pages/WhyAnalysis/utils";
import { LicenseManager } from "ag-grid-enterprise";
import { IconButtons } from "pages/common-components/Button";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { getNoCommData } from "redux/actions/SiteHomeActions";
import { Formik } from "formik";
import { FormTextField } from "pages/common-components/FormComponents";
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import { noCommSave } from "redux/actions/DataSanityConfigAction";

LicenseManager.setLicenseKey(
  "[TRIAL]this{AG_Charts_and_AG_Grid}Enterprise_key{AG-052646}is_granted_for_evaluation_only_Use_in_production_is_not_permitted_Please_report_misuse_to_legal@ag-grid.com_For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com_You_are_granted_a{Single_Application}Developer_License_for_one_application_only_All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed_This_key_will_deactivate_on{29 February 2024}_[v3][0102]_MTcwOTE2NDgwMDAwMA==b1896dfdfbb4dc28dfd4e4366ce39bbd"
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 800,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NoCommReport = () => {
  const state = useSelector((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const noCommData = state.siteHomeKpi?.noCommData ?? [];
  console.log("noCommData", noCommData);

  const gridRef = useRef();
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState();
  const [type, setType] = useState(false);

  const [statusTypeList, setStatusTypeList] = useState([
    { name: "All" },
    { name: "Submitted" },
    { name: "Not Submitted" },
  ]);
  const [statusType, setStatusType] = useState({ name: "All" });
  const [selRow, setSelRow] = useState(null);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState("");
  const [dataCount, setDataCount] = useState({
    All: "",
    Submitted: "",
    "Not Submitted": "",
  });

  useEffect(() => {
    dispatch(getNoCommData());
  }, []);

  const contains = (target, lookingFor) => {
    return target && target.indexOf(lookingFor) >= 0;
  };
  const textFilterParams = {
    textMatcher: ({ value, filterText }) => {
      var literalMatch = contains(value, filterText || "");
      return !!literalMatch;
    },
    trimInput: true,
    debounceMs: 1000,
  };
  useEffect(() => {
    setColumnDefs([
      {
        cellRenderer: (api) => {
          const rowData = api.data;
          return moment(rowData?.analysisDate).format("DD-MM-YYYY");
        },
        cellStyle: { fontSize: "12px", fontWeight: 500 },
        resizable: true,
        minWidth: 150,
        maxWidth: 160,
        hide: type === false ? true : false,
        headerName: "DATE",
        filter: "agMultiColumnFilter",
        filterParams: {
          filters: [
            {
              filter: "agTextColumnFilter",
              // filterParams: {
              //   defaultOption: 'startsWith',
              // },
            },
            {
              filter: "agSetColumnFilter",
            },
          ],
        },
      },
      {
        field: "Action",
        cellRenderer: ({ data }) => (
          <IconButtons
            onClick={() => {
              setModalData(data);
              setModalOpen(true);
            }}
            icon={
              <ModeEditOutlineRoundedIcon
                style={{ color: "#019e89" }}
                fontSize="small"
              />
            }
          />
        ),
        minWidth: 92,
        maxWidth: 92,
      },
      ...noCommaReportDefs.columnDefs,
    ]);
  }, [type]);

  const closeDetails = () => {
    setSelRow(null);
    gridRef.current.api.deselectAll();
  };

  const componentStyle = {
    width: "100%",
    height: "calc(100vh - 230px)",
    fontSize: "13px",
  };

  const defaultColDef = {
    floatingFilter: true,
  };

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return Spinner;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  let init = {
    state: modalData?.STATE,
    area : modalData?.Area ,
    site : modalData?.SITE,
    location : modalData?.LocationNumber ,
    name : modalData?.PlantName ,
    sms : modalData?.SMSName ,
    sap : modalData?.SAPCODE ,
    modal : modalData?.WTG_MODEL_NAME ,
    tower : modalData?.TOWERTYPE ,
    startDate : modalData?.NO_Comm_Start_Date ,
    startTime : modalData?.NO_Comm_Start_Date1 ,
    duration : modalData?.Duration ,
    reason : modalData?.Reason_for_outage ,
    details : modalData?.Remark ,
    category : modalData?.Category ,
    status : modalData?.Status ,
  };
  console.log("modalData", modalData, init);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">NoComm Report</Typography>
        <Link to="/kpis">
          <HomeIcon style={{ color: "#019E89" }} />
        </Link>
      </Box>

      <Box className="body-wrapper">
        <Grid container columnSpacing={3}>
          <Grid
            display="flex"
            justifyContent="space-between"
            item
            md={selRow === null ? 12 : 5}
            mb={2}
          >
            {/* <Grid item md={selRow == null ? 9 : 8}>
              <Box sx={{ display: "flex" }}>
                <div
                  style={{
                    width: "140px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  <DatePicker
                    label=""
                    value={date}
                    maxDate={new Date()}
                    inputFormat="dd/MM/yyyy"
                    onChange={(value) => {
                      setDate(value);
                      setWeek("");
                      closeDetails();
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                      />
                    )}
                  />
                </div>
              </Box>
            </Grid> */}
            <Grid item md={selRow == null ? 2.5 : 3.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "150px" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => {
                      return option?.name?.toString() || "";
                    }}
                    disableClearable
                    options={statusTypeList || []}
                    placeholder="Status"
                    onChange={(e, value) => {
                      setStatusType(value);
                    }}
                    value={statusType}
                    renderInput={(params) => (
                      <TextField
                        name="statustype"
                        id="statustype"
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          style: { height: `35 !important` },
                        }}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                </Box>
                <Box
                  marginRight={selRow == null ? 4 : 0}
                  marginTop={selRow == null ? 2 : 0}
                >
                  <Typography>
                    {statusType.name === "All"
                      ? dataCount.All
                      : `${dataCount[statusType.name]} / ${dataCount.All}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={0.5}>
              <Box sx={{ justifyContent: "flex-end" }}>
                <Tooltip title="Excel">
                  <IconButton
                    sx={{
                      padding: "0px",
                      bottom: 5,
                    }}
                    // onClick={downloadExcelHandler}
                    onClick={() => {}}
                    className="header-add"
                  >
                    <img
                      src={ExcelImage}
                      style={{ height: "40px", width: "40px" }}
                      alt="Icon"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          <Grid item md={selRow !== null ? 5 : 12}>
            <AgGridTable
              gridRef={gridRef}
              rowData={noCommData}
              columnDefs={columnDefs}
              Style={componentStyle}
              rowHeight={32}
              headerHeight={42}
              //   onCellClicked={(props) => onCellClicked(props)}
              loadingOverlayComponent={loadingOverlayComponent}
              loadingOverlayComponentParams={loadingOverlayComponentParams}
              overlayNoRowsTemplate={
                '<span className="ag-overlay-loading-center">No data found for selected date.</span>'
              }
              rowSelection={"single"}
              getRowHeight={getRowHeight}
              defaultColDef={defaultColDef}
              //   getRowStyle={getRowStyle}
            />
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Edit NoComm</Typography>
          <br />
          {modalData?.STATE && (
            <Formik
              initialValues={init}
              // validationSchema={}
              onSubmit={(values) => {
                let body = {
                  state: modalData?.STATE,
    area : modalData?.Area ,
    site : modalData?.SITE,
    locationNumber : modalData?.LocationNumber ,
    scadaplantName : modalData?.PlantName ,
    smsname : modalData?.SMSName ,
    sapcode : modalData?.SAPCODE ,
    modelName : modalData?.WTG_MODEL_NAME ,
    towerType : modalData?.TOWERTYPE ,
    startDate : modalData?.NO_Comm_Start_Date ,
    startTime : modalData?.NO_Comm_Start_Date1 ,
    isTaskgenerated : modalData?.IsTaskgenerated ,
    taskId : modalData?.TaskId ,
    duration : modalData?.Duration ,
    reasonForOutage : values?.reason,
    remark : values?.details ,
    category : modalData?.Category ,
    status :values?.status ,
    uniqueId : modalData?.UniqueID ,
  }

  // "uniqueId": "43FB0272-D13E-465A-B3A0-BAC37C2CDF35",
  // "state": "MP - Bhopal",
  // "smsname": "GPCL Solar Park",
  // "scadaplantName": "GJ-EKT-CHRK_01",
  // "site": "Amaliyara2",
  // "section": "Amaliara2",
  // "locationNumber": "CHN2",
  // "sapcode": "SWSSRB-SC4-GSP01-CHN02",
  // "modelName": "S 88",
  // "towerType": "Tubular",
  // "duration": 0.0,
  // "reasonForOutage": "update for test",
  // "category": "NoComm Catagory",
  // "remark": "",
  // "status": "TO DO",
  // "isTaskgenerated": 0,
  // "taskId": 0
  console.log("body",body);
  dispatch(noCommSave(body))
  setModalOpen(false)
              }}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <FormLabel>State</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.state}
                          defaultValue={values?.state}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Area</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.area}
                          defaultValue={values?.area}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Site</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.site}
                          defaultValue={values?.site}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Location Number</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.location}
                          defaultValue={values?.location}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>SCADA Plant Name</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.name}
                          defaultValue={values?.name}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>SMS Name</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.sms}
                          defaultValue={values?.sms}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>SAP Code</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.sap}
                          defaultValue={values?.sap}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Modal Name</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.modal}
                          defaultValue={values?.modal}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Tower Type</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.tower}
                          defaultValue={values?.tower}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Start Date</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.startDate}
                          defaultValue={values?.startDate}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Start Time</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.startTime}
                          defaultValue={values?.startTime}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Duration</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.duration}
                          defaultValue={values?.duration}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Reason for outage</FormLabel>
                        <MySelectAutoComplete
                                    size="small"
                                    // toplabel="Site Name"
                                    name = "reason"
                                    placeholder="Enter SiteName"
                                    values={values?.reason}
                                    // disablePortal={false}
                                    listing={ ["Not intrested", "NA", "No reason"]}
                                    getOptionLabel={(option) => option}
                                    disabled={false}
                                    onChange={(value) => setFieldValue("reason", value?.target?.textContent)}
                                    className='fontSize-13'
                                    ListboxProps={{ style: { maxHeight: 170 } }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                       
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Reason Details</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="details"
                          type="text"
                          onChange={handleChange}
                          value={values?.details}
                          defaultValue={values?.details}
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Category</FormLabel>
                        <FormTextField
                          // toplabel="State"
                          name="r_name"
                          type="text"
                          onChange={handleChange}
                          value={values?.category}
                          defaultValue={values?.category}
                          disabled
                          variant="outlined"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              height: "3px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormLabel>Status</FormLabel>
                        <MySelectAutoComplete
                                    size="small"
                                    // toplabel="Site Name"
                                    name = "status"
                                    placeholder="Enter Status"
                                    values={values?.status}
                                    // disablePortal={false}
                                    listing={ ["To Do", "Open", "Close"]}
                                    getOptionLabel={(option) => option}
                                    disabled={false}
                                    onChange={(value) => setFieldValue("status", value?.target?.textContent)}
                                    className='fontSize-13'
                                    ListboxProps={{ style: { maxHeight: 170 } }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                      </Grid>
                    </Grid>
                  </Box>
<div style={{marginTop : "20px", textAlign : "center"}}>

                  <Button variant="contained" type="submit" className="">Submit</Button>
</div>
                </form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default NoCommReport;
