import {
  ColDef,
  GridReadyEvent,
  KeyCreatorParams,
  ValueFormatterParams,
} from "ag-grid-community";
import DownloadExcel from "./components/DownloadExcel";
import usePurchase from "pages/PurchaseTemplates/hooks/usePurchase";
import Tooltip from "@mui/material/Tooltip";
import RowBarChart from "pages/PurchaseTemplates/components/RowBarChart";
import Skeleton from "@mui/material/Skeleton";
import { formatQuantity } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import { useCallback, useMemo, useState, useEffect } from "react";
import useConsumption from "./hooks/useConsumption";
import ConsumptionMainGrid from "./components/ConsumptionMainGrid";
import { AgGridReact } from "ag-grid-react";
import ConsumptionQuantityGrid from "./components/ConsumptionQuantityGrid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ConsumptionRowBarChart from "./components/ConsumptionRowbar";
import CircularProgress from "@mui/material/CircularProgress";
import { dummyrowdata } from "./fakedata";
import { LicenseManager } from "ag-grid-enterprise";

import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import CategoryIcon from "@mui/icons-material/Category";
import LineChartConsumption from "./components/LineChartConsumption";
import ZoomableLineChart from "./components/ZoomableLineChart";
import ConsumptionBargraph from "./components/ConsumptionBarGraph";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TimelineIcon from "@mui/icons-material/Timeline";

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

const ConsumptionTemplate = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "365px", width: "100%" }), []);
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const {
    KPI_tiles,
    loading,
    Top10ConsumptionValue,
    TotalConsumptionForYear,
    ConsumptionAmountForLastThree,
    CompareConsumptionQuantity,
    ConsumptionAmountForCurrentFy,
    Consumption,
    ColumnDef,
    ConsumptionForQuarter,
  } = useConsumption();

  const { formatIndianNumber } = usePurchase();

  const classes = useStyles();
  const navigate = useNavigate();

  const gridOptions = {
    // adds subtotals
    groupIncludeFooter: true,
    suppressAggFuncInHeader: true,
    // includes grand total

    // other grid options ...
  };

  const roundTwoDecimal = (params: any) => {
    const value = params.value || 0;
    return Math.round(value * 100) / 100; // Round to two decimal places
  };

  const [gridApi, setGridApi] = useState(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[] | any>([
    { field: "State", width: 200, rowGroup: true, hide: true },

    // { field: "Plant", rowGroup: true },
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

  const onGridReady = useCallback((params: GridReadyEvent) => {}, []);

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item sm={8} lg={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                top: "-7px",
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
                {`${TitleTable} `} <small> </small>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <div style={containerStyle}>
        {loading ? (
          <Box
            style={{ position: "relative" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={600}
          >
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <div>
              <Grid container spacing={1} sx={{ marginBottom: "10px" }}>
                {KPI_tiles.length > 0 ? (
                  <>
                    
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: "#f5e9e9" }}
                        >
                       <Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                   
                         
                          <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[0]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
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
                    

                    {formatQuantity(KPI_tiles[0]?.Quantity)}
                  </Typography></Tooltip>
                         
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
                    

                   
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: "#e3efed" }}
                        >

<Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                      
                       <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[1]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
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

                            {formatQuantity(KPI_tiles[1]?.Quantity)}
                          </Typography>
                          </Tooltip>
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
                   

                    
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: "#f5e9e9" }}
                        >
                          <Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                         
                          <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[2]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
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
                            {formatQuantity(KPI_tiles[2]?.Quantity)}
                          </Typography>
                    </Tooltip>
                          
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
                     

                    
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: "#ededed" }}
                        >
                          <Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                    <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[0]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    > 
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
                    {formatQuantity(KPI_tiles[0]?.Value)}
                  </Typography>
                  </Tooltip>
                        
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "#464646",
                            }}
                          >
                            Last year  Value
                          </Typography>
                        </div>
                      </Grid>
                   

                  
                      <Grid item sm={2} lg={2}>
                        <div className={classes.cards}>
                        <Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                            <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[1]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    >
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
                            {formatQuantity(KPI_tiles[1]?.Value)}
                          </Typography>
                    </Tooltip>
                         
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
                    

                   
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: "#ededed" }}
                        >
                              <Tooltip title="Lorem ipsum dolor sit amet, ">
                       <InfoOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: "6px",
                      top: "6px",
                      color: "#3e79ff",
                    }}
                  /> 
                       </Tooltip>
                           <Tooltip
                      sx={{ fontSize: "26px" }}
                      title={formatIndianNumber(KPI_tiles[2]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    ><Typography
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
                    {formatQuantity(KPI_tiles[2]?.Value)}
                  </Typography></Tooltip>
                          
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
                    {Top10ConsumptionValue.length > 0 ? (
                      <ConsumptionRowBarChart
                        materialValues={Top10ConsumptionValue}
                      />
                    ) :   <Skeleton animation="wave" width="100%" height={300} />}
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
                  <LineChartConsumption data={CompareConsumptionQuantity} />
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
                  <ZoomableLineChart data={ConsumptionAmountForLastThree} />
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
                  {ConsumptionAmountForCurrentFy?.length > 0 ? (
                    <ConsumptionBargraph data={ConsumptionAmountForCurrentFy} />
                  ) :   <Skeleton animation="wave" width="100%" height={300} />}
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
                  <div className="ag-theme-alpine" style={gridStyle}>
                    <AgGridReact
                      className={classes.customRoot}
                      rowData={TotalConsumptionForYear}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      // pinnedTopRowData={[{
                      //   "Consumption Quantity Battery": 107887,
                      //   "Return Quantity Battery": 104429,
                      //   "Difference": -3458,
                      // }]}
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
                  {ConsumptionForQuarter.length > 0 ? (
                    <ConsumptionQuantityGrid data={ConsumptionForQuarter} />
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

              <Grid item xs={12}>
                {Consumption.length > 0 && ColumnDef.length > 0 ? (
                  <ConsumptionMainGrid {...{ Consumption, ColumnDef }} />
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
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </>
  );
};

export default ConsumptionTemplate;
