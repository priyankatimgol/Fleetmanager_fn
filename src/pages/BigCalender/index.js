import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import DrawerComponent from "pages/common-components/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketsDetailsById,
  setTicketDetailById,
} from "redux/actions/TaskManagmentActions";
import AddEditTask from "pages/TaskManagement/Components/CreateOrUpdateTask/AddEditTask";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

function BigCalender() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const TasksLists = state?.taskManager?.tickets_details?.data || [];
  const filterToDo = TasksLists?.filter(
    (i) => i?.statusId?.status === "TO DO"
  )?.map((i) => {
    return {
      ...i,
      start: i?.dueDate,
      end: i?.dueDate,
      color: i?.taskTypeId?.colorCode,
      allDay: true,
    };
  });
  const [eventsData, setEventsData] = React.useState(filterToDo);
  const [openModal, setModal] = React.useState({ status: false });
  const onOpenDrawer = () => {
    setModal({ status: true });
  };
  const handleSelectedEvent = (e) => {
    dispatch(getTicketsDetailsById(e?.id, onOpenDrawer));
  };
  const onCloseDrawer = () => {
    setModal({ status: false });
    dispatch(setTicketDetailById({}));
  };
  return (
    <div className="root-calender">
      <Calendar
        //views={["month", "day", "agenda", "work_week"]}
        views={["day", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        eventPropGetter={(event) => {
          const eventData = event;
          const backgroundColor = eventData && eventData.color;
          return { style: { backgroundColor } };
        }}
        events={eventsData}
        onSelectEvent={handleSelectedEvent}
        style={{ height: "100vh", padding: "10px", maxHeight: "calc(100vh - 135px)" }}
      />
      <DrawerComponent open={openModal?.status} onClose={onCloseDrawer}>
        <AddEditTask onCloseDrawer={onCloseDrawer} mode="UPDATE_TASK" />
      </DrawerComponent>
    </div>
  );
}

export default BigCalender;
