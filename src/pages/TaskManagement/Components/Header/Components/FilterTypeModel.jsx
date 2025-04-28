import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    Button,
    TextField
} from "@mui/material"
import {
    MySelectAutoComplete,
} from "pages/common-components/FormComponents";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getApiCall } from "apiServices/apiUtils";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 800,
    borderRadius: "10px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function FilterTypeModel({ isFilterModelOpen, closeModelOfFilter }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedMainFilter, setSelectedMainFilter] = useState({})
    const [empCode, setEmpCode] = useState(null);
    const [empDropdownOptions, setEmpDropdownOptions] = useState([]);
    const [assignedTo, setAssignedTo] = useState([]);

    const TaskTypeDropdown = state?.taskManager?.dropdowns?.["Task Type"];
    const TaskStatus = state?.taskManager?.dropdowns?.["Status"];
    const NatureOfTaskDropdown = state?.taskManager?.dropdowns?.["Nature of Task"];
    const SprintDropdown = state?.taskManager?.dropdowns?.["Sprint"];
    const PriorityDropdown = state?.taskManager?.dropdowns?.["Priority"];

    const filters = [
        {
            id: 1,
            name: "Task Type",
            options: TaskTypeDropdown,
        },
        {
            id: 2,
            name: "Status",
            options: TaskStatus,
        },
        {
            id: 3,
            name: "Nature Of Task",
            options: NatureOfTaskDropdown,
        },
        {
            id: 4,
            name: "Sprint",
            options: SprintDropdown,
        },
        {
            id: 5,
            name: "Priority",
            options: PriorityDropdown,
        },
    ];

    const handleFilterChange = (event) => {
        const { value } = event.target;
        if (selectedFilters.includes(value)) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
        } else {
            setSelectedFilters([...selectedFilters, value]);
        }
    };

    const selectMainFilter = (filter) => {
        setSelectedMainFilter(filter)
    }

    useEffect(() => {
        if (empCode && empCode === "") {
            setEmpDropdownOptions([]);
            return;
        } else {
            getApiCall(`${process.env.REACT_APP_LOGBOOK_SERVER_CODE}/api/Logbook/GetEmployeeMaster?employeeCode=${empCode}`)
                .then((response) => {
                    if (response?.data) {
                        const data = response?.data.map((d) => {
                            return {
                                label: `${d.empCode} - ${d.empName}`,
                                code: d.empCode,
                                name: d.empName,
                            };
                        });
                        setEmpDropdownOptions(data);
                    } else {
                        setEmpDropdownOptions([]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [empCode]);

    const applyFilter = () => {
        closeModelOfFilter();
    }

    const resetFilter = () => {
        closeModelOfFilter();
    }

    return (
        // <Modal
        //   open={isFilterModelOpen}
        //   onClose={closeModelOfFilter}
        //   aria-labelledby="modal-modal-title"
        //   aria-describedby="modal-modal-description"
        // >
        //   <Box sx={style}>
        <div className="filter-view-drawer full-height"  style={{width:"560px", backgroundColor:"#F8F8F8"}}>
            <Grid className="full-height" container columnSpacing={1}  >
                <div style={{ border: "1px solid lightgrey", width:"100%", padding:"10px", backgroundColor:"#c4c4c45e"}}>
                    <Typography variant="h4" sx={{ marginTop: '10px', marginLeft: '15px'}}>{`Filters (0)`} </Typography>
                    <IconButton
                        aria-label="close"
                        sx={{
                            position: "absolute",
                            padding: '9px',
                            right: 10,
                            top: '10px',
                            color: "#00a18b",
                        }}
                        onClick={closeModelOfFilter}
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
               
                <Divider />
                <br />
                <Grid className="full-height" container columnSpacing={1} >
                    <Box p={2} className="wid-100">
                        <div className="wid-100">
                            <List component="nav" className="dis-flex" style={{}}>
                                <div>
                                    {filters.map((filter) => (
                                        <div key={filter.id} style={{marginLeft:"10px", border:"1px solid #009E88"}}>
                                            <Grid item md={12}>
                                                <ListItem className={filter.id === selectedMainFilter.id ? "back-color" : ""}
                                                    sx={{
                                                        cursor: 'pointer', paddingRight:"50px"
                                                    }}>
                                                    <ListItemText primary={filter.name} onClick={() => selectMainFilter(filter)} />
                                                </ListItem>
                                            </Grid>
        
                                            {/* <Divider style={{ backgroundColor: '#009E88', height:"1px"}}/> */}

                                        </div>
                                    ))}
                                </div>
                                <div style={{width:"68%", height:"650px", overflow: "auto"}}>
                                    <Grid item md={12} sx={{
                                        paddingLeft: '30px', backgroundColor:"#FFFFFF", border:"1px solid lightgrey", marginLeft:"10px",
                                    }}>
                                        {selectedMainFilter.name !== 'Assignee' ? <FormGroup >
                                            {(selectedMainFilter.id) && selectedMainFilter.options.map((option) => (
                                                <FormControlLabel
                                                    key={option}
                                                    control={
                                                        <Checkbox style={{ marginRight:"10px"}}
                                                            checked={selectedFilters.includes(option?.masterName)}
                                                            onChange={handleFilterChange}
                                                            value={option?.masterName}
                                                            sx={{
                                                                color: "#00a18b",
                                                                '&.Mui-checked': {
                                                                    color: "#00a18b",
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={option?.masterName}
                                                />
                                            ))}
                                        </FormGroup> :""    
                                        }
                                         
                                    </Grid>
                                </div>
                            </List>
                        </div>
                    </Box>
                    <div className="task-form-bottom-section">
                        <Grid container>
                            <Grid item md={8} style={{marginLeft:"-140px"}}>

                            </Grid>

                            <Grid item md={4}>
                                <div className="button-container">
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ color: "#00a18b", minWidth: 110 }}
                                        onClick={resetFilter}
                                    >
                                        Reset filter
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ float: "right", color: "#00a18b", minWidth: 115 }}
                                        type="submit"
                                        onClick={applyFilter}
                                    >
                                        Apply Filter
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                {/* </Box>
                </Modal> */}
            </Grid>
        </div>
    );
}
