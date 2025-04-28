import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const InventoryValueGrid = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=InventoryUsableDamageValuationCategory`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const rowData = [
            {
              valuationCategory: 'Damaged Quantity',
              ...Object.fromEntries(
                data.map((item) => [
                  item.MonthName.toLowerCase(),
                  item.DamageQuantity,
                ]),
              ),
            },
            {
              valuationCategory: 'Other Quantity',
              ...Object.fromEntries(
                data.map((item) => [
                  item.MonthName.toLowerCase(),
                  item.OtherQuantity,
                ]),
              ),
            },
            {
              valuationCategory: 'Scrap Quantity',
              ...Object.fromEntries(
                data.map((item) => [
                  item.MonthName.toLowerCase(),
                  item.ScrapQuantity,
                ]),
              ),
            },
            {
              valuationCategory: 'Usable Quantity',
              ...Object.fromEntries(
                data.map((item) => [
                  item.MonthName.toLowerCase(),
                  item.UsableQuantity,
                ]),
              ),
            },
          ];

          const grandTotalRow = {
            valuationCategory: 'Grand Total',
            ...Object.fromEntries(
              Object.keys(rowData[0])
                .filter((key) => key !== 'valuationCategory')
                .map((month) => [
                  month,
                  rowData.reduce((sum, row) => sum + (row[month] || 0), 0),
                ]),
            ),
          };

          // Add the grand total row to the rowData
          rowData.push(grandTotalRow);

          setInventoryData(rowData);
        }
      });
  }, []);

  const columns: any = [
    {
      headerName: 'VALUATION CATEGORY',
      field: 'valuationCategory',
      pinned: 'left',
      cellStyle: function (params) {
        if (params.value === 'Grand Total') {
          return { fontWeight: 'bold' };
        }
      },
    },
    ...(inventoryData.length > 0
      ? Object.keys(inventoryData[0])
          .filter((key) => key !== 'valuationCategory')
          .sort((a, b) => {
            const months = [
              'apr',
              'may',
              'jun',
              'jul',
              'aug',
              'sep',
              'oct',
              'nov',
              'dec',
              'jan',
              'feb',
              'mar',
            ];
            return months.indexOf(a) - months.indexOf(b);
          })
          .map((key) => ({
            headerName: key.toUpperCase(),
            field: key,
            type: 'numericColumn',
            cellStyle: function (params) {
              if (params.node.data.valuationCategory === 'Grand Total') {
                return { fontWeight: 'bold' };
              }
              return { textAlign: 'right' };
            },
            valueFormatter: function (params) {
              if (params.value) {
                return `₹${params.value.toLocaleString('en-IN')}`;
              }
              return null;
            },
            width: 140,
            resizable: true,
          }))
      : []),
  ];

  return (
    <div
      className='ag-theme-alpine'
      style={{ height: 200, width: '100%', background: '#fff' }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={inventoryData}
        rowHeight={23}
      />
    </div>
  );
};

export default InventoryValueGrid;
