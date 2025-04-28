import { Typography } from "@mui/material";
import React from "react";

function Header({TaskStatusListing, taskListing, kanbanPagination}) {
  const listingHeaderStyle = (color) => {
    return {
      background: color,
      minWidth: '280px'
    };
  };
  return (
    <div className="drag-root sticky-header">
      {TaskStatusListing?.map((item, ind) => {
        return (
          <div style={listingHeaderStyle(item?.colorcode)} className="drag-coloums">
            <Typography variant="h4" align="center" className="bold-600 text-trans">
              {item?.status?.toLowerCase()} {`(${kanbanPagination[item?.status]?.totalRecords || '0'})`}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default Header;
