import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, FormControl, Grid, MenuItem, Select, Switch, Typography } from '@mui/material';
import Charts from './Componants';
import TopTenImage from "../../../../assets/icon/top-10-error.svg";

// const data = [
//     {
//         "filter": "Filter_WTD",
//         "errorCount": [
//             {
//                 "error": "Contract Violation",
//                 "count": "561"
//             },
//             {
//                 "error": "Elec FB ThyristorBypass ErrStop",
//                 "count": "48"
//             },
//             {
//                 "error": "INTL_Overcurrent",
//                 "count": "24"
//             },
//             {
//                 "error": "Temp OilSump HighStop",
//                 "count": "20"
//             },
//             {
//                 "error": "Pitch Akku3Voltage LowStop",
//                 "count": "44"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By Other Developer",
//                 "count": "897"
//             },
//             {
//                 "error": "SE RebootPLC",
//                 "count": "104"
//             },
//             {
//                 "error": "Preventive Check",
//                 "count": "162"
//             },
//             {
//                 "error": "Elec CurrentSoftstarterHigh",
//                 "count": "5"
//             },
//             {
//                 "error": "INTL_Feeder BreakDown",
//                 "count": "33"
//             }
//         ],
//         "totalDurationCount": [
//             {
//                 "error": "Contract Violation",
//                 "count": "13439.10"
//             },
//             {
//                 "error": "Elec FB ThyristorBypass ErrStop",
//                 "count": "184.40"
//             },
//             {
//                 "error": "INTL_Overcurrent",
//                 "count": "4.80"
//             },
//             {
//                 "error": "Temp OilSump HighStop",
//                 "count": "84.60"
//             },
//             {
//                 "error": "Pitch Akku3Voltage LowStop",
//                 "count": "456.00"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By Other Developer",
//                 "count": "482.95"
//             },
//             {
//                 "error": "SE RebootPLC",
//                 "count": "200.43"
//             },
//             {
//                 "error": "Preventive Check",
//                 "count": "217.40"
//             },
//             {
//                 "error": "Elec CurrentSoftstarterHigh",
//                 "count": "42.50"
//             },
//             {
//                 "error": "INTL_Feeder BreakDown",
//                 "count": "42.90"
//             }
//         ]
//     },
//     {
//         "filter": "Filter_MTD",
//         "errorCount": [
//             {
//                 "error": "INTL_Line Breakdown due to E/F",
//                 "count": "3272"
//             },
//             {
//                 "error": "WP4084 chan.2 stop",
//                 "count": "5"
//             },
//             {
//                 "error": "Slew ring Failure",
//                 "count": "71"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "2705"
//             },
//             {
//                 "error": "Elec CutintoG1 TimeOutStop",
//                 "count": "33"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "1006"
//             },
//             {
//                 "error": "CLS MainBearingGreaseLevelLowStop",
//                 "count": "474"
//             },
//             {
//                 "error": "Elec FB GearOil Pump",
//                 "count": "97"
//             },
//             {
//                 "error": "Preventive Action",
//                 "count": "640"
//             },
//             {
//                 "error": "INTL_Line Breakdown due to E/F",
//                 "count": "4934"
//             }
//         ],
//         "totalDurationCount": [
//             {
//                 "error": "INTL_Line Breakdown due to E/F",
//                 "count": "2489.03"
//             },
//             {
//                 "error": "WP4084 chan.2 stop",
//                 "count": "5.20"
//             },
//             {
//                 "error": "Slew ring Failure",
//                 "count": "1422.50"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "4190.11"
//             },
//             {
//                 "error": "Elec CutintoG1 TimeOutStop",
//                 "count": "373.40"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "3621.50"
//             },
//             {
//                 "error": "CLS MainBearingGreaseLevelLowStop",
//                 "count": "250.90"
//             },
//             {
//                 "error": "Elec FB GearOil Pump",
//                 "count": "947.60"
//             },
//             {
//                 "error": "Preventive Action",
//                 "count": "1884.30"
//             },
//             {
//                 "error": "INTL_Line Breakdown due to E/F",
//                 "count": "1230.80"
//             }
//         ]
//     },
//     {
//         "filter": "Filter_YTD",
//         "errorCount": [
//             {
//                 "error": "EXTL_Shut Down Taken By Customer",
//                 "count": "10511"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "16409"
//             },
//             {
//                 "error": "Natural Calamities",
//                 "count": "34825"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "58164"
//             },
//             {
//                 "error": "EXTL_Grid Down from EB",
//                 "count": "28562"
//             },
//             {
//                 "error": "INTL_Shut Down Taken By OMS",
//                 "count": "8095"
//             },
//             {
//                 "error": "Main Bearing Failure",
//                 "count": "318"
//             },
//             {
//                 "error": "IDRV Audit",
//                 "count": "607"
//             },
//             {
//                 "error": "EXTL_WTG Shut Down By Customer",
//                 "count": "8457"
//             },
//             {
//                 "error": "EHV system (substation / Upstream Line) failure",
//                 "count": "21329"
//             }
//         ],
//         "totalDurationCount": [
//             {
//                 "error": "EXTL_Shut Down Taken By Customer",
//                 "count": "47966.02"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "28347.73"
//             },
//             {
//                 "error": "Natural Calamities",
//                 "count": "698256.00"
//             },
//             {
//                 "error": "EXTL_Shut Down Taken By EB",
//                 "count": "116685.56"
//             },
//             {
//                 "error": "EXTL_Grid Down from EB",
//                 "count": "29837.30"
//             },
//             {
//                 "error": "INTL_Shut Down Taken By OMS",
//                 "count": "19609.99"
//             },
//             {
//                 "error": "Main Bearing Failure",
//                 "count": "6723.50"
//             },
//             {
//                 "error": "IDRV Audit",
//                 "count": "3696.50"
//             },
//             {
//                 "error": "EXTL_WTG Shut Down By Customer",
//                 "count": "3284.00"
//             },
//             {
//                 "error": "EHV system (substation / Upstream Line) failure",
//                 "count": "16722.11"
//             }
//         ]
//     }
// ]

