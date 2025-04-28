import {
  ColDef,
  GridReadyEvent,
  KeyCreatorParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import Skeleton from '@mui/material/Skeleton';
import { formatQuantity } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
import useTopfifty from './hooks/useTopfifty';
//import useConsumption from "./hooks/useConsumption";
import ConsumptionMainGrid from './components/ConsumptionMainGrid';
import ConsumptionQuantityGrid from './components/ConsumptionQuantityGrid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ConsumptionRowBarChart from './components/ConsumptionRowbar';
import { dummyrowdata } from './fakedata';
import 'ag-grid-enterprise';
import LineChartConsumption from './components/LineChartConsumption';
import ZoomableLineChart from './components/ZoomableLineChart';
import ConsumptionBargraph from './components/ConsumptionBarGraph';
import { Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { MySelectAutoComplete } from 'pages/common-components/FormComponents';
import { LicenseManager } from 'ag-grid-enterprise';
import { Typography, TextField, Box, Button, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import RowBarChart from 'pages/PurchaseTemplates/components/RowBarChart';
import {
  getAllAreas,
  getAllState,
  getMainSites,
} from 'redux/actions/logbook/DropdownAction';
import { Formik } from 'formik';
import {
  getAreaData,
  getCountryData,
  getStateData,
  getUserMappingListing,
  getUserSiteMappings,
} from 'redux/actions/UserSiteMapping';
import * as Yup from 'yup';
import { IoCaretBackCircle } from 'react-icons/io5';
import { makeStyles } from '@mui/styles';
import { DownloadTemplateExcel } from 'redux/actions/Scm/H2Template';
import Tooltip from '@mui/material/Tooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import 'ag-grid-enterprise';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { FaFileDownload } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';

import {
  getMaterialCategory,
  getMaterialType,
} from 'redux/actions/Scm/DropDown';

import { getStateDropdown } from 'redux/actions/SynergyDashboard';
import DownloadExcel from './components/DownloadExcel';
import usePurchase from 'pages/PurchaseTemplates/hooks/usePurchase';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

LicenseManager.setLicenseKey(
  '[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-054169}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{31 March 2024}____[v3]_[0102]_MTcxMTg0MzIwMDAwMA==fb01f966ded0a9f9a84dc3422fd7d82b',
);

const useStyles = makeStyles({
  customRoot: {
    '& .ag-body-viewport, & .ag-center-cols-viewport': {
      scrollbarWidth: 'auto!important',
    },
    '& .ag-body-viewport::-webkit-scrollbar, & .ag-center-cols-viewport::-webkit-scrollbar':
      {
        display: 'flex !important',
      },
    '& .ag-header-group-cell-label': {
      justifyContent: 'center !important',
    },
    '&.ag-pinned-left-cols-container, & .ag-pinned-right-cols-container': {
      overflowY: 'hidden !important',
      // '&.makeStyles-header-3':{

      //   }
    },
  },
  customHeader: {
    color: '#000',
    backgroundColor: '#fff', // Set your desired background color
    '&:hover': {
      color: '#000',
      backgroundColor: '#fff !important',
    },
  },
  header: {
    textTransform: 'capitalize',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000',
    borderRadius: 5,
    margin: '12px 0',
    padding: '10px',
    background: '#fff',
    border: '1px solid gainsboro',
  },
  cards: {
    // boxShadow: "0px 0px 2px 0px rgb(145 142 142 / 75%)",
    fontSize: '1.5rem',
    padding: '25px 5px',
    flexDirection: 'column',

    borderRadius: '5px',
    transition: 'box-shadow 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    color: '#3e79ff',
    position: 'relative',
    background: '#daefec',
    // border: '1px solid #e3e3e3',
  },
  customTooltip: {
    fontSize: '16px !important',
  },
});

const TopFifty = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
  const gridStyles = useMemo(() => ({ height: '368px', width: '100%' }), []);
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState('');
  const { formatIndianNumber } = usePurchase();
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { downloadLoading } = useSelector((state: any) => state.H2ScmReducer);
  const {
    KPI_tiles,
    loading,
    Top10ConsumptionValue,
    TotalConsumptionForYear,
    ConsumptionAmountForLastThree,
    CompareConsumptionQuantity,
    ConsumptionAmountForCurrentFy,
    Consumption,
    ColumnDef,
    ConsumptionForQuarter,
  } = useTopfifty();
  const gridOptions = {
    // adds subtotals
    groupIncludeFooter: true,
    // includes grand total
    suppressAggFuncInHeader: true,

    // other grid options ...
  };
  const roundTwoDecimal = (params: any) => {
    const value = params.value || 0;
    return Math.round(value * 100) / 100; // Round to two decimal places
  };
  //handelClick
  const state = useSelector((state: any) => state);
  const stateDrop = state?.synergyDashboard?.stateDropdown ?? [];
  const areaDrop = state?.synergyDashboard?.areaDropdown ?? [];
  const mainSiteDrop = state?.synergyDashboard?.siteDropdown ?? [];
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [ibLevelValue, setIbLevelValue] = useState([]);
  const [stateLevelValue, setStateLevelValue] = useState([]);
  const [ageingValue, setAgeingValue] = useState([]);
  const [materialValue, setMaterialValue] = useState([]);
  const [chartType, setChartType] = useState('Value');
  useEffect(() => {
    setIsContentVisible(true);
  }, []);
  const tooltipTitle = isContentVisible
    ? 'Zoom In Ag-Grid'
    : 'Zoom Out Ag-Grid';

  //const [gridApi, setGridApi] = useState(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[] | any>([
    { field: 'State', width: 200, rowGroup: true, hide: true },

    {
      field: '2021-2022',
      aggFunc: 'sum',
      width: 110,
      valueFormatter: roundTwoDecimal,
    },
    {
      field: '2023-2024',
      aggFunc: 'sum',
      width: 110,
      valueFormatter: roundTwoDecimal,
    },

    {
      field: '2023-2024',
      aggFunc: 'sum',
      width: 110,
      valueFormatter: roundTwoDecimal,
    },
    {
      field: 'TotalQuantity',
      aggFunc: 'sum',
      width: 130,
      valueFormatter: roundTwoDecimal,
    },
  ]);

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf('templates/') + 10,
    );
    const formattedString = extractedString.replace(/-/g, ' ');
    setTitleTable(formattedString);
  }, [location.pathname]);

  const getServerSideDatasource = () => {
    return {
      getRows: async (params) => {
        let filterStr = JSON.stringify(params.request);

        console.log('>>', filterStr);

        let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/getTop50CriticalMaterial?queryParam=${filterStr}`;
        let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/GetColumnConfigurations?template=Top50Consumption`;

        let header = {
          headers: {
            'ngrok-skip-browser-warning': '69420',
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
            let filterType = 'agTextColumnFilter';
            let headerName = key;
            let positioning;
            let displayWidth;
            let isEditable;
            let isFreeze;

            if (Array.isArray(colDef)) {
              const matchingObject = colDef.find((obj) => obj.DbKey === key);
              if (matchingObject) {
                headerName = matchingObject.DisplayText;
                positioning = matchingObject.Positioning;
                displayWidth = matchingObject.DisplayWidth;
                isEditable = matchingObject.IsEditable;
                isFreeze = matchingObject.IsFreeze;
                switch (matchingObject.DataType) {
                  case 'date':
                    filterType = 'agDateColumnFilter';
                    break;
                  case 'decimal':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'int':
                    filterType = 'agNumberColumnFilter';
                    break;
                  case 'text':
                    filterType = 'agTextColumnFilter';
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
            };
          });

          newColumnDefs.sort((a, b) => a.positioning - b.positioning);
          setColumnDefs(newColumnDefs);

          params.successCallback(data);
        } catch (error) {
          console.error('Error:', error);
        }
      },
    };
  };

  const onGridReadyServer = useCallback((params) => {
    var datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      autoHeaderHeight: true,
      resizable: true,
      headerClass: classes.customHeader,
      wrapHeaderText: true,
      floatingFilter: true,
      filter: 'agMultiColumnFilter',
      sortable: true,
    };
  }, []);

  const [gridApi, setGridApi] = useState(null);
  const handleExportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: 'Top50CriticalMaterial',
      });
    }
  };

  const intialVal = {
    state: null,
    area: null,
    site: null,

    materialCategory: null,
    materialCode: null,
  };

  const [Loader, setLoader] = useState(null);
  const UserState = useSelector((state: RootStateOrAny) => {
    return state?.user;
  });
  const MaterialCategory =
    state?.MaterialDropdownMaster?.MaterialCategoryList ?? [];

  const Material = state?.MaterialDropdownMaster?.MaterialList ?? [];
  const UserData = UserState?.userData;
  const fetchGraphData = async (params?: any) => {
    let basePath = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}`;

    let ApiPara = `getPurchaseOrderGraphData`;
    if (params) {
      const { state, area, site, materialCategory, materialCode } = params;
      const stateParam = Array.isArray(state) ? state.join(',') : state;
      const areaParam = Array.isArray(area) ? area.join(',') : area;
      const siteParam = Array.isArray(site) ? site.join(',') : site;
      const encodedStateParam = encodeURIComponent(stateParam);

      const queryParams = [
        stateParam && `state=${encodedStateParam}`,
        areaParam && `area=${areaParam}`,
        siteParam && `site=${siteParam}`,
        materialCategory && `materialCategory=${materialCategory}`,
        materialCode && `material=${materialCode}`,
        `userId=${UserData?.empCode}`, // Assuming this parameter is always present
      ]
        .filter(Boolean)
        .join('&');
      //consant url
      // ApiPara = `getPurchaseOrderGraphData`;
      ApiPara = `getPurchaseOrderGraphData?${queryParams}`;
      // ADD this below param if conditions changes
      // ApiPara = `getPurchaseRequisitionGraphData?state=${encodedStateParam}&area=${areaParam}&site=${siteParam}&materialCategory=${materialCategory}&material=${materialCode}&userId=userName`;
    } else {
      // ApiPara= `getPurchaseRequisitionGraphData`
    }
    const result = await axios(`${basePath}/api/SCM/${ApiPara}`);
    try {
      setLoader(true);
      let parserObj = JSON.parse(result.data.responseObject);
      let resultParser = JSON.parse(parserObj.results);

      console.log('resultParser', parserObj);
      const ibLevalValuationData = resultParser.filter(
        (item) => item.KPIType === 'IB Leval Valuation',
      );
      setIbLevelValue(ibLevalValuationData);

      const stateLevalValuationData = resultParser.filter(
        (item) => item.KPIType === 'State Leval Valuation',
      );
      setStateLevelValue(stateLevalValuationData);

      const ageingData = resultParser.filter(
        (item) => item.KPIType === 'Ageing',
      );
      setAgeingValue(ageingData);

      const materialData = resultParser
        .filter((item) => item.KPIType === 'Top 10 Material')
        .splice(1, 10);
      setMaterialValue(materialData);
      setLoader(false);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(getCountryData());
    fetchGraphData();
    dispatch(getStateDropdown());
    dispatch(getMaterialCategory());
    //dispatch(getMaterialType());
  }, []);
  const onGridReady = useCallback((params: GridReadyEvent) => {}, []);
  return (
    <>
      <div>
        {/* <div className={classes.header}> */}
        <Grid container spacing={3}>
          <Grid item sm={4} lg={4}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                top: '-12px',
              }}
            >
              <IoCaretBackCircle
                title='Back'
                onClick={() => navigate(-1)}
                style={{
                  fontSize: '24px',
                  cursor: 'pointer',
                  marginRight: '10px',

                  color: '#009e88',
                }}
              />

              <Typography
                variant='h5'
                component='h5'
                sx={{ fontWeight: '600' }}
              >
                {`${TitleTable} `}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* //graps as per consumption templetes */}
      <div style={containerStyle}>
        {loading ? (
          <Box
            style={{ position: 'relative' }}
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight={600}
          >
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <div>
              <Grid container spacing={1} sx={{ marginBottom: '10px' }}>
                {KPI_tiles.length > 0 ? (
                  <>
                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[0]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: '#f5e9e9' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "} */}

                            {formatQuantity(KPI_tiles[0]?.Quantity)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Last year Quantity
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>

                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[1]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: '#e3efed' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "} */}

                            {formatQuantity(KPI_tiles[1]?.Quantity)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Current year Quantity
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>

                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[2]?.Quantity)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: '#f5e9e9' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {/* <CurrencyRupeeIcon
                          sx={{ color: "#3e79ff", marginRight: "5px" }}
                        />{" "}
                         */}
                            {formatQuantity(KPI_tiles[2]?.Quantity)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Quantity for Last Month
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>

                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[0]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: '#ededed' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {formatQuantity(KPI_tiles[0]?.Value)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Last year Value
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>

                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[1]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div className={classes.cards}>
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {formatQuantity(KPI_tiles[1]?.Value)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Current year Value
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>

                    <Tooltip
                      sx={{ fontSize: '26px' }}
                      title={formatIndianNumber(KPI_tiles[2]?.Value)}
                      className={classes.customTooltip}
                      arrow
                    >
                      <Grid item sm={2} lg={2}>
                        <div
                          className={classes.cards}
                          style={{ background: '#ededed' }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              position: 'absolute',
                              right: '6px',
                              top: '6px',
                              color: '#3e79ff',
                            }}
                          />
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '600',
                              fontSize: '25px',
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '5px',
                            }}
                          >
                            {formatQuantity(KPI_tiles[2]?.Value)}
                          </Typography>
                          <Typography
                            variant='h5'
                            component='h5'
                            sx={{
                              fontWeight: '500',
                              fontSize: '12px',
                              color: '#464646',
                            }}
                          >
                            Amount for Last Month
                          </Typography>
                        </div>
                      </Grid>
                    </Tooltip>
                  </>
                ) : null}
              </Grid>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper>
                  <div className='card-inside' style={{ position: 'relative' }}>
                    <Typography className='title-card flex-div'>
                      <CategoryIcon className='icon-chart' /> Top 10 YTD
                      Consumption Value By Material Description
                    </Typography>
                    {Top10ConsumptionValue?.length > 0 ? (
                      <ConsumptionRowBarChart
                        materialValues={Top10ConsumptionValue}
                      />
                    ) : null}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className='card-inside' style={{ position: 'relative' }}>
                    <Typography className='title-card flex-div'>
                      <TimelineIcon className='icon-chart' /> This Year
                      Consumption Quantity Vs Last Year By Month
                    </Typography>
                  </div>
                  <LineChartConsumption data={CompareConsumptionQuantity} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className='card-inside' style={{ position: 'relative' }}>
                    <Typography className='title-card flex-div'>
                      <CategoryIcon className='icon-chart' />
                      Consumption Amount For Last Three Year
                    </Typography>
                  </div>
                  <ZoomableLineChart data={ConsumptionAmountForLastThree} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className='card-inside' style={{ position: 'relative' }}>
                    <Typography className='title-card flex-div'>
                      <CategoryIcon className='icon-chart' /> Consumption Amount
                      For Current FY Year By State
                    </Typography>
                  </div>
                  {ConsumptionAmountForCurrentFy?.length > 0 ? (
                    <ConsumptionBargraph data={ConsumptionAmountForCurrentFy} />
                  ) : null}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div
                    className='card-inside'
                    style={{
                      position: 'relative',
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography className='title-card flex-div'>
                      <CategoryIcon className='icon-chart' />
                      Total Consumption By State,plant For Year
                    </Typography>

                    <DownloadExcel
                      {...{
                        gridApi,
                        title: 'Total Consumption By State,plant For Year',
                      }}
                    />
                  </div>
                  <div className='ag-theme-alpine' style={gridStyles}>
                    <AgGridReact
                      className={classes.customRoot}
                      rowData={TotalConsumptionForYear}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      // pinnedTopRowData={[{
                      //   "Consumption Quantity Battery": 107887,
                      //   "Return Quantity Battery": 104429,
                      //   "Difference": -3458,
                      // }]}
                      autoGroupColumnDef={{
                        headerName: 'State',
                      }}
                      onGridReady={(params) => setGridApi(params.api)}
                      gridOptions={gridOptions}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Paper>
                  {ConsumptionForQuarter.length > 0 ? (
                    <ConsumptionQuantityGrid data={ConsumptionForQuarter} />
                  ) : (
                    <Box
                      style={{ position: 'relative' }}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      minHeight={300}
                    >
                      {' '}
                      <Skeleton animation='wave' width='100%' height={300} />
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* <Grid item xs={12}>
                {Consumption.length > 0 && ColumnDef.length > 0 ? (
                  <ConsumptionMainGrid {...{ Consumption, ColumnDef }} />
                ) : (
                  <Box
                    style={{ position: "relative" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={300}
                  >
                    {" "}
                    <Skeleton animation="wave" width="100%" height={300} />
                  </Box>
                )}
              </Grid> */}
            </Grid>
          </>
        )}
      </div>

      {/* emdcode */}

      <div style={containerStyle}>
        <Box
          my={1}
          justifyContent='space-between'
          display='flex'
          alignItems='center'
        >
          <div>
            {/* <Tooltip title={tooltipTitle} placement="bottom" arrow>
              <Button
                className="Sub-btn"
                sx={{
                  minWidth: "36px",
                  padding: "6px",
                  fontSize: "20px",
                  marginRight: "10px",
                  height: "34px",
                  background: "#008ffb!important",
                }}
                onClick={() => setIsContentVisible(!isContentVisible)}
              >
                {isContentVisible ? (
                  <svg
                    style={{ fontSize: "20px" }}
                    viewBox="64 64 896 896"
                    focusable="false"
                    fill="currentColor"
                    width="1em"
                    height="1em"
                    data-icon="zoom-in"
                    aria-hidden="true"
                  >
                    <path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                  </svg>
                ) : (
                  <svg
                    style={{ fontSize: "20px" }}
                    viewBox="64 64 896 896"
                    focusable="false"
                    fill="currentColor"
                    width="1em"
                    height="1em"
                    data-icon="zoom-out"
                    aria-hidden="true"
                  >
                    <path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                  </svg>
                )}
              </Button>
            </Tooltip> */}
            <Tooltip title='Download Excel' placement='bottom' arrow>
              <Button
                onClick={handleExportToExcel}
                disabled={downloadLoading}
                variant='contained'
                color='primary'
                title='Download Excel'
                className='Sub-btn'
                sx={{ minWidth: '38px', padding: '8px', marginLeft: '93vw' }}
              >
                {downloadLoading ? (
                  <CircularProgress style={{ color: '#fff' }} size={18} />
                ) : (
                  <FaFileDownload size={18} />
                )}
              </Button>
            </Tooltip>
          </div>
        </Box>
        <div className='ag-theme-alpine' style={gridStyle}>
          <AgGridReact
            className={classes.customRoot}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            cacheBlockSize={100}
            maxBlocksInCache={10}
            serverSideInfiniteScroll={true}
            rowModelType={'serverSide'}
            rowHeight={23}
            onGridReady={onGridReadyServer}
          />
        </div>
      </div>
    </>
  );
};

export default TopFifty;
