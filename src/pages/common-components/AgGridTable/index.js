import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css'

function AgGridTable({
  rowData,
  columnDefs,
  Style,
  gridRef,
  getRowHeight,
  ...props
}) {

  return (
    <div className="ag-theme-alpine" style={Style}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        pagination={true}
        getRowHeight={getRowHeight}
        {...props}
      />
    </div>
  );
}

export default AgGridTable;
