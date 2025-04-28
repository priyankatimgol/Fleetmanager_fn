import React, { useState, useCallback } from "react";
import { Grid } from "@mui/material"
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { histroyDetailHeader } from '../../utils';
import AgGridTable from "pages/common-components/AgGridTable";

export default function DetailOfTaskHistory({ onCloseModel, openDetailModel, historyList }) {

  const handleClose = () => {
    onCloseModel()
  };

  const [columnDefs, setColumnDefs] = useState([
    // {
    //   field: "Action",
    //   pinned: 'left',
    //   // cellRenderer: ()=> EditTask(onOpenDrawer, setMode),
    //   width: 90,
    // },
    ...histroyDetailHeader?.columnDefs,
  ]);

  const componentStyle = { width: "auto", height: 510 };
  const defaultColDef = { sortable: true, floatingFilter: true };
  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  return (
    <div className="addTaskWrapperUpdate full-height">
      <Grid className="full-height" container columnSpacing={2}>
        <Grid item md={12}>
          <div className="dis-flex-start">
          <IconButton
            aria-label="close"
            sx={{
              // position: "absolute",
              padding: '0px 9px 0px 9px',
              right: 10,
              bottom: 3,
              color: "#00a18b",
            }}
            onClick={handleClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4">Detail Of task history</Typography>
          </div>
          <br />
          <div className="list-root">
            <AgGridTable
              rowData={historyList ?? []}
              columnDefs={columnDefs}
              Style={componentStyle}
              defaultColDef={defaultColDef}
              getRowHeight={getRowHeight}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
