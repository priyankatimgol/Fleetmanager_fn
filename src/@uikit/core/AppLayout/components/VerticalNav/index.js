import React from "react";
import List from "@mui/material/List";

import {
  RouterConfigData,
} from "../../../../../pages/routesConfig";
import NavVerticalGroup from "./VerticalNavGroup";
import VerticalCollapse from "./VerticalCollapse";
import VerticalItem from "./VerticalItem";
import { AppState } from "redux/store";
import { useSelector } from "react-redux";

const VerticalNav = () => {
  const state = useSelector((state) => state);
  const userMenuList = state?.menu?.userMenuList || [];
  return (
    <List
      sx={{
        position: "relative",
        padding: 0,
      }}
      component="div"
    >
      {userMenuList && userMenuList?.length > 0 && userMenuList?.map((item) => (
        <React.Fragment key={item.id}>
          {item.type && item.type === "group" && <NavVerticalGroup item={item} level={0} />}

          {item.type && item.type === "collapse" && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type && item.type === "item" && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default VerticalNav;
