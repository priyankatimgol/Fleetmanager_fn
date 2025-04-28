import { ColDef } from "ag-grid-community";
import Skeleton from "@mui/material/Skeleton";
import {
  formatNumber,
  formatQuantity,
} from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import ConsumptionQuantityGrid from "./components/ConsumptionQuantityGrid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ConsumptionRowBarChart from "./components/ConsumptionRowbar";
import "ag-grid-enterprise";
import LineChartConsumption from "./components/LineChartConsumption";
import ZoomableLineChart from "./components/ZoomableLineChart";
import ConsumptionBargraph from "./components/ConsumptionBarGraph";
import { Paper } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useMemo, useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { Typography, Box, Button, Grid } from "@mui/material";
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useSelector } from "react-redux";
import { FaFileDownload } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import DownloadExcel from "./components/DownloadExcel";
import usePurchase from "pages/PurchaseTemplates/hooks/usePurchase";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import useUnpredictable from "./hooks/useUnpredictable";

LicenseManager.setLicenseKey(
  "[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-052646}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{29 February 2024}____[v3]_[0102]_MTcwOTE2NDgwMDAwMA==b1896dfdfbb4dc28dfd4e4366ce39bbd"
);

const useStyles = makeStyles({
  customRoot: {
    "& .ag-body-viewport, & .ag-center-cols-viewport": {
      scrollbarWidth: "auto!important",
    },
    "& .ag-body-viewport::-webkit-scrollbar, & .ag-center-cols-viewport::-webkit-scrollbar":
      {
        display: "flex !important",
      },
    "& .ag-header-group-cell-label": {
      justifyContent: "center !important",
    },
    "&.ag-pinned-left-cols-container, & .ag-pinned-right-cols-container": {
      overflowY: "hidden !important",
      // '&.makeStyles-header-3':{

      //   }
    },
  },
  customHeader: {
    color: "#000",
    backgroundColor: "#fff", // Set your desired background color
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff !important",
    },
  },
  header: {
    textTransform: "capitalize",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#000",
    borderRadius: 5,
    margin: "12px 0",
    padding: "10px",
    background: "#fff",
    border: "1px solid gainsboro",
  },
  cards: {
    // boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
    fontSize: "1.5rem",
    padding: "25px 5px",
    flexDirection: "column",

    borderRadius: "5px",
    transition: "box-shadow 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    color: "#3e79ff",
    position: "relative",
    background: "#daefec",
    // border: '1px solid #e3e3e3',
  },
  customTooltip: {
    fontSize: "16px !important",
  },
});

