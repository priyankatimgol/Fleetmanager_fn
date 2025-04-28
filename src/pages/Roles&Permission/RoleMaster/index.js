import React, { useCallback, useEffect, useState } from "react";
import AddRoles from "./components/Add";
import "./style.css";
import AddEditModal from "./components/Modal";
import AgGridTable from "pages/common-components/AgGridTable";
import Edit from "./components/Edit";
import { tempData } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { getRoleListing } from "redux/actions/RoleMasterActions";

function RoleMaster() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const Listing = state?.roleMaster?.rolesListing || [];

  const [columnDefs, setColumnDefs] = useState([
    ...tempData?.columnDefs,
    {
      field: "Action",
      cellRenderer: Edit,
      minWidth: 92,
      maxWidth: 92,
    },
  ]);

  const defaultColDef = {
    floatingFilter: true,
    enableSorting: true,
  };

  const getRowStyle = (params) => {
    const inActiveStatus = params?.data?.status
    if(inActiveStatus === "In Active") {
      return { 'background-color': '#F1E4E6' }
    }
  }

  const componentStyle = { width: "auto" };
  useEffect(() => {
    dispatch(getRoleListing());
  }, [dispatch]);

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  return (
    <div>
      <AddRoles />
      <AgGridTable
        className="roleMasterGrid"
        rowData={Listing}
        columnDefs={columnDefs}
        Style={componentStyle}
        getRowHeight={getRowHeight}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
      />
      <AddEditModal />
    </div>
  );
}

export default RoleMaster;
