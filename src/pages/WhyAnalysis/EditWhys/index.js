import React, { useCallback, useRef, useState, useEffect } from "react";
import { gridDefs } from "./utils";
import AgGridTable from "pages/common-components/AgGridTable";
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, Stack, Grid, Tooltip, TextField, Typography } from "@mui/material";
import { IconButtons, Buttons } from "pages/common-components/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { addWhyType, deleteWhyType, getEditWhysDrop, getWhyDropdowns } from "redux/actions/WhyAnalysis";
import { FormTextField } from "pages/common-components/FormComponents";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

function EditWhys({ setIsRowSelected }) {
    const gridref = useRef();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [editFlag, setEditFlag] = useState(false);
    const editWhysDropdown = state?.whyAnalysis?.editWhysDropdown;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const onRowSelected = () => {
        if (gridref.current?.api.getSelectedRows().length > 0) {
            setIsRowSelected(true);
        } else {
            setIsRowSelected(false);
        }
    };

    const gridOptions = {
        // ... other options
        pagination: true,
        paginationPageSize: 10,
    };

    const [columnDefs, setColumnDefs] = useState([
        ...gridDefs.columnDefs,
        {
            field: "action",
            headerName: "Action",
            resizable: true,
            // pinned: "right",
            width: 150,
            sortable: true,
            cellRenderer: (params) => {
                return (<>
                    <Box sx={{ alignItems: "center" }}>
                        <Tooltip title="Delete">
                            <IconButtons
                                onClick={() => { dispatch(deleteWhyType(params?.data?.id)) }}
                                icon={<DeleteIcon style={{ color: '#019e89' }} fontSize="small" />}
                            />
                        </Tooltip>
                    </Box>
                </>)
            }
        },
    ]);

    const onGridReady = () => {
        gridref.current?.api.setSuppressRowClickSelection(true);
    };

    const componentStyle = { width: "auto" };
    const defaultColDef = { sortable: true, floatingFilter: true };
    const getRowHeight = useCallback((params) => {
        return 37;
    }, []);

    const handlePageClick = (page) => {
        setPage(page);
    };

    useEffect(() => {
        dispatch(getEditWhysDrop())
    }, [])

    useEffect(() => {
        const pageSize = 10;
        setTotalPages(Math.ceil(editWhysDropdown?.length / pageSize));
    }, [editWhysDropdown]);

    const [addRemark, setAddRemark] = useState("")
    const handleAddRemark = () => {
        dispatch(addWhyType(addRemark))
        setAddRemark("")
    }

    return (
        <div className="list-root">
            <Grid
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}
            >
                {/* <Box component="h2">
                    Why Remarks
                </Box> */}
                <Box >
                    <Typography variant="h4">Why Remarks</Typography>
                </Box>
                <Stack
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                    marginBottom="auto"
                    marginTop="-8px"
                    sx={{ mb: -2 }}
                >
                    <div style={{ width: "240px", marginLeft: "5px", marginRight: "5px", marginBottom: "5px" }}>
                        <form>
                            <TextField
                                // label="Your Text"
                                value={addRemark}
                                placeholder="Enter your remarks..."
                                variant="outlined"
                                onChange={(e) => setAddRemark(e.target.value)}
                                fullWidth
                                size="small"
                            />
                        </form>
                    </div>
                    <div>
                        <Tooltip title="Add Remark">
                            <Buttons
                                onClick={handleAddRemark}
                                startIcon={<AddCircleOutlineRoundedIcon />}
                                name="Add Remark"
                                variant="outlined"
                                className="add_role_button" />
                        </Tooltip>
                        <Link to="/kpis">
                            <HomeIcon style={{ color: '#019E89' }} />
                        </Link>
                    </div>
                </Stack>
            </Grid>
            <AgGridTable
                className="taskManagementGrid"
                gridRef={gridref}
                rowData={editWhysDropdown || []}
                columnDefs={columnDefs}
                Style={componentStyle}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                onRowSelected={onRowSelected}
                getRowHeight={getRowHeight}
                onGridReady={onGridReady}
                pagination={false}
                gridOptions={gridOptions}
            />
            <Stack alignItems="center">
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    variant="outlined"
                    shape="rounded"
                    onChange={(_, page) => handlePageClick(page - 1)}
                />
            </Stack>
        </div>
    );
}

export default EditWhys;