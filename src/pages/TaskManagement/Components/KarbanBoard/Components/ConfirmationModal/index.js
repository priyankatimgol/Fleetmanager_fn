import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { Buttons } from "pages/common-components/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 400,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

export default function ConfirmationModal({ open, handleClose, handleConfirmation }) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h4">Confirmation</Typography>
        <Typography variant="h5" align="center" className="conf_msg">
          Are you sure you want to move this ticket?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Buttons
              variant="contained"
              size="medium"
              onClick={handleConfirmation}
              className="Sub-btn"
              name="Yes"
            />
          </Grid>
          <Grid item>
            <Buttons
              variant="outlined"
              onClick={handleClose}
              name="No"
              size="medium"
              className="add_role_button"
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
