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
      field: 'state',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'STATE',
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    // {
    //   cellRenderer: (api) => {
    //     const rowData = api.data;
    //     const siteSection = `${rowData.site}-${rowData.section}`
    //     return siteSection;
    //   },
    //   minWidth: 180,
    //   maxWidth: 300,
    //   cellStyle: { fontSize: '12px', fontWeight: 500 },
    //   resizable: true,
    //   headerName: 'SITE-SECTION',
    // },
    {
      field: 'site',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'SITE',
      minWidth: 210,
      maxWidth: 220,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'section',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'AREA',
      minWidth: 210,
      maxWidth: 220,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'sapCode',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'SAPCODE',
      minWidth: 210,
      maxWidth: 220,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'modelName',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'MODEL NAME',
      minWidth: 180,
      maxWidth: 210,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'towerType',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      headerName: 'TOWER TYPE',
      minWidth: 150,
      maxWidth: 170,
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'week',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      minWidth: 110,
      maxWidth: 130,
      resizable: true,
      headerName: 'WEEK',
      filter: "agTextColumnFilter", 
      filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'grandTotal',
      wrapHeaderText: true,
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 120,
      maxWidth: 140,
      headerName: 'GRAND TOTAL'
    },
    {
      field: 'checkMark',
      cellRenderer: (api) => {
        const rowData = api.data;
        if (rowData.checkMark === true) {
          return 1;
        } else {
          return 0;
        }
      },
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      headerName: 'CHECK',
      maxWidth: 100,
    },
    {
      field: 'remarks1',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      minWidth: 180,
      maxWidth: 250,
      wrapText: true,
      resizable: true,
      headerName: 'REMARKS 1'
    },
    {
      field: 'remarks2',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      minWidth: 180,
      maxWidth: 250,
      wrapText: true,
      resizable: true,
      headerName: 'REMARKS 2'
    },
    {
      field: 'standardRemarks',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      minWidth: 180,
      maxWidth: 250,
      wrapHeaderText: true,
      wrapText: true,
      resizable: true,
      headerName: 'STANDARD REMARKS'
    },
    {
      field: 'overallActionItem',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      minWidth: 180,
      maxWidth: 250,
      wrapText: true,
      resizable: true,
      headerName: 'OVERALL AI'
    },
    {
      field: 'mainBucket',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      // cellRenderer: (api) => {
      //   const rowData = api.data;
      //   return rowData?.fkMainBucketId?.masterName;
      // },
      minWidth: 120,
      maxWidth: 220,
      resizable: true,
      headerName: 'MAIN BUCKET'
    },
    {
      field: 'subBucket',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      // cellRenderer: (api) => {
      //   const rowData = api.data;
      //   return rowData?.fkSubBucketId?.masterName;
      // },
      minWidth: 120,
      maxWidth: 220,
      resizable: true,
      headerName: 'SUB BUCKET'
    },
  ],
  rowData: [
    {
      id: 1,
      state: 'Rajasthan',
      site: 'Akal',
      section: 'Akal',
      sapCode: 'SWSSMD-SC2-RCC01-J132',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Lattice',
      week: '25',
      grandTotal: '144',
      checkMark: '0'
    },
    {
      id: 2,
      state: 'Arunachal Pradesh',
      site: 'Akal',
      section: 'Pohra',
      sapCode: 'SWSSMD-SC2-SDRQ-J132',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Tabular',
      week: '18',
      grandTotal: '98',
      checkMark: '0'
    },
    {
      id: 3,
      state: 'Andhra Pradesh',
      site: 'Akal',
      section: 'Basara',
      sapCode: 'SWSSMD-EE2-RCC01-GH78',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Lattice',
      week: '10',
      grandTotal: '54',
      checkMark: '0'
    },
    {
      id: 4,
      state: 'Rajasthan',
      site: 'Baramsar',
      section: 'Dilur',
      sapCode: 'SWSSMD-QW-POIU4-J477',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Tabular',
      week: '28',
      grandTotal: '88',
      checkMark: '0'
    },
    {
      id: 5,
      state: 'Rajasthan',
      site: 'Akal',
      section: 'Pohra',
      sapCode: 'SWSSMD-SC2-QWAS4-J132',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Lattice',
      week: '15',
      grandTotal: '35',
      checkMark: '0'
    },
    {
      id: 6,
      state: 'Rajasthan',
      site: 'Akal',
      section: 'Pohra',
      sapCode: 'SWSSMD-SC2-RCC01-Q789',
      modelName: 'S66 1.25MW/50Hz',
      towerType: 'Tabular',
      week: '22',
      grandTotal: '85',
      checkMark: '0'
    },
  ]
}

export const noCommaReportDefs = {
  columnDefs: [
    // {
    //   // field: 'state',
    //   wrapHeaderText: true,
    //   cellStyle: { fontSize: '12px', fontWeight: 500 },
    //   cellRenderer : () => {return (<div style={{cursor : "pointer"}}>edit</div>)},
    //   resizable: true,
    //   minWidth: 80,
    //   maxWidth: 100,
    //   headerName: 'Action',
    //   sortable: true,
    // },
    {
      field: 'STATE',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'STATE',
      filter: 'agMultiColumnFilter',
      flotingFilter : true,
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            // filterParams: {
            //   defaultOption: 'startsWith',
            // },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
    {
      field: 'area',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'AREA',
      filter: 'agMultiColumnFilter',
      flotingFilter : true,
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            // filterParams: {
            //   defaultOption: 'startsWith',
            // },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
    {
      field: 'SITE',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'SITE',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
    {
      field: 'LocationNumber',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Location Number',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
    {
      field: 'PlantName',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'SCADA Plant Name',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
    {
      field: 'SMSName',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'SMS Name',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },
   
    // {
    //   field: 'section',
    //   cellStyle: { fontSize: '12px', fontWeight: 500 },
    //   resizable: true,
    //   minWidth: 180,
    //   maxWidth: 210,
    //   headerName: 'SECTION',
    //   // filter: "agTextColumnFilter", 
    //   // filterParams: textFilterParams,
    //   sortable: true,
    // },
    {
      field: 'SAPCODE',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'SAPCODE',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'WTG_MODEL_NAME',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Modal Name',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'TOWERTYPE',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Tower Type',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'NO_Comm_Start_Date',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'NO Comm Start Date',
      cellRenderer : (data) => moment(data?.NO_Comm_Start_Date).format("DD-MM-YYYY"),
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'NO_Comm_Start_Date1',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'NO Comm Start Time',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'Duration',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Duration',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      sortable: true,
    },{
      field: 'Reason_for_outage',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Reason for outage *',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'Remark',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Reason Details',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },{
      field: 'Category',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Category',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },
    {
      field: 'Status',
      cellStyle: { fontSize: '12px', fontWeight: 500 },
      resizable: true,
      minWidth: 180,
      maxWidth: 210,
      headerName: 'Status',
      // filter: "agTextColumnFilter", 
      // filterParams: textFilterParams,
      sortable: true,
    },
  ]
}

export const typeDropdown = [
  { label: 'CV', value: 'CV' },
  { label: 'Technical', value: 'Technical' },
  { label: 'Maintainance Hrs', value: 'Maintainance Hrs' },
  { label: 'BOP/External Hrs', value: 'BOP/External Hrs' },
]

export const whyDropdown = ["Why1", "Why2", "Why3", "Why4", "Why5", "Why6",]