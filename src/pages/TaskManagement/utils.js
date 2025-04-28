import moment from "moment";

export const CreateUpdateTaskDropdowns = [
  "Task Type",
  "Status",
  "Nature of Task",
  "Sprint",
  "Priority"
]

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

export const CREATE_TASK = "CREATE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export const Task_Types = [
  {
    id: 1,
    label: 'Type 1'
  },
  {
    id: 2,
    label: 'Type 2'
  },
  {
    id: 3,
    label: 'Type 3'
  },
]

export const Task_Status = [
  {
    id: 1,
    label: 'To Do'
  },
  {
    id: 2,
    label: 'In Progress'
  },
  {
    id: 3,
    label: 'In Review'
  },
  {
    id: 4,
    label: 'Done'
  },
]

export const Nature_of_task = [
  {
    id: 1,
    label: 'Nature 1'
  },
  {
    id: 2,
    label: 'Nature 2'
  },
  {
    id: 3,
    label: 'Nature 3'
  },
]

export const Sprint = [
  {
    id: 1,
    label: 'Sprint 1'
  },
  {
    id: 2,
    label: 'Sprint 2'
  },
  {
    id: 3,
    label: 'Sprint 3'
  },
]

export const Task_Priorities = [
  {
    id: 1,
    label: 'High'
  },
  {
    id: 2,
    label: 'Medium'
  },
  {
    id: 3,
    label: 'Low'
  }
]

export const Employees_List = [
  {
    id: 1,
    label: 'Employee 1'
  },
  {
    id: 2,
    label: 'Employee 2'
  },
  {
    id: 3,
    label: 'Employee 3'
  },
  {
    id: 4,
    label: 'Employee 4'
  },
]

export const Comment_Data = [
  {
    id: 1,
    userName: 'Deependra',
    date: 'October 02 2023 at 4:32PM',
    comment: 'Delivered'
  },
  {
    id: 2,
    userName: 'Singh',
    date: 'September 20 2023 at 7:32PM',
    comment: 'Good'
  },
  {
    id: 3,
    userName: 'Sirohiya',
    date: 'September 17 2023 at 9:12AM',
    comment: 'Reviewed'
  },
]

export const histroyDetailHeader = {
  columnDefs: [
    {
      field: "action",
      headerName: "Action",
      resizable: true,
      minWidth: 120,
      maxWidth: 130,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "ticketNo",
      headerName: "Ticket No",
      resizable: true,
      minWidth: 90,
      maxWidth: 100,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "title",
      headerName: "Title",
      resizable: true,
      minWidth: 250,
      maxWidth: 260,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      resizable: true,
      minWidth: 280,
      maxWidth: 290,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "comment",
      headerName: "Comment",
      resizable: true,
      minWidth: 280,
      maxWidth: 290,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "createdDate",
      cellRenderer: (api) => {
        const rowData = api.data;          ;
        return moment(rowData?.createdDate).format("DD-MM-YYYY");
      },
      headerName: "Created Date",
      resizable: true,
      minWidth: 140,
      maxWidth: 150,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "reviewer",
      headerName: "Reviewer",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "changedBy",
      headerName: "Changed By",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "changedBy",
      cellRenderer: (api) => {
        const rowData = api.data;          ;
        return moment(rowData?.createdDate).format("DD-MM-YYYY");
      },
      headerName: "Changed Date",
      resizable: true,
      minWidth: 140,
      maxWidth: 150,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "modifiedDate",
      cellRenderer: (api) => {
        const rowData = api.data;          ;
        return moment(rowData?.createdDate).format("DD-MM-YYYY");
      },
      headerName: "Modified Date",
      resizable: true,
      minWidth: 140,
      maxWidth: 150,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "statusChangedBy",
      headerName: "Status Changed By",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "statusChangedDate",
      cellRenderer: (api) => {
        const rowData = api.data;          ;
        return moment(rowData?.createdDate).format("DD-MM-YYYY");
      },
      headerName: "StatusChanged Date",
      resizable: true,
      minWidth: 140,
      maxWidth: 150,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "assignedToUser",
      headerName: "Assigned To User",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      resizable: true,
      minWidth: 160,
      maxWidth: 160,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "location",
      headerName: "Location ",
      resizable: true,
      minWidth: 130,
      maxWidth: 140,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
  ]
}