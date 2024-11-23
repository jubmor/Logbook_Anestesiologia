import { useMemo } from "react";

import getRoutes from "@/routes";

import DrawerMenuItemProps, { CustomAction } from "./components/MenuItem";
import MenuItem from "./components/MenuItem";
import DrawerContainer from "./components/DrawerContainer";
import NewReportBtn from "./components/NewReportBtn";

import { SvgIconProps } from "@mui/material";

import { useAppSelector } from "@/store/hooks";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import { logout as logoutUser } from "@/store/auth/module";

import "./styles.scss";
import { store } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export type DrawerMenuItemProps = {
  path: string;
  name: string;
  displayName: string;
  Icon: React.ComponentType<SvgIconProps>;
};

const DrawerMenu = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const menu = useMemo(() => {
    const order = ["Dashboard", "Casuistic", "Cases", "Internships", "UserProfile"];
    return getRoutes(user)
      .filter((r) => r.menu)
      .sort((a, b) => {
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return a.name.localeCompare(b.name);
      });
  }, [user]);

  const logout: CustomAction = {
    action: () => {
      store.dispatch(logoutUser());
      navigate(PATHS.LOGIN);
    },
    displayName: "Sair",
    Icon: LogoutIcon,
    name: "logout"
  };

  return (
    <DrawerContainer>
      <div className="drawer_menu_container">
        <NewReportBtn />
        {menu.map((option, idx) => (
          <MenuItem key={`${option.displayName}_${idx}`} item={option} />
        ))}

        <div className="drawer_menu_container__bottom_nav">
          <MenuItem item={settings} />
          <MenuItem item={logout} />
        </div>
      </div>
    </DrawerContainer>
  );
};

export default DrawerMenu;

const settings: DrawerMenuItemProps = {
  path: "settings",
  displayName: "Definições",
  Icon: SettingsIcon,
  name: "settings"
};
