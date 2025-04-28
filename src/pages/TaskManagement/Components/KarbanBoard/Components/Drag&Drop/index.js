import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import KarbanBoardCard from "./Components/card";
import { getUpdateTaskAsPerPagination } from "redux/actions/TaskManagmentActions";
import { useDispatch } from "react-redux";
import { Button, CircularProgress, Stack } from "@mui/material";
// styles we need to apply on draggables
// styles we need to apply on draggables
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  //userSelect: "none",
  //width:'500px',
  padding: "4px",
  //margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  maxHeight: "calc(100vh - 190px)",
  minHeight: "calc(100vh - 190px)",
  minWidth: "auto",
  overflow: "auto",
  //background: isDraggingOver ? "lightblue" : "lightgrey",
});

function DragAndDrop({
  onDragEnd,
  taskListing,
  handleCardClick,
  TaskStatusListing,
  setLoaderDetails,
  loaderDetails,
  pagination,
  setPagination,
  kanbanPagination
}) {
  
  const dispatch = useDispatch();

  const handleLoader = (status,state) => {
    setLoaderDetails({ ...loaderDetails, [status]:state})
  };

  const handlePagination = (status,page) => {
    setPagination({ ...pagination, [status]: page });
  };
  
  const getScrollPosition = (e, status) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Access the scrollTop property of the event target (the div)
    //const scrollPosition = scrollTop;
    // Calculate the distance from the top to the bottom of the element
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    if (distanceToBottom < 10 && !loaderDetails[status] && pagination[status] < kanbanPagination[status]?.totalPageCount) {
      handleLoader(status, true);
      dispatch(getUpdateTaskAsPerPagination(status, pagination[status], handleLoader, handlePagination));
    }
  };

  return (
    <div className="drag-root">
      <DragDropContext onDragEnd={onDragEnd}>
        {taskListing.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                className="drag-coloums"
                id={`drag-${TaskStatusListing[ind]?.status}`}
                onScroll={(e) =>
                  getScrollPosition(e, TaskStatusListing[ind]?.status)
                }
              >
                {el.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <KarbanBoardCard
                          index={index}
                          item={item}
                          handleCardClick={handleCardClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {loaderDetails[TaskStatusListing[ind]?.status] && <Stack alignItems='center' className="mt-5">
                  <CircularProgress />
                </Stack>}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default DragAndDrop;
