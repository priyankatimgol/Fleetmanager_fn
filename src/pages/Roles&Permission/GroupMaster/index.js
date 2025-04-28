import React, { useCallback, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { grptempData } from "../RoleMaster/utils";
import "./style.css";
import ListingComp from "./components/Listing";
import { useDispatch, useSelector } from "react-redux";
import {
  getRolePermissionListing,
  getRolePermissionWithId,
} from "redux/actions/rolePermissionActions";
import AgGridTable from "pages/common-components/AgGridTable";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const componentStyle = {
  width: "100%",
  height: "calc(100vh - 130px)",
};

const defaultColDef = {
  floatingFilter: true,
};

function GroupMaster() {
  const dispatch = useDispatch();
  const gridRef = useRef();
  const state = useSelector((state) => state);
  const [openside, setSide] = React.useState(false);
  const [openId, setId] = React.useState(null);
  const Listing = state?.rolePermission?.rolesPermissionListing;
  const columnDefs = grptempData?.columnDefs;
  const mapedRoles = state?.rolePermission?.assignedPermitions;
  const loader = state?.rolePermission?.loader;

  useEffect(() => {
    dispatch(getRolePermissionListing());
  }, [dispatch]);

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  useEffect(() => {
    if (gridRef.current !== undefined) {
      gridRef.current?.columnApi?.autoSizeAllColumns(false);
      gridRef.current?.api?.sizeColumnsToFit({
        columnLimits: [
          { key: "groupCode", width: 200 },
          { key: "roleDescription", width: 100 },
          { key: "roleName", width: 200 },
        ],
      });
    }
  }, [openside]);

  const handleRowClick = (params) => {
    dispatch(getRolePermissionWithId(params?.data?.id));
    setId(params?.data?.id);
    setSide(true);
  };

  return (
    <div className="role-per">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Role Permission</Typography>
        <Link to="/kpis">
          <HomeIcon style={{ color: '#019E89' }} />
        </Link>
      </Box>
      <br />
      <Grid container spacing={1}>
        <Grid item md={openside ? 7 : 12}>
          <AgGridTable
            gridRef={gridRef}
            rowData={Listing}
            columnDefs={columnDefs}
            Style={componentStyle}
            rowHeight={32}
            onCellClicked={(props) => handleRowClick(props)}
            rowSelection={"single"}
            getRowHeight={getRowHeight}
            defaultColDef={defaultColDef}
          />
        </Grid>
        {openside && (
          <Grid item md={5}>
            <ListingComp
              loader={loader}
              openId={openId}
              mapedRoles={mapedRoles}
              componentStyle={componentStyle}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default GroupMaster;
