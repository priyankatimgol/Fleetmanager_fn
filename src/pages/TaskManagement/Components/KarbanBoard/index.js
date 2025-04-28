import React, { useEffect } from "react";
import DragAndDrop from "./Components/Drag&Drop";
import {
  getItemsCreated,
  handleMoveToAnotherList
} from "./utils";
import Header from "./Components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getKarbanBoardUpdated,
  getTicketsDetailsById
} from "redux/actions/TaskManagmentActions";
import { UPDATE_TASK } from "pages/TaskManagement/utils";
import ConfirmationModal from "./Components/ConfirmationModal";
import { fetchError } from "redux/actions";
import { CircularProgress, Stack } from "@mui/material";

function KarbanBoard({ setMode, onOpenDrawer, search }) {
  const [taskListing, setTaskListing] = React.useState([]);
  const [open, setOpen] = React.useState({
    status: false,
    info: {},
  });
  const [loaderDetails, setLoaderDetails] = React.useState({});
  const [pagination, setPagination] = React.useState({});
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const EmpCode = state?.user?.userData?.empCode;
  const TaskStatusListing = state?.taskManager?.statusList || [];
  const TasksLists = state?.taskManager?.kanbanContoller || [];
  const kanbanPagination = state?.taskManager?.kanbanPagination || [];
  const k_listing = TaskStatusListing?.map((item) => {
    return getItemsCreated(TasksLists[item?.status]);
  });

  useEffect(() => {
    setTaskListing(k_listing);
  }, [TasksLists]);

  useEffect(() => {
    let load = {};
    let page = {};
    TaskStatusListing?.forEach((item) => {
      load = { ...load, [item.status]: false };
      page = { ...page, [item.status]: 1 };
    });
    setLoaderDetails(load);
    setPagination(page);
  }, [TaskStatusListing]);

  const handleCardClick = (val) => {
    setMode(UPDATE_TASK);
    dispatch(getTicketsDetailsById(val, onOpenDrawer));
  };

  const handleAlerts = (checkSourceId, message, destIdx) => {
    const checkAssignee =
      checkSourceId?.length > 0 && checkSourceId[0]?.content?.assignedToUser;
    const checkReviewer =
      checkSourceId?.length > 0 && checkSourceId[0]?.content?.reviewer;
    const reviewerUser =
      checkReviewer && checkReviewer.some((i) => i.empCode === EmpCode);
    const siteInchargeUser =
      checkAssignee && checkSourceId[0]?.content?.siteIncharge === EmpCode;
    //console.log(reviewerUser, destIdx, siteInchargeUser);
    if (checkAssignee.length === 0 || checkReviewer.length === 0) {
      return message
        ? "Please add Reviewer and Assigned To before moving the ticket"
        : false;
    } else if (!reviewerUser && destIdx === 3) {
      return message ? "You must be a Reviewer to change this status!" : false;
    } else if ((!reviewerUser || !siteInchargeUser) && destIdx === 4) {
      return message ? 'You must be the Site In charge to change this status!' : false;
    }
    return true;
  };

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceIdx = +source.droppableId;
    const destIdx = +destination.droppableId;
    if (sourceIdx === destIdx) {
      // const items = handleReorderItems(
      //   taskListing[sourceIdx],
      //   source.index,
      //   destination.index
      // );
      // const newState = [...taskListing];
      // newState[sourceIdx] = items;
      // setTaskListing(newState);
      // dispatch(getKarbanBoardUpdated(handlePayload(newState)));
    } else {
      const checkSourceId = taskListing[sourceIdx].filter(
        (i) => i.id === result?.draggableId
      );
      if (handleAlerts(checkSourceId, false, destIdx)) {
        const result = handleMoveToAnotherList(
          taskListing[sourceIdx],
          taskListing[destIdx],
          source,
          destination
        );
        const newState = [...taskListing];
        newState[sourceIdx] = result[sourceIdx];
        newState[destIdx] = result[destIdx];
        setTaskListing(newState);
        setOpen({
          status: true,
          info: {
            id: checkSourceId[0]?.content?.id,
            status: TaskStatusListing[destIdx]?.status,
            source: TaskStatusListing[sourceIdx]?.status,
          },
        });
      } else {
        dispatch(
          fetchError(handleAlerts(checkSourceId, true, destIdx) || "Error")
        );
      }
    }
  };

  const handleClose = () => {
    setTaskListing(k_listing);
    setTimeout(() => {
      setOpen({ status: false, info: {} });
    }, 300);
  };

  const handleTaskLoader = (source, destination) => {
    // setLoaderDetails({ ...loaderDetails, [source]: true, [destination]: true});
    setPagination({ ...pagination, [destination]: 1, [source]: 1 });
  };

  const handleConfirmation = () => {
    dispatch(getKarbanBoardUpdated(open?.info, handleTaskLoader));
    setOpen({ status: false, info: {} });
  };

  if (!TaskStatusListing?.length > 0) {
    return (
      <Stack alignItems="center" className="kanban_loader">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <div className="karban-root">
      <ConfirmationModal
        open={open?.status}
        handleClose={handleClose}
        handleConfirmation={handleConfirmation}
      />
      <Header
        TaskStatusListing={TaskStatusListing}
        taskListing={taskListing}
        kanbanPagination={kanbanPagination}
      />
      <DragAndDrop
        onDragEnd={handleDragAndDrop}
        taskListing={taskListing}
        handleCardClick={handleCardClick}
        TaskStatusListing={TaskStatusListing}
        pagination={pagination}
        setPagination={setPagination}
        loaderDetails={loaderDetails}
        setLoaderDetails={setLoaderDetails}
        kanbanPagination={kanbanPagination}
      />
    </div>
  );
}

export default KarbanBoard;
