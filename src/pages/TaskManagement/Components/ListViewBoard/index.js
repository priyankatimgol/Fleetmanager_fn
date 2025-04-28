import React, { useCallback, useRef, useState } from "react";
import { tempData } from "./utils";
import AgGridTable from "pages/common-components/AgGridTable";
import EditTask from "./Components/EditTask";
import { useDispatch, useSelector } from "react-redux";
import UpdateModal from "./Components/Modal";
import "./style.css";
import { Pagination, Stack } from "@mui/material";
import { getListViewTicketsDetails } from "redux/actions/TaskManagmentActions";
import Spinner from "pages/common-components/Spinner";
import moment from "moment";

function ListViewBoard({
  onOpenDrawer,
  setMode,
  setIsRowSelected,
  totalPages,
  page,
  setPage,
}) {
  const gridref = useRef();
  const state = useSelector((state) => state);
  const alltasks = state?.taskManager?.tickets_details?.data?.map((item) => {
    return {
      ...item,
      status: item?.statusId?.status,
      priority: item?.priorityId?.masterName,
      nature_task: item?.natureOfTaskId?.masterName,
      task_type: item?.taskTypeId?.masterName,
      assignedToUser: item?.assignedToUser?.map(item => item?.empName).join(', '),
      reviewer: item?.reviewer?.map(item => item?.empName).join(', '),
      created_date: moment(item?.createdDate).format("DD-MM-YYYY"),
      modified_date: moment(item?.modifiedDate).format("DD-MM-YYYY")
    }
  });
  const modalOpen = state.taskManager?.updateModal;
  const loader = state.taskManager?.loader;
  const dispatch = useDispatch();

  const onRowSelected = () => {
    if (gridref.current?.api.getSelectedRows().length > 0) {
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
    }
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "",
      pinned: "left",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 20,
    },
    {
      field: "Action",
      pinned: "left",
      cellRenderer: (props) => EditTask(onOpenDrawer, setMode, props),
      width: 90,
    },
    ...tempData?.columnDefs,
  ]);

  const onGridReady = () => {
    gridref.current?.api.setSuppressRowClickSelection(true);
  };

  const componentStyle = { width: "auto" };
  const defaultColDef = { sortable: true, floatingFilter: true };
  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  const handlePageClick = (page) => {
    setPage(page + 1);
    dispatch(getListViewTicketsDetails(page + 1));
  };
  if (loader) {
    return (
      <Stack alignContent="center" className="list-loader">
        <Spinner />
      </Stack>
    );
  }
  return (
    <div className="list-root">
      <AgGridTable
        className="taskManagementGrid"
        gridRef={gridref}
        rowData={alltasks ?? []}
        columnDefs={columnDefs}
        Style={componentStyle}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onRowSelected={onRowSelected}
        getRowHeight={getRowHeight}
        onGridReady={onGridReady}
        pagination={false}
      />
      <Stack alignItems="center">
        <Pagination
          count={totalPages}
          defaultPage={1}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(_, page) => handlePageClick(page - 1)}
        />
      </Stack>
      {modalOpen && <UpdateModal gridref={gridref} />}
    </div>
  );
}

export default ListViewBoard;
