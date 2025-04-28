import { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import MultipleSelectAutocomplete from 'pages/Templates/Demo';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Tooltip from '@mui/material/Tooltip';
import { LicenseManager } from 'ag-grid-enterprise';
import { Typography, TextField, Box, Button, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RowBarChart from './components/RowBarChart';
import { Formik } from 'formik';
import { getCountryData } from 'redux/actions/UserSiteMapping';
import * as Yup from 'yup';
import { IoCaretBackCircle } from 'react-icons/io5';
import { makeStyles } from '@mui/styles';
import { formatAmountInINR } from 'pages/common-components/AgGridUtility/ColumnHeaderWithAsterick';
import { useLocation, useNavigate } from 'react-router-dom';
import 'ag-grid-enterprise';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { FaFileDownload } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VillaIcon from '@mui/icons-material/Villa';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  getMaterialCategory,
  getMaterialType,
} from 'redux/actions/Scm/DropDown';
import BarChartComponent from './components/BarChartComponent';
import BarChartSingle from './components/BarChartSingle';
import { getStateDropdown } from 'redux/actions/SynergyDashboard';
import usePurchase from './hooks/usePurchase';

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
  },
  customHeader: {
    color: '#000',
    background: '#F7F8FA',
    '&:hover': {
      color: '#000',
      background: '#F7F8FA',
    },
  },
  header: {
    textTransform: 'capitalize',

    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#000',
  },
  customTooltip: {
    fontSize: '16px !important',
  },
  materialCheckbox: {
    '& .MuiOutlinedInput-root': {
      padding: '3px !important',
      height: '37px !important',
    },
  },
});

