import React from 'react'
import Tooltip from "@mui/material/Tooltip";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import { FaFileDownload } from "react-icons/fa";

const DownloadExcel = ({gridApi,title}) => {

    const handleExportToExcel = () => {
        if (gridApi) {
          gridApi.exportDataAsExcel({
            fileName: title,
          });
        }
      };

  return (
    <Tooltip title="Download Excel" placement="bottom" arrow>
              <Button
                onClick={handleExportToExcel}
              //  disabled={downloadLoading}
                variant="contained"
                color="primary"
                title="Download Excel"
                className="Sub-btn"
                sx={{ minWidth: "38px", padding: "8px" }}
              >
              
                  <FaFileDownload size={18} />
              
              </Button>
            </Tooltip>
  )
}

export default DownloadExcel
