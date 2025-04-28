import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../style.css'
const BDHrsByWhyGrid = ({data}) => {
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Description', field: 'Description', maxWidth: 230, minWidth:190},
        { headerName: 'Type', field: 'Type', maxWidth: 110, minWidth:90 },
        { headerName: 'Why1', field: 'why1' , maxWidth: 90, minWidth:90},
        { headerName: 'Why2', field: 'why2', maxWidth: 90, minWidth:90 },
        { headerName: 'Why3', field: 'why3', maxWidth: 90, minWidth:90 },
        { headerName: 'Why4', field: 'why4', maxWidth: 90, minWidth:90 },
        { headerName: 'Why5', field: 'why5', maxWidth: 90, minWidth:90 },
        { headerName: 'Why6', field: 'why6', maxWidth: 90, minWidth:90 },
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

export default BDHrsByWhyGrid;
