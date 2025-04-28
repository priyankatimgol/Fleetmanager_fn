import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, MenuItem } from "@mui/material";
import { Buttons } from "pages/common-components/Button";
import { Formik } from "formik";
import {
  FormTextField,
  MySelect,
} from "pages/common-components/FormComponents";
import { AddRolesValidations, statusList } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addNewRole, editRoleMaster, setAddEditRoleMaster, updateRoleFor } from "redux/actions/RoleMasterActions";
import '../../style.css'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 800,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddEditModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const open = state?.roleMaster?.modalOpen;
  const editDetails = state?.roleMaster?.editRole;
  const intialVal = {
    r_name: editDetails?.roleName || "",
    r_description: editDetails?.roleDescription || "",
    g_code: editDetails?.groupCode || "",
    status: editDetails?.status || "",
  };

  const handleClose = () => {
    dispatch(setAddEditRoleMaster(false));
    dispatch(updateRoleFor({}));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h4">{editDetails?.roleName ? "Edit" : "Add"} New Role</Typography>
        <br />
        <Formik
          initialValues={intialVal}
          validationSchema={AddRolesValidations}
          onSubmit={(values) => {
            const postObj = {
              roleName: values.r_name,
              roleDescription: values.r_description,
              status: values.status,
              groupCode: values.g_code,
            };
            if(editDetails?.id){
              dispatch(editRoleMaster({...postObj, id:editDetails?.id}));
            }
            else {
              dispatch(addNewRole(postObj));
            }
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <FormTextField
                      toplabel="*Role Name"
                      name="r_name"
                      type="text"
                      //placeholder="First Name"
                      onChange={handleChange}
                      value={values.r_name}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          height: "3px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={8}>
                    <FormTextField
                      toplabel="*Role Description"
                      name="r_description"
                      type="text"
                      //placeholder="First Name"
                      onChange={handleChange}
                      value={values.r_description}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          height: "3px",
                        },
                      }}
                    />
                  </Grid>
                  {/* <Grid item md={4}>
                    <MySelect toplabel="*Group Code" name="g_code">
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Group Code
                      </MenuItem>
                      {statusList?.map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </MySelect>
                  </Grid> */}
                  <Grid item md={4}>
                    <MySelect toplabel="*Status" name="status">
                      <MenuItem className="color-appgrey" value="" disabled>
                        Select Status
                      </MenuItem>
                      {statusList?.map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </MySelect>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  className="mt-10"
                >
                  <Grid item>
                    <Buttons
                      variant="outlined"
                      onClick={handleClose}
                      name="Cancel"
                      size='medium'
                      className='add_role_button'
                    />
                  </Grid>
                  <Grid item>
                    <Buttons
                      variant="contained"
                      type="submit"
                      size='medium'
                      className="Sub-btn"
                      name="Submit"
                    />
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
