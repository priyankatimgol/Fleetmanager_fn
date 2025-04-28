import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField
} from "@mui/material";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import CommentList from '../CreateOrUpdateTask/CommentList';
// import { Comment_Data } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryTask, addCommentForTask } from "redux/actions/TaskManagmentActions";

const CommentTab = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  // Sort the array by id in ascending order
  let historyData = state?.taskManager?.historyOfTask;
  const TicketIdDetail = state?.taskManager?.ticketById;
  const userDetail = state?.user?.userData
  const commentHistoryData = historyData && historyData.length > 0 && historyData.sort((a, b) => b.id - a.id);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // useEffect(() => {
  //   if(!commentHistoryData && TicketIdDetail.id) {
  //     dispatch(getHistoryTask(TicketIdDetail.id));
  //   }
  // }, [])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call your function here
      commentFunCall();
    }
  };

  const commentFunCall = () => {
    // Your function logic here
    console.log('Enter key pressed!', inputValue);
    let payloadOfTask = {
      id: TicketIdDetail.id,
      ticketNo: TicketIdDetail.ticketNo,
      title: TicketIdDetail.title,
      description: TicketIdDetail.description,
      createdBy: TicketIdDetail.createdBy,
      createdDate: TicketIdDetail.createdDate,
      modifiedBy: TicketIdDetail.modifiedBy,
      modifiedDate: TicketIdDetail.modifiedDate,
      statusId: TicketIdDetail.statusId.id,
      statusChangedBy: TicketIdDetail.statusChangedBy,
      statusChangedDate: TicketIdDetail.statusChangedDate,
      assignedToUser: TicketIdDetail.assignedToUser?.map((i)=>i.empCode),
      assignedToGroup: TicketIdDetail.assignedToGroup,
      dueDate: TicketIdDetail.dueDate,
      taskTypeId: TicketIdDetail.taskTypeId.id,
      taskParentId: TicketIdDetail.taskParentId,
      label: TicketIdDetail.label,
      sprintId: TicketIdDetail.sprintId.id,
      priorityId: TicketIdDetail.priorityId.id,
      location: TicketIdDetail.location,
      natureOfTaskId: TicketIdDetail?.natureOfTaskId?.id,
      comment: inputValue,
      reviewer: TicketIdDetail.reviewer?.map((i)=>i.empCode),
      sequence: TicketIdDetail.sequence
  }
    dispatch(addCommentForTask(payloadOfTask));
    setInputValue('');
  };

  return (
    <div>
      {/* <div>Comment Section</div> */}
      <Grid container rowSpacing={5} columnSpacing={5}>
        <Grid item md={1}>
          <Avatar sx={{ width: 22, height: 22, bgcolor: deepPurple[500], fontSize: '14px', marginTop: '10px' }}>
            {userDetail?.userName?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item md={11}>
          <TextField
            placeholder='Add a comment...'
            type="text"
            value={inputValue}
            rows={1}
            size="small"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>


      {commentHistoryData && commentHistoryData.length > 0 && commentHistoryData.map((item, index) => {
        return (
          <CommentList data={item} key={index}></CommentList>
        );
      })}
    </div>

  )
}

export default CommentTab