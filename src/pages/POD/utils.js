import moment from "moment";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { IconButtons } from "pages/common-components/Button";

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

export const PODGridHeader = {
    columnDefs: [
    //   {
    //     field: "action",
    //     headerName: "Action",
    //     resizable: true,
    //     minWidth: 120,
    //     maxWidth: 130,
    //     // filter: "agTextColumnFilter",
    //     // filterParams: textFilterParams,
    //     sortable: true,
    //     cellRenderer: (params) =>(
    //         <>
    //             <IconButtons
    //             // onClick={handleEdit}
    //             icon={<ModeEditOutlineRoundedIcon style={{ color: '#019e89' }} fontSize="small" />}
    //             />
    //         </>
    //     ),
    //   },
      {
        field: "podDate",
        headerName: "Date",
        resizable: true,
        minWidth: 110,
        maxWidth: 120,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
        cellRenderer: (api) => {
            const rowData = api.data;          ;
            return moment(rowData?.date).format("DD-MM-YYYY");
          },
      },
      {
        field: "areaOfWork",
        headerName: "WTG/Area of Work",
        resizable: true,
        minWidth: 300,
        maxWidth: 300,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "activityName",
        headerName: "Error/Activity Name",
        resizable: true,
        minWidth: 350,
        maxWidth: 350,
        tooltipField: 'activityName',
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "typeName",
        headerName: "Type",
        resizable: true,
        minWidth: 220,
        maxWidth: 220,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "employeeId",
        headerName: "Employee",
        resizable: true,
        minWidth: 150,
        maxWidth: 150,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "venderName",
        headerName: "Vendor/Labour/Contract",
        resizable: true,
        minWidth: 270,
        maxWidth: 290,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "priority",
        headerName: "Priority",
        resizable: true,
        minWidth: 150,
        maxWidth: 160,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "actionTaken",
        headerName: "Action Taken",
        resizable: true,
        minWidth: 150,
        maxWidth: 160,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "assigneeStatus",
        headerName: "Assignee Status",
        resizable: true,
        minWidth: 180,
        maxWidth: 190,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "siteInchargeStatus",
        headerName: "Site Incharge Status",
        resizable: true,
        minWidth: 190,
        maxWidth: 200,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
      {
        field: "pendingDueTo",
        headerName: "Pending Due to",
        resizable: true,
        minWidth: 150,
        maxWidth: 170,
        filter: "agTextColumnFilter",
        filterParams: textFilterParams,
        sortable: true,
      },
    ]
  }

  export const listData = [
    {
      id: 1,
      date: "10/4/2023  12:00:00 AM",
      wtg: "place name",
      error:"abc",
      type: "scheduled",
      employee: "employee1",
      vendor: "vendor1",
      priority:"Low",
      actionTaken: "TO DO",
      assigneeStatus: "WIP",
      siteInchargeStatus: "WIP",
      pendingStatus: "New Requirement",
    },
    {
        id: 2,
        date: "10/4/2023  12:00:00 AM",
        wtg: "place name2",
        error:"abcde",
        type: "unscheduled",
        employee: "employee2",
        vendor: "vendor2",
        priority:"Medium",
        actionTaken: "In Review",
        assigneeStatus: "close",
        siteInchargeStatus: "WIP",
        pendingStatus: "New Requirement",
    },
];