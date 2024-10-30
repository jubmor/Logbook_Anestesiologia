import { useMemo } from "react";

import getRoutes from "@/routes";

import DrawerMenuItemProps from "./components/MenuItem";
import MenuItem from "./components/MenuItem";
import DrawerContainer from "./components/DrawerContainer";

import { SvgIconProps } from "@mui/material";

import { useAppSelector } from "@/store/hooks";

import "./styles.scss";
import NewReportBtn from "./components/NewReportBtn";

export type DrawerMenuItemProps = {
  path: string;
  name: string;
  displayName: string;
  Icon: React.ComponentType<SvgIconProps>;
};

const DrawerMenu = () => {
  const user = useAppSelector((state) => state.auth.user);

  //const drawerIsOpen = useAppSelector((state) => state.drawerMenu.isOpen);

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

  return (
    <DrawerContainer>
      <div className="drawer_menu_container">
        <NewReportBtn />
        {menu.map((option, idx) => (
          <MenuItem key={`${option.displayName}_${idx}`} item={option} />
        ))}
      </div>
    </DrawerContainer>
  );
};

export default DrawerMenu;
