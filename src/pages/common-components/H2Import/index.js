import { useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { LicenseManager } from "ag-grid-enterprise";
import { DownloadTemplateExcel } from "redux/actions/Scm/H2Template";
import { Typography , Button,Box} from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import { CircularProgress } from '@mui/material';
import { IoCaretBackCircle } from "react-icons/io5";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-enterprise";
import { useDispatch , useSelector } from "react-redux";

LicenseManager.setLicenseKey(
  "[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-052646}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{29 February 2024}____[v3]_[0102]_MTcwOTE2NDgwMDAwMA==b1896dfdfbb4dc28dfd4e4366ce39bbd"
);

const useStyles = makeStyles({
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
});

const H2Import = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
 
  const {downloadLoading} = useSelector((state) => state.H2ScmReducer)
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf("templates/") + 10
    );
    const formattedString = extractedString.replace(/-/g, " ");
    setTitleTable(formattedString);
  }, [location.pathname]);

  //handelClick
  const handleDownloadExcelReport = (values) => {
    const data = {
      //templateType:'ExportPurchaseOrderTemplate', 
     templateType:'ExportH2Template',
      body:{
        reportType:'',
        searchQuery:''
      }
    }
    if (data) {
      const fileName = `summaryReport(${data?.fromDate}_${data?.toDate})`
      dispatch(DownloadTemplateExcel(data))
    }
  }

  console.log('downloadLoading',downloadLoading)

  const getServerSideDatasource = () => {
    return {
      getRows: (params) => {
        const { startRow, endRow, filterModel, sortModel } = params.request;
        let url =   `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/getH2/`;
         
        let sortQuery = "";
        
        // for sorting
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          sortQuery = `_sort=${colId}&_order=${sort}&`;
        }
        
        // for Filtering
        const filterKeys = Object.keys(filterModel);
        filterKeys.forEach((filter) => {
          console.log(`${filter}=${filterModel[filter].filter}&`);
        });

        // for Pagination
        const pageSize = endRow - startRow;
        const pageNumber = startRow / pageSize + 1;

        fetch(
          `${url}?pageNumber=${pageNumber}&pageSize=${pageSize}&JsonOutput=true`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
          )
          .then((resp) => resp.json())
          .then((data) => {
          console.log("resultObj", data)
            if (data.success) {
              let parseObject = JSON.parse(data.responseObject);
              let resultObj = parseObject.results;

              let result = JSON.parse(resultObj);
              //
              // Calculate sums for each column
              let netPriceSum = 0;
              let totalValueSum = 0;

              result.forEach((row) => {
                netPriceSum += parseFloat(row.Net_Price || 0);
                totalValueSum += parseFloat(row.Total_Value || 0);
              });

              // Format sums in INR format
              let formatter = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              });

              // Create pinned row with formatted sums for "Net_Price" and "Total_Value" columns
              let pinnedRow = {
                Net_Price: formatter.format(netPriceSum),
                Total_Value: formatter.format(totalValueSum),
              };

              // Update AG Grid's pinnedTopRowData with the sums
             //params.api.setPinnedTopRowData([pinnedRow]);
              ///
              const keys = Object.keys(result[0]);
              const newColumnDefs = keys.map((key) => {
                let filterType: string;
                const datePattern = /^\d{2}-\d{2}-\d{4}$/;
                if (datePattern.test(result[0][key])) {
                  filterType = "agDateColumnFilter";
                } else if (isNaN(result[0][key])) {
                  filterType = "agTextColumnFilter";
                } else if (!isNaN(result[0][key])) {
                  filterType = "agNumberColumnFilter";
                }
                // replacing _ 
                //return { field: key, filter: filterType };
                
                return { field: key.replace(/_/g, " "), filter: filterType };
              });

              setColumnDefs(newColumnDefs);

              params.successCallback(result, parseObject.count);
            } else {
              params.failCallback();
            }
          });
      },
    };
  };
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      autoHeaderHeight: true,
      resizable: true,
      headerClass: classes.customHeader,
      wrapHeaderText: true,
      floatingFilter: true,
      filter: "agMultiColumnFilter",
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    var datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h1" component="h2">
          {TitleTable}
        </Typography>
        
       
         <Box 
         display='flex'
         alignItems='center'
         >
           <Button 
           onClick={handleDownloadExcelReport}
         disabled={downloadLoading}
           variant='contained' color='primary' title='Download Excel'>   
           {
            downloadLoading ? <CircularProgress style={{color:"#fff"}} size={25} /> :  <FaFileDownload size={25} /> 
           }
          </Button>
         <IoCaretBackCircle
          title="Back"
          onClick={() => navigate(-1)}
          style={{ fontSize: "33px", cursor: "pointer" }}
        />
         
        </Box>
      </div>

      <div style={containerStyle}>
     
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowModelType={"serverSide"}
            pagination={true}
            paginationPageSize={20}
            onGridReady={onGridReady}
            serverSideStoreType="partial"
          />
        </div>
      </div>
    </>
  );
};

export default H2Import;
