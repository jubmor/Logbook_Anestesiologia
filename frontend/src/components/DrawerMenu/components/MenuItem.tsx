import React, { memo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { DrawerMenuItemProps } from "..";
import { RouteProps } from "@/routes";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { toggleDrawer } from "@/store/drawerMenu/module";

import { SvgIconProps } from "@mui/material";

import "../styles.scss";

export type CustomAction = {
  action: () => void;
  name: string;
  displayName: string;
  Icon: React.ComponentType<SvgIconProps>;
};

type Props = {
  item: DrawerMenuItemProps | RouteProps | CustomAction;
};

const MenuItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const dispatch = useAppDispatch();

  const screenWidth = useScreenWidth();

  const drawerIsOpen = useAppSelector((state) => state.drawerMenu.isOpen);

  const { Icon } = item;

  const isRoot = "path" in item && item.path === "/" && location === "/";
  const isActive =
    isRoot || ("path" in item && item.path !== "/" && location.startsWith(item.path));

  const handlePress = () => {
    if ("action" in item) {
      item.action();
    }

    if ("path" in item) {
      const isRoot = item.path === "/" && location === "/";
      const isActive = isRoot || (item.path !== "/" && location.startsWith(item.path));

      if (!(screenWidth > 769)) {
        dispatch(toggleDrawer());
      }

      navigate(item.path); // TypeScript knows item is DrawerMenuItemProps | RouteProps here
    }
  };

  return (
    <div
      key={item.displayName}
      onClick={handlePress}
      className={`drawer_menu_container__option_container  ${isActive && "active"}`}
    >
      {Icon != undefined && (
        <span className={`drawer_menu_container__option_container__icon ${isActive && "active"} `}>
          <Icon />
        </span>
      )}
      <p className={`${!drawerIsOpen && "hidden_content"}`}>{item.displayName}</p>
    </div>
  );
};

export default memo(MenuItem);
