import React, { useCallback, useEffect, useRef } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { userMappingColom } from "../RoleMaster/utils";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import AgGridTable from "pages/common-components/AgGridTable";
import Mappings from "./components/Mappings";
import {
  getAreaData,
  getCountryData,
  getSiteData,
  getStateData,
  getUserMappingListing,
  getUserSiteMappings,
} from "redux/actions/UserSiteMapping";
import Spinner from "pages/common-components/Spinner";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
const componentStyle = {
  width: "100%",
  height: "calc(100vh - 130px)",
};

const defaultColDef = {
  floatingFilter: true,
};

function UserSiteMapping() {
  const dispatch = useDispatch();
  const gridRef = useRef();
  const state = useSelector((state) => state);

  const [openside, setSide] = React.useState(true);
  const [openId, setId] = React.useState(null);
  const [selEmpCode, setSelEmpCode] = React.useState(null);
  const [mainLoader, setMainLoader] = React.useState(false);
  const [empMail,setEmpMail] = React.useState(null);

  const Listing = state?.UserSiteMapping?.userMapping || [];
  const siteListing = state?.UserSiteMapping?.userSitesMapping?.userSiteResponses || [];
  const roleObj = state?.UserSiteMapping?.userSitesMapping?.roleObj || {};
  const columnDefs = userMappingColom?.columnDefs;
  const loader = state?.UserSiteMapping?.loader;

  useEffect(() => {
    dispatch(getUserMappingListing());
    dispatch(getCountryData());
  }, [dispatch]);

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  const unSelect = () => {
    gridRef.current.api.deselectAll();
  }

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
    dispatch(getUserSiteMappings({ user: params?.data?.username, employeeCode: params?.data?.employeeCode }));
    setId(params?.data?.username);
    setSelEmpCode(params?.data?.employeeCode);
    setEmpMail(params?.data?.employeeEmail);
    setSide(true);
    setMainLoader(true);
    setTimeout(() => {
      setMainLoader(false);
    }, 200);
  };

  return (
    <div className="mapping-root">
      {/* <Typography variant="h4">User Site Mapping</Typography> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">User Site Mapping</Typography>
        <Link to="/kpis">
          <HomeIcon style={{ color: '#019E89' }} />
        </Link>
      </Box>
      <br />
      <Grid container spacing={1}>
        <Grid item md={openside ? 4.5 : 12}>
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
          <Grid item md={7.5}>
            <Paper>
              {mainLoader ? (
                <Spinner />
              ) : (
                <Mappings
                  loader={loader}
                  openId={openId}
                  setId={setId}
                  selEmpCode={selEmpCode}
                  setSelEmpCode={setSelEmpCode}
                  empMail={empMail}
                  setEmpMail={setEmpMail}
                  unSelect={unSelect}
                  siteListing={siteListing}
                  componentStyle={componentStyle}
                  defaultColDef={defaultColDef}
                  roleObj={roleObj}
                />
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default UserSiteMapping;
