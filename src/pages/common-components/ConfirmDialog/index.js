import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Buttons } from "../Button";
import './styles.css'

export const ConfirmDialog = (props) => {
  const { title, message, dialogStat, setDialogStat, onConfirmDialog, buttonLabel, buttonClassName } = props;

  return (
    <Dialog
      fullWidth="xs"
      maxWidth="xs"
      open={dialogStat}
      onClose={() => setDialogStat(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {
        title && (
          <DialogTitle id="alert-dialog-title" sx={{ fontSize: "16px" }}>{title}</DialogTitle>
        )
      }
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box 
          sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 2
          }}
        >
          <Buttons
            variant="outlined"
            size='small'
            onClick={() => setDialogStat(false)}
            className='buttonStyle border-color color-green'
            name='Cancel'
          />
          <Buttons
            variant="contained"
            size='small'
            onClick={onConfirmDialog}
            className={`buttonStyle color-white ${buttonClassName}`}
            name={buttonLabel}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};
