import TimelineItem from "./TimelineItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimelineCss.css";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { primaryButtonSm } from "shared/constants/CustomColor";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import CommonGrid from "@uikit/AgGrid/Grid/CommonGrid";
import { fetchError, showMessage } from "redux/actions";

import {
  Box,
  Button,
  Autocomplete,
  Stack,
  TextField,
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { Field } from "formik";
import moment from "moment";
import { MdOutgoingMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BiLinkAlt } from "react-icons/bi";

const filterOptions: any = [
  {
    filterkey: "Newest",
    filterOption: "Newest",
  },
  {
    filterkey: "Oldest",
    filterOption: "Oldest",
  },
];

const Timeline = ({ mandateCode }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [showPanel, togglePanel] = useState(true);
  const [value, setValue] = useState(filterOptions?.[0]);
  const gridRef = React.useRef<AgGridReact>(null);
  const [gridColumnApi, setGridColumnApi] = React.useState(null);
  const [gridApi, setGridApi] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [sendMailId, setSendMailId] = useState("");
  const dispatch = useDispatch();

  const getData = (mandateCode) => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_BASE_EXTENTION}/api/ComplianceIntimationRequest/GetTimeLinesForCompliance?id=${mandateCode}`
      )
      .then((response) => {
        setTimelineData(response?.data?.data || []);
      })
      .catch((err) => { });
  };
  useEffect(() => {
    if (mandateCode && mandateCode !== "") {
      getData(mandateCode);
    }
  }, [mandateCode]);

  const FilterTimeline = (option) => {
    setValue(option);
    option?.filterOption === "Newest"
      ? timelineData &&
      timelineData?.sort(function (a, b) {
        return (
          new Date(b.createdon).valueOf() - new Date(a.createdon).valueOf()
        );
      })
      : timelineData.sort(function (a, b) {
        return (
          new Date(a.createdon).valueOf() - new Date(b.createdon).valueOf()
        );
      });

    setTimelineData(timelineData);
  };
  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  let columnDefs = [
    {
      field: "taskCreatedOn",
      headerName: "Task Created Date",
      headerTooltip: "Task Created Date",
      sortable: true,
      resizable: true,
      cellRenderer: (e: any) => {
        return moment(e?.data?.taskCreatedOn).format("DD/MM/YYYY HH:mm:ss");
      },
      width: 160,
      minWidth: 160,
      cellStyle: { fontSize: "12px" },
    },

    {
      field: "workItem",
      headerName: "Work Item",
      headerTooltip: "Work Item",
      sortable: true,
      resizable: true,
      width: 220,
      minWidth: 220,
      cellClass: "cell-padding-section",
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "roleName",
      headerName: "Role Name",
      headerTooltip: "Role Name",
      sortable: true,
      resizable: true,
      width: 165,
      minWidth: 165,
      cellClass: "cell-padding-section",
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "userName",
      headerName: "User Name",
      headerTooltip: "User Name",
      sortable: true,
      resizable: true,
      width: 170,
      minWidth: 170,
      cellClass: "cell-padding-section",
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "status",
      headerName: "Status",
      headerTooltip: "Status",
      sortable: true,
      resizable: true,
      width: 220,
      minWidth: 220,
      cellClass: "cell-padding-section",
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerTooltip: "Remarks",
      sortable: true,
      resizable: true,
      width: 100,
      minWidth: 100,
      cellClass: "cell-padding-section",
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "createdon",
      headerName: "Task Completed On",
      headerTooltip: "Task Completed On",
      sortable: true,
      resizable: true,
      cellRenderer: (e: any) => {
        return moment(e?.data?.createdon).format("DD/MM/YYYY HH:mm:ss");
      },
      width: 170,
      minWidth: 170,
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "",
      headerName: "TAT",
      headerTooltip: "TAT",
      sortable: true,
      resizable: true,
      cellRenderer: (e: any) => {
        return moment
          .utc(
            moment
              .duration(
                moment(e?.data?.createdon).diff(moment(e?.data?.taskCreatedOn))
              )
              .asMilliseconds()
          )
          .format("HH:mm:ss");
      },
      width: 100,
      minWidth: 100,
      cellStyle: { fontSize: "12px" },
    },
    {
      field: "",
      headerName: "Action",
      headerTooltip: "Action",
      sortable: true,
      resizable: true,
      cellRenderer: (e: any) => {
        return (
          <>
            <Tooltip title="send mail">
              <MdOutgoingMail
                size={16}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenConfirmDialog(!openConfirmDialog);
                  setSendMailId(e?.data?.id);
                }}
              />
            </Tooltip>
            <BiLinkAlt size={16} style={{ cursor: "pointer", marginLeft: "10px" }} />
          </>
        );
      },
      width: 170,
      minWidth: 80,
      cellStyle: { fontSize: "12px" },
    },
  ];

  const sendMail = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}
        ${process.env.REACT_APP_BASE_EXTENTION}/api/Workflow/SendPendingEmail?HistoryId=${sendMailId || 0}`,
        {}
      )
      .then((response) => {
        if (!response) {
          setOpenConfirmDialog(!openConfirmDialog);
          return dispatch(fetchError("Something went wrong"));
        }
        setOpenConfirmDialog(!openConfirmDialog);
        dispatch(showMessage("Email Sent Sucessfully"));
      })
      .catch((err) => { });
  };

  return (
    <>
      {!timelineData ||
        (timelineData?.length === 0 && (
          <div
            style={{
              width: "71vw",
              display: "flex",
              height: "95vh",
              alignItems: "center",
              justifyContent: "center",
            }}
            className=""
          >
            <Typography variant="h3">No Timeline history found</Typography>
          </div>
        ))}
      {timelineData && timelineData?.length > 0 && (
        <div style={{ width: "71vw" }}>
          <div
            className="card-panal inside-scroll-time-line"
            style={{ padding: "3px 20px 15px" }}
          >
            <Grid
              marginTop="5px"
              container
              item
              spacing={5}
              justifyContent="end"
              alignSelf="end"
            >
              <Button
                size="small"
                style={primaryButtonSm}
                sx={{ color: "#fff", fontSize: "12px", marginRight: "10px" }}
                onClick={() => togglePanel(!showPanel)}
              >
                {showPanel ? <span>Grid </span> : <span> Timeline </span>}
              </Button>

              <FormControl
                variant="outlined"
                sx={{ m: 1, maxWidth: 120 }}
                size="small"
              >
                <Autocomplete
                  disablePortal
                  sx={{ backgroundColor: "#ffffff", borderRadius: "6px" }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => {
                    return (option && option?.filterOption?.toString()) || "";
                  }}
                  disableClearable={true}
                  options={filterOptions || []}
                  value={value || ""}
                  defaultValue={value || ""}
                  onChange={(e, value: any) => {
                    FilterTimeline(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="phaseId"
                      id="state"
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        style: { height: `35 !important` },
                      }}
                      variant="outlined"
                      size="small"
                    //
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* {JSON.stringify(timelineData)} */}
            {showPanel ? (
              <div>
                {timelineData && timelineData?.length > 0 && (
                  <div className="timeline-container">
                    {timelineData?.map((data, idx) => (
                      <TimelineItem
                        data={data}
                        key={idx}
                        setOpenConfirmDialog={setOpenConfirmDialog}
                        openConfirmDialog={openConfirmDialog}
                        setSendMailId={setSendMailId}
                        index={idx}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "calc(100vh - 80px)", marginTop: "10px" }}
                >
                  <CommonGrid
                    gridRef={gridRef}
                  
                    getRowStyle={() => {
                      return { background: "white" };
                    }}
                    rowHeight={35}
                    defaultColDef={{
                      singleClickEdit: true,
                      flex: 1,
                    }}
                    columnDefs={columnDefs}
                 
                    rowData={timelineData || []}
                    onGridReady={onGridReady}
                    pagination={false}
                    paginationPageSize={5}
                  />
                 
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Dialog
        className="dialog-wrap"
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(!openConfirmDialog)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="title-model">
          Send Mail
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to send mail?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="button-wrap">
          <Button
            className="yes-btn"
            onClick={(e) => {
              e.preventDefault();
              sendMail();
            }}
          >
            Yes
          </Button>
          <Button
            className="no-btn"
            onClick={() => setOpenConfirmDialog(!openConfirmDialog)}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Timeline;
