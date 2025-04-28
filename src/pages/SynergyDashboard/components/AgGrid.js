import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../style.css';
// import AgGridTable from 'pages/common-components/AgGridTable';
import { LicenseManager } from 'ag-grid-enterprise';
// import { json } from 'stream/consumers';

LicenseManager.setLicenseKey(
  '[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-054169}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{31 March 2024}____[v3]_[0102]_MTcxMTg0MzIwMDAwMA==fb01f966ded0a9f9a84dc3422fd7d82b',
);

const MyAgGridComponent = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'State', field: 'StateName', rowGroup: true, hide: true },
    { headerName: 'Week', field: 'Weekno' },
    { headerName: 'BD hours', field: 'Hrs' },
  ]);

  const autoGroupColumnDef = {
    headerName: 'Year',
    field: 'year',
    cellRenderer: 'agGroupCellRenderer',
    resizable: true,
    // cellRendererParams: {
    //   checkbox: true,
    // },
  };

  const gridOptions = {
    suppressSizeToFit: true,
    onGridReady: (event) => event.api.sizeColumnsToFit(),
    autoGroupColumnDef,
  };

  const getRowStyle = (params) => {
    if (params?.data?.Weekno === 'Total') {
      return { fontWeight: 'bold' };
    } else {
      return null;
    }
  };

  return (
    <div
      className='ag-theme-alpine'
      style={{ height: 255, width: '100%', marginTop: '10px' }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data ?? []}
        gridOptions={gridOptions}
        getRowStyle={getRowStyle}
      />
    </div>
  );
};

export default MyAgGridComponent;
