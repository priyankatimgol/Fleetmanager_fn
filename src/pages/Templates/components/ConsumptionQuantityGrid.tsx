import React , {useMemo,useState,useCallback} from 'react'
import {dataForTable} from '../fakedata'
import {    Select, MenuItem } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import CategoryIcon from "@mui/icons-material/Category";
import {
    ColDef,
    GridReadyEvent,
  
    KeyCreatorParams,
    ValueFormatterParams,
  } from "ag-grid-community";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import DownloadExcel from './DownloadExcel';
import { makeStyles } from "@mui/styles";
const ConsumptionQuantityGrid = ({data}:any) => {
    const gridStyle = useMemo(() => ({ height: "365px", width: "100%" }), []);

    const useStyles = makeStyles({
        customRoot: {
          '& .ag-body-viewport, & .ag-center-cols-viewport': {
            scrollbarWidth: 'auto!important',
          },
          "& .ag-body-viewport::-webkit-scrollbar, & .ag-center-cols-viewport::-webkit-scrollbar": {
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
          padding: '25px 5px',
          flexDirection:'column', 
         
          borderRadius: '5px',
          transition: 'box-shadow 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 600,
          color: '#3e79ff',
          position:'relative',
          background: '#daefec',
          // border: '1px solid #e3e3e3',
        },
      });

    const [rowData, setRowData] = useState<any[]>([...data]);
  const classes = useStyles();

  const CustomHeader = (props) => {
    return <span>{props.displayName}</span>;
  };
  const roundTwoDecimal = (params:any) => {
    const value = params.value || 0;
    return Math.round(value * 100) / 100; // Round to two decimal places
  };
  
  const [gridApi, setGridApi] = useState(null);
  
  const CustomHeaderComponent = (props: any) => {
    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // Handle dropdown change
    };

    return (
        <Box display="flex" alignItems="center">
            <Typography>dsdsd</Typography>
            <Select
                value={2023} // Initial value
               // onChange={handleYearChange}
            >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
            </Select>
        </Box>
    );
};
  const [columnDefs, setColumnDefs] = useState<ColDef[] | any>([
    {
      headerName: '2023-2024',
      headerComponentFramework: CustomHeaderComponent, // Pass reference to function
      headerComponentParams: { displayName: '2023-2024', textAlign: 'left' },
     
      children:[
        { field: "state", rowGroup: true, hide: true,width:110, },
   
    // { field: "FYear", },
    { field: "Q1",aggFunc: "sum" ,  width:100,valueFormatter: roundTwoDecimal, headerComponentFramework: CustomHeader  },
    
    { field: "Q2", aggFunc: "sum" ,  width:100,valueFormatter: roundTwoDecimal, headerComponentFramework: CustomHeader },
    { field: "Q3",aggFunc: "sum" ,  width:100,valueFormatter: roundTwoDecimal, headerComponentFramework: CustomHeader },
    { field: "Q4",aggFunc: "sum" ,  width:100,valueFormatter: roundTwoDecimal, headerComponentFramework: CustomHeader },
    { field: "Total_Quantity", headerComponentFramework: CustomHeader ,headerName: 'Total Quantity',aggFunc: "sum" ,  width:110,valueFormatter: roundTwoDecimal,   }
      ]
    }
    ,
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
     
    
      resizable: true,
    };
  }, []);

  const gridOptions = {
    // adds subtotals
    groupIncludeFooter: true,
    // includes grand total
    suppressAggFuncInHeader:true,
    frameworkComponents: {
      customTitle: CustomHeaderComponent,
    },
    // other grid options ...
  };
  const onGridReady = useCallback((params: GridReadyEvent) => {
 
  }, []);

  return (
     <>
     <div className="card-inside" style={{ position: "relative" ,display:'flex',width:"100%",justifyContent:"space-between" }}>
                    <Typography className="title-card flex-div">
                      <CategoryIcon className="icon-chart" />
                      Consumption Quantity By State, Plant Name, Plant, Year,
                      Quarter
                    </Typography>
                    <DownloadExcel  {...{gridApi,title:"Quantity By State, Plant Name, Plant, Year Quarter"}} />
                  </div>
                  <div className="ag-theme-alpine" style={gridStyle}>
      <AgGridReact
       className={classes.customRoot}
        rowData={rowData}
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
    
     </>
 
  )
}

export default ConsumptionQuantityGrid
