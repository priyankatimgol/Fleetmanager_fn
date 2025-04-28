import { Grid, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Buttons } from "pages/common-components/Button";
import { useDispatch } from "react-redux";
import { setAddEditRoleMaster } from "redux/actions/RoleMasterActions";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
function AddRoles() {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setAddEditRoleMaster(true));
  }
  return (
    <Grid container spacing={1} justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Role Master</Typography>
      </Grid>
      <Grid item>
        <Buttons
          onClick={handleOpen}
          startIcon={<AddCircleOutlineRoundedIcon />}
          name="Add New Role"
          variant="outlined"
          className="add_role_button"
        />
        <Link to="/kpis">
          <HomeIcon style={{ color: '#019E89' }} />
        </Link>
      </Grid>
    </Grid>
  );
}

export default AddRoles;
