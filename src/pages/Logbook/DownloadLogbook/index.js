import { Card, CardContent, Typography, Grid, Box, MenuItem, FormControl, InputLabel, Select, TextField, Button, SliderValueLabel, Autocomplete } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DatePicker } from '@mui/x-date-pickers';
import AgGridTable from "pages/common-components/AgGridTable";
import { MySelect, MySelectAutoComplete, } from "pages/common-components/FormComponents";
import { downloadSummaryExcel, getAllSearchlogbookData } from "redux/actions/logbook/DownloadViewAction";
import { useDispatch, useSelector } from "react-redux";
import { Buttons } from "pages/common-components/Button";
import { tempData } from "./utils";
import { getAllAreas, getAllState, getMainSites } from "redux/actions/logbook/DropdownAction";
import DownloadPDF from "./PDF";
import moment from "moment";
import './style.css'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

function DownloadLogbook() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const stateDrop = state?.dropdownMaster?.stateListing;
  const areaDrop = state?.dropdownMaster?.areaListing;
  const mainSiteDrop = state?.dropdownMaster?.getMainSites;
  const Listing = state?.DownloadView?.logbookDataListing || [];
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSummaryReport = (values) => {
    const data = {
      state: values?.state?.state,
      area: values?.area?.area,
      siteName: values?.site_name?.mainSite,
      fromDate: moment(values?.fromDate).format("YYYY-MM-DD"),
      toDate: moment(values?.toDate).format("YYYY-MM-DD"),
    }
    if (data) {
      const fileName = `summaryReport(${data?.fromDate}_${data?.toDate})`
      dispatch(downloadSummaryExcel(data, fileName))
    }
  }

  const intialVal = {
    state: null,
    area: null,
    site_name: null,
    fromDate: null,
    toDate: null
  };

  const SearchValidation = Yup.object().shape({
    state: Yup.object().required("Select State").nullable(),
    area: Yup.object().required("Select Area").nullable(),
    site_name: Yup.object().required("Select site name").nullable(),
    fromDate: Yup.string().required("Select from date").nullable(),
    toDate: Yup.string().required("Select to date").nullable(),
  });

  function formatDate(inputDate) {
    const parts = inputDate.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [columnDefs, setColumnDefs] = useState([
    ...tempData?.columnDefs,
    {
      field: "Download",
      resizable: true,
      cellRenderer: DownloadPDF,
    },
  ]);
  const componentStyle = { width: "auto" };
  const defaultColDef = { sortable: true, flex: 1, floatingFilter: true }

  useEffect(() => {
    dispatch(getAllState())
  }, [])

  const getRowHeight = useCallback((params) => {
    return 37;
  }, []);

  return (
    <>
      <Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">View/Download Logbook</Typography>
          <Link to="/kpis">
            <HomeIcon style={{ color: '#019E89' }} />
          </Link>
        </Box>
      </Grid>
      <Card >
        <CardContent>
          <Formik
            initialValues={intialVal}
            validationSchema={SearchValidation}
            onSubmit={(values) => {
              const data = {
                siteName: values?.site_name?.mainSite,
                fromdate: moment(values?.fromDate).format("YYYY-MM-DD"),
                todate:moment(values?.toDate).format("YYYY-MM-DD")
              }
              dispatch(getAllSearchlogbookData(data))
            }}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Grid container >
                  <Grid item md={1.75} xs={12}>
                    <Box>
                      <MySelectAutoComplete
                        toplabel="State*"
                        options={stateDrop || []}
                        getOptionLabel={(option) => option.state}
                        name="state"
                        value={values?.state}
                        onChange={(e, value) => {
                          dispatch(getAllAreas(value?.stateCode))
                          setFieldValue("state", value)
                          setFieldValue("area", null)
                          setFieldValue("site_name", null)
                        }}
                        className='fontSize-13'
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        size='small'
                        renderInput={(params) => <TextField  {...params} />}
                      />
                    </Box>
                  </Grid>

                  <Grid item md={1.75} xs={12}>
                    <Box ml={3}>
                      <MySelectAutoComplete
                        toplabel="Area*"
                        options={areaDrop || []}
                        getOptionLabel={(option) => option.area}
                        name="area"
                        value={values?.area}
                        onChange={(e, value) => {
                          dispatch(getMainSites(value?.areaCode))
                          setFieldValue("area", value)
                          setFieldValue("site_name", null)
                        }}
                        className='fontSize-13'
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        size='small'
                        renderInput={(params) => <TextField  {...params} />}
                      />
                    </Box>
                  </Grid>

                  <Grid item md={1.75} xs={12}>
                    <Box ml={3}>
                      <MySelectAutoComplete
                        toplabel="Site*"
                        options={mainSiteDrop || []}
                        getOptionLabel={(option) => option.mainSite}
                        name="site_name"
                        value={values?.site_name}
                        onChange={(e, value) => {
                          setFieldValue("site_name", value)
                        }}
                        className='fontSize-13'
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        size='small'
                        renderInput={(params) => <TextField  {...params} />}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={1.75} xs={12}>
                    <Box ml={3}>
                      <Typography variant="body2" className="bold-600">
                        from Date
                      </Typography>                  
                      <DatePicker
                        label=""
                        name="fromDate"
                        value={values?.fromDate}
                        className={`default-textbox ${errors?.fromDate ? 'AutoComplete' : ''}`}
                        inputFormat="dd/MM/yyyy"
                        onChange={(value) => {
                          setFieldValue("fromDate", moment(value).format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => <TextField {...params}
                          size="small"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />}
                      />
                      {touched?.fromDate && errors?.fromDate && (
                        <span style={{ color: "#d32f2f", fontSize: "10px" }}>Select from Date</span>
                      )} 
                    </Box>

                  </Grid>
                  <Grid item md={1.75} xs={12}>
                    <Box ml={3}>
                      <Typography variant="body2" className="bold-600">
                        To Date
                      </Typography>
                       <DatePicker
                        label=""
                        name="toDate"
                        value={values?.toDate}
                        className={`default-textbox ${errors?.toDate ? 'AutoComplete' : ''}`}
                        inputFormat="dd/MM/yyyy"
                        onChange={(value) => {
                          setFieldValue("toDate", moment(value).format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => <TextField {...params}
                          size="small"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />}
                      />
                      {touched.toDate && errors.toDate && (
                        <span style={{ color: "#d32f2f", fontSize: "10px" }}>{errors.toDate}</span>
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <Box ml={5} mt={4}>
                      <Buttons
                        variant="contained"
                        type="submit"
                        className="Sub-btn"
                        name="Search"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <Box ml={5} mt={4}>
                      <Buttons
                        variant="contained"
                        className="Sub-btn"
                        name="Summary Report"
                        onClick={() => handleSummaryReport(values)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          <Box mt={2}>
            <label>Page Size:</label>
            <select
              value={paginationPageSize}
              onChange={(e) => setPaginationPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </Box>
          <Grid item md={12} xs={12}>
            <AgGridTable
              className="viewLogbookGrid"
              rowData={Listing}
              columnDefs={columnDefs}
              Style={componentStyle}
              paginationPageSize={paginationPageSize}
              getRowHeight={getRowHeight}
              defaultColDef={defaultColDef}
            />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DownloadLogbook;
