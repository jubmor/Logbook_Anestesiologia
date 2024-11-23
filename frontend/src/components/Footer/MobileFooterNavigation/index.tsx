import React, { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDrawer } from "@/store/drawerMenu/module";
import DrawerMenu from "@/components/DrawerMenu";

import getRoutes from "@/routes";
import { useNavigate } from "react-router-dom";
import FooterMenuIcon from "./FooterMenuIcon";

import "./styles.scss";

type Props = {};

const MobileFooterNavigation = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.drawerMenu.isOpen);
  const user = useAppSelector((state) => state.auth.user);

  const userMenus = getRoutes(user);

  const menuItems = [
    ...userMenus
      .filter((m) => m.menuMobile)
      .map((m) => ({
        Icon: m.Icon,
        text: m.displayName,
        action: () => navigate(m.path),
        path: m.path
      })),

    {
      Icon: MenuIcon,
      text: "Menu",
      action: () => dispatch(toggleDrawer()),
      path: "menu"
    }
  ];

  return (
    <>
      <div className={`mobile_footer visible`}>
        {/* ${isVisible || isAnimating ? "visible" : "hidden"} */}
        <div className="mobile_footer__container">
          {menuItems.map((item) => (
            <FooterMenuIcon key={item.text} item={item} />
          ))}
        </div>
      </div>

      <DrawerMenu />
      {isMenuOpen && (
        <>
          <div
            onClick={() => dispatch(toggleDrawer())}
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              height: "100dvh",

              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: "1000",
              overflow: "block"
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default MobileFooterNavigation;
