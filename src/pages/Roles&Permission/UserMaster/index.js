import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import RoleListSelector from "./components/AssignedRolesList";
import { useDispatch, useSelector } from "react-redux";
import { getRoleByGroup, getUserMasterListing } from "redux/actions/UserMasterActions";
import { Buttons } from "pages/common-components/Button";
import Spinner from "pages/common-components/Spinner";
import { SelctionPart } from "./components/SelectionPart";
import "./style.css";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

function UserMaster() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const RoleByGroup = state?.groupMaster?.roleByGroup || [];
  const loader = state?.groupMaster?.loader;
  const groupData = state?.groupMaster?.selectListing || [];
  const [groupName, setGroupName] = React.useState("");

  useEffect(() => {
    dispatch(getUserMasterListing());
  }, [dispatch]);

  useEffect(() => {
    if (groupName) {
      dispatch(getRoleByGroup(groupName));
    }
  }, [dispatch, groupName]);

  return (
    <div className="groupMaster">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Role Group Mapping</Typography>
        <Link to="/kpis">
          <HomeIcon style={{ color: '#019E89' }} />
        </Link>
      </Box>
      <Paper>
        <SelctionPart groupData={groupData} groupName={groupName} setGroupName={setGroupName} />
        {loader ? (
          <Spinner />
        ) : (
          <RoleListSelector groupName={groupName} RoleByGroup={RoleByGroup} />
        )}
      </Paper>
    </div>
  );
}

export default UserMaster;
