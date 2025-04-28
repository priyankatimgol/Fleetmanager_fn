import React from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { userTableColumns } from "../../utils";
import { Buttons } from "pages/common-components/Button";
import { useDispatch } from "react-redux";
import { updateGroupMaster } from "redux/actions/UserMasterActions";
import '../../style.css'

function RoleListSelector({ RoleByGroup, groupName }) {
  const data = { columns: userTableColumns, rows: RoleByGroup };
  const [selectionModel, setSelectionModel] = React.useState(() =>
    data?.rows.filter((i) => i.isAssigned).map((r) => r.id)
  );

  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSubmitGrpMaster = () => {
    const objPay = selectedRows.map((i) => {
      return {
        id: i.id,
        status: i.status,
        groupCode: groupName,
      };
    });
    dispatch(updateGroupMaster(objPay, groupName));
  };
  return (
    <>
      <Box sx={{ width: "100%", pr: 3, pb: 14, pl: 3 }}>
        <Typography variant="h5" sx={{ p: 1 }}>
          Role Permission
        </Typography>
        <Paper style={{ height: '100vh', width: "100%" }} className="rolePermissionGrid">
          <DataGrid
            {...data}
            className="checkBoxColor"
            checkboxSelection
            rowsPerPageOptions={[]}
            rowHeight={37}
            headerHeight={35}
            selectionModel={selectionModel}
            onSelectionModelChange={(e) => {
              setSelectionModel(e);
              const selectedIDs = new Set(e);
              const selectedRows = data?.rows?.filter((r) =>
                selectedIDs.has(r.id)
              );
              setSelectedRows(selectedRows);
            }}
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
          />
        </Paper>
        <Buttons
          variant="contained"
          type="submit"
          className="Sub-btn"
          name="Submit"
          onClick={handleSubmitGrpMaster}
        />
      </Box>
    </>
  );
}

export default RoleListSelector;
