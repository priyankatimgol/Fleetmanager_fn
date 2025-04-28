import React, { useMemo, useState, useEffect } from "react";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { makeStyles } from "@mui/styles";
import DownloadExcel from "./DownloadExcel";
import usePurchase from "pages/PurchaseTemplates/hooks/usePurchase";
import CategoryIcon from "@mui/icons-material/Category";
const ConsumptionMainGrid = ({ Consumption, ColumnDef }) => {
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
      color: "#000",
      borderRadius: 5,
      margin: "0",
      justifyContent: "space-between",
    },
    customTooltip: {
      fontSize: "16px !important",
    },
    materialCheckbox: {
      "& .MuiOutlinedInput-root": {
        padding: "3px !important",
        height: "37px !important",
      },
    },
  });
  const { generateRandomColors, addFormatter } = usePurchase();
  const [rowData, setRowData] = useState([]);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const classes = useStyles();
  const [columnDefs, setColumnDefs] = useState([]);

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: true,
      flex: 1,
      autoHeaderHeight: true,
      resizable: true,
      headerClass: classes.customHeader,
      wrapHeaderText: true,
      enableRowGroup: true,
      sortable: true,
    };
  }, []);

  const [gridApi, setGridApi] = useState(null);
  const gridOptions: any = useMemo(
    () => ({
      enableRowGroup: true,
      rowGroupPanelShow: "always", // Enable drag and drop row group
    }),
    []
  );

  const consolePaams = (params, at, hd) => {
    console.log("params", params);
  };

  //  const handleColumnMoved = (event) => {
  //   // Get the list of columns after the move
  //   const newColumnDefs = event.columnApi.getAllColumns();

  //   // Update the column definitions
  //   setColumnDefs(newColumnDefs);

  //   // Optionally, update the grid data if needed
  //   // setRowData(newRowData);
  // };
  useEffect(() => {
    try {
      let result = Consumption;
      const columnData = ColumnDef;

      const filterData = columnData;
      const sortedData = filterData.sort(
        (a, b) => a.Positioning - b.Positioning
      );

      const newColumnDefs = sortedData
        .map((config) => {
          if (result[0].hasOwnProperty(config.DbKey)) {
            let filterType;
            switch (config.DataType) {
              case "text":
                filterType = "agTextColumnFilter";
                break;
              case "decimal" || "number" || "int":
                filterType = "agNumberColumnFilter";
                break;
              case "date":
                filterType = "agDateColumnFilter";
                break;
              default:
                filterType = "agSetColumnFilter";
            }

            return {
              field: config?.DbKey,
              type:
                config?.DataType === "decimal" || config?.DataType === "int"
                  ? "numericColumn"
                  : "",
              headerName: config?.DisplayText,
              //   minWidth: config?.DisplayWidth,
              //width:215,
              tooltip: config?.Tooltip,
              editable: config?.IsEditable,
              cellStyle: {
                textAlign: config?.DataType === "decimal" ? "right" : "center",
              },
              valueFormatter: (params) =>
                addFormatter(params.data, config?.DataType, config?.DbKey),
              lockPosition: config?.IsFreeze,
              filter: "agMultiColumnFilter",
              filterParams: {
                filters: [
                  {
                    filter: filterType,
                  },
                  {
                    filter: "agSetColumnFilter",
                  },
                ],
              },
            };
          }
        })
        .filter(Boolean);

      setColumnDefs(newColumnDefs);
      result[0].rowPinned = "top";
      setRowData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  console.log("ColumnDef", ColumnDef);
  return (
    <>
      <div className="card-inside" style={{ position: "relative" ,display:'flex',width:"100%",justifyContent:"space-between" }}>
       
        <Typography className="title-card flex-div">
          <CategoryIcon className="icon-chart" /> Functional Location Level
          Consumption For This Year
        </Typography>
        <DownloadExcel  {...{gridApi,title:"Functional Location Level Consumption"}} />
      </div>
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          className={classes.customRoot}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          pagination={true}
          //onColumnMoved={handleColumnMoved}
          onGridReady={(params) => setGridApi(params.api)}
          paginationPageSize={500}
          suppressExcelExport={false}
          rowHeight={23}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
};

export default ConsumptionMainGrid;
