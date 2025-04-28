import { ListItemText, List, ListItem, Grid, Box } from "@mui/material";
import React from "react";

const AreaHoverComp = ({data}) => {
  return (
    <div style={{ width: "185px", height: "65px" }}>
      <List sx={{ marginTop: "5px" }}>
        <ListItem sx={{ height: "3px", padding: "0px", paddingBottom: "15px" }}>
          <p style={{ fontSize: "11px" }}>No. Of Sites : {data?.noOfSite}</p>
        </ListItem>
        <ListItem sx={{ height: "3px", padding: "0px", paddingBottom: "15px" }}>
          <p style={{ fontSize: "11px" }}>WTG : {data?.noOfWtg}</p>
        </ListItem>
        <ListItem
          sx={{
            height: "3px",
            padding: "0px",
            paddingBottom: "10px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p style={{ fontSize: "11px" }}>Status :</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              paddingTop: "23px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
            <div style={{ paddingRight: "10px" }}>
                <span className="bg-suzlon status-circle"></span>
                <div>{data?.statusObj[0]?.statusValue}</div>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <span className="bg-green status-circle"></span>
                <div>{data?.statusObj[1]?.statusValue}</div>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <span className="bg-red status-circle"></span>
                <div>{data?.statusObj[2]?.statusValue}</div>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <span className="bg-blue status-circle"></span>
                <div>{data?.statusObj[3]?.statusValue}</div>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <span className="bg-blue-fent status-circle"></span>
                <div>{data?.statusObj[4]?.statusValue}</div>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <span className="bg-yellow status-circle"></span>
                <div>{data?.statusObj[5]?.statusValue}</div>
              </div>
            </Box>
          </Box>
        </ListItem>
      </List>
    </div>
  );
};

export default AreaHoverComp;
