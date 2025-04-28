import React, { useEffect } from 'react';
import HistoryList from '../CreateOrUpdateTask/HistoryList';
// import {
//   Comment_Data,
// } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryTask } from 'redux/actions/TaskManagmentActions';

const HistoryTab = () => {
  const state = useSelector(state => state);
  // Sort the array by id in ascending order
  let historyData = state?.taskManager?.historyOfTask;

  const commentHistoryData = historyData && historyData.length > 0 && historyData.sort((a, b) => b.id - a.id);
  console.log("commentHistoryData",commentHistoryData,historyData)
 
  return (
    <div>
      {/* <div>HistoryTabs</div> */}
      {commentHistoryData && commentHistoryData.length > 0 &&
       
          <HistoryList historyList={commentHistoryData}></HistoryList>
      }
    </div>
  )
}

export default HistoryTab