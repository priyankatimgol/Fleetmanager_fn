import React from "react";
import { toggleNavCollapsed } from "../../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import AppScrollbar from "../../../AppScrollbar";
import MainSidebar from "../../components/MainSidebar";
import Drawer from "@mui/material/Drawer";
import VerticalNav from "../../components/VerticalNav";
import StandardSidebarWrapper from "./StandardSidebarWrapper";
import UserInfo from "../../components/UserInfo";
import { useSidebarContext } from "../../../../utility/AppContextProvider/SidebarContextProvider";
import { AppState } from "../../../../../redux/store";

interface AppSidebarProps {
  position?: "left" | "top" | "right" | "bottom";
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = "",
  position = "left",
}) => {
  const dispatch = useDispatch();
  const navCollapsed = useSelector<AppState, AppState["settings"]>(
    ({ settings }) => settings
  ).navCollapsed;

  const { sidebarTextColor } = useSidebarContext();

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  return (
    <>
      <Drawer
        anchor={position}
        open={navCollapsed}
        onClose={() => handleToggleDrawer()}
        classes={{
          root: clsx(variant),
          paper: clsx(variant),
        }}
        style={{ position: "absolute" }}
      >
        <StandardSidebarWrapper className="standard-sidebar">
          <MainSidebar>
            <div style={{padding:'15px 0px 10px 15px'}}>
              <UserInfo />
            </div>
            <AppScrollbar
              sx={{
                py: 2,
                height: "calc(100vh - 40px) !important",
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </StandardSidebarWrapper>
      </Drawer>
    </>
  );
};
export default AppSidebar;
