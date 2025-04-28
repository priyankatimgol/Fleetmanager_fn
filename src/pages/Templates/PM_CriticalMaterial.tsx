import { useMemo, useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import {
  Typography,
  Grid,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useSelector, useDispatch } from "react-redux";
import {
  getPmCriticalMaterialCategorisData,
  getPmCriticalMaterialGraphData,
  getPmCriticalMaterialGraphRerenderData,
} from "redux/actions/Scm/PMCriticalMaterial";
import { FaFileDownload } from "react-icons/fa";
import VillaIcon from "@mui/icons-material/Villa";
import PMCMWGraph from "./components/PMCMWGraph";
import { MenuItem } from "@mui/material";
import "./styles.css";
import PMCurrentStockGrid from "./components/PMCurrentStockGrid";
import PMOpenPR from "./components/PMOpenPR";
import getServerSideData from "./helpers/GetserverSideData";

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
});

const PM_CriticalMaterial = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const [columnDefs, setColumnDefs] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [gridApiLocation, setGridApiLocation] = useState(null);
  const {
    pmGraphData,
    categories,
  } = useSelector((state: any) => state.PMCriticalMaterial);

  const handleChange = (e: SelectChangeEvent<{ value: unknown | string }>) => {
    setFilterCategory(e.target.value as string);
  };

  useEffect(() => {
    setIsContentVisible(true);
  }, []);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf("templates/") + 10
    );
    const formattedString = extractedString.replace(/-/g, " ");
    let modifiedString = formattedString.replace(/pm/gi, "PM");
    setTitleTable(modifiedString);
  }, [location.pathname]);

  const handleExportToExcel = (gridApi, fileName) => {
    if (gridApi) {
      gridApi.exportDataAsExcel({ fileName });
    }
  };

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

  useEffect(() => {
    // dispatch(getPMCriticalMaterialConfigData());
    // dispatch(getPMCriticalMaterialData());
    dispatch(getPmCriticalMaterialCategorisData());
    dispatch(getPmCriticalMaterialGraphData());
  }, []);

  useEffect(() => {
    if (filterCategory && filterCategory !== "" && filterCategory !== "All") {
      dispatch(getPmCriticalMaterialGraphRerenderData(filterCategory));
    } else {
      if (
        !filterCategory ||
        filterCategory === "" ||
        filterCategory === "All"
      ) {
        dispatch(getPmCriticalMaterialGraphData());
      }
    }
  }, [filterCategory]);

  const onGridReady = useCallback((params) => {
    var datasource = getServerSideData({
      mainApi: "/api/scm/getCriticalMaterialWeekly",
      configApi: "/api/SCM/GetColumnConfigurations",
      configTempEndPoint: "PMCriticalMaterialWeekly",
      setColumnDefs: setColumnDefs,
    });
    params.api.setServerSideDatasource(datasource);
    setGridApiLocation(params.api)
  }, []);

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

      <Grid container spacing={2} marginTop={1}>
        <Grid item sm={12} lg={12}>
          <div className="card-inside">
            <div className="pm_cat">
              <div>
                {/* Heading with flexbox layout */}
                <Typography className="title-card flex-div">
                  <VillaIcon className="icon-chart" /> State Wise Usable, Open
                  OP and Open PR
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Select field */}
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Category"
                    onChange={handleChange}
                    style={{ width: "200px" }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {categories?.map((data, index) => (
                      <MenuItem key={index} value={data?.value}>
                        {data?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <PMCMWGraph
              data={pmGraphData}
              bar1="Available Stock Quantity"
              bar2="Open PO Quantity"
              bar3="Open PR Quantity"
            />
          </div>
        </Grid>
      </Grid>

      <div style={containerStyle}>
        <Grid container spacing={2} marginTop={0.5}>
          <Grid item sm={12} lg={12}>
            <div className="card-inside" style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography className="title-card flex-div">
                  <VillaIcon className="icon-chart" /> PM Critical Material
                  Weekly
                </Typography>
                <Tooltip title="Download Excel" placement="bottom" arrow>
                  <Button
                    onClick={() =>
                      handleExportToExcel(
                        gridApiLocation,
                        "PM Critical Material Weekly"
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
                  className={classes.customRoot}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  rowModelType={"serverSide"}
                  // pagination={true}
                  cacheBlockSize={100}
                  maxBlocksInCache={10}
                  // paginationPageSize={20}
                  onGridReady={onGridReady}
                  serverSideInfiniteScroll={true}
                  rowHeight={23}
                  gridOptions={{
                    groupIncludeFooter: true,
                    suppressAggFuncInHeader: true,
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} marginTop={0.5}>
        <Grid item sm={6} lg={6}>
          <PMCurrentStockGrid
            title="PM Current Stock"
            category="SCM_PM_current_stock"
            mainApi="/api/scm/GetPMCurrentStock"
            configApi="/api/SCM/GetColumnConfigurations"
            configTempEndPoint="SCM_PM_current_stock"
          />
        </Grid>

        <Grid item sm={6} lg={6}>
          <PMOpenPR
            title="Open Purchase Requisition"
            category="SCM_Open_Purchase_Requisition"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop={0.5}>
        <Grid item sm={12} lg={12}>
          <PMCurrentStockGrid
            title="Purchase Order Details"
            category=""
            mainApi="/api/SCM/GetPurchaseOrderDetail"
            configApi="/api/SCM/GetColumnConfigurations"
            configTempEndPoint="SCM_Purchase_Order_Details"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PM_CriticalMaterial;
