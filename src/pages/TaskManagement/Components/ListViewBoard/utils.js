import moment from "moment";

const contains = (target, lookingFor) => {
  return target && target.indexOf(lookingFor) >= 0;
};

const textFilterParams = {
  textMatcher: ({ value, filterText }) => {
    var literalMatch = contains(value, filterText || "");
    return !!literalMatch;
  },
  trimInput: true,
  debounceMs: 1000,
};

const textFilterParamsStatus = {
  textMatcher: ({ filterOption, value, filterText }) => {
    if (filterText === null) {
      return false;
    }
    switch (filterOption) {
      case "contains":
        return value.indexOf(filterText) >= 0;
      case "notContains":
        return value.indexOf(filterText) < 0;
      case "equals":
        return value === filterText;
      default:
        // should never happen
        // console.log("invalid filter type " + filter);
        return false;
    }
  },
  trimInput: true,
  debounceMs: 1000,
};

export const tempData = {
  columnDefs: [
    {
      field: "ticketNo",
      headerName: "Ticket No",
      resizable: true,
      minWidth: 90,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "title",
      headerName: "Title",
      resizable: true,
      minWidth: 250,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "description",
      headerName: "Description",
      resizable: true,
      minWidth: 280,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "status",
      cellRenderer: (api) => {
        const rowData = api.data;
        return rowData?.statusId?.status;
      },
      headerName: "Status",
      resizable: true,
      minWidth: 120,
      filter: "agTextColumnFilter",
      filterParams: textFilterParamsStatus,
    },
    {
      field: "priority",
      cellRenderer: (api) => {
        const rowData = api.data;
        return rowData?.priorityId?.masterName;
      },
      headerName: "Priority",
      resizable: true,
      minWidth: 90,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "dueDate",
      cellRenderer: (api) => {
        const rowData = api.data;
        return moment(rowData?.dueDate).format("DD-MM-YYYY");
      },
      headerName: "Due Date",
      resizable: true,
      minWidth: 140,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "nature_task",
      cellRenderer: (api) => {
        const rowData = api.data;
        return rowData?.natureOfTaskId?.masterName;
      },
      headerName: "Nature of Task",
      resizable: true,
      minWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "task_type",
      cellRenderer: (api) => {
        const rowData = api.data;
        return rowData?.taskTypeId?.masterName;
      },
      headerName: "Task Type",
      resizable: true,
      minWidth: 120,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "assignedToUser",
      headerName: "Assigned To User",
      resizable: true,
      minWidth: 190,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "reviewer",
      headerName: "Reviewed To User",
      resizable: true,
      minWidth: 190,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      resizable: true,
      minWidth: 140,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "created_date",
      headerName: "Created Date",
      resizable: true,
      minWidth: 130,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      resizable: true,
      minWidth: 140,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "modified_date",
      cellRenderer: (api) => {
        const rowData = api.data;
        return moment(rowData?.modifiedDate).format("DD-MM-YYYY");
      },
      headerName: "Modified Date ",
      resizable: true,
      minWidth: 130,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
  ],
};

export const listData = [
  {
    id: 1,
    action: "Edit",
    ticket_no: "FM-1",
    title: "Log Book Test Cases",
    description: "Write Log Book test cases in details",
    status: "TO DO",
    priority: "High",
    due_date: "10-05-2023",
    nature_task: "New Requirement",
    task_type: "Main Task",
    assigned_user: "Prasad",
    created_by: "Ritesh Mahajan",
    created_date: "10/4/2023  12:00:00 AM",
    modified_by: "Ritesh Mahajan",
    modified_date: "10/4/2023  12:00:00 AM",
  },
  {
    id: 2,
    action: "Edit",
    ticket_no: "FM-2",
    title: "Sub Task Log Book Test Cases",
    description: "Log Book UI Test Cases",
    status: "TO DO",
    priority: "High",
    due_date: "11-05-2023",
    nature_task: "New Requirement",
    task_type: "Main Task",
    assigned_user: "Prasad",
    created_by: "Ritesh Mahajan",
    created_date: "10/4/2023  12:00:00 AM",
    modified_by: "Ritesh Mahajan",
    modified_date: "10/4/2023  12:00:00 AM",
  },
  {
    id: 3,
    action: "Edit",
    ticket_no: "FM-3",
    title: "Sub Task Log Book Test Cases",
    description: "Log Book Functional Test Cases",
    status: "TO DO",
    priority: "High",
    due_date: "12-05-2023",
    nature_task: "New Requirement",
    task_type: "Main Task",
    assigned_user: "Prasad",
    created_by: "Ritesh Mahajan",
    created_date: "10/4/2023  12:00:00 AM",
    modified_by: "Ritesh Mahajan",
    modified_date: "10/4/2023  12:00:00 AM",
  },
  {
    id: 4,
    action: "Edit",
    ticket_no: "FM-4",
    title: "Sub Task Log Book Test Cases",
    description: "Log Book Functional Test Cases",
    status: "TO DO",
    priority: "High",
    due_date: "13-05-2023",
    nature_task: "New Requirement",
    task_type: "Main Task",
    assigned_user: "Prasad",
    created_by: "Ritesh Mahajan",
    created_date: "10/4/2023  12:00:00 AM",
    modified_by: "Ritesh Mahajan",
    modified_date: "10/4/2023  12:00:00 AM",
  },
  {
    id: 4,
    action: "Edit",
    ticket_no: "FM-5",
    title: "Sub Task Log Book Test Cases",
    description: "Log Book Functional Test Cases",
    status: "TO DO",
    priority: "High",
    due_date: "14-05-2023",
    nature_task: "New Requirement",
    task_type: "Main Task",
    assigned_user: "Prasad",
    created_by: "Ritesh Mahajan",
    created_date: "10/4/2023  12:00:00 AM",
    modified_by: "Ritesh Mahajan",
    modified_date: "10/4/2023  12:00:00 AM",
  },
];
