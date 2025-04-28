import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import "./style.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function MenuList() {
  const state = useSelector((state) => state);
  let userMenuList = state?.menu?.userMenuList || [];
  const existingURL = window?.location?.pathname;

  const [activeMenu, setActiveMenu] = React.useState(null);

  const history = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleNavigation = (url) => {
    if (url.includes("http")) {
      if (url.includes("8088/login")) {
        window.open(`${url}?token=${token}&redirect=/dashboard/list/`, "_blank");
      } else {
        window.open(url, "_blank");
      }
    } else {
      history(url);
    }
  };

  React.useEffect(() => {
    if (userMenuList.length) {
      for (let i = 0; i < userMenuList.length; i++) {
        const parent = userMenuList[i];
        const isChildActive = parent.children.find(
          (d) => d.url === existingURL
        );
        if (isChildActive) {
          setActiveMenu(parent.title);
          break;
        }
      }
    }
  }, [existingURL, userMenuList]);

  return (
    <div className="navbar">
      {userMenuList?.map((item) => {
        if (item.type === "collapse") {
          return (
            <div className="dropdown">
              <div className={activeMenu === item.title ? "active-parent" : ""}>
                <Typography
                  className={`menuList-title dropbtn ${
                    activeMenu === item.title ? "active" : ""
                  }`}
                >
                  {item.title} 
                </Typography>
              </div>
              <div className="dropdown-content">
                {item?.children?.map((child) => {
                  return (
                    <MenuItem
                      className={`menu ${
                        existingURL === child?.url ? "active-menu" : ""
                      }`}
                      onClick={() => {
                        handleNavigation(child?.url);
                      }}
                    >
                      <Typography
                        variant="h5"
                        className={existingURL === child?.url ? "active" : ""}
                      >
                        {child?.title}  
                      </Typography>
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          );
        }
        return (
          <Typography className="menuList-title dropbtn">
            {item.title} 
          </Typography>
        );
      })}
    </div>
  );
}
