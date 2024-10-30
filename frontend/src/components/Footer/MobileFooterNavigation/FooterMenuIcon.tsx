import React from "react";
import { SvgIconProps } from "@mui/material";

import "./styles.scss";
import { useLocation } from "react-router-dom";

type Props = {
  item:
    | {
        Icon: React.ComponentType<SvgIconProps> | undefined;
        text: string;
        action: () => void;
        path: string;
      }
    | {
        Icon: React.ComponentType<SvgIconProps> | undefined;
        text: string;
        action: () => {
          payload: undefined;
          type: "drawerMenu/toggleDrawer";
        };
        path: string;
      };
};

const FooterMenuIcon = ({ item }: Props) => {
  const { Icon, action, path } = item;

  const location = useLocation().pathname;
  const isActive = location === path;

  return (
    <div className={`mobile_footer__icon_container ${isActive && "active"}`} onClick={action}>
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      {/* <h6 className="mobile_footer__icon_container__title">{text}</h6> */}
    </div>
  );
};

export default FooterMenuIcon;