const PurchaseOrder = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [columnDefs, setColumnDefs] = useState([]);

  const { downloadLoading } = useSelector((state: any) => state.H2ScmReducer);
  //handelClick
  const state = useSelector((state: any) => state);
  const stateDrop = state?.synergyDashboard?.stateDropdown ?? [];
  const areaDrop = state?.synergyDashboard?.areaDropdown ?? [];
  const mainSiteDrop = state?.synergyDashboard?.siteDropdown ?? [];
  const dropdownLoading = state?.MaterialDropdownMaster?.dropdownLoading;
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [ibLevelValue, setIbLevelValue] = useState([]);
  const [stateLevelValue, setStateLevelValue] = useState([]);
  const [ageingValue, setAgeingValue] = useState([]);
  const [materialValue, setMaterialValue] = useState([]);
  const [chartType, setChartType] = useState('Value');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    setIsContentVisible(true);
  }, []);
  const tooltipTitle = isContentVisible
    ? 'Zoom In Ag-Grid'
    : 'Zoom Out Ag-Grid';
  const { generateRandomColors } = usePurchase();
  const [isContentVisibleChart, setIsContentVisibleChart] = useState(true);
  const [GraphColor, setGraphColors] = useState([]);

  useEffect(() => {
    setIsContentVisibleChart(false);
  }, []);
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

        let url = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/getPurchaseOrder?queryParam=${filterStr}`;
        let colDefObject = `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/scm/GetColumnConfigurations?template=PO`;

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

  const onGridReady = useCallback((params) => {
    var datasource = getServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  const [gridApi, setGridApi] = useState(null);
  const handleExportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: 'Purchase OrderTemplate',
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

  const SearchValidation = Yup.object().shape({});
  const [Loader, setLoader] = useState(null);
  const UserState = useSelector((state: RootStateOrAny) => {
    return state?.user;
  });
  const MaterialCategory =
    state?.MaterialDropdownMaster?.MaterialCategoryList ?? [];

  const Material = state?.MaterialDropdownMaster?.MaterialList ?? [];
  const UserData = UserState?.userData;
  const fetchGraphData = async (params?: any) => {
    setLoader(true);
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
        materialCode && `material=${materialCode.Material}`,
        `userId=${UserData?.empCode}`,
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
      let parserObj = JSON.parse(result.data.responseObject);
      let resultParser = JSON.parse(parserObj.results);

      console.log('resultParser', resultParser);
      const ibLevalValuationData = resultParser.filter(
        (item) => item.KPIType === 'IB Leval Valuation',
      );
      setIbLevelValue(ibLevalValuationData);

      const stateLevalValuationData = resultParser.filter(
        (item) => item.KPIType === 'State Leval Valuation',
      );
      let colors = generateRandomColors(stateLevalValuationData);
      setGraphColors(colors);

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

  console.log('materialData', materialValue);
  useEffect(() => {
    dispatch(getCountryData());
    fetchGraphData();
    dispatch(getStateDropdown());
    dispatch(getMaterialCategory());
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedHandleChangeMaterial = debounce((event, categoryType) => {
    setSearchQuery(event.target.value);
    dispatch(getMaterialType(categoryType, event.target.value));
  }, 500);
  const handleChangeMaterial = (event, categoryType) => {
    event.persist();
    debouncedHandleChangeMaterial(event, categoryType);
  };

  return (
    <>
      <div className={classes.header}>
        <div>
          <Grid container spacing={2}>
            <Grid item sm={6} lg={7}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  top: '-7px',
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
                  {`${TitleTable} `} <small> ( All values in Lakhs ) </small>
                </Typography>
              </div>
            </Grid>
            <Grid item sm={6} lg={5}>
              <Grid container spacing={1} style={{ justifyContent: 'end' }}>
                {ibLevelValue &&
                  ibLevelValue.map((item) => {
                    return (
                      <>
                        <Grid item sm={6} lg={5} style={{ cursor: 'pointer' }}>
                          <Tooltip
                            title={
                              formatAmountInINR(item?.TootlTip) ??
                              formatAmountInINR(item?.Value)
                            }
                            className={classes.customTooltip}
                            arrow
                          >
                            <Typography
                              key={item.Colname}
                              variant='h5'
                              component='h5'
                              sx={{
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '7px',
                                boxShadow:
                                  '0px 0px 2px 0px rgba(103, 103, 103, 0.25)',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: '12px',
                                }}
                              >
                                <AccountBalanceWalletIcon
                                  className='icon-chart'
                                  style={{
                                    fontSize: '18px',
                                    marginRight: '5px',
                                  }}
                                />
                                {item.Colname}
                                <span
                                  style={{
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    paddingLeft: '5px',
                                  }}
                                >
                                  {formatAmountInINR(item?.Value)}
                                </span>
                              </div>
                            </Typography>
                          </Tooltip>
                        </Grid>
                      </>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </div>
        {isContentVisible && (
          <Grid container spacing={2}>
            {/*  */}

            {/* <Selections 
            
            states,site,area
            /> */}
            <Grid
              container
              spacing={2}
              alignItems='center'
              sx={{ marginTop: '0px' }}
            >
              <Grid item sm={12} lg={12}>
                <Formik
                  initialValues={intialVal}
                  validationSchema={SearchValidation}
                  onSubmit={(values, actions) => {
                    const data = {
                      area:
                        values?.area?.join('') !== undefined
                          ? values?.area?.join('')
                          : '',
                      site:
                        values?.site?.join('') !== undefined
                          ? values?.site?.join('')
                          : '',
                      state:
                        values?.state?.join('') !== undefined
                          ? values?.state?.join('')
                          : '',
                    };

                    console.log('values__', values);
                    fetchGraphData(values);
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                    errors,
                    touched,
                  }: any) => (
                    <form onSubmit={handleSubmit}>
                      <Grid>
                        <Grid item xs={12} md={12}>
                          <Box sx={{ marginLeft: '8px' }}>
                            <Grid
                              container
                              spacing={2}
                              sx={{ alignItems: 'center', marginBottom: '5px' }}
                            >
                              <Grid item md={2} xs={12}>
                                <MultipleSelectAutocomplete
                                  listing={stateDrop || []}
                                  values={
                                    values && values.state ? values.state : []
                                  }
                                  setFieldValue={setFieldValue}
                                  label='State'
                                  name='state'
                                />
                              </Grid>

                              <Grid item md={2} xs={12}>
                                <MultipleSelectAutocomplete
                                  listing={areaDrop || []}
                                  values={
                                    values && values.area ? values.area : []
                                  }
                                  setFieldValue={setFieldValue}
                                  label='Area'
                                  name='area'
                                />
                              </Grid>

                              <Grid item md={2} xs={12}>
                                <MultipleSelectAutocomplete
                                  listing={mainSiteDrop || []}
                                  values={
                                    values && values.site ? values.site : []
                                  }
                                  setFieldValue={setFieldValue}
                                  label='Site'
                                  name='site'
                                />
                              </Grid>

                              <Grid item sm={2} lg={2}>
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size='small'
                                >
                                  <Typography
                                    sx={{ fontSize: '12px', fontWeight: '600' }}
                                  >
                                    Material Category
                                  </Typography>
                                  <InputLabel
                                    id='demo-select-small-label'
                                    sx={{
                                      backgroundColor: 'white',
                                      display: 'none',
                                    }}
                                  ></InputLabel>
                                  <Select
                                    sx={{ backgroundColor: 'white' }}
                                    labelId='demo-select-small-label'
                                    id='demo-select-small'
                                    value={values.materialCategory}
                                    label=''
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setFieldValue(
                                        'materialCategory',
                                        newValue,
                                      );
                                      setFieldValue('materialCode', null);
                                      dispatch(getMaterialType(newValue));
                                    }}
                                  >
                                    <MenuItem value=''>
                                      <em>None</em>
                                    </MenuItem>
                                    {MaterialCategory.map((val, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={val.Category}
                                        >
                                          {val.Category}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item sm={2} lg={2}>
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size='small'
                                  className={classes.materialCheckbox}
                                  style={{ fontSize: 10 }}
                                >
                                  <Typography
                                    sx={{ fontSize: '12px', fontWeight: '600' }}
                                  >
                                    Material
                                  </Typography>
                                  <InputLabel
                                    id='demo-select-small-label'
                                    sx={{
                                      backgroundColor: 'white',
                                      display: 'none',
                                    }} // Set background color to
                                  ></InputLabel>

                                  <Autocomplete
                                    style={{ background: '#fff' }}
                                    id='combo-box-demo'
                                    size='small'
                                    fullWidth
                                    options={Material}
                                    getOptionLabel={(option: any) =>
                                      option?.Description
                                    }
                                    disabled={values.materialCategory === null}
                                    loadingText='Loading'
                                    noOptionsText={
                                      dropdownLoading ? 'Loading..' : 'Search'
                                    }
                                    // onChange={(event, newValue) =>
                                    //   handleChangeMaterial(event, newValue),
                                    //   setFieldValue(
                                    //     "materialCode",
                                    //     newValue
                                    //   )
                                    // }
                                    value={values.materialCode}
                                    onChange={(e: any, newValue) => {
                                      // const newValue = e.target.value;
                                      setFieldValue('materialCode', newValue);

                                      console.log('newValue', newValue);
                                      //dispatch(getMaterialType(newValue));
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        onChange={(event) =>
                                          handleChangeMaterial(
                                            event,
                                            values.materialCategory,
                                          )
                                        }
                                        style={{ background: '#fff' }}
                                        placeholder='Search Material'
                                        {...params}
                                        label=''
                                        variant='outlined'
                                        value={searchQuery}
                                      />
                                    )}
                                  />

                                  {/* <Select
                                    sx={{ backgroundColor: "white" }}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={values.materialCode}
                                    label=""
                                    disabled={!values.materialCategory}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setFieldValue('materialCode', newValue);
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    {Material.map((val, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={val?.Material}
                                        >
                                          {val?.Material}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select> */}
                                </FormControl>
                              </Grid>
                              <Grid item sm={2} lg={2}>
                                <Button
                                  type='submit'
                                  className='Sub-btn'
                                  disabled={Loader}
                                  variant='outlined'
                                  sx={{
                                    fontWeight: '500',
                                    width: '100%',
                                    marginTop: '18px',
                                    border: 'none',
                                    padding: '7px',
                                  }}
                                  color='primary'
                                >
                                  {Loader ? (
                                    <CircularProgress
                                      size={20}
                                      style={{ color: '#fff' }}
                                    />
                                  ) : (
                                    'Apply'
                                  )}
                                </Button>
                              </Grid>
                              <Grid item sm={1} lg={1}>
                                <Button
                                  onClick={resetForm}
                                  className='reset-btn'
                                  variant='outlined'
                                  sx={{
                                    fontWeight: '500',
                                    width: '100%',
                                    marginTop: '18px',
                                    border: 'none',
                                    padding: '7px',
                                  }}
                                >
                                  Reset
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      {isContentVisible && (
        <div className='card-wrepper'>
          <Grid container spacing={1}>
            <Grid item sm={6} lg={6}>
              <div className='card-inside'>
                <Typography className='title-card flex-div'>
                  <VillaIcon className='icon-chart' /> State Wise Valuation
                </Typography>
                <BarChartComponent
                  stateLevelValue={stateLevelValue}
                  GraphColor={GraphColor}
                />
              </div>
            </Grid>

            <Grid item sm={6} lg={6}>
              <div className='card-inside' style={{ position: 'relative' }}>
                <Typography className='title-card flex-div'>
                  <VillaIcon className='icon-chart' /> Ageing {chartType}
                </Typography>
                <BarChartSingle
                  chartType={chartType}
                  setChartType={setChartType}
                  ageingValue={ageingValue}
                  GraphColor={GraphColor}
                />
              </div>
            </Grid>
            {isContentVisibleChart && (
              <Grid item sm={6} lg={6}>
                <div className='card-inside' style={{ position: 'relative' }}>
                  <Typography className='title-card flex-div'>
                    <CategoryIcon className='icon-chart' /> Top 10 Material
                  </Typography>
                  <RowBarChart
                    materialValues={materialValue}
                    GraphColor={GraphColor}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      )}

      <div style={containerStyle}>
        <Box
          my={1}
          justifyContent='space-between'
          display='flex'
          alignItems='center'
        >
          <div>
            {' '}
            {isContentVisible && (
              <Button
                className='Sub-btn f-600'
                sx={{
                  minWidth: '36px',
                  padding: '6px',
                  fontSize: '18px',
                  marginRight: '10px',
                  height: '34px',
                  background: '#e0e0e0!important',
                  border: '1px solid #f1f1f1',
                  color: '#019e89!important',
                }}
                onClick={() => setIsContentVisibleChart(!isContentVisibleChart)}
              >
                {' '}
                {!isContentVisibleChart ? (
                  <span style={{ fontWeight: '600 !important' }}>
                    Show More Charts
                  </span>
                ) : (
                  <span style={{ fontWeight: '600 !important' }}>
                    Show less
                  </span>
                )}
                {!isContentVisibleChart ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </Button>
            )}
          </div>
          <div>
            <Tooltip title={tooltipTitle} placement='bottom' arrow>
              <Button
                className='Sub-btn'
                sx={{
                  minWidth: '36px',
                  padding: '6px',
                  fontSize: '20px',
                  marginRight: '10px',
                  height: '34px',
                  background: '#008ffb!important',
                }}
                onClick={() => setIsContentVisible(!isContentVisible)}
              >
                {isContentVisible ? (
                  <svg
                    style={{ fontSize: '20px' }}
                    viewBox='64 64 896 896'
                    focusable='false'
                    fill='currentColor'
                    width='1em'
                    height='1em'
                    data-icon='zoom-in'
                    aria-hidden='true'
                  >
                    <path d='M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z'></path>
                  </svg>
                ) : (
                  <svg
                    style={{ fontSize: '20px' }}
                    viewBox='64 64 896 896'
                    focusable='false'
                    fill='currentColor'
                    width='1em'
                    height='1em'
                    data-icon='zoom-out'
                    aria-hidden='true'
                  >
                    <path d='M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z'></path>
                  </svg>
                )}
              </Button>
            </Tooltip>
            <Tooltip title='Download Excel' placement='bottom' arrow>
              <Button
                onClick={handleExportToExcel}
                disabled={downloadLoading}
                variant='contained'
                color='primary'
                title='Download Excel'
                className='Sub-btn'
                sx={{ minWidth: '38px', padding: '8px' }}
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
            rowModelType={'serverSide'}
            // pagination={true}
            cacheBlockSize={100}
            maxBlocksInCache={10}
            // paginationPageSize={20}
            onGridReady={onGridReady}
            serverSideInfiniteScroll={true}
            rowHeight={23}
          />
        </div>
      </div>
    </>
  );
};

export default PurchaseOrder;
