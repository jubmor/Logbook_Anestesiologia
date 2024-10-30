import React, { memo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { DrawerMenuItemProps } from "..";
import { RouteProps } from "@/routes";

import "../styles.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { toggleDrawer } from "@/store/features/drawerMenu/module";

type Props = {
  item: DrawerMenuItemProps | RouteProps;
};

const MenuItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const dispatch = useAppDispatch();

  const screenWidth = useScreenWidth();

  const drawerIsOpen = useAppSelector((state) => state.drawerMenu.isOpen);

  const { Icon } = item;

  const isRoot = item.path === "/" && location === "/";
  const isActive = isRoot || (item.path !== "/" && location.startsWith(item.path));

  const handlePress = () => {
    if (!(screenWidth > 769)) {
      dispatch(toggleDrawer());
    }

    navigate(item.path);
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
