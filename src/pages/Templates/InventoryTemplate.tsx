import { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { LicenseManager } from 'ag-grid-enterprise';
import { Typography, Grid, Paper } from '@mui/material';
import { IoCaretBackCircle } from 'react-icons/io5';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import 'ag-grid-enterprise';
import LineChartInventory from './components/inventory/LineChartInventory';
import InventoryOMSPlantGrid from './components/inventory/InventoryOMSPlantGrid';
import StackGraphOMSPlant from './components/inventory/StackGraphOMSPlant';
import StackInventoryUsableDamageValue from './components/inventory/StackInventoryUsableDamageValue';
import TimelineIcon from '@mui/icons-material/Timeline';
import TableChartIcon from '@mui/icons-material/TableChart';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import InventoryValueGrid from './components/inventory/InventoryValueGrid';

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
    backgroundColor: '#fff',
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
});

const InventoryTemplate = () => {
  const location = useLocation();
  const [TitleTable, setTitleTable] = useState('');
  const [fYear, setFYear] = useState('');

  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const extractedString = location.pathname.slice(
      location.pathname.indexOf('templates/') + 10,
    );
    let formattedString = extractedString.replace(/-/g, ' ');
    formattedString =
      formattedString.charAt(0).toLocaleUpperCase() + formattedString.slice(1);
    setTitleTable(formattedString);
  }, [location.pathname]);

  const [inventoryValues, setInventoryValues] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}${process.env.REACT_APP_SCM_PORT}/api/SCM/getInventoryKpi?reportType=KPIBoxes`,
    )
      .then((res) => res.json())
      .then((data) => {
        setInventoryValues(data);
      });
  }, []);

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item sm={8} lg={8}>
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
                {`${TitleTable} `} <small> ( All values in Crore ) </small>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} marginBottom={2}>
        {inventoryValues.map((item) => {
          return (
            <Grid item xs={6} key={item.value}>
              <Paper
                style={{
                  backgroundColor: '#daefec',
                  padding: '10px',
                }}
              >
                <Typography
                  variant='h4'
                  style={{
                    textAlign: 'center',
                    color: '#3e79ff',
                    fontWeight: '600',
                  }}
                >
                  INR {item?.Value?.toLocaleString('en-IN')} Crs
                </Typography>
                <Typography variant='body2' style={{ textAlign: 'center' }}>
                  {item.KPIName}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <div className='card-inside'>
              <Typography className='title-card flex-div'>
                {' '}
                <TimelineIcon className='icon-chart' /> Compare Inventory Value
                For FY22-23 & FY 23-24 By Month
              </Typography>
              <LineChartInventory />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper>
            <div className='card-inside'>
              <Typography className='title-card flex-div'>
                {' '}
                <TableChartIcon className='icon-chart' /> Inventory Value For FY{' '}
                {fYear} By State (OMS Plant)
              </Typography>
              <InventoryOMSPlantGrid />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <div className='card-inside' style={{ height: '446px' }}>
              <Typography className='title-card flex-div'>
                {' '}
                <EqualizerIcon className='icon-chart' /> Stock Value For FY{' '}
                {fYear} By State (OMS Plant)
              </Typography>
              <StackGraphOMSPlant setFYear={setFYear} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <div className='card-inside'>
              <Typography className='title-card flex-div'>
                {' '}
                <EqualizerIcon className='icon-chart' /> Inventory Value For FY{' '}
                {fYear} By Usable,damage Value
              </Typography>
              <StackInventoryUsableDamageValue />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <div className='card-inside'>
              <Typography className='title-card flex-div'>
                {' '}
                <TableChartIcon className='icon-chart' /> Inventory Value For FY{' '}
                {fYear} By Usable,damage Value
              </Typography>
              <InventoryValueGrid />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryTemplate;
