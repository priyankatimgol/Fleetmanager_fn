import { Avatar, Chip, Grid, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";
import moment from "moment";

function KarbanBoardCard({ item, handleCardClick,index }) {
  const handleDateMode = (val) => {
    const today = moment().format("DD-MM-YYYY");
    const taskDate = moment(val).format("DD-MM-YYYY");
    // console.log("Date is gre",val,taskDate > today);
    if (today === taskDate) {
      return {
        color: "#f5cc02",
      };
    } else if (taskDate < today) {
      return {
        color: "#e02d04",
      };
    }
    return {};
  };
  const handlePriorityIcon = (val) => {
    switch (val) {
      case "High":
        return (
          <KeyboardDoubleArrowUpIcon
            sx={{ color: "#e02d04" }}
            fontSize="small"
          />
        );
      case "Medium":
        return <FilterListIcon sx={{ color: "#518242" }} fontSize="small" />;
      case "Low":
        return (
          <KeyboardDoubleArrowDownIcon
            sx={{ color: "#f5cc02" }}
            fontSize="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="drag-card"
      style={{
        borderLeft: `3.5px solid ${item?.content?.taskTypeId?.colorCode}`,
      }}
      onClick={() => handleCardClick(item?.content?.id)}
    >
      <Typography variant="h5" noWrap className="drag_card-title">
        <Tooltip title={item?.content?.title}>{item?.content?.title}</Tooltip>
      </Typography>
      <Typography variant="caption" className="drag_card-description">
        {item?.content?.description?.length < 70 ? (
          item?.content?.description
        ) : (
          <Tooltip title={item?.content?.description}>
            {item?.content?.description?.substr(0, 65)}...
          </Tooltip>
        )}
      </Typography>
      <br />
      <Chip
        label={item?.content?.taskTypeId?.masterName}
        style={{
          background: item?.content?.taskTypeId?.colorCode,
          color: "white",
        }}
        className="card-taskType"
      />
      <Typography className="drag_card-status mt-5">
        Due Date:{" "}
        <span style={handleDateMode(item?.content?.dueDate)}>
          {moment(item?.content?.dueDate).format("DD-MM-YYYY")}
        </span>
      </Typography>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        className="mt-5"
      >
        <Grid item md={8}>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item>
              <Typography variant="body2 bold-600" className="mt-5">
                {item?.content?.ticketNo}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title={item?.content?.priorityId?.masterName}>
                {handlePriorityIcon(item?.content?.priorityId?.masterName)}
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={item?.content?.assignedToUser[0]?.empName}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: "#019e89" }}>
                  {item?.content?.assignedToUser[0]?.empName?.charAt(0)}
                </Avatar>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default KarbanBoardCard;
