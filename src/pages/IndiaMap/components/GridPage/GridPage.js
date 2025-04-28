import React from "react";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { mapTableData, tableData } from "pages/IBLevel/utils";
import { useSelector } from "react-redux";

const GridPage = () => {
  const state = useSelector((state) => state);
  const mapDataTable = state?.IBLevel?.mapTableData ?? [];
  
  return (
    <Box className="grid-view grid-view-color-bg" sx={{ background: "#fff" }}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} mt={4}>
          <Accordion disabled={true} className="hide-div">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container spacing={2} mt={0} sx={{ paddingLeft: "25px" }}>
                <Grid item className="w-35">
                  <Typography className="ib-kpt-title">State Name</Typography>
                </Grid>
                <Grid item className="w-18">
                  <Typography className="ib-kpt-title">No. Of Areas</Typography>
                </Grid>
                <Grid item className="w-18">
                  <Typography className="ib-kpt-title">Total WTG</Typography>
                </Grid>
                <Grid item className="w-25">
                  <Typography className="ib-kpt-title mb-5">Status</Typography>
                  <Grid container spacing={3}>
                    <Grid item className="w-25">
                      <span className="bg-suzlon status-circle"></span>
                    </Grid>
                    <Grid item className="w-25">
                      <span className="bg-green status-circle"></span>
                    </Grid>
                    <Grid item className="w-25">
                      <span className="bg-red status-circle"></span>
                    </Grid>
                    <Grid item className="w-25">
                      <span className="bg-blue status-circle"></span>
                    </Grid>

                    <Grid item className="w-25">
                      <span className="bg-blue-fent status-circle"></span>
                    </Grid>
                    <Grid item className="w-25">
                      <span className="bg-yellow status-circle"></span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
          </Accordion>
          {
            mapDataTable && mapDataTable?.map((state, index) => {
              return (
                <Accordion className="accordian-bg" key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container spacing={2} mt={0} sx={{ paddingLeft: "25px" }}>
                      <Grid item className="w-35">
                        <Typography className="ib-kpt-title">{state?.stateName}</Typography>
                      </Grid>
                      <Grid item className="w-18">
                        <Typography className="ib-kpt-title">{state?.noOfArea}</Typography>
                      </Grid>
                      <Grid item className="w-18">
                        <Typography className="ib-kpt-title">{state?.noOfWtg}</Typography>
                      </Grid>
                      <Grid item className="w-25">
                        <Grid container spacing={2}>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-suzlon">
                              {state?.statusObj[0]?.statusValue}
                            </Typography>
                          </Grid>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-green">
                            {state?.statusObj[1]?.statusValue}
                            </Typography>
                          </Grid>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-red">
                            {state?.statusObj[2]?.statusValue}
                            </Typography>
                          </Grid>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-blue">
                            {state?.statusObj[3]?.statusValue}
                            </Typography>
                          </Grid>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-blue-fent">
                            {state?.statusObj[4]?.statusValue}
                            </Typography>
                          </Grid>
                          <Grid item className="w-25">
                            <Typography className="ib-kpt-title text-center c-yellow">
                            {state?.statusObj[5]?.statusValue}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionSummary>

                  {/* Second Accordion */}
                  <Accordion disabled={true} className="hide-div">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container spacing={2} mt={0} sx={{ paddingLeft: "18px" }}>
                        <Grid item className="w-35">
                          <Typography className="ib-kpt-title">
                            Area Name
                          </Typography>
                        </Grid>
                        <Grid item className="w-18">
                          <Typography className="ib-kpt-title">No of Sites</Typography>
                        </Grid>
                        <Grid item className="w-18">
                          <Typography className="ib-kpt-title">
                            Total WTG
                          </Typography>
                        </Grid>
                        <Grid item className="w-25">
                          <Typography className="ib-kpt-title mb-5">Status</Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                  </Accordion>

                  {/* Third Accordion */}
                  {state?.areaObj && Array.isArray(state.areaObj) && state.areaObj.map((area, index) => {
                    return (
                      <Accordion className="accordian-bg" key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Grid container spacing={2} mt={0} sx={{ paddingLeft: "25px" }}>
                            <Grid item className="w-35">
                              <Typography className="ib-kpt-title">{area?.areaName}</Typography>
                            </Grid>
                            <Grid item className="w-18">
                              <Typography className="ib-kpt-title">{area?.noOfSite}</Typography>
                            </Grid>
                            <Grid item className="w-18">
                              <Typography className="ib-kpt-title">{area?.noOfWtg}</Typography>
                            </Grid>
                            <Grid item className="w-25">
                              <Grid container spacing={2}>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-suzlon">
                                    {area?.statusObj[0]?.statusValue}
                                  </Typography>
                                </Grid>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-green">
                                  {area?.statusObj[1]?.statusValue}
                                  </Typography>
                                </Grid>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-red">
                                  {area?.statusObj[2]?.statusValue}
                                  </Typography>
                                </Grid>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-blue">
                                  {area?.statusObj[3]?.statusValue}
                                  </Typography>
                                </Grid>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-blue-fent">
                                  {area?.statusObj[4]?.statusValue}
                                  </Typography>
                                </Grid>
                                <Grid item className="w-25">
                                  <Typography className="ib-kpt-title text-center c-yellow">
                                  {area?.statusObj[5]?.statusValue}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </AccordionSummary>

                        {/* Fourth Accordion */}
                        <Accordion disabled={true} className="hide-div">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Grid
                              container
                              spacing={2}
                              mt={0}
                              sx={{ paddingLeft: "18px" }}
                            >
                              <Grid item className="w-35">
                                <Typography className="ib-kpt-title">
                                  Site Name
                                </Typography>
                              </Grid>
                              <Grid item className="w-18">
                                <Typography className="ib-kpt-title">Site ID</Typography>
                              </Grid>
                              <Grid item className="w-18">
                                <Typography className="ib-kpt-title">
                                  Total WTG
                                </Typography>
                              </Grid>
                              <Grid item className="w-25">
                                <Typography className="ib-kpt-title mb-5">Status</Typography>
                              </Grid>
                            </Grid>
                          </AccordionSummary>
                        </Accordion>
                        {/* Site Accordion */}
                        {
                          area?.siteObj && Array.isArray(area.siteObj) && area.siteObj.map((site, index) => {
                            return (
                              <Accordion disabled={true} className="hide-div" key={index}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className="row-inside"
                                >
                                  <Grid
                                    container
                                    spacing={2}
                                    mt={0}
                                    sx={{ paddingLeft: "18px" }}
                                  >
                                    <Grid item className="w-35">
                                      <Typography className="ib-kpt-title">
                                        {site?.siteName}
                                      </Typography>
                                    </Grid>
                                    <Grid item className="w-18">
                                      <Typography className="ib-kpt-title"> {site?.siteId}</Typography>
                                    </Grid>
                                    <Grid item className="w-18">
                                      <Typography className="ib-kpt-title">{site?.noOfWtg}</Typography>
                                    </Grid>
                                    <Grid item className="w-25">
                                      <Grid container spacing={2}>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-suzlon">
                                            {site?.statusObj[0]?.statusValue}
                                          </Typography>
                                        </Grid>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-green">
                                          {site?.statusObj[1]?.statusValue}
                                          </Typography>
                                        </Grid>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-red">
                                          {site?.statusObj[2]?.statusValue}
                                          </Typography>
                                        </Grid>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-blue">
                                          {site?.statusObj[3]?.statusValue}
                                          </Typography>
                                        </Grid>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-blue-fent">
                                          {site?.statusObj[4]?.statusValue}
                                          </Typography>
                                        </Grid>
                                        <Grid item className="w-25">
                                          <Typography className="ib-kpt-title text-center c-yellow">
                                          {site?.statusObj[5]?.statusValue}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </AccordionSummary>
                              </Accordion>
                            );
                          })
                        }

                      </Accordion>
                    )
                  })
                  }

                </Accordion>
              );
            })
          }

        </Grid>

      </Grid>
    </Box>
  );
};

export default GridPage;
