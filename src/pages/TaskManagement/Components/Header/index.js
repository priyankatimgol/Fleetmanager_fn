import {
  Grid,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Buttons } from "pages/common-components/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExcel,
  getAllTaskMngListing,
  getListViewTicketsDetails,
  setSearchData,
  setTaskTypeHeaderSection,
  setUploadModalStatus,
} from "redux/actions/TaskManagmentActions";
import { CREATE_TASK } from "pages/TaskManagement/utils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterTypeModel from "./Components/FilterTypeModel";
import DrawerComponent from "pages/common-components/Drawer";
import { useLocation, useNavigate } from "react-router-dom";

function Header({
  onOpenDrawer,
  boardType,
  setBoardType,
  setMode,
  isRowSelected,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();
  const [clear, setClear] = useState(false);
  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const state = useSelector((state) => state);
  const TaskTypeDropdown = state?.taskManager?.dropdowns?.["Task Type"];
  const [taskType, setTaskType] = useState("");
  const urlParams = new URLSearchParams(location.search);
  const typeTypeQuery = (urlParams.get("taskType") && urlParams.get("taskType"));

  useEffect(() => {
    if (typeTypeQuery) {
      const decodedTaskTypeFromUrl = decodeURIComponent(typeTypeQuery);
      dispatch(setTaskTypeHeaderSection(decodedTaskTypeFromUrl));
      setTaskType(decodedTaskTypeFromUrl);
    } else {
      setTaskType("Logbook-WTG Breakdown");
      dispatch(setTaskTypeHeaderSection("Logbook-WTG Breakdown"));
    }
    handleBoadCalling();
  }, [dispatch, typeTypeQuery]);

  const handleOnChange = (val) => {
    setSearchQuery(val);
    dispatch(setSearchData(val));
    setClear(false);
  };

  const handleBoadCalling = () => {
    if (boardType === "Kanban") {
      dispatch(getAllTaskMngListing());
    } else {
      dispatch(getListViewTicketsDetails(1));
    }
  };

  const handleSearch = () => {
    setClear(true);
    handleBoadCalling();
  };

  const handleClear = () => {
    dispatch(setSearchData(""));
    setSearchQuery("");
    handleBoadCalling();
    setClear(false);
  };

  const handleTaskTypeChanges = (e) => {
    navigate(`/task-management?taskType=${e.target.value}`);
    // dispatch(setTaskTypeHeaderSection(e.target.value));
    // setTaskType(e.target.value);
    // handleBoadCalling();
  };

  const openModal = () => {
    dispatch(setUploadModalStatus(true));
  };

  const openModelForFilter = () => {
    setIsFilterModelOpen(true);
  };

  const closeModelOfFilter = () => {
    setIsFilterModelOpen(false);
  };

  return (
    <Grid container spacing={1} justifyContent="space-between">
      <Grid item md={6} xs={12} className="dis-flex">
        <Grid item>
          <TextField
            className="header-search"
            label=""
            value={searchQuery}
            onChange={(e) => handleOnChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {clear ? (
                    <IconButton onClick={handleClear}>
                      <CloseRoundedIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          {/* <Autocomplete
            className="dropdown-margin"
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(option) => {
              return option?.masterName?.toString() || "";
            }}
            disableClearable
            options={TaskTypeDropdown || []}
            placeholder="Status"
            onChange={(e, value) => handleTaskTypeChanges(value)}
            value={taskType}
            renderInput={(params) => (
              <TextField
                name="tasktype"
                id="tasktype"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  style: { height: `35 !important` },
                }}
                variant="outlined"
                size="small"
              />
            )}
          /> */}
          <Select
            displayEmpty
            inputProps={{ style: { height: `35 !important` } }}
            size="small"
            className="dropdown-margin"
            name="tasktype"
            id="tasktype"
            value={taskType}
            onChange={(e) => handleTaskTypeChanges(e)}
          >
            {TaskTypeDropdown?.map((v) => (
              <MenuItem value={v?.masterName}>{v?.masterName}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container spacing={1} justifyContent="flex-end">
          <Grid item>
            {/* <Tooltip title="Filter">
              <IconButton
                sx={{
                  padding: "9px 9px 9px 15px",
                  bottom: 5,
                }}
                onClick={openModelForFilter}
                className="header-add"
              >
                <FilterAltIcon />
              </IconButton>
            </Tooltip> */}
          </Grid>
          {boardType === "List" && (
            <Grid item>
              <Buttons
                onClick={openModal}
                name="Assign"
                disabled={!isRowSelected}
                variant="outlined"
                className="header-create"
              />
            </Grid>
          )}
          <Grid item>
            <Buttons
              onClick={() => {
                onOpenDrawer();
                setMode(CREATE_TASK);
              }}
              name="Create"
              variant="outlined"
              className="header-create"
            />
          </Grid>
          <Grid item>
            <Buttons
              onClick={() => {
                dispatch(downloadExcel(searchQuery));
              }}
              name="download"
              variant="outlined"
              className="header-create"
              startIcon={<GetAppIcon />}
            />
          </Grid>
          <Grid item>
            <Buttons
              onClick={() => setBoardType("Kanban")}
              name="Kanban View"
              variant="outlined"
              disabled={boardType === "Kanban"}
              className="header-create"
              startIcon={<GridViewIcon fontSize="small" />}
            />
          </Grid>
          <Grid item>
            <Buttons
              onClick={() => setBoardType("List")}
              name="List View"
              variant="outlined"
              disabled={boardType === "List"}
              className="header-create"
              startIcon={<GridViewIcon fontSize="small" />}
            />
          </Grid>
          <Grid item>
            <IconButton
              className="header-create header-add"
              onClick={() => setBoardType("calendar")}
              disabled={boardType === "calendar"}
              //onClick={() => navigate("/task-calender")}
            >
              <CalendarMonthIcon style={{ width: "25px", height: "25px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <DrawerComponent open={isFilterModelOpen} onClose={closeModelOfFilter}>
        <FilterTypeModel
          isFilterModelOpen={isFilterModelOpen}
          closeModelOfFilter={closeModelOfFilter}
        />
      </DrawerComponent>
      {/* <FilterTypeModel isFilterModelOpen={isFilterModelOpen} closeModelOfFilter={closeModelOfFilter} /> */}
    </Grid>
  );
}

export default Header;
