import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CheckboxSections from "../CheckBoxSelections";
import { Buttons } from "pages/common-components/Button";
import Spinner from "pages/common-components/Spinner";
import { useDispatch } from "react-redux";
import { getRolePermissionUpdate } from "redux/actions/rolePermissionActions";

function Listing({ mapedRoles, componentStyle, loader, openId }) {
  const entity = mapedRoles?.map((item) => item.entityCategory);
  const dispatch = useDispatch();
  const entityMapedRoles = (arrItem) => {
    return [...new Set(arrItem)];
  };

  const handleSubChilds = (item) => {
    const filt = mapedRoles?.filter((i) => i.entityCategory === item);
    return filt?.map((i) => {
      return {
        Subtitle: i?.entityName,
        checked: i?.status === "Active" ? true : false,
        id: i?.id,
      };
    });
  };

  if (loader) {
    return (
      <Paper style={componentStyle}>
        <Spinner />
      </Paper>
    );
  }

  const handleOnUpdate = () => {
    dispatch(getRolePermissionUpdate(openId))
  }
  return (
    <Paper style={componentStyle} className="per_scroll">
      <Box sx={{ p: 2 }}>
        {entityMapedRoles(entity)?.length > 0 ? (
          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Buttons
                onClick={handleOnUpdate}
                name="Update Role Permissions"
                variant="outlined"
                className="add_role_button"
              />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h5" align="center">
            {" "}
            No Permissions Found
          </Typography>
        )}
        {entityMapedRoles(entity)?.map((item) => {
          return (
            <CheckboxSections
              labelVal={item}
              mapedRoles={mapedRoles}
              inputChecks={handleSubChilds(item)}
            />
          );
        })}
      </Box>
    </Paper>
  );
}

export default Listing;
