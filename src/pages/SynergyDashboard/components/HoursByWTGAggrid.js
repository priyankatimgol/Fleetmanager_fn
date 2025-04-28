import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../style.css'
const HrsByWTGAggrid = ({data}) => {

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

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'SAPCODE', field: 'sapLocation', maxWidth: 270, minWidth:250, filter: "agTextColumnFilter", filterParams: textFilterParams, sortable: true,},
        { headerName: 'BD hours', field: 'hours', filter: "agTextColumnFilter", filterParams: textFilterParams, sortable: true, },
      ]);
  const groupDefaultExpanded = 1;
  const gridOptions = {
    suppressSizeToFit: true,
    onGridReady: (event) => event.api.sizeColumnsToFit(),
  };


  return (
    <div className="ag-theme-alpine" style={{ height: 255, width: '100%',marginTop:'10px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        groupDefaultExpanded={groupDefaultExpanded}
        rowData={data ?? []}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default HrsByWTGAggrid;
