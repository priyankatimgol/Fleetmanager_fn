import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AppLngSwitcher from "@uikit/core/AppLngSwitcher";
import Box from "@mui/material/Box";
import AppSearchBar from "@uikit/core/AppSearchBar";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import { toggleNavCollapsed } from "../../../../../redux/actions";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import AppMessages from "../../../AppMessages";
import AppNotifications from "../../../AppNotifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppTooltip from "../../../AppTooltip";
import { alpha } from "@mui/material/styles";
import AppLogo from "../../components/AppLogo";
import MainLogo from "@uikit/common/MainLogo";

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  return (
    <AppBar
      position="relative"
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
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgUp>
          <IconButton
            sx={{
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
        {/* <AppLogo /> */}
        {/* <MainLogo/> */}
        <AppSearchBar iconPosition="right" placeholder="Search…" />
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <AppLngSwitcher iconOnly={true} tooltipPosition="bottom" />

        <Box sx={{ ml: 4 }}>
          <Hidden smDown>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
                marginRight: -2,
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
                <AppMessages />
              </Box>
            </Box>
          </Hidden>

          <Hidden smUp>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <AppTooltip title="More">
                  <IconButton
                    sx={{
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      color: (theme) => theme.palette.text.secondary,
                      backgroundColor: (theme) =>
                        theme.palette.background.default,
                      border: 1,
                      borderColor: "transparent",
                      "&:hover, &:focus": {
                        color: (theme) => theme.palette.text.primary,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.background.default, 0.9),
                        borderColor: (theme) =>
                          alpha(theme.palette.text.secondary, 0.25),
                      },
                    }}
                    onClick={handleClick}
                    size="large"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </AppTooltip>
              </Box>
            </Box>
          </Hidden>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <AppNotifications isMenu />
            </MenuItem>
            <MenuItem>
              <AppMessages isMenu />
            </MenuItem>
            <MenuItem>Setting</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
