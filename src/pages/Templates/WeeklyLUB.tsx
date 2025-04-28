import {useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import getServerSideData from "./helpers/GetserverSideData";
import {
  Typography,
  Grid,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useSelector, useDispatch } from "react-redux";
import {
  getWeeklyLUB_IBLevelConfigData,
  getWeeklyLUB_IBLevelData,
  getWeeklyLUB_StateLevelConfigData, 
  getWeeklyLUB_StateLevelData,
} from "redux/actions/Scm/WeeklyLUB";
import { FaFileDownload } from "react-icons/fa";
import VillaIcon from "@mui/icons-material/Villa";
import { formatNumber } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import PMCMWGraph from "./components/PMCMWGraph";
import { MenuItem } from "@mui/material";
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
});

const WeeklyLUB = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "350px", width: "100%" }), []);
  const [filterCategory, setFilterCategory] = useState<null | undefined | "">(
    ""
  );
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
   
  console.log("Current Year:", currentYear);
  
  const [SelectedCategory, setSelectedCategory] = useState('MH');
 
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefss, setColumnDefss] = useState([]);
  const [rowDataa, setRowDataa] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [gridApiLocation, setGridApiLocation] = useState(null);
  const {
    pmCriticalMaterial,
    pmCriticalMatirialConfigData,
    pmGraphData,
    categories,
    weeklyLUB,
    weeklyLUBConfigData,
    SLweeklyLUB,
    SLweeklyLUBConfigData,

  } = useSelector((state: any) => state.WeeklyLUB);

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
  
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
   
  };
  console.log("selected catogory:",SelectedCategory);

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

  const intialVal = {
    state: null,
    area: null,
    site: null,

    materialCategory: null,
    materialCode: null,
  };

  const getServerSideDatasource1 = useCallback(() => {
    console.log("check::")
    return {
      getRows: async (params) => {
        let filterStr = JSON.stringify(params.request);
  
        let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getWeeklyLUBStateLevel?queryParam=${filterStr}&state=${SelectedCategory}`;
        let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/GetColumnConfigurations?template=WeeklyLUB_StateLevel`;
  
        let header = {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        };
  
        try {
          const colDefResponse = await fetch(colDefObject, header);
          const colDef = await colDefResponse.json();
  
          const response = await fetch(`${url}`, header);
          let data = await response.json();
          console.log("data after api call", data);
  
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
            let filterType = 'agTextColumnFilter';
            let headerName = key;
            let positioning;
            let displayWidth;
            let isEditable;
            let isFreeze;
  
            if (Array.isArray(colDef)) {
              const matchingObject = colDef.find((obj) => obj.DbKey === key);
              if (matchingObject) {
                headerName = matchingObject.DisplayText;
                positioning = matchingObject.Positioning;
                displayWidth = matchingObject.DisplayWidth;
                isEditable = matchingObject.IsEditable;
                isFreeze = matchingObject.IsFreeze;
                switch (matchingObject.DataType) {
                  case 'date':
                    filterType = 'agDateColumnFilter';
                    break;
                  case 'decimal':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'int':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'text':
                    filterType = 'agTextColumnFilter';
                    break;
                  default:
                    break;
                }
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
            };
          });
  
          newColumnDefs.sort((a, b) => a.positioning - b.positioning);
          setColumnDefss(newColumnDefs);
  
          params.successCallback(data);
        } catch (error) {
          console.error('Error:', error);
        }
      },
    };
  }, [SelectedCategory]);
  
  const onGridReady1 = useCallback((params) => {
    var datasource = getServerSideDatasource1();
    setGridApiLocation(params.api);
    params.api.setServerSideDatasource(datasource);
  }, [getServerSideDatasource1]);
  
 
  useEffect(() => {
    // Define a function to fetch data from the server and update the grid
    const fetchDataAndUpdateGrid = async () => {
        const datasource = getServerSideDatasource1();
        // Assuming gridApiLocation is accessible here or you have another way to access it
        gridApiLocation.setServerSideDatasource(datasource);
    };

    // Call the function to fetch data and update the grid when SelectedCategory changes
    fetchDataAndUpdateGrid();

}, [SelectedCategory, getServerSideDatasource1, gridApiLocation]);
   
