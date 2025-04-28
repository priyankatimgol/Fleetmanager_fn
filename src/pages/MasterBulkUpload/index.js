import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CommonGrid from "@uikit/AgGrid/Grid/CommonGrid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { secondaryButton } from "shared/constants/CustomColor";
import "./style.css";
import {
  addFormData,
  downloadLogFile,
  getDownloadTemplate,
  getDropdownData,
  getHistoryCompletedData,
  getHistoryData,
  getHistoryErrorData,
  getRecData,
} from "redux/actions/MasterUpload";
import {
  regExpressionRemark,
  textFieldValidationOnPaste,
} from "@uikit/common/RegExpValidation/regForTextField";
import { fetchError, showMessage, showWarning } from "redux/actions";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
import {
  _validationMaxFileSizeUpload,
  downloadFile,
  fileValidation,
} from "@uikit/utility/FileUploadUtilty";
import FileNameDiaglogList from "@uikit/utility/Diaglogbox";
import axios from "axios";
import { getApiCall } from "apiServices/apiUtils";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const tabBtnSX = {
  "&. button.MuiTab-root": {
    color: "#00a28cc7",
  },
  "&. Mui-selected": {
    color: "#0c8373 !important",
  },
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const MAX_COUNT = 8;
const MasterBulkUpload = () => {
  const [remarks, setRemarks] = React.useState("");
  const [docType, setDocType] = React.useState(null);
  // const { user } = useAuthUser();
  const [docUploadHistory, setDocUploadHistory] = React.useState([]);
  const [filteredDocUploadHistory, setFilteredDocUploadHistory] =
    React.useState([]);

  // const { userActionList } = useSelector(
  //   ({ userAction }) => userAction
  // );
  const [value, setValue] = React.useState(0);
  const [uploadNo, setUploadNo] = React.useState(null);
  const fileInput = React.useRef(null);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileLimit, setFileLimit] = React.useState(false);
  const [userAction, setUserAction] = React.useState(null);
  const [fileLength, setFileLength] = React.useState(0);
  const [documentTypeList, setDocumentTypeList] = React.useState([]);
  const { id } = useParams();
  const [phaseId, setPhaseId] = React.useState(id?.toString());

  // const action = userAction?.action || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { state } = useLocation();

  const state = useSelector((state) => state);
  let dropdownList = state?.masterUpload?.dropdownData;
  let historyData = state?.masterUpload?.historyData;
  let loading = state?.masterupload?.isLoading;

  useEffect(() => {
    dispatch(getDropdownData())
    dispatch(getHistoryData("Inprogress"))
  }, [])

  useEffect(() => {
    if (dropdownList?.length === 1) {
      setDocType(dropdownList[0]);
    }
  }, [dropdownList]);

  const downloadFileLogFile = (data) => {
    dispatch(downloadLogFile(data, value));
  };

  let columnDefs2 = [
    {
      field: "srno",
      headerName: "Sr. No",
      headerTooltip: "Serial Number",
      cellRenderer: (e) => {
        var index = e?.rowIndex;
        return index + 1;
      },

      sortable: true,
      resizable: true,
      width: 80,
      minWidth: 50,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "documenttype",
      headerName: "Report Type",
      headerTooltip: "Report Type",
      sortable: true,
      resizable: true,
      width: 400,
      minWidth: 150,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "filename",
      headerName: "File Name",
      headerTooltip: "File Name",
      sortable: true,
      resizable: true,
      cellRenderer: (e) => {
        var data = e.data.filename;
        data = data?.split(".");
        data = data?.[0];
        return data || "";
      },
      width: 400,
      minWidth: 150,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerTooltip: "Remarks",
      sortable: true,
      resizable: true,
      width: 400,
      minWidth: 120,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      headerTooltip: "Created Date",
      sortable: true,
      resizable: true,
      cellRenderer: (e) => {
        return moment(e?.data?.createdDate).format("DD/MM/YYYY");
      },
      width: 150,
      minWidth: 100,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "createdDate",
      headerName: "Created Time",
      headerTooltip: "Created Time",
      cellRenderer: (e) => {
        return moment(e?.data?.createdDate).format("h:mm:ss A");
      },
      sortable: true,
      resizable: true,
      width: 150,
      minWidth: 100,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      headerTooltip: "Created By",
      sortable: true,
      resizable: true,
      width: 190,
      minWidth: 100,
      cellStyle: { fontSize: "13px" },
    },
    {
      field: "Download",
      headerName: "Uploaded File",
      headerTooltip: "Uploaded File",
      resizable: true,
      width: 110,
      minWidth: 100,
      cellStyle: { fontSize: "13px", textAlign: "center" },

      cellRenderer: (obj) => (
        <>
          <div className="actions">
            <Tooltip title="Download" className="actionsIcons">
              <DownloadIcon
                style={{ fontSize: "15px" }}
                onClick={() => downloadFile(obj?.data, { id: 0 }, dispatch)}
                className="actionsIcons"
              />
            </Tooltip>
          </div>
        </>
      ),
    },
    {
      field: "Download Log",
      headerName: value === 1 ? "Uploaded Log" : " Error Log",
      headerTooltip: value === 1 ? "Uploaded Log" : " Error Log",
      resizable: true,
      hide: value === 0,
      width: 110,
      minWidth: 90,
      cellStyle: { fontSize: "13px", textAlign: "center" },

      cellRenderer: (obj) => (
        <>
          <div className="actions">
            {" "}
            <Tooltip
              title={value === 1 ? "Uploaded Log File" : " Error Log File"}
              className="actionsIcons"
            >
              <DownloadIcon
                style={{ fontSize: "15px" }}
                onClick={() => downloadFileLogFile(obj?.data)}
                className="actionsIcons"
              />
            </Tooltip>
          </div>
        </>
      ),
    },
    {
      field: "uid",
      headerName: "Count",
      headerTooltip: "Count",
      resizable: true,
      width: 110,
      minWidth: 90,
      cellRenderer: (obj) => (
        <>
          <div className="actions">
            <p>
               {value === 1 &&
               `${obj?.data?.versionNumber?.split("/")[0]}/${obj?.data?.versionNumber?.split("/")[2]}`}
            </p>
            <p>
            {value === 2 &&
               `${obj?.data?.versionNumber?.split("/")[1]}/${obj?.data?.versionNumber?.split("/")[2]}`}
            </p>
          </div>
        </>
      ),
      hide: value === 0,
      cellStyle: { fontSize: "13px" },
    },
  ];

  const downloadTemplate = (docType) => {
    if (docType && docType.documentName !== "") {
      dispatch(getDownloadTemplate(docType));
    } else {
      dispatch(fetchError("Document Type requried !  "));
    }
  };

  const getUploadNumber = (e, files) => {
    let status =
      value === 0
        ? "Inprogress"
        : value === 1
        ? "Completed"
        : value === 2
        ? "Error"
        : "Inprogress";

    dispatch(getRecData(e, files, status));
    let data = {
      docType: docType,
      remarks,
    };
    dispatch(addFormData(data));
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    if (
      _validationMaxFileSizeUpload(e, dispatch) &&
      fileValidation(e, chosenFiles, dispatch)
    ) {
      getUploadNumber(e, chosenFiles);
    }
  };

  console.log("data", dropdownList, historyData, docType);

  const handleTab = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(getHistoryData("Inprogress"));
    } else if (newValue === 1) {
      dispatch(getHistoryData("Completed"));
    } else if (newValue === 2) {
      dispatch(getHistoryData("Error"));
    }
  };

  return (
    <>
      {" "}
      {/* <Box component="h2" className="page-title-heading my-6">
        Planning
      </Box> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Planning</Typography>
        <Link to="/kpis">
          <HomeIcon style={{ color: '#019E89' }} />
        </Link>
      </Box>
      <div
        style={{
          height: "calc(100vh - 110px)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          background:'white'
        }}
        className="card-panal"
      >
        <div style={{ margin: "10px" }}>
          <Grid
            container
            item
            display="flex"
            flexDirection="row"
            spacing={4}
            justifyContent="start"
            alignSelf="center"
          >
            <Grid item xs={6} md={3}>
              <Autocomplete
                sx={{
                  borderRadius: "6px",
                }}
                id="combo-box-demo"
                getOptionLabel={(option) =>
                  option?.documentName?.toString() || ""
                }
                disableClearable={true}
                options={dropdownList || []}
                onChange={(e, value) => {
                  setDocType(value);
                }}
                defaultValue={docType}
                placeholder="Document Type"
                value={docType}
                renderInput={(params) => (
                  <TextField
                    name="state"
                    id="state"
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
            </Grid>

            <Grid item xs={7} md={5} sx={{ position: "relative" }}>
              <div>
                <TextField
                  name="remarks"
                  id="remarks"
                  variant="outlined"
                  size="small"
                  className="w-85"
                  type="text"
                  placeholder="Remarks"
                  onChange={(e) => setRemarks(e.target.value)}
                  value={remarks}
                  onPaste={(e) => {
                    if (!textFieldValidationOnPaste(e)) {
                      dispatch(
                        fetchError("You can not paste Spacial characters")
                      );
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.target.selectionStart === 0 && e.code === "Space") {
                      e.preventDefault();
                    }
                    regExpressionRemark(e);
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={6} md={4}>
              <div style={{ display: "flex" }}>
                {docType?.templatePath && (
                  <Button
                    onClick={() => downloadTemplate(docType)}
                    variant="outlined"
                    size="medium"
                    type="button"
                    color="success"
                  >
                    Download Template
                  </Button>
                )}
                <div style={{ marginLeft: "7px" }}>
                  <Button
                    onClick={() => {
                      fileInput.current.click();
                    }}
                    
                    variant="outlined"
                    size="medium"
                    color="success"
                  >
                    Upload
                  </Button>
                  <input
                    ref={fileInput}
                    multiple
                    onChange={handleFileEvent}
                    disabled={fileLimit}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
            style={{ marginTop: "0px" }}
          >
            <Tabs
              value={value}
              onChange={handleTab}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="lab API tabs example"
            >
              <Tab value={0} label="In Progress" />
              <Tab value={1} label="Completed " />
              <Tab value={2} label="Errors" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} key="0"></TabPanel>
          <TabPanel value={value} index={1} key="1"></TabPanel>
          <TabPanel value={value} index={2} key="2"></TabPanel>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography className="section-headingTop">
                Version History
              </Typography>
            </div>

            <div style={{ height: "calc(100vh - 240px)", marginTop: "10px" }}>
              <CommonGrid
                defaultColDef={{ flex: 1 }}
                columnDefs={columnDefs2}
                rowData={historyData || []}
                onGridReady={null}
                gridRef={null}
                pagination={false}
                paginationPageSize={null}
              />
            </div>
          </>
        </div>{" "}
      </div>
    </>
  );
};

export default MasterBulkUpload;
