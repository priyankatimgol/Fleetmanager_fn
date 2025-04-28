import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import { toggleNavCollapsed } from "../../../../../redux/actions";
import MenuIcon from "@mui/icons-material/Menu";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import AppNotifications from "../../../AppNotifications";
import AppLogo from "../../components/AppLogo";
import UserInfo from "../../components/UserInfo";
import MenuList from "./MenuList";
import { getMenuList } from "redux/actions/MenuAction";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Tooltip, Typography } from "@mui/material";
import { UserEngagement, logoutUser } from "redux/actions/login";
import { MySelectAuto } from "pages/common-components/AutoSearchSelect";
import { getTurbinesData, getUserSites, setSelectedCustomer, setSelectedSite } from "redux/actions/SiteHomeActions";
import { useLocation } from "react-router-dom";
import moment from "moment";

const AppHeader = () => {
  const dispatch = useDispatch();
  const UserState = useSelector((state: RootStateOrAny) => {
    return state?.user;
  });
  const SiteState = useSelector((state: RootStateOrAny) => {
    return state?.siteHomeKpi;
  });
  const allUserMenuList = useSelector((state: RootStateOrAny) => {
    return state?.menu?.userOriginalMenuList?.data || [];
  });
  const UserData = UserState?.userData;
  const UserSites = SiteState?.userSites || [];

  const [site, setSite] = useState(null);

  const currentRoute = useLocation();
  const state = useSelector((state) => state);
  const currentPath = currentRoute && currentRoute.pathname;
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [oldScreenName,setOldScreenName] = useState(null);

  useEffect(() => {
    if (UserData?.userName && UserData?.empCode) {
      dispatch(
        getUserSites({
          user: UserData?.userName,
          employeeCode: UserData?.empCode,
        })
      );
    }
  }, [UserData]);

  // useEffect(() => {
  //   if (!site) return;
  //   dispatch(getTurbinesData("", "", site.siteName));
  //   dispatch(setSelectedSite(site.siteName));
  // }, [site])

  useEffect(() => {
    if (UserSites.length > 0) {
      setSite(UserSites[0])
    }
  }, [UserSites])

  useEffect(() => {
    dispatch(getMenuList());
  }, [dispatch]);

  useEffect(() => {
    if(allUserMenuList?.length>0 && currentPath)
    {
      const screenName = allUserMenuList.find(d=> d?.menuRoute === currentPath );
      const body = [
        {
          "appID": "FLEET_MANAGER",
          "applicationType": "Web",
          "custEmail": null,
          "custID": null,
          "custName": null,
          "customData": null,
          "deviceID": null,
          "endDateTime": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
          "id": 0,
          "password": "Suzlon@123",
          "screenName": screenName?.menuName || null,
          "startDateTime": moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
          "userEngagementID": 0,
          "userID": UserData?.empCode,
          "userName": UserData?.userName
        }
      ]
      localStorage.setItem("UserEngagement",JSON.stringify(body));

      if(!startDateTime)
      {
        setStartDateTime(moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
        setOldScreenName(screenName?.menuName);
      }
      else
      {
        setEndDateTime(moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
      
        var data = JSON.parse(localStorage.getItem("UserEngagement"));
        const postdata = data?.map((item)=>{
          return{
            ...item,
            endDateTime : moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
            screenName : oldScreenName,
            startDateTime : startDateTime,
          };
        });

        dispatch(UserEngagement(postdata));

        setStartDateTime(moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
        setEndDateTime(null);
        setOldScreenName(screenName?.menuName);
      }
    }
  }, [dispatch,currentPath,allUserMenuList]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <AppBar
      color="inherit"
      sx={{
        boxShadow: "none",
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        width: {
          xs: "100%",
        },
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 56, sm: 56 },
          pl: { xs: 0, xl: 3 },
          pr: { xs: 0, xl: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { lg: "98%", xl: "1536px" },
            mx: "auto",
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Hidden lgUp>
            <IconButton
              sx={{
                marginRight: (theme) => theme.spacing(2),
                color: "text.secondary",
              }}
              edge="start"
              className="menu-btn"
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(toggleNavCollapsed())}
              size="large"
            >
              <MenuIcon
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
          </Hidden>
          {/*App logo */}
          <Box
            sx={{
              mr: 2,
              "& .app-logo": {
                pl: 0,
              },
              "& .logo-text": {
                display: { xs: "none", sm: "block" },
              },
            }}
          >
            <AppLogo />
          </Box>
          {/* profile && notification */}
          <Hidden lgDown>
            {/* Menu Section*/}
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <MenuList />
            </Box>
            {(currentRoute?.pathname.includes("/kpis") || currentRoute?.pathname.includes("/wtg")) && site && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginRight: "10px",
                  minWidth: "200px",
                }}
              >
                <Typography sx={{ fontSize: "16px" }} variant="h5">
                  Site: 
                </Typography>
                <MySelectAuto
                  value={site}
                  options={UserSites}
                  getOptionLabel={(option) => option.siteName}
                  onChangeDta={(e, value) => {
                    setSite(value);
                    dispatch(setSelectedSite(value.siteName));
                    dispatch(setSelectedCustomer(0)); // Reset customer dropdown to All Customers
                  }}
                  size="small"
                />
              </Box>
            )}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginRight: -5,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppNotifications />
              </Box>
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <UserInfo />
              </Box>
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout}>
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
