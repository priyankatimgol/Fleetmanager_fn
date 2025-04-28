import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const InventoryOMSPlantGrid = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=InventoryValueByState`,
    )
      .then((res) => res.json())
      .then((value) => {
        const updatedData = calculateGrandTotal(value);
        setData(updatedData);
      });
  }, []);

  const calculateGrandTotal = (data) => {
    if (data.length === 0) return [];

    const grandTotal = {
      State: 'Grand Total',
    };

    data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'State' && key !== 'FYear') {
          grandTotal[key] = (grandTotal[key] || 0) + parseFloat(row[key]);
        }
      });
    });

    return [...data, grandTotal];
  };

  const getColumnDefs: () => any = () => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);

    const filteredKeys = keys.filter((key) => key !== 'FYear');

    const columnDefs = filteredKeys.map((key) => {
      const cellStyleFunc = (params) => {
        if (params.node.data.State === 'Grand Total') {
          return key === 'State'
            ? { fontWeight: 'bold' }
            : { fontWeight: 'bold', textAlign: 'right' };
        }
        return key === 'State' ? { textAlign: 'left' } : { textAlign: 'right' };
      };

      if (key === 'State') {
        return {
          headerName: key,
          field: key,
          width: 160,
          pinned: 'left',
          cellStyle: cellStyleFunc,
          filter: 'agSetColumnFilter',
          floatingFilter: true,
          resizable: true,
        };
      } else {
        const year = data[0]['FYear'].split('-')[0];
        const month =
          key === 'Jan' || key === 'Feb' || key === 'Mar'
            ? parseInt(year) + 1
            : year;

        return {
          headerName: key.replace(
            /^\w{3}/,
            (monthAbbreviation) => `${monthAbbreviation} ${month}`,
          ),
          field: key,
          width: 130,
          cellStyle: cellStyleFunc,
          valueFormatter: (params) => {
            if (key !== 'State') {
              return `₹${parseFloat(params.value).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}`;
            } else {
              return params.value;
            }
          },
          resizable: true,
        };
      }
    });

    return columnDefs;
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={getColumnDefs()}
        rowData={data}
        rowHeight={23}
        paginationPageSize={100}
      />
    </div>
  );
};

export default InventoryOMSPlantGrid;