const UnpredictableFailureReport = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const [columnDefss, setColumnDefss] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [rowData, setRowData] = useState([]);
  const { downloadLoading } = useSelector((state: any) => state.H2ScmReducer);
  const { formatIndianNumber } = usePurchase();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const gridStyles = useMemo(() => ({ height: "368px", width: "100%" }), []);

  const {
    unpredictableData,
    unpredictableLoader,
    unpredictableConfigData,
    unpredictableConfigLoader,
    unpredictableDataBoxes,
    unpredictableCompareQuantity,
    unpredictableCurrentFy,
    unpredictableLastThree,
    unpredictableQuaterly,
    unpredictableTotalYears,
    unpredictableTopValuesData,
  } = useUnpredictable();
  const gridOptions = {
    groupIncludeFooter: true,
    suppressAggFuncInHeader: true,
  };
  const roundTwoDecimal = (params: any) => {
    const value = params.value || 0;
    return Math.round(value * 100) / 100;
  };

  useEffect(() => {
    setIsContentVisible(true);
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[] | any>([
    { field: "State", width: 200, rowGroup: true, hide: true },

    {
      field: "2021-2022",
      aggFunc: "sum",
      width: 110,
      valueFormatter: roundTwoDecimal,
    },
    {
      field: "2023-2024",
      aggFunc: "sum",
      width: 110,
      valueFormatter: roundTwoDecimal,
    },

    {
      field: "2023-2024",
      aggFunc: "sum",
      width: 110,
      valueFormatter: roundTwoDecimal,
    },
    {
      field: "TotalQuantity",
      aggFunc: "sum",
      width: 130,
      valueFormatter: roundTwoDecimal,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf("templates/") + 10
    );
    const formattedString = extractedString.replace(/-/g, " ");
    setTitleTable(formattedString);
  }, [location.pathname]);

  const getServerSideDatasource = () => {
    return {
      getRows: async (params) => {
        let filterStr = JSON.stringify(params.request);

        console.log(">>", filterStr);

        let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getUnpredectableFailureReports?queryParam=${filterStr}`;
        let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/GetColumnConfigurations?template=Top50Consumption`;

        let header = {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        };

        try {
          const colDefResponse = await fetch(colDefObject, header);
          const colDef = await colDefResponse.json();

          const response = await fetch(`${url}`, header);
          let data = await response.json();

          if (!data.length) {
            params.failCallback();
            return;
          }
          // Check if data is less than cacheBlockSize
          if (data.length < params.request.endRow) {
            let emptyRows = Array(params.request.endRow - data.length).fill({});
            data = [...data, ...emptyRows];
          }

          const keys = Object.keys(data[0]);

          const newColumnDefs = keys.map((key) => {
            let filterType = "agTextColumnFilter";
            let headerName = key;
            let positioning;
            let displayWidth;
            let isEditable;
            let isFreeze;
            let GroupName;
            let headerClass;
            let lockPinned;
            let valueFormatter;
            let cellStyle;

            if (Array.isArray(colDef)) {
              const matchingObject = colDef.find((obj) => obj.DbKey === key);
              if (matchingObject) {
                headerName = matchingObject.DisplayText;
                positioning = matchingObject.Positioning;
                displayWidth = matchingObject.DisplayWidth;
                isEditable = matchingObject.IsEditable;
                isFreeze = matchingObject.IsFreeze;
                GroupName = matchingObject.GroupName || "";
                headerClass = "centered-header";
                lockPinned = matchingObject.IsFreeze;
                switch (matchingObject.DataType) {
                  case "date":
                    filterType = "agDateColumnFilter";
                    break;
                  case "decimal":
                    filterType = "agNumberColumnFilter";
                    break;
                  case "int":
                    filterType = "agNumberColumnFilter";
                    break;
                  case "text":
                    filterType = "agTextColumnFilter";
                    break;
                  default:
                    break;
                }
                valueFormatter = (params) => {
                  if (
                    params.colDef.field.includes("Amount1") ||
                    params.colDef.field.includes("Amount2") ||
                    params.colDef.field.includes("Amount3")
                  ) {
                    return "₹" + params.value;
                  }
                  return matchingObject.DataType === "int" ||
                    matchingObject.DataType === "decimal"
                    ? formatNumber(params.value)
                    : params.value;
                };

                cellStyle = (params) => {
                  if (
                    params.colDef.field.includes("Amount1") ||
                    params.colDef.field.includes("Amount2") ||
                    params.colDef.field.includes("Amount3")
                  ) {
                    return { textAlign: "right" };
                  } else if (
                    params.colDef.field.includes("Qty1") ||
                    params.colDef.field.includes("Qty2") ||
                    params.colDef.field.includes("Qty3") ||
                    params.colDef.field.includes("Flag") ||
                    params.colDef.field.includes("MATERIAL") ||
                    params.colDef.field.includes("RJ") ||
                    params.colDef.field.includes("GJK") ||
                    params.colDef.field.includes("GJS") ||
                    params.colDef.field.includes("MH") ||
                    params.colDef.field.includes("MP") ||
                    params.colDef.field.includes("KN") ||
                    params.colDef.field.includes("AP") ||
                    params.colDef.field.includes("TN")
                  ) {
                    return { textAlign: "left" };
                  } else return { textAlign: "center" };
                };
              }
            }

            return {
              field: key,
              filter: filterType,
              headerName: headerName,
              positioning: positioning,
              width: displayWidth,
              editable: isEditable,
              lockPosition: isFreeze,
              GroupName: GroupName,
              headerClass: headerClass,
              lockPinned: lockPinned,
              valueFormatter: valueFormatter,
              cellStyle: cellStyle,
            };
          });

          const groupedColumnDefs = {};
          newColumnDefs.forEach((columnDef) => {
            const groupName = columnDef.GroupName || "NoGroup";
            if (!groupedColumnDefs[groupName]) {
              groupedColumnDefs[groupName] = [];
            }
            groupedColumnDefs[groupName].push(columnDef);
          });

          const groupedColumnDefsArray = Object.entries(groupedColumnDefs).map(
            ([groupName, columns]) => ({
              headerName: groupName === "NoGroup" ? "" : groupName,
              children: columns,
            })
          );

          console.log('!!!!!!!!!!!!!!!', groupedColumnDefsArray);

          groupedColumnDefsArray.sort((a, b) => a.children[0].positioning - b.children[0].positioning);
          setColumnDefss(groupedColumnDefsArray);

          params.successCallback(data);
        } catch (error) {
          console.error("Error:", error);
        }
      },
    };
  };

  const onGridReadyServer = useCallback((params) => {
    var datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  const defaultColDeff = useMemo(() => {
    return {
      // flex: 1,
      floatingFilter: true,
      // autoHeaderHeight: true,
      resizable: true,
      headerClass: classes.customHeader,
      wrapHeaderText: true,
      sortable: true,
    };
  }, []);

  const [gridApi, setGridApi] = useState(null);
  const handleExportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: "Top50CriticalMaterial",
      });
    }
  };

  return (
    <>
      <div>
        {/* <div className={classes.header}> */}
        <Grid container spacing={3}>
          <Grid item sm={4} lg={4}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                top: "-12px",
              }}
            >
              <IoCaretBackCircle
                title="Back"
                onClick={() => navigate(-1)}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  marginRight: "10px",

                  color: "#009e88",
                }}
              />

              <Typography
                variant="h5"
                component="h5"
                sx={{ fontWeight: "600", textTransform: "capitalize" }}
              >
                {`${TitleTable} `}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* //graps as per consumption templetes */}

      <div style={containerStyle}>
        {/* {unpredictableLoader ? (
          <Box
            style={{ position: "relative" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={600}
          >
            <CircularProgress size={50} />
          </Box>
        ) : ( */}
        <>
          <div>
            <Grid container spacing={1} sx={{ marginBottom: "10px" }}>
              {unpredictableDataBoxes?.length > 0 ? (
                <>
                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(
                      unpredictableDataBoxes[0]?.Quantity
                    )}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div
                        className={classes.cards}
                        style={{ background: "#f5e9e9" }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "} */}

                          {formatQuantity(unpredictableDataBoxes[0]?.Quantity)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Last year Quantity
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>

                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(
                      unpredictableDataBoxes[1]?.Quantity
                    )}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div
                        className={classes.cards}
                        style={{ background: "#e3efed" }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "} */}

                          {formatQuantity(unpredictableDataBoxes[1]?.Quantity)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Current year Quantity
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>

                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(
                      unpredictableDataBoxes[2]?.Quantity
                    )}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div
                        className={classes.cards}
                        style={{ background: "#f5e9e9" }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "}
                         */}
                          {formatQuantity(unpredictableDataBoxes[2]?.Quantity)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Quantity for Last Month
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>

                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(unpredictableDataBoxes[0]?.Value)}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div
                        className={classes.cards}
                        style={{ background: "#ededed" }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {formatQuantity(unpredictableDataBoxes[0]?.Value)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Last year Value
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>

                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(unpredictableDataBoxes[1]?.Value)}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div className={classes.cards}>
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {formatQuantity(unpredictableDataBoxes[1]?.Value)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Current year Value
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>

                  <Tooltip
                    sx={{ fontSize: "26px" }}
                    title={formatIndianNumber(unpredictableDataBoxes[2]?.Value)}
                    className={classes.customTooltip}
                    arrow
                  >
                    <Grid item sm={2} lg={2}>
                      <div
                        className={classes.cards}
                        style={{ background: "#ededed" }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            position: "absolute",
                            right: "6px",
                            top: "6px",
                            color: "#3e79ff",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "600",
                            fontSize: "25px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          {formatQuantity(unpredictableDataBoxes[2]?.Value)}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#464646",
                          }}
                        >
                          Amount for Last Month
                        </Typography>
                      </div>
                    </Grid>
                  </Tooltip>
                </>
              ) : null}
            </Grid>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <div className="card-inside" style={{ position: "relative" }}>
                  <Typography className="title-card flex-div">
                    <CategoryIcon className="icon-chart" /> Top 10 YTD
                    Consumption Value By Material Description
                  </Typography>
                  {unpredictableTopValuesData?.length > 0 ? (
                    <ConsumptionRowBarChart
                      materialValues={unpredictableTopValuesData}
                    />
                  ) : null}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <div className="card-inside" style={{ position: "relative" }}>
                  <Typography className="title-card flex-div">
                    <TimelineIcon className="icon-chart" /> This Year
                    Consumption Quantity Vs Last Year By Month
                  </Typography>
                </div>
                <LineChartConsumption data={unpredictableCompareQuantity} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <div className="card-inside" style={{ position: "relative" }}>
                  <Typography className="title-card flex-div">
                    <CategoryIcon className="icon-chart" />
                    Consumption Amount For Last Three Year
                  </Typography>
                </div>
                <ZoomableLineChart data={unpredictableLastThree} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <div className="card-inside" style={{ position: "relative" }}>
                  <Typography className="title-card flex-div">
                    <CategoryIcon className="icon-chart" /> Consumption Amount
                    For Current FY Year By State
                  </Typography>
                </div>
                {unpredictableCurrentFy?.length > 0 ? (
                  <ConsumptionBargraph data={unpredictableCurrentFy} />
                ) : null}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <div>
                <div
                  className="card-inside"
                  style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography className="title-card flex-div">
                    <CategoryIcon className="icon-chart" />
                    Total Consumption By State,plant For Year
                  </Typography>

                  <DownloadExcel
                    {...{
                      gridApi,
                      title: "Total Consumption By State,plant For Year",
                    }}
                  />
                </div>
                <div className="ag-theme-alpine" style={gridStyles}>
                  <AgGridReact
                    className={classes.customRoot}
                    rowData={unpredictableTotalYears}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={{
                      headerName: "State",
                    }}
                    onGridReady={(params) => setGridApi(params.api)}
                    gridOptions={gridOptions}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={6}>
              <Paper>
                {unpredictableQuaterly?.length > 0 ? (
                  <ConsumptionQuantityGrid data={unpredictableQuaterly} />
                ) : (
                  <Box
                    style={{ position: "relative" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={300}
                  >
                    {" "}
                    <Skeleton animation="wave" width="100%" height={300} />
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
        {/* )} */}
      </div>

      {/* emdcode */}

      <div style={containerStyle}>
        <div className="card-inside" style={{ position: "relative" }}>
          <Box
            my={1}
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <div>
              <Tooltip title="Download Excel" placement="bottom" arrow>
                <Button
                  onClick={handleExportToExcel}
                  disabled={downloadLoading}
                  variant="contained"
                  color="primary"
                  title="Download Excel"
                  className="Sub-btn"
                  sx={{ minWidth: "38px", padding: "8px", marginLeft: "93vw" }}
                >
                  {downloadLoading ? (
                    <CircularProgress style={{ color: "#fff" }} size={18} />
                  ) : (
                    <FaFileDownload size={18} />
                  )}
                </Button>
              </Tooltip>
            </div>
          </Box>
          <div className="ag-theme-alpine" style={gridStyle}>
            <AgGridReact
              className={classes.customRoot}
              columnDefs={columnDefss}
              defaultColDef={defaultColDeff}
              cacheBlockSize={100}
              maxBlocksInCache={10}
              serverSideInfiniteScroll={true}
              rowModelType={"serverSide"}
              rowHeight={23}
              onGridReady={onGridReadyServer}
              paginationPageSize={1000}
              suppressExcelExport={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnpredictableFailureReport;
