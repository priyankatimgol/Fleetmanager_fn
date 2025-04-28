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
import { Grid } from "@mui/material";

interface AppHeaderProps {
  isCollapsed?: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isCollapsed, setCollapsed }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        transition: "width 0.5s ease",
        width: "100%",
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 60, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgDown>
          <IconButton
            sx={{
              color: "text.secondary",
            }}
            edge="start"
            className="menu-btn"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setCollapsed(!isCollapsed)}
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
        {/* Main logo */}
          {/* <Grid container spacing={1} justifyContent='flex-end'>
            <Grid item><AppLogo /></Grid>
          </Grid> */}
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
