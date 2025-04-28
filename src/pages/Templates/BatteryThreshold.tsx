import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { Typography, Button, Grid } from "@mui/material";
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useSelector, useDispatch } from "react-redux";
import { FaFileDownload } from "react-icons/fa";
import VillaIcon from "@mui/icons-material/Villa";
import {
  getBatteryThresholdConfigData,
  getBatteryThresholdData,
  getBatteryThresholdBoxes,
  getbatteryThresholdGraphData,
} from "redux/actions/Scm/BatteryThreshold";
import { getBatteryConsumptionVsReturnGraphData } from "redux/actions/Scm/ConsumptionVsReturn";
import { formatNumber, formatQuantity } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import BarChartBatteryThreshold from "./components/BarChartbatteryThreshold";
import "./styles.css";

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
    background: "#F7F8FA",
    "&:hover": {
      color: "#000",
      background: "#F7F8FA",
    },
  },
  header: {
    textTransform: "capitalize",

    alignItems: "center",
    justifyContent: "space-between",
    color: "#000",
  },
  cards: {
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
  },
});

const BatteryThreshold = () => {
  const gridStyle = useMemo(
    () => ({ height: "500px", width: "100%", marginTop: "10px" }),
    []
  );
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);

  const {
    batteryThresholdConfigData,
    batteryThresholdData,
    betteryThresholdBoxes,
    batteryThresholdGraphData,
  } = useSelector((state: any) => state.BatteryThreshold);

  const [gridApiLocation, setGridApiLocation] = useState(null);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf("templates/") + 10
    );
    const formattedString = extractedString.replace(/-/g, " ");
    setTitleTable(formattedString);
  }, [location.pathname]);

  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      floatingFilter: true,
      autoHeaderHeight: true,
      resizable: true,
      headerClass: classes.customHeader,
      wrapHeaderText: true,
      filter: "agMultiColumnFilter",
      sortable: true,
    };
  }, []);

  const handleExportToExcel = (gridApi, fileName) => {
    if (gridApi) {
      gridApi.exportDataAsExcel({ fileName });
    }
  };

  useEffect(() => {
    const processColumnData = async (data) => {
      try {
        if (data?.length > 0) {
          const filterData = batteryThresholdConfigData.filter(
            (item) => item?.Category === "BatteryThreashold"
          );
          const sortedData = filterData.sort(
            (a, b) => a.Positioning - b.Positioning
          );

          const newColumnDefs = sortedData
            .map((config) => {
              const columnDef = {
                field: config.DbKey,
                rowGroup: config.DbKey === "State" ? true : undefined,
                headerName: config.DisplayText,
                minWidth: config.DisplayWidth,
                tooltip: config.Tooltip,
                editable: config.IsEditable,
                lockPosition: config.IsFreeze,
                filter: "agMultiColumnFilter",
                filterParams: {
                  filters: [{ filter: "agSetColumnFilter" }],
                },
                cellStyle: {
                  textAlign: config.DataType === "int" ? "right" : "left",
                },
                headerClass:
                  config.DataType === "int" ? "right-aligned-header" : "",
              };

              return columnDef;
            })
            .filter(Boolean);

          setColumnDefs(newColumnDefs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    processColumnData(batteryThresholdData);
  }, [batteryThresholdData, batteryThresholdConfigData]);

  useEffect(() => {
    dispatch(getBatteryThresholdData());
    dispatch(getBatteryThresholdConfigData());
    dispatch(getBatteryConsumptionVsReturnGraphData());
    dispatch(getBatteryThresholdBoxes());
    dispatch(getbatteryThresholdGraphData());
  }, []);

  useEffect(() => {
    if (batteryThresholdData?.length) {
      setRowData(batteryThresholdData);
    }
  }, [batteryThresholdData]);

  return (
    <>
      <div className={classes.header}>
        <Grid container spacing={3}>
          <Grid item sm={4} lg={4}>
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
                sx={{ fontWeight: "600" }}
              >
                {`${TitleTable} `}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* <div>
        <Grid
          container
          spacing={1}
          sx={{ marginBottom: "0px", marginTop: "5px" }}
        >
          {betteryThresholdBoxes?.map((gridItems, index) => {
            if (index !== 0) {
              return (
                <Tooltip
                  title={formatNumber(parseInt(gridItems?.value))}
                  placement="top"
                  arrow
                >
                  <Grid item sm={6} lg={6} key={index}>
                    <div
                      className={classes.cards}
                      style={{
                        background: index % 2 === 0 ? "#e3efed" : "#f5e9e9",
                      }}
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
                        {formatQuantity(parseInt(gridItems?.value))}
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
                        {gridItems.label}
                      </Typography>
                    </div>
                  </Grid>
                </Tooltip>
              );
            }
          })}
        </Grid>
      </div> */}

      <div className="card-wrepper">
        <Grid container spacing={2} marginTop={1}>
          <Grid item sm={12} lg={12}>
            <div className="card-inside">
              <Typography className="title-card flex-div">
                <VillaIcon className="icon-chart" /> Consumption & Exceded
                Threshold Qty
              </Typography>
              <BarChartBatteryThreshold
                data={batteryThresholdGraphData}
                bar1="Consumption Qty"
                bar2="Threshold Qty"
              />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={0.5}>
          <Grid item sm={12} lg={12}>
            <div className="card-inside" style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography className="title-card flex-div">
                  <VillaIcon className="icon-chart" /> State & Functional
                  Location Wise Battery Threshold
                </Typography>
                <Tooltip title="Download Excel" placement="bottom" arrow>
                  <Button
                    onClick={() =>
                      handleExportToExcel(
                        gridApiLocation,
                        "Location Wise Battery Threshold"
                      )
                    }
                    variant="contained"
                    color="primary"
                    className="Sub-btn"
                    sx={{ minWidth: "38px", padding: "8px" }}
                  >
                    <FaFileDownload size={18} />
                  </Button>
                </Tooltip>
              </div>
              <div className="ag-theme-alpine" style={gridStyle} id="location">
                <AgGridReact
                  key="grid-3"
                  className={classes.customRoot}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  gridOptions={{
                    groupIncludeFooter: true,
                    suppressAggFuncInHeader: true,
                  }}
                  onGridReady={(params) => setGridApiLocation(params.api)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BatteryThreshold;
