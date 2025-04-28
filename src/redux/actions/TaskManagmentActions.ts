import {
  deleteDataApi,
  getApiCall,
  postDataApi,
  postFormData,
  postMultipleFormData,
} from "apiServices/apiUtils";
import { fetchError, showMessage, showWarning } from "./Common";

import {
  GET_TASK_DROPDOWN_VALUES,
  GET_TASK_STATUS,
  UPDATE_KANBAN_BOARD_CONTROLLER,
  GET_TASK_TICKET_BY_ID,
  GET_HISTORY_TASK,
  GET_SEARCHQUERY,
  SET_UPDATE_MODAL_STATUS,
  GET_BOARD_TYPE,
  GET_TASK_DOCCUMNET,
  DOCLOADING,
  GET_KANBAN_BOARD_CONTROLLER,
  GET_KANBAN_BOARD_CONTROLLER_RESET,
  GET_BOARD_TYPE_LIST_VIEW,
  GET_KANBAN_PAGINATION_CONTROLLER,
  GET_TASK_TYPE,
  UPDATE_KANBAN_BOARD_PAGINATION_CONTROLLER,
  GET_LOADER_UPDATE,
} from "types/actions/TaskManagement";

export const setTaskStatusListing = (payload: any) => ({
  type: GET_TASK_STATUS,
  payload,
});

export const setBoardType = (payload: any) => ({
  type: GET_BOARD_TYPE,
  payload,
});

export const setTicketDetailById = (payload: any) => ({
  type: GET_TASK_TICKET_BY_ID,
  payload,
});

export const setDropdownValues = (payload: any, category: string) => ({
  type: GET_TASK_DROPDOWN_VALUES,
  payload,
  category,
});

export const setTaskTickets = (payload: any, category: string) => ({
  type: UPDATE_KANBAN_BOARD_CONTROLLER,
  payload,
  category,
});

export const setListView = (payload: any) => ({
  type: GET_BOARD_TYPE_LIST_VIEW,
  payload,
});

export const setHistoryOfTask = (payload: any) => ({
  type: GET_HISTORY_TASK,
  payload,
});
export const setSearchData = (payload: any) => ({
  type: GET_SEARCHQUERY,
  payload,
});
export const setTaskDoccument = (payload: any) => ({
  type: GET_TASK_DOCCUMNET,
  payload,
});

export const setUploadModalStatus = (payload: boolean) => ({
  type: SET_UPDATE_MODAL_STATUS,
  payload,
});

export const setDocLoading = (payload: any) => ({
  type: DOCLOADING,
  payload,
});

export const resetKanbanBoard = (payload: any) => ({
  type: GET_KANBAN_BOARD_CONTROLLER_RESET,
  payload,
});

export const setKanbanBoardContoller = (payload: any, category: string) => ({
  type: GET_KANBAN_BOARD_CONTROLLER,
  payload: { [category]: payload },
});

export const setKanbanPagination = (payload: any, category: string) => ({
  type: GET_KANBAN_PAGINATION_CONTROLLER,
  payload: { [category]: payload },
});

export const setTicketsPagination = (payload: any, category: string) => ({
  type: UPDATE_KANBAN_BOARD_PAGINATION_CONTROLLER,
  payload,
  category,
});

export const setTaskTypeHeaderSection = (payload: any) => ({
  type: GET_TASK_TYPE,
  payload,
});

export const setLoaderChanges = (payload: any) => ({
  type: GET_LOADER_UPDATE,
  payload,
});

