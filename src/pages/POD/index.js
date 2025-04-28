import React, { useCallback, useRef, useState, useEffect } from "react";
import { PODGridHeader, listData } from "./utils";
import AgGridTable from "pages/common-components/AgGridTable";
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, Stack, Grid, Tooltip, TextField, DialogContent, Typography, Button, DialogActions, DialogTitle, IconButton } from "@mui/material";
import Spinner from "pages/common-components/Spinner";
import "../TaskManagement/Components/ListViewBoard/style.css";
import DrawerComponent from "pages/common-components/Drawer";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { IconButtons, Buttons } from "pages/common-components/Button";
import PODDrawer from "./Components/PODDrawer";
import AddIcon from '@mui/icons-material/Add';
import { MdOutlineAddCircle } from 'react-icons/md';
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { addRescheduleDate, deletePODTask, downloadPODExcel, getPODList, getPODTaskById, getPODTypeDropdown, getPriorityList } from "redux/actions/PODAction";
import moment from "moment";
import './style.css'
import { MySelectAutoComplete } from "pages/common-components/AutoSearchSelect";
import ExcelImage from "../.../../../assets/images/xls.png"
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
function POD({
  setIsRowSelected,
  totalPages,
  page,
  setPage,
}) {
  const gridref = useRef();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [rescheduleDate, setRescheduleDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [siteName, setSiteName] = useState(null)
  const podListing = state?.POD?.podList ?? [];
  const edit = state?.POD?.podTaskById;
  const [editData, setEditData] = useState({})
  const SiteState = useSelector((state) => {
    return state?.siteHomeKpi;
  });
  const UserSites = SiteState?.userSites || [];

  const onRowSelected = () => {
    if (gridref.current?.api.getSelectedRows().length > 0) {
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
    }
  };
  const [drawerData, setDrawerData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    ...PODGridHeader?.columnDefs,
    {
      field: "action",
      headerName: "Action",
      resizable: true,
      // pinned: "right",
      width: 150,
      sortable: true,
      cellRenderer: (params) => {
        return params?.data?.type === "Pod" && (
          <>
            <Tooltip title="Reschedule Activity">
              <IconButtons
                onClick={() => openModal(params?.data?.id)}
                icon={<EventIcon style={{ color: '#019e89' }} fontSize="small" />}
              />
            </Tooltip>
            <Tooltip title="Edit Activity">
              <IconButtons
                onClick={() => { dispatch(getPODTaskById(params?.data?.id, onOpenDrawer)); setEditFlag(true) }}
                icon={<ModeEditOutlineRoundedIcon style={{ color: '#019e89' }} fontSize="small" />}
              />
            </Tooltip>
            <Tooltip title="Delete Activity">
              <IconButtons
                onClick={() => { dispatch(deletePODTask(params?.data, siteName?.siteName)) }}
                icon={<DeleteIcon style={{ color: '#019e89' }} fontSize="small" />}
              />
            </Tooltip>
          </>
        );
      }
    },
  ]);
  const [rowData, setRowData] = useState(listData);
  const [openDrawer, setOpenDrawer] = useState(false);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const downloadExcelHandler = () =>{
    const fileName = `PlanofDay_${moment(date).format("dd-MM-yyyy")}`;
    dispatch(downloadPODExcel(date, siteName?.siteName, fileName))
  }

  const onGridReady = () => {
    gridref.current?.api.setSuppressRowClickSelection(true);
  };

  useEffect(() => {
    if (edit?.id) {
      setEditData(edit)
      onOpenDrawer()
    }
  }, [edit])

  useEffect(() => {
    dispatch(getPODList(date, siteName?.siteName));
  }, [dispatch, date, siteName]);

  useEffect(() => {
    dispatch(getPriorityList())
    dispatch(getPODTypeDropdown())
  }, [dispatch]);

  const componentStyle = { width: "auto" };
  const defaultColDef = { sortable: true, floatingFilter: true };
  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  const handlePageClick = (page) => {
    setPage(page + 1);
  };

  const [showModal, setShowModal] = useState(false);
  const [rescheduleId, setRescheduleId] = useState(null)
  const openModal = (id) => {
    setShowModal(true);
    setRescheduleId(id)
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleReschedule = (e) => {
    e.preventDefault()
    dispatch((addRescheduleDate(rescheduleId, rescheduleDate, date, siteName?.siteName)))
    setShowModal(false);
  }


  useEffect(() => {
    if (UserSites.length > 0) {
      setSiteName(UserSites[0])
    }
  }, [UserSites])

  return (
    <div className="list-root">
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Box component="h2">
          POD
        </Box>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          marginBottom="auto"
          marginTop="-8px"
          sx={{ mb: -2 }}
        ><div style={{ width: "180px", marginLeft: "5px", marginRight: "5px", marginBottom: "5px", display: "flex" }}>
            <Box mt={2}>
              <Typography sx={{ fontSize: "14px" }} variant="h5">
                Site:
              </Typography>
            </Box>
            <MySelectAutoComplete
              size="small"
              // toplabel="Site Name"
              placeholder="Enter SiteName"
              values={siteName}
              disablePortal={false}
              listing={UserSites || []}
              getOptionLabel={(option) => option.siteName}
              disabled={false}
              onChange={(e, value) => {
                // setSiteCode(value?.siteName, "site name");
                setSiteName(value)
              }}
              className='fontSize-13'
              ListboxProps={{ style: { maxHeight: 170 } }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div style={{ width: "140px", marginLeft: "5px", marginRight: "5px", marginBottom: "5px" }}>
            <DatePicker
              label=""
              value={date}
              maxDate={new Date()}
              inputFormat="dd/MM/yyyy"
              onChange={(value) => {
                setDate(moment(value).format("YYYY-MM-DD"));
              }}
              renderInput={(params) => <TextField {...params}
                size="small"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />}
            />
          </div>
          <div>
            <Tooltip title="Add Activity">
              <Buttons onClick={() => { onOpenDrawer(); setEditData({}); setEditFlag(false) }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                name="Add"
                variant="outlined"
                className="add_role_button" />
              {/* <IconButtons
                  onClick={()=>{ setEditFlag(false);setOpenDrawer(true)}}
                  icon={<AddIcon style={{ color: '#019e89',border: "1px dashed #019e89", width: "35px",borderRadius: "50%",height:"30px"}} />}
                  /> */}
            </Tooltip>
          </div>
          <div>
            <Box sx={{ justifyContent: "flex-end" }}>
              <Tooltip title="Excel">
                <IconButton
                  sx={{
                    padding: "0px",
                    bottom: 5,
                  }}
                   onClick={downloadExcelHandler}
                  className="header-add"
                >
                  <img src={ExcelImage} style={{ height: "35px", width: "35px" }} alt="Icon" />
                </IconButton>
              </Tooltip>

              <Link to="/kpis">
                <HomeIcon style={{ color: '#019E89' }} />
              </Link>
            </Box>
          </div>
        </Stack>
      </Grid>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600, fontSize: 16 }} id="customized-dialog-title">
              Reschedule Plan of Day
            </DialogTitle>
            <DialogContent dividers>
              <Box>
                <DatePicker
                  label=""
                  className="rescheduleDatePicker"
                  value={rescheduleDate}
                  minDate={new Date()}
                  inputFormat="dd/MM/yyyy"
                  onChange={(value) => {
                    setRescheduleDate(moment(value).format("YYYY-MM-DD"));
                  }}
                  renderInput={(params) => <TextField {...params}
                    size="small"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="success"
                sx={{ color: "#00a18b" }}
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{ float: "right", color: "#00a18b" }}
                type="submit"
                className="Sub-btn"
                onClick={handleReschedule}
              >
                Submit
              </Button>
            </DialogActions>
          </div>
        </div>
      )}
      <AgGridTable
        className="taskManagementGrid"
        gridRef={gridref}
        rowData={podListing ?? []}
        columnDefs={columnDefs}
        Style={componentStyle}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onRowSelected={onRowSelected}
        getRowHeight={getRowHeight}
        onGridReady={onGridReady}
        pagination={false}
      />
      <Stack alignItems="center">
        <Pagination
          count={totalPages}
          defaultPage={1}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(_, page) => handlePageClick(page - 1)}
        />
      </Stack>
      <DrawerComponent open={openDrawer} onClose={onCloseDrawer}>
        <PODDrawer onCloseDrawer={onCloseDrawer} editFlag={editFlag} editData={editData} />
      </DrawerComponent>
    </div>
  );
}

export default POD;