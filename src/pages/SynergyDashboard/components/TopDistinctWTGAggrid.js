import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import '../style.css'
const TopDistinctWTGAgGrid = ({data}) => {
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Type', rowGroup: true, hide: true, field: 'WTG', maxWidth: 270, minWidth:250},
    { headerName: '1', field: '1', maxWidth: 100, minWidth:90},
    { headerName: '2', field: '2', maxWidth: 100, minWidth:90},
    { headerName: '3', field: '3', maxWidth: 100, minWidth:90},
    { headerName: 'Total', field: 'Total',  cellStyle: { fontWeight: 'bold' }, maxWidth: 100, minWidth:90},
  ]);

  const groupDefaultExpanded = 1;

  const gridOptions = {
    suppressSizeToFit: true,
    // onGridReady: (event) => event.api.sizeColumnsToFit(),
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 255, width: '100%',marginTop:'10px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        groupDefaultExpanded={groupDefaultExpanded}
        autoGroupColumnDef={{
          headerName: "Type",
        }}
        rowData={data ?? []}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default TopDistinctWTGAgGrid;