console.log('gridApiLocation',gridApiLocation)
  const getServerSideDatasource = () => {
    return {
      getRows: async (params) => {
        let filterStr = JSON.stringify(params.request);

        let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getWeeklyLUBIBLevel?queryParam=${filterStr}`;
        let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/GetColumnConfigurations?template=WeeklyLUB_IB_Level`;

        let header = {
          headers: {
            'ngrok-skip-browser-warning': '69420',
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
            let filterType = 'agTextColumnFilter';
            let headerName = key;
            let positioning;
            let displayWidth;
            let isEditable;
            let isFreeze;

            if (Array.isArray(colDef)) {
              const matchingObject = colDef.find((obj) => obj.DbKey === key);
              if (matchingObject) {
                headerName = matchingObject.DisplayText;
                positioning = matchingObject.Positioning;
                displayWidth = matchingObject.DisplayWidth;
                isEditable = matchingObject.IsEditable;
                isFreeze = matchingObject.IsFreeze;
                switch (matchingObject.DataType) {
                  case 'date':
                    filterType = 'agDateColumnFilter';
                    break;
                  case 'decimal':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'int':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'text':
                    filterType = 'agTextColumnFilter';
                    break;
                  default:
                    break;
                }
              }
            }

          // Update header name based on key
          if (headerName === 'Cons. Y1') {
            // Get current year and next year for the current financial year
            const currentDate = new Date();
            const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
            headerName = `Cons. ${currentYear}-${currentYear + 1}`;
          } else if (headerName === 'Cons. Y2') {
            // Get previous year for last financial year
            const currentDate = new Date();
            const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
            headerName = `Cons. ${currentYear - 1}-${currentYear}`;
          } else if (headerName === 'Cons. Y3') {
            // Get two years ago for the last-1 financial year
            const currentDate = new Date();
            const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
            headerName = `Cons. ${currentYear - 2}-${currentYear - 1}`;
          }
            return {
              field: key,
              filter: filterType,
              headerName: headerName,
              positioning: positioning,
              width: displayWidth,
              editable: isEditable,
              lockPosition: isFreeze,
            };
          });

          newColumnDefs.sort((a, b) => a.positioning - b.positioning);
          setColumnDefs(newColumnDefs);

          params.successCallback(data);
        } catch (error) {
          console.error('Error:', error);
        }
      },
    };
  };
  const onGridReady = useCallback((params) => {
    var datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
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
                {/* <small> ( All values in Lakh ) </small> */}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

   

      <div style={containerStyle}>
        {/* stateLevel */}
    


<Grid container spacing={2} marginTop={0.5}>
  <Grid item sm={12} lg={12}>
    <div className="card-inside" style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Align items vertically
          marginBottom: "10px",
        }}
      >
        {/* Left section containing "State Level" text */}
        <div>
          <Typography className="title-card flex-div">
            <VillaIcon className="icon-chart" /> State Level
          </Typography>
        </div>

        {/* Right section containing the select box and download Excel button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Select box */}
          <FormControl sx={{ minWidth: 110, marginRight: "7px" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Select Category"
              value={SelectedCategory}
              onChange={handleChange}
              style={{ width: "200px" }}
            >
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="GJ-Kutchh">GJ-Kutchh</MenuItem>
              <MenuItem value="GJ-Saurashtra">GJ-Saurashtra</MenuItem>
              <MenuItem value="MH">MH</MenuItem>
              <MenuItem value="MP">MP</MenuItem>
              <MenuItem value="KN">KN</MenuItem>
              <MenuItem value="AP">AP</MenuItem>
              <MenuItem value="TN">TN</MenuItem>
              <MenuItem value="GRPK">GRPK</MenuItem>
              <MenuItem value="Daman OMS">Daman OMS</MenuItem>
            </Select>
          </FormControl>

          {/* Download Excel button */}
          <Tooltip title="Download Excel" placement="bottom" arrow>
            <Button
              onClick={() =>
                handleExportToExcel(
                  gridApiLocation,
                  "State Level"
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
      </div>
      <div className="ag-theme-alpine" style={gridStyle} id="location">
        <AgGridReact
          key="grid-3"
          className={classes.customRoot}
          columnDefs={columnDefss}
          defaultColDef={defaultColDef}
          rowModelType={"serverSide"}
          cacheBlockSize={100}
          maxBlocksInCache={10}
          onGridReady={onGridReady1}
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



        {/*IB table */}
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
                  <VillaIcon className="icon-chart" /> IB Level
                </Typography>
                <Tooltip title="Download Excel" placement="bottom" arrow>
                  <Button
                    onClick={() =>
                      handleExportToExcel(
                        gridApiLocation,
                        "IB Level"
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
    </>
  );
};

export default WeeklyLUB;