export const getAllTaskMngListing = () => {
  return (dispatch) => {
    dispatch(setTaskStatusListing([]));
    dispatch(resetKanbanBoard({}));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTaskMng`)
      .then((response) => {
        if (response?.code === 200 && response?.status) {
          dispatch(setTaskStatusListing(response?.data));
          response?.data?.forEach((item) => {
            dispatch(getTicketsDetails(item?.status));
          });
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//Kanban Board handler
export const getTicketsDetails = (status) => {
  return (dispatch, getState) => {
    const boardType = getState()?.taskManager?.boardType;
    const searchData = getState()?.taskManager?.searchData;
    const taskType =
      getState()?.taskManager?.taskType ?? "Logbook-WTG Breakdown";
    const Url = `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTasks?status=${status}&searchQuery=${searchData}&taskType=${taskType}&view=${boardType}&pageNo=1`;
    getApiCall(Url)
      .then((response) => {
        if (response?.code === 200) {
          dispatch(setKanbanBoardContoller(response?.data || [], status));
          const pdata = {
            totalPageCount: response?.totalPageCount,
            totalRecords: response?.totalRecords,
          };
          dispatch(setKanbanPagination(pdata, status));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//Pagination handler in kanban as per statuses
export const getUpdateTaskAsPerPagination = (
  status,
  pageNo,
  handleLoader,
  handlePagination
) => {
  return (dispatch, getState) => {
    const boardType = getState()?.taskManager?.boardType;
    const searchData = getState()?.taskManager?.searchData;
    const statusData = getState()?.taskManager?.kanbanContoller[status];
    const taskType =
      getState()?.taskManager?.taskType ?? "Logbook-WTG Breakdown";
    const Url = `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTasks?status=${status}&searchQuery=${searchData}&taskType=${taskType}&view=${boardType}&pageNo=${
      pageNo + 1
    }`;
    getApiCall(Url)
      .then((response) => {
        if (response?.code === 200 && response?.status) {
          const pdata = {
            totalPageCount: response?.totalPageCount,
            totalRecords: response?.totalRecords,
          };
          dispatch(setTicketsPagination(pdata, status));
          dispatch(setTaskTickets([...statusData, ...response?.data], status));
          handlePagination(status, pageNo + 1);
          setTimeout(() => {
            handleLoader(status, false);
          }, 100);
        } else {
          dispatch(fetchError(response?.message || "Error"));
          handleLoader(status, false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Listing Board handler
export const getListViewTicketsDetails = (pageNo) => {
  return (dispatch, getState) => {
    const boardType = getState()?.taskManager?.boardType;
    const searchData = getState()?.taskManager?.searchData;
    const taskType =
      getState()?.taskManager?.taskType ?? "Logbook-WTG Breakdown";
    const Url = `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTasks?searchQuery=${searchData}&taskType=${taskType}&view=${
      boardType === "calendar" ? "List" : boardType
    }&pageNo=${pageNo}`;
    dispatch(setLoaderChanges(true));
    getApiCall(Url)
      .then((response) => {
        dispatch(setListView({ ...response, currentPage: pageNo }));
        dispatch(setLoaderChanges(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTicketsDetailsById = (id, onOpenDrawer) => {
  return (dispatch) => {
    dispatch(setTicketDetailById({}));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetTaskById?id=${id}`)
      .then((response) => {
        dispatch(setTicketDetailById(response?.data));
        onOpenDrawer();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getKarbanBoardUpdatedData = (status, pageNo) => {
  return (dispatch, getState) => {
    const boardType = getState()?.taskManager?.boardType;
    const searchData = getState()?.taskManager?.searchData;
    const taskType =
      getState()?.taskManager?.taskType ?? "Logbook-WTG Breakdown";
    const Url = `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTasks?status=${status}&searchQuery=${searchData}&taskType=${taskType}&view=${boardType}&pageNo=${pageNo}`;
    getApiCall(Url)
      .then((response) => {
        dispatch(setTaskTickets([], status));
        if (response?.code === 200 && response?.status) {
          const pdata = {
            totalPageCount: response?.totalPageCount,
            totalRecords: response?.totalRecords,
          };
          dispatch(setTicketsPagination(pdata, status));
          dispatch(setTaskTickets(response?.data, status));
        } else {
          //dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getKarbanBoardUpdated = (payload, handleTaskLoader) => {
  return (dispatch, getState) => {
    const search = getState()?.taskManager?.searchData;
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/UpdateTaskBoardNew`, payload)
      .then((response) => {
        if (response?.status) {
          handleTaskLoader(payload?.source, payload?.status);
          dispatch(getKarbanBoardUpdatedData(payload?.source, 1));
          dispatch(getKarbanBoardUpdatedData(payload?.status, 1));
          dispatch(showMessage(response?.message || "Updated Successfully"));
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getDropdownValues = (category: string) => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetCommonMaster?masterCategory=${category}`)
      .then((response) => {
        dispatch(setDropdownValues(response?.data, category));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getHistoryTask = (taskId) => {
  return (dispatch) => {
    dispatch(setHistoryOfTask(""));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetHistoryTask?task_id=${taskId}`)
      .then((response) => {
        dispatch(setHistoryOfTask(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCommentForTask = (payload) => {
  return (dispatch) => {
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/AddOrUpdateTaks`, payload)
      .then((response) => {
        dispatch(
          showMessage(response?.message || "Comment Added Successfully")
        );
        dispatch(getHistoryTask(payload.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createTaskAndUpdate = (payload, onCloseDrawer) => {
  return (dispatch, getState) => {
    const boardType = getState()?.taskManager?.boardType;
    const currentPage = getState()?.taskManager?.tickets_details?.currentPage;
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/AddOrUpdateTaks`, payload)
      .then((response) => {
        if (response?.status) {
          if (boardType === "Kanban") {
            dispatch(getAllTaskMngListing());
          } else {
            dispatch(getListViewTicketsDetails(currentPage));
          }
          const taskId = response?.data?.id;
          const Attchment = payload?.attachment;
          dispatch(
            uploadAttachment({
              file: Attchment?.map((i) => i.file),
              TaskId: taskId,
            })
          );
          setTimeout(()=>dispatch(showMessage(response?.message)), 1000)
          // dispatch(showMessage(response?.message));
          onCloseDrawer()
        } else {
          dispatch(fetchError(response?.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTaskDocument = (id) => {
  return (dispatch) => {
    dispatch(setDocLoading(true));
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/GetAllTaskDocumnets?taskId=${id}`)
      .then((response) => {
        dispatch(setTaskDoccument(response?.data));
        setTimeout(() => dispatch(setDocLoading(false)), 500);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setDocLoading(false));
      });
  };
};

export const deleteDocument = (id) => {
  return (dispatch) => {
    deleteDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/DeleteImageaskById?id=${id}`)
      .then((response) => {
        if (response?.status) {
          dispatch(
            showMessage(response?.message || "Delete Document successfully")
          );
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const uploadAttachment = (payload) => {
  return (dispatch) => {
    postMultipleFormData(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/UploadFile`, payload)
      .then((response) => {
        if (response?.status) {
          dispatch(
            showMessage(response?.message || "document upload successfully")
          );
        } else {
          dispatch(fetchError(response?.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const downloadExcel = (searchQuery) => {
  return (dispatch) => {
    const Url = searchQuery
      ? `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/DownloadTaskExcel?searchQuery=${searchQuery}`
      : `${process.env.REACT_APP_BASE_EXTENTION}/api/Task/DownloadTaskExcel`;
    getApiCall(Url)
      .then((response) => {
        if (!response) {
          dispatch(fetchError("Error occurred in Export !!!"));
          return;
        }
        if (response?.code === 204) {
          dispatch(
            showWarning(
              response?.message ?? "No data available for selected date !"
            )
          );
          return;
        }
        if (response?.data) {
          var filename = searchQuery
            ? `${searchQuery}.xlsx`
            : `kanbanTask.xlsx`;
          if (filename && filename === "") {
            dispatch(fetchError("Error Occurred !"));
            return;
          }
          const binaryStr = atob(response?.data);
          const byteArray = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            byteArray[i] = binaryStr.charCodeAt(i);
          }

          var blob = new Blob([byteArray], {
            type: "application/octet-stream",
          });
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            window.navigator.msSaveBlob(blob, filename);
          } else {
            var blobURL =
              window.URL && window.URL.createObjectURL
                ? window.URL.createObjectURL(blob)
                : window.webkitURL.createObjectURL(blob);
            var tempLink = document.createElement("a");
            tempLink.style.display = "none";
            tempLink.href = blobURL;
            tempLink.setAttribute("download", filename);
            if (typeof tempLink.download === "undefined") {
              tempLink.setAttribute("target", "_blank");
            }

            document.body.appendChild(tempLink);
            tempLink.click();

            setTimeout(function () {
              document.body.removeChild(tempLink);
              window.URL.revokeObjectURL(blobURL);
            }, 200);

            dispatch(
              showMessage(response?.message ?? "File downloaded successfully!")
            );
          }
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };
};

export const updateTaskList = (data, unselectAll) => {
  return (dispatch, getState) => {
    const currentPage = getState()?.taskManager?.tickets_details?.currentPage;
    postDataApi(`${process.env.REACT_APP_BASE_EXTENTION}/api/Task/UpdateTaskList`, data)
      .then((response) => {
        if (response?.status) {
          dispatch(
            showMessage(response?.message || "Task's updated successfully")
          );
          dispatch(getListViewTicketsDetails(currentPage));
          dispatch(setUploadModalStatus(false));
          unselectAll();
        } else {
          dispatch(fetchError(response?.message || "Error"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
