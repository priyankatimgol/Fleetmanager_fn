import moment from "moment";
import * as Yup from "yup";

export const statusList = ["Active", "In Active"];

export const AddRolesValidations = Yup.object().shape({
  r_name: Yup.string().required("Please enter your Role Name!"),
  r_description: Yup.string().required("Please enter your Role Description!"),
  //g_code: Yup.string().required("Please enter your Group Code!"),
  status: Yup.string().required("Please enter your Status!"),
});

const contains = (target, lookingFor) => {
  return target && target.indexOf(lookingFor) >= 0;
};

const textFilterParams = {
  // filterOptions: ['contains'],
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
      field: "roleName",
      headerName: "Role Name",
      minWidth: 160,
      maxWidth: 165,
      resizable: true,
      filter: "agTextColumnFilter", // Enable text filter
      filterParams: textFilterParams,
      sortable: true,
    },
    // { field: "groupCode", headerName: "Group Code", Width: 100 },
    {
      field: "roleDescription",
      headerName: "Role Description",
      minWidth: 200,
      maxWidth: 210,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      maxWidth: 130,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 160,
      maxWidth: 170,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      cellRenderer: (data) => {
        return moment(data.value).format("DD-MM-YYYY");
      },
      minWidth: 130,
      maxWidth: 140,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      minWidth: 160,
      maxWidth: 170,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: "modifiedDate",
      headerName: "Modified Date",
      cellRenderer: (data) => {
        return moment(data.value).format("DD-MM-YYYY");
      },
      minWidth: 140,
      maxWidth: 150,
      resizable: true,
      filter: "agTextColumnFilter",
      filterParams: textFilterParams,
      sortable: true,
    },
  ],
};

export const grptempData = {
  columnDefs: [
    {
      field: "roleName",
      headerName: "Role Name",
      //width: 230,
      width: 500,
      sortable: false,
      resizable: true,
      filter: "agTextColumnFilter", // Enable text filter
      filterParams: textFilterParams,
    },
    {
      field: "groupCode",
      headerName: "Group Code",
      //width: 170,
      width: 500,
      sortable: false,
      resizable: true,
    },
    {
      field: "roleDescription",
      headerName: "Role Description",
      //width: 200,
      width: 500,
      sortable: false,
      resizable: true,
    },
  ],
};

export const userMappingColom = {
  columnDefs: [
    {
      field: "employeeCode",
      headerName: "Employee Code",
      //width: 230,
      width: 160,
      sortable: false,
      resizable: true,
      minWidth: 155,
      maxWidth: 250,
      filter: "agTextColumnFilter", // Enable text filter
      filterParams: textFilterParams,
    },
    {
      field: "username",
      headerName: "Employee Name",
      //width: 230,
      width: 200,
      minWidth: 200,
      maxWidth: 280,
      sortable: false,
      resizable: true,
      filter: "agTextColumnFilter", // Enable text filter
      filterParams: textFilterParams,
    },
    {
      field: "roleName",
      headerName: "Role Name",
      //width: 230,
      width: 125,
      minWidth: 124,
      maxWidth: 130,
      sortable: false,
      resizable: true,
      filter: "agTextColumnFilter", // Enable text filter
      filterParams: textFilterParams,
    },
    // {
    //   field: "roles",
    //   headerName: "User Roles",
    //   //width: 170,
    //   width: 1000,
    //   cellRenderer: (data) => {
    //     const leng = data?.value?.length - 1;
    //     return data?.value?.map((item, idx) => {
    //       if (idx === leng) {
    //         return `${item}`;
    //       }
    //       return `${item}, `;
    //     });
    //   },
    //   sortable: false,
    //   resizable: true,
    //   filter: "agTextColumnFilter", // Enable text filter
    //   filterParams: textFilterParams,
    // },
  ],
};

export const UserSiteMapping = [
  {
    field: "countryName",
    headerName: "Country",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    sortable: false,
    resizable: true,
    width: 165,
    filter: "agTextColumnFilter", // Enable text filter
    filterParams: textFilterParams,
  },
  {
    field: "stateName",
    headerName: "State",
    sortable: false,
    resizable: true,
    width: 200,
    filter: "agTextColumnFilter", // Enable text filter
    filterParams: textFilterParams,
  },
  {
    field: "areaName",
    headerName: "Area",
    width: 220,
    sortable: false,
    resizable: true,
    filter: "agTextColumnFilter", // Enable text filter
    filterParams: textFilterParams,
  },
  {
    field: "siteName",
    headerName: "Site",
    width: 227.5,
    sortable: false,
    resizable: true,
    filter: "agTextColumnFilter", // Enable text filter
    filterParams: textFilterParams,
  },
];
