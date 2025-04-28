import {
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import Chart from "../PieChart/componets/chart";
import titleIcon from "../../../../../../assets/icon/planning-kpi-icon/planning-ability.svg";
import { DATA_LABELS } from "../constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "pages/common-components/Spinner";
import "../PieChart/styles.css";

const PmLsTciChart = ({ label, data, getPmSelectedDrop}) => {
    const state = useSelector((state) => state);
    const Loading = state.siteHomeKpi.loading;
    const SelSite = state.siteHomeKpi?.selSite;
    const [dropDown, setDropDown] = useState(null);
    const [selected, setSelected] = useState(null);
    const [pieData, setPieData] = useState([]);
  
    useEffect(() => {
        if (!data || data?.length === 0) return setPieData([]);
        if (data?.length > 0) {
            const dropDown = data.map((d) => {
                return { name: d.FilterType, value: d.FilterType, KPIType:d.KPIType};
            });
            var uniqueObjectMap = {};
            var uniqueObjects = [];
            dropDown?.forEach((d) =>{
                var key = JSON.stringify(d);
                if (!uniqueObjectMap[key]) {
                    uniqueObjectMap[key] = true;
                    uniqueObjects.push(d);
                }
            })
            const pmDropdown = uniqueObjects?.filter((d)=>d?.KPIType === "PM")
            if(pmDropdown?.length >0){
                getPmSelectedDrop({ dropValue:pmDropdown[0]?.value, labelName:label})
            } else {
                getPmSelectedDrop(null)  
            }
            const lsDropdown = uniqueObjects?.filter((d)=>d?.KPIType === "LS")
            if(lsDropdown?.length >0){
                getPmSelectedDrop({ dropValue:lsDropdown[0]?.value, labelName:label})
            } else {
                getPmSelectedDrop(null)  
            }
            const tciDropdown = uniqueObjects?.filter((d)=>d?.KPIType === "TCI")
            if(tciDropdown?.length >0){
                getPmSelectedDrop({ dropValue:tciDropdown[0]?.value, labelName:label})
            } else {
                getPmSelectedDrop(null)  
            }
            setSelected(data[0].FilterType);
            setDropDown(null)
            setDropDown(uniqueObjects);  
        } else {
            setDropDown(null); 
        }
    }, [data]);

    useEffect(() => {
        if (selected !== null) {
            const filteredData = data?.filter((d) => d?.FilterType === selected);
            const filObj = {};
            filteredData.forEach((d) => filObj[d.ColumnName] = d.Value);
            const outputData = [];
            for (const key in filObj) {
                if (filObj.hasOwnProperty(key)) {
                    outputData.push({
                        "name": key,
                        "value": filObj[key]
                    });
                }
            }
             setPieData(outputData);
        }  
    }, [selected, data, getPmSelectedDrop]);

    return (
        <Box className="inside-card" sx={{ width: "100%" }}>
            <Box className="piechartTitle">
                <Box sx={{ display: "flex" }}>
                    <img src={titleIcon} width={16} />
                    <Typography pl="2px" className="kpi-label">
                        {label}
                    </Typography>
                </Box>
                {dropDown && (
                    <Box sx={{ width: "50%", ml: "auto" }}>
                        <FormControl variant="standard">
                            <Select
                                labelId="standard-label"
                                id="select-standard"
                                value={selected}
                                style={{ zIndex: "9" }}
                                onChange={(newVal) => {         
                                    getPmSelectedDrop({ dropValue:newVal.target.value, labelName:label})
                                    setSelected(newVal.target.value);
                                }}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 145 } } }}
                                sx={{
                                    fontSize: "11px",
                                    "& .MuiSelect-select": {
                                        padding: "1px",
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: "#00ab8e2b !important",
                                    },
                                }}
                            >
                                {dropDown.map((d) => (
                                    <MenuItem key={d.name} value={d.value}>
                                        {d.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </Box>
            {Loading.includes("PM_LS_TCI") ? (
                <Box
                    sx={{
                        height: "128px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Spinner />
                </Box>
            ) : (
                <Chart data={pieData} />
            )}
        </Box>
    );
};

export default PmLsTciChart;
