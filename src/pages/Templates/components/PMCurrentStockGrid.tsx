import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Typography, Paper, Box, Button, Grid, Tooltip } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { makeStyles } from "@mui/styles";
import DownloadExcel from "./DownloadExcel";
import usePurchase from "pages/PurchaseTemplates/hooks/usePurchase";
import CategoryIcon from "@mui/icons-material/Category";
import { formatNumber } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";
import getServerSideData from "../helpers/GetserverSideData";
const PMCurrentStockGrid = ({
  title,
  category,
  mainApi,
  configApi,
  configTempEndPoint,
}) => {
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
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const classes = useStyles();
  const [columnDefs, setColumnDefs] = useState([]);
  const avoidFlex = ["SCM_Purchase_Order_Details"];

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: true,
      flex: avoidFlex?.includes(configTempEndPoint) ? undefined : 1,
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
      groupIncludeFooter: true,
      suppressAggFuncInHeader: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    var datasource = getServerSideData({
      mainApi: mainApi,
      configApi: configApi,
      configTempEndPoint: configTempEndPoint,
      setColumnDefs: setColumnDefs,
    });
    params.api.setServerSideDatasource(datasource);
    setGridApi(params.api);
  }, []);

  return (
    <>
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
          <CategoryIcon className="icon-chart" /> {title}
        </Typography>
        <DownloadExcel {...{ gridApi, title: title }} />
      </div>
      <div className="ag-theme-alpine" style={gridStyle}>
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
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
};

export default PMCurrentStockGrid;
