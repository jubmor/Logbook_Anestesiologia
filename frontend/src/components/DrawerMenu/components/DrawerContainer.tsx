import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDrawer } from "@/store/features/drawerMenu/module";

import "../styles.scss";
import "@/styles/_variables.scss";
import { useScreenWidth } from "@/hooks/useScreenWidth";

type Props = {
  children: React.ReactNode;
};

const DrawerContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const drawerIsOpen = useAppSelector((state) => state.drawerMenu.isOpen);

  const screenWidth = useScreenWidth();

  const drawerWidthOpen = 240;
  const drawerWidthClosed = screenWidth > 769 ? 60 : 0;

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div className="menu-container-drawer">
      <Drawer
        variant="permanent"
        open={drawerIsOpen}
        anchor={screenWidth <= 769 ? "right" : "left"}
        classes={{ paper: "custom-drawer-paper" }}
        sx={{
          border: "none",
          width: drawerIsOpen ? drawerWidthOpen : drawerWidthClosed,
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerIsOpen ? drawerWidthOpen : drawerWidthClosed,
            transition: "width 0.3s",
            overflowX: "hidden",
            border: "none"
          }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: drawerIsOpen
                ? screenWidth > 769
                  ? "flex-end"
                  : "flex-start"
                : "center",
              marginTop: "10px",
              marginBottom: "20px"
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              {drawerIsOpen ? (
                screenWidth > 769 ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </div>

          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerContainer;