// const data = [
//     {
//         "filter": "Filter_YTD",
//         "errorCount": [
//             {
//                 "error": "Elec CurrentAsymmetry Elec CurrentAsymmetry",
//                 "count": "7"
//             },
//             {
//                 "error": "Elec FB NacelleFan Elec FB NacelleFan Elec FB NacelleFan",
//                 "count": "7"
//             },
//             {
//                 "error": "Elec SoftStarter ErrStop",
//                 "count": "7"
//             },
//             {
//                 "error": "Elec VectorSurgeStop",
//                 "count": "7"
//             },
//             {
//                 "error": "Mech WindSpeed Diff",
//                 "count": "7"
//             },
//             {
//                 "error": "Mech WindSpeed1 2 DefStop",
//                 "count": "7"
//             },
//             {
//                 "error": "Temp IntBearing HighStop",
//                 "count": "7"
//             }
//         ],
//         "totalDurationCount": [
//             {
//                 "error": "Elec CurrentAsymmetry",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Elec FB NacelleFan",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Elec SoftStarter ErrStop",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Elec VectorSurgeStop",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Mech WindSpeed Diff",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Mech WindSpeed1 2 DefStop",
//                 "count": "0.00"
//             },
//             {
//                 "error": "Temp IntBearing HighStop",
//                 "count": "0.00"
//             }
//         ]
//     }
// ]

const barColors = ["#45C052", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A", "#45C052", "#FFBF00", "#7098FF", "#36A98A"];

const yAxisMaxConfigs = {
    max: 100,
    decimalsInFloat: 0,
    forceNiceScale: false,
    tickAmount: 5,
};
const yAxisConfigs = {
    decimalsInFloat: 0,
    forceNiceScale: false,
}
const Top10Errors = ({data,  icon, label }) => {
    const [count, setCount] = useState('errorCount')
    const [barData, setBarData] = useState({
        dataValues: [],
        dataLabels: [],
    });
    const filterValues = {
        "1W": {
            name: "Filter_WTD", value: "1W"
        },
        "1M": {
            name: "Filter_MTD", value: "1M"
        },
        "1Y": {
            name: "Filter_YTD", value: "1Y"
        }
    }
    const [selFilter, setSelFilter] = useState(filterValues['1Y']);
    const [errorToggle, setErrorToggle] = useState(false)

    const onFilterClick = (value) => {
        setSelFilter(filterValues[value]);
    }

    useEffect(() => {
        if (errorToggle === false) {
            setCount("errorCount")
        } else {
            setCount("totalDurationCount")
        }

    }, [errorToggle])

    useEffect(() => {
        const filterData = data.filter((obj) => {
            if (obj.filter === selFilter.name) {
                return obj;
            }
        })

        if (count === 'errorCount' && filterData?.length > 0) {
            const newData = filterData.map((d) => d.errorCount);
            const dataValues = [];
            const dataLabels = [];
            const newArray = newData.flatMap(d => d).sort((a, b) => b.count - a.count)
            newArray.forEach(d => {
                dataValues.push(parseInt(d.count));
                dataLabels.push(d.error);
            });
            setBarData({ dataValues: dataValues, dataLabels: dataLabels });
        } else {
            const newData = filterData.map((d) => d.totalDurationCount);
            const dataValues = [];
            const dataLabels = [];
            const newArray = newData.flatMap(d => d).sort((a, b) => b.count - a.count)
            newArray.forEach(d => {
                dataValues.push(parseInt(d.count));
                dataLabels.push(d.error);
            });
            setBarData({ dataValues: dataValues, dataLabels: dataLabels });
        }

    }, [data, count, selFilter]);

    return (
        <Grid>
            <Grid item md={12} xs={12}>
                <div className="top-err-wrep">
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                        {" "}
                        Top 10 Error History
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginLeft: "10px" }} >
                        <Typography className="kpi-label">{label}</Typography>
                        <button name="1W" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1W" && "selected"}`} >1W</button>
                        <button name="1M" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1M" && "selected"}`} >1M</button>
                        <button name="1Y" onClick={(e) => onFilterClick(e.target.name)} className={`top-10filters ${selFilter.value === "1Y" && "selected"}`} >1Y</button>
                    </Box>
                    <Box ml={7}>
                        <Typography>{errorToggle ? "Downtime (Hrs)" : "Frequecy"}</Typography>
                    </Box>
                    <Box sx={{ width: "20%", ml: "auto" }}>
                        <Switch
                            color="success"
                            size="small"
                            checked={errorToggle}
                            onChange={(event) => setErrorToggle((prevChecked) => !prevChecked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </div>
                <div className="top-ten-img">
                    <img src={TopTenImage} alt="" width="100%" />
                </div>
            </Grid>
            <Grid item md={12} xs={12}>
                <Box sx={{}}>
                    <Charts
                        dataLabels={barData.dataLabels}
                        dataValues={barData.dataValues}
                        barColors={barColors}
                        showLabel={true}
                    // yAxisConfigs={ yAxisConfigs}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Top10Errors;

