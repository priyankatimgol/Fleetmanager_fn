import { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { Typography, Grid, Tooltip, Button } from "@mui/material";
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useSelector, useDispatch } from "react-redux";
import {
  getCriticalMaterialConfigData,
  getCriticalMaterialData,
} from "redux/actions/Scm/CriticalMaterial";
import VillaIcon from "@mui/icons-material/Villa";
import { FaFileDownload } from "react-icons/fa";

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

const CriticalMaterial = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [gridApiLocation, setGridApiLocation] = useState(null);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);

  const {
    pmCriticalMaterialData,
    loader,
    pmCriticalMateriaConfigData,
    pmCriticalMateriaConfigLoader,
  } = useSelector((state: any) => state.CriticalMaterial);

  useEffect(() => {
    setIsContentVisible(true);
  }, []);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf("templates/") + 10
    );
    const formattedString = extractedString.replace(/-/g, " ");
    setTitleTable(formattedString);
  }, [location.pathname]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,

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
          const filterData = pmCriticalMateriaConfigData.filter(
            (item) => item?.Category === "SCM_441_Critical_Material"
          );
          const sortedData = filterData.sort(
            (a, b) => a.Positioning - b.Positioning
          );

          const newColumnDefs = sortedData
            .map((config) => {
              const columnDef = {
                field: config.DbKey,
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

    processColumnData(pmCriticalMaterialData);
  }, [pmCriticalMaterialData, pmCriticalMateriaConfigData]);

  useEffect(() => {
    dispatch(getCriticalMaterialData());
    dispatch(getCriticalMaterialConfigData());
  }, []);

  useEffect(() => {
    if (pmCriticalMaterialData?.length) {
      const pmCriticalMaterialTempData = [...pmCriticalMaterialData];
      setRowData(pmCriticalMaterialTempData);
    }
  }, [pmCriticalMaterialData]);

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
                  <VillaIcon className="icon-chart" /> 441 Critical Material
                </Typography>
                <Tooltip title="Download Excel" placement="bottom" arrow>
                  <Button
                    onClick={() =>
                      handleExportToExcel(
                        gridApiLocation,
                        "441 Critical Material"
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

export default CriticalMaterial;
