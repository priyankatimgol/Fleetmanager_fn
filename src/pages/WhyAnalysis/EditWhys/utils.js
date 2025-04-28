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

export const gridDefs = {
  columnDefs: [
    {
      field: 'id',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 100,
      maxWidth: 100,
      headerName: 'Sr No.',
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'name',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'Remark',
      minWidth: 400,
      maxWidth: 450,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
  ]
}