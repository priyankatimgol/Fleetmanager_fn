import { CircularProgress, Stack } from "@mui/material";

function Spinner({ sx }) {
  return (
    <Stack sx={sx} alignItems="center" className="Spinner">
      <CircularProgress />
    </Stack>
  );
}

export default Spinner;
