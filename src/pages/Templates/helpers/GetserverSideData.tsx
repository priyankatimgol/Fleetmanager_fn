import { Tooltip } from "@mui/material";
import { formatNumber } from "pages/common-components/AgGridUtility/ColumnHeaderWithAsterick";

const getServerSideData = ({
  mainApi,
  configApi,
  configTempEndPoint,
  setColumnDefs,
}) => {
  return {
    getRows: async (params) => {
      let filterStr = JSON.stringify(params.request);

      let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}${mainApi}?queryParam=${filterStr}`;
      let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}${configApi}?template=${configTempEndPoint}`;

      let header = {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };

      try {
        const colDefResponse = await fetch(colDefObject, header);
        const colDef = await colDefResponse.json();

        const response = await fetch(`${url}`, header);
        let data = await response.json();

        if (!data.length) {
          params.failCallback();
          return;
        }
        // Check if data is less than cacheBlockSize
        if (data.length < params.request.endRow) {
          let emptyRows = Array(params.request.endRow - data.length).fill({});
          data = [...data, ...emptyRows];
        }

        const keys = Object.keys(data[0]);

        const newColumnDefs = keys.map((key) => {
          let filterType = "agTextColumnFilter";
          let headerName = key;
          let positioning;
          let displayWidth;
          let isEditable;
          let isFreeze;
          let valueFormatter;
          let filterParams;
          let cellStyle;
          let headerClass;
          let cellRenderer;

          if (Array.isArray(colDef)) {
            const matchingObject = colDef.find((obj) => obj.DbKey === key);
            if (matchingObject) {
              headerName = matchingObject.DisplayText;
              positioning = matchingObject.Positioning;
              displayWidth = matchingObject.DisplayWidth;
              isEditable = matchingObject.IsEditable;
              isFreeze = matchingObject.IsFreeze;
              switch (matchingObject.DataType) {
                case "date":
                  filterType = "agDateColumnFilter";
                  break;
                case "decimal":
                case "int":
                  filterType = "agNumberColumnFilter";
                  valueFormatter = function (params) {
                    return formatNumber(params.value);
                  };
                  cellStyle = { textAlign: "right" };
                  headerClass = "right-aligned-header";
                  break;
                case "text":
                  filterType = "agTextColumnFilter";
                  cellStyle = { textAlign: "left" };
                  headerClass = "left-aligned-header";
                  cellRenderer= function (params) {
                    if (params?.value?.length > 18) {
                      return (
                        <Tooltip title={params.value} placement="top" arrow>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {params.value}
                          </div>
                        </Tooltip>
                      );
                    } else {
                      return (
                        <div
                          style={{
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                          }}
                        >
                          {params.value}
                        </div>
                      );
                    }
                  }
                  break;
                default:
                  break;
              }
            }
          }

          return {
            field: key,
            filter: filterType,
            headerName: headerName,
            positioning: positioning,
            width: displayWidth,
            editable: isEditable,
            lockPosition: isFreeze,
            valueFormatter: valueFormatter,
            filterParams: filterParams,
            cellStyle: cellStyle,
            headerClass: headerClass,
            cellRenderer: cellRenderer,
          };
        });

        newColumnDefs.sort((a, b) => a.positioning - b.positioning);
        setColumnDefs(newColumnDefs);

        params.successCallback(data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  };
};

export default getServerSideData;