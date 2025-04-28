import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CommentTab from "./CommentTab";
import HistoryTab from "./HistoryTab";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryTask } from "redux/actions/TaskManagmentActions";

const TaskComments = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const state = useSelector(state => state);

  const TicketIdDetail = state?.taskManager?.ticketById;


  useEffect(() => {
    // if( TicketIdDetail.id) {
      dispatch(getHistoryTask(TicketIdDetail.id));
    // }
  }, [value])

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const SelectedTab = ({ ind, val, children }) => {
    if (val !== ind) {
      return null;
    }

    return (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          p: "10px",
          border: "1px solid #c4c4c4",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Comments" />
            <Tab label="History" />
          </Tabs>
        </Box>
        <SelectedTab val={value} ind={0}>
          <CommentTab />
        </SelectedTab>
        <SelectedTab val={value} ind={1}>
          <HistoryTab />
        </SelectedTab>
      </Box>
    </>
  );
};

export default TaskComments;
