import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import KarbanBoard from "./Components/KarbanBoard";
import DrawerComponent from "pages/common-components/Drawer";
import {
  getAllTaskMngListing,
  getDropdownValues,
  getListViewTicketsDetails,
  setBoardType,
  setTicketDetailById,
} from "redux/actions/TaskManagmentActions";
import AddEditTask from "./Components/CreateOrUpdateTask/AddEditTask";
import ListViewBoard from "./Components/ListViewBoard";
import "./style.css";
import { CreateUpdateTaskDropdowns } from "./utils";
import BigCalender from "pages/BigCalender";

const TaskManagement = () => {
  const state = useSelector((state) => state);
  const boardType = state?.taskManager?.boardType;
  const [page, setPage]= React.useState(1); //for List view pagination only
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const totalPages = state?.taskManager?.tickets_details?.totalPageCount;
  const search = state?.taskManager?.searchData;
  const [mode, setMode] = React.useState(null); // Refer ./utils for modes CREATE_TASK || UPDATE_TASK
  const [isRowSelected, setIsRowSelected] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getAllTaskMngListing());
    dispatch(setBoardType('Kanban'));
    CreateUpdateTaskDropdowns.forEach((category) => {
      dispatch(getDropdownValues(category));
    });
  }, [dispatch]);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setMode(null);
    dispatch(setTicketDetailById({}));
  };

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleBoard = () => {
    switch (boardType) {
      case "Kanban":
        return <KarbanBoard onOpenDrawer={onOpenDrawer} setMode={setMode} search={search}/>;
      case "List":
        return (
          <ListViewBoard
            onOpenDrawer={onOpenDrawer}
            setMode={setMode}
            setIsRowSelected={setIsRowSelected}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        );
      case "calendar": 
          return <BigCalender />;
      default:
        return null;
    }
  };

  const handleBoardChange = (val) => {
    setIsRowSelected(false);
    dispatch(setBoardType(val));
    if(val === 'Kanban'){
      dispatch(getAllTaskMngListing());
    } else {
      //for List view && calender part
      dispatch(getListViewTicketsDetails(page));
    }
  };

  return (
    <div className="task-root">
      <Header
        boardType={boardType}
        setBoardType={(val) => handleBoardChange(val)}
        onOpenDrawer={onOpenDrawer}
        setMode={setMode}
        isRowSelected={isRowSelected}
      />
      {handleBoard()}
      <DrawerComponent open={openDrawer} onClose={onCloseDrawer}>
        <AddEditTask onCloseDrawer={onCloseDrawer} mode={mode} />
      </DrawerComponent>
    </div>
  );
};

export default TaskManagement;
