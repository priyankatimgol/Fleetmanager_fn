import { Box, Button, Grid, IconButton, Switch, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography, Autocomplete, FormControl, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AgGridTable from "pages/common-components/AgGridTable";
import { gridDefs } from "./utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BreakdownInfo } from "./components/BreakdownInfo";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExcel,
  getAnalysisDetails,
  getBreakdownData,
  getBreakdownDataByWeek,
  getEditWhysDrop,
  getSynergyYear,
} from "redux/actions/WhyAnalysis";
import { format } from "date-fns";
import { Buttons, IconButtons } from "pages/common-components/Button";
import Spinner from "pages/common-components/Spinner";
import "./styles.css";
import moment from "moment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExcelImage from "../.../../../assets/images/xls.png"
import { fetchError, showWarning } from "redux/actions";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const componentStyle = {
  width: "100%",
  height: "calc(100vh - 230px)",
  fontSize: "13px",
};

const defaultColDef = {
  floatingFilter: true,
};

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

export const WhyAnalysis = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const TableData = state?.whyAnalysis?.breakdownData;
  const UpdatedId = state.whyAnalysis.updatedId
  const isBreakdownLoading = state?.whyAnalysis?.loadingBreakDownData;
  const synergyYear = state?.whyAnalysis?.synergyYear ?? [];
  const [type, setType] = useState(false)
  const [toggle, setToggle] = useState("week_no")
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState("")
  const [selRow, setSelRow] = useState(null);
  const gridRef = useRef();
  const [statusTypeList, setStatusTypeList] = useState([{ name: "All" }, { name: "Submitted" }, { name: "Not Submitted" }]);
  const [statusType, setStatusType] = useState({ name: "All" })
  const [columnDefs, setColumnDefs] = useState();
  const [fromTodate, setFromTodate] = useState("")
  const [weekYear, setWeekYear] = useState(new Date().getFullYear())

  // const [updatedId, setUpdatedId] = useState(null);
  const closeDetails = () => {
    setSelRow(null);
    gridRef.current.api.deselectAll();
  };

  const AnalysisParams = state?.whyAnalysis?.analysisParams;
  const [pending, setPending] = useState(0)
  const rowDefs = useMemo(() => {
    console.log("TableData",TableData)
    if (TableData && TableData.length) {
      {
        toggle === "week_no" && selRow == null &&
          setFromTodate(TableData[0]?.fromDate + " To " + TableData[0]?.toDate)
      }
      if (statusType.name == "Submitted") {
        return TableData?.filter(v => v?.status == "true");
      } else if (statusType.name == "Not Submitted") {
        return TableData?.filter(v => v?.status == "");
      } else {
        return TableData;
      }
    } else {
      setFromTodate("");
      return [];
    }
  }, [TableData, statusType.name]);

  const loadingOverlayComponent = useMemo(() => {
    return Spinner;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const onCellClicked = (props) => {
    const { data } = props;
    const id = data?.id;
    setSelRow({ ...data });
    dispatch(getAnalysisDetails(id));
  };

  const remainingHrs = (data) => {
    let filledHours = 0;
    data.forEach(d => {
      filledHours += parseFloat(+d.hrs);
    });
    if (selRow?.grandTotal >= filledHours) {
      setPending(filledHours)
    } else {
      dispatch(showWarning("Breakdown hours should not exceed Total Hrs."))
    }
  }


  const [dataCount, setDataCount] = useState({
    "All": "",
    "Submitted": "",
    "Not Submitted": ""
  })
  useEffect(() => {
    if (TableData) {
      setDataCount((prevState) => ({
        ...prevState,
        'All': TableData?.length,
      }));
      const submitCount = TableData?.filter((d) => d.status === "true")
      setDataCount((prevState) => ({
        ...prevState,
        'Submitted': submitCount?.length,
      }));
      const notSubmitCount = TableData?.filter((d) => d.status === "")
      setDataCount((prevState) => ({
        ...prevState,
        'Not Submitted': notSubmitCount?.length,
      }));
    }
  }, [TableData])

  const downloadExcelHandler = () => {
    if (date) {
      const selDate = format(date, "yyyy-MM-dd");
      const fileName = `WhyAnalysisDetails_${format(date, "dd-MM-yyyy")}`;
      dispatch(downloadExcel(selDate, fileName, "Date"));
    } else {
      const fileName = `WhyAnalysisDetails_${week}`;
      const getWeek = setTimeout(() => {
        dispatch(downloadExcel(week, fileName, "Week"));
      }, 1000)
      return () => clearTimeout(getWeek)
    }

  };

  useEffect(() => {
    setColumnDefs(
      [
        {
          cellRenderer: (api) => {
            const rowData = api.data;
            return moment(rowData?.analysisDate).format("DD-MM-YYYY")
          },
          cellStyle: { fontSize: '12px', fontWeight: 500 },
          resizable: true,
          minWidth: 150,
          maxWidth: 160,
          hide: type === false ? true : false,
          headerName: 'DATE',
          filter: "agTextColumnFilter",
          filterParams: textFilterParams,
        },
        ...gridDefs.columnDefs]
    )
  }, [type])

  useEffect(() => {
    if (date) {
      dispatch(getBreakdownData(format(date, "yyyy-MM-dd"), UpdatedId));
    } else {
      const getWeek = setTimeout(() => {
        dispatch(getBreakdownDataByWeek(week, UpdatedId, weekYear))
      }, 1000)
      return () => clearTimeout(getWeek)
    }
  }, [date, week, weekYear]);

  useEffect(() => {
    if (isBreakdownLoading) {
      gridRef?.current?.api?.showLoadingOverlay();
    } else if (!isBreakdownLoading && rowDefs.length === 0) {
      gridRef?.current?.api?.hideOverlay();
      gridRef?.current?.api?.showNoRowsOverlay();
    } else {
      gridRef?.current?.api?.hideOverlay();
    }
  }, [isBreakdownLoading, rowDefs])

  useEffect(() => {
    if (gridRef.current !== undefined) {
      gridRef.current?.columnApi?.autoSizeAllColumns(false);
      gridRef.current?.api?.sizeColumnsToFit({
        defaultMinWidth: 150,
        columnLimits: [
          { key: "state", maxWidth: 200 },
          { key: "towerType", minWidth: 120, maxWidth: 180 },
          { key: "week", minWidth: 75, maxWidth: 120 },
          { key: "grandTotal", minWidth: 85, maxWidth: 90 },
          { key: "checkMark", minWidth: 90, maxWidth: 95 },
          { key: "remarks1", minWidth: 150, maxWidth: 200 },
          { key: "remarks2", minWidth: 150, maxWidth: 200 },
          { key: "standardRemarks", minWidth: 150, maxWidth: 200 },
          { key: "overallActionItem", minWidth: 150, maxWidth: 200 },
        ],
      });
    }
  }, [selRow]);

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  const getRowStyle = (params) => {
    const filterData = params?.data?.status?.length > 2;
    const pendinghrs = params?.data?.pendingHrs;
    if (pendinghrs === 0) {
      return { 'background-color': '#e6fffb' }
    }
    if (filterData === true && pendinghrs !== 0) {
      return { 'background-color': '#FFF5C2' }
    }
  }
  const handleToggle = (event, newValue) => {
    if (newValue) {
      setToggle(newValue)
    }
  }

  useEffect(()=>{
    dispatch(getSynergyYear())
    dispatch(getEditWhysDrop())
  },[])
 
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Synergy Report</Typography>
            <Link to="/kpis">
              <HomeIcon style={{ color: '#019E89' }} />
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
            <Grid item md={selRow == null ? 9:8}>
              <Box sx={{ display: "flex" }}>
                <ToggleButtonGroup
                  color="primary"
                  size="small"
                  value={toggle}
                  exclusive
                  onChange={handleToggle}
                  aria-label="Platform"
                >
                  <ToggleButton style={{ width: "100px" }} value="week_no">Week No.</ToggleButton>
                  <ToggleButton style={{ width: "100px" }} value="date">Date</ToggleButton>
                </ToggleButtonGroup>
                {toggle === "week_no" && <>
                  <TextField
                    id="outlined-controlled"
                    value={week}
                    size="small"
                    type="number"
                    style={{ width: "80px", marginLeft: "5px", marginRight: "5px" }}
                    onChange={(event) => {
                      setWeek(event.target.value);
                      setDate(null)
                      closeDetails()
                    }}
                  />
                  <Box sx={{ width: "100px" }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weekYear}
                        size="small"
                      onChange={(e) => {setWeekYear(e.target.value)}}
                      >
                       {
                         synergyYear?.map((d)=>{
                          return <MenuItem value={d}>{d}</MenuItem>;
                         })
                       }
                      </Select>
                    </FormControl>
                  </Box>
                </>
                }

                {toggle === "week_no" && selRow == null &&
                  <Typography style={{ marginTop: "7px" }}>
                    {fromTodate}
                  </Typography>
                }

                {toggle === "date" &&
                  <>
                    <div style={{ width: "140px", marginLeft: "5px", marginRight: "5px" }}>
                      <DatePicker
                        label=""
                        value={date}
                        maxDate={new Date()}
                        inputFormat="dd/MM/yyyy"
                        onChange={(value) => {
                          setDate(value);
                          setWeek("")
                          closeDetails();
                        }}
                        renderInput={(params) => <TextField {...params}
                          size="small"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />}
                      />
                    </div>
                  </>
                }
              </Box>
            </Grid>
            <Grid item md={selRow == null ? 2.5:3.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{width:"150px"}}>
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
                <Box marginRight={selRow == null ? 4:0} marginTop={selRow == null ? 2:0} >
                  <Typography>
                    {statusType.name === 'All' ? dataCount.All : `${dataCount[statusType.name]} / ${dataCount.All}`}
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
                    onClick={downloadExcelHandler}
                    className="header-add"
                  >
                    <img src={ExcelImage} style={{ height: "40px", width: "40px" }} alt="Icon" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            {/* <Grid item xs={3.5} sx={{ position: "relative" }}>
            <div style={{ marginTop: "8px", marginLeft: "5px" }}>
              <div className="input-form">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  getOptionLabel={(option) => {
                    return option ?.name ?.toString() || "";
                  }}
                  disableClearable
                  options={statusTypeList || []}
                  placeholder="Status"
                  onChange={(e, value: any) => {
                    //  console.log('e',e,value)
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
                
              </div>
              </div>
            </Grid> */}
            {/* <Tooltip title="Excel">
              <IconButton
                sx={{
                  padding: "0px",
                  bottom: 5,
                }}
                onClick={downloadExcelHandler}
                className="header-add"
              >
                <img src={ExcelImage} style={{ height: "40px", width: "40px" }} alt="Icon" />
              </IconButton>
            </Tooltip> */}
            {/* <Buttons
              type="button"
              onClick={downloadExcelHandler}
              variant="contained"
              size="small"
              className="download-excel button-color"
              name="Download Excel"
            /> */}
          </Grid>
          {selRow !== null && (
            <Grid display="flex" alignItems="baseline" item md={7}>
              {/* <Grid container alignItems="center" columnSpacing={3}> */}
              <div style={{ width: "100%", overflowX: "auto", paddingBottom: "5px" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>Site-Area{" "}</th>
                      <th>SAP Code{" "}</th>
                      <th>Week{" "}</th>
                      <th>Total Hrs{" "}</th>
                      <th>Pending Hrs{" "}</th>
                    </tr>
                    <tr>
                      <td>{`${selRow?.site}-${selRow?.section}`}</td>
                      <td>{selRow?.sapCode}</td>
                      <td style={{ width: "60px" }}>{selRow?.week}</td>
                      <td style={{ width: "80px" }}>{selRow?.grandTotal}</td>
                      <td style={{ width: "80px" }}>{
                        (selRow?.grandTotal - pending).toFixed(2)
                      }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <Grid
                  sx={{ display: "inline-flex", columnGap: "5px" }}
                  item
                  md={4.5}
                >
                  <Typography variant="h5" className="field-title">
                    Site-Section:{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    className="field-title field-value"
                  >{`${selRow?.site}-${selRow?.section}`}</Typography>
                </Grid>
                <Grid
                  sx={{ display: "inline-flex", columnGap: "5px" }}
                  item
                  md={4.25}
                >
                  <Typography variant="h5" className="field-title">
                    Sap Code:{" "}
                  </Typography>
                  <Typography variant="h5" className="field-title field-value">
                    {selRow?.sapCode}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ display: "inline-flex", columnGap: "5px" }}
                  item
                  md={1.25}
                >
                  <Typography variant="h5" className="field-title">
                    Week:{" "}
                  </Typography>
                  <Typography variant="h5" className="field-title field-value">
                    {selRow?.week}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ display: "inline-flex", columnGap: "5px" }}
                  item
                  md={1.75}
                >
                  <Typography variant="h5" className="field-title">
                    Total Hrs:{" "}
                  </Typography>
                  <Typography variant="h5" className="field-title field-value">
                    {selRow?.grandTotal}
                  </Typography>
                </Grid> */}
              {/* </Grid> */}
              <IconButtons
                sx={{
                  height: "35px",
                  "& .MuiIconButton-root:hover": {
                    color: "#f3f7fe !important",
                  },
                }}
                // sx={{
                //     // borderRadius: "50%",
                //     // borderTopColor:"green",
                //     width: 35,
                //     height: 35,
                //     // color: (theme) => theme.palette.text.secondary,
                //     color: "white",
                //     backgroundColor: "green",
                //     "&:hover, &:focus": {
                //       backgroundColor: "green", // Keep the color green on hover
                //     },                  
                //   }}
                size="small"
                tooltipTitle="Close"
                onClick={closeDetails}
                icon={
                  <MdClose
                    color="#bdbdbd"
                    style={{ height: "15px", width: "15px" }}
                  />
                }
              />
            </Grid>
          )}
          <Grid item md={selRow !== null ? 5 : 12}>

            {toggle === "week_no" && selRow !== null &&
              <Typography style={{ marginTop: "-10px", marginBottom: "5px", marginLeft: "10px" }}>
                {fromTodate}
              </Typography>
            }
            <AgGridTable
              gridRef={gridRef}
              rowData={rowDefs}
              columnDefs={columnDefs}
              Style={componentStyle}
              rowHeight={32}
              headerHeight={42}
              onCellClicked={(props) => onCellClicked(props)}
              loadingOverlayComponent={loadingOverlayComponent}
              loadingOverlayComponentParams={loadingOverlayComponentParams}
              overlayNoRowsTemplate={
                '<span className="ag-overlay-loading-center">No WTG Breakdown data found for selected date.</span>'
              }
              rowSelection={"single"}
              getRowHeight={getRowHeight}
              defaultColDef={defaultColDef}
              getRowStyle={getRowStyle}
            />
          </Grid>
          {selRow !== null && (
            <Grid item md={7}>
              <BreakdownInfo
                gridRef={gridRef}
                selRow={selRow}
                closeDetails={closeDetails}
                date={date}
                week={week}
                weekYear={weekYear}
                remainingHrs={remainingHrs}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
