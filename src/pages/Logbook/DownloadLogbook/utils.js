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

export const tempData = {
  columnDefs: [
    {
      field: "siteName",
      headerName: "Site Name",
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "logDate",
      cellRenderer: (data) => {
        return moment(data?.data?.logDate).format("DD-MM-YYYY");
      }, 
      headerName: "LogDate",
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    },
    {
      field: "shiftCycle",
      headerName: "Shift Cycle",
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
    }
  ]
}