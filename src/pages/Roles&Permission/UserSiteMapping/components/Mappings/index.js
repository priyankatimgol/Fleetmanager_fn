import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { UserSiteMapping } from "pages/Roles&Permission/RoleMaster/utils";
import Selections from "../Selection";
import { Stack } from "@mui/material";
import Spinner from "pages/common-components/Spinner";
import { useDispatch } from "react-redux";
import {
  getUpdateUserSiteMapping,
  getUserMappingListing,
  getUserSiteMappings,
  setSiteMapping,
} from "redux/actions/UserSiteMapping";

const Mappings = ({
  openId,
  unSelect,
  setId,
  selEmpCode,
  setSelEmpCode,
  empMail,
  setEmpMail,
  componentStyle,
  defaultColDef,
  siteListing,
  loader,
  roleObj
}) => {
  const initialVal = {
    country: "",
    state: "",
    area: "",
    site: ""
  };

  const gridRef = useRef();
  const [rowData, setRowData] = useState(siteListing);
  const [searchVal, setSearchVal] = useState(initialVal);
  const [roleSelection, setRoleSelection] = React.useState({});
  const dispatch = useDispatch();

  const roleHandle = (data) =>{
    setRoleSelection(data)
  }
  
  const onGridReady = useCallback(
    (params) => {
      if (siteListing) {
        setRowData(siteListing);
      }
    },
    [siteListing]
  );

  const refreshComponent = () => {
   // setRowData([]);
    unSelect();
   // setSelEmpCode(null);
  }

  useEffect(() => {
    return () => {
      setRowData([]);
      dispatch(setSiteMapping([]))
      //setSelEmpCode(null);
    }
  },[])

  const onFirstDataRendered = (params) => {
    params.api.forEachNode((node) => {
      if (node.data && node.data.status === "Active") {
        node?.setSelected(true);
      }
    });
  };

  const handleConsole = (selectedRole) => {
    var selectedRows = gridRef.current.api.getSelectedRows();
    const postData = selectedRows?.map((item) => {
      return {
        ...item,
        employeeCode: selEmpCode || item.employeeCode,
        status: "Active",
        roleId: selectedRole.id,
        employeeEmail : empMail,
      };
    });
    dispatch(getUpdateUserSiteMapping(postData, openId, refreshComponent));
  };

  const handleSearch = () => {
    const filterPayload = {
      user: openId,
      employeeCode: selEmpCode,
      ...searchVal,
    };
    if (searchVal?.country) {
      dispatch(getUserSiteMappings(filterPayload));
    }
    if (searchVal?.country === undefined) {
      dispatch(getUserSiteMappings(searchVal));
    }
  };

  return (
    <div>
      <Selections
        setId={setId}
        openId={openId}
        setSelEmpCode={setSelEmpCode}
        unSelect={unSelect}
        selEmpCode={selEmpCode}
        empMail={empMail}
        setEmpMail={setEmpMail}
        searchVal={searchVal}
        handleSearch={handleSearch}
        initialVal={initialVal}
        setSearchVal={setSearchVal}
        handleConsole={handleConsole}
        roleHandle = {roleHandle}
        roleObj = {roleObj}
      />
      {loader ? (
        <Stack alignContent="center">
          <Spinner />
        </Stack>
      ) : (
        <div
          style={{
            ...componentStyle,
            height: "calc(100vh - 255px)",
            marginTop: "15px",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={UserSiteMapping}
            defaultColDef={defaultColDef}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
      )}
    </div>
  );
};

export default Mappings;
