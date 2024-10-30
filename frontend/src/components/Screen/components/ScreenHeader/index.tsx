import React from "react";

import StyledButton from "../../../StyledButton";

import { useScreenWidth } from "@/hooks/useScreenWidth";

import MobileActionMenu from "./components/MobileActionMenu";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";

export type ScreenHeaderProps = {
  title?: string;
  subtext?: string;
  actions?: ActionButtonType[];
};

export type ActionButtonType = {
  onClick: () => void;
  text?: string;
  variant?: "text" | "contained" | "outlined" | undefined;
  startIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const ScreenHeader = ({ title, subtext, actions }: ScreenHeaderProps) => {
  const screenWidth = useScreenWidth();

  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isMainRoot = pathSegments.length <= 1;

  return (
    <div
      className={`screen_header_container__header ${
        !title && "screen_header_container__header__no_title"
      }`}
    >
      {title && (
        <>
          <div className="screen_header_container__header__title_container">
            <div className="screen_header_container__header__title_container__wrapper">
              {!isMainRoot && (
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-haspopup="true"
                  onClick={() => navigate(-1)}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              )}
              <h4>{title}</h4>
            </div>
            {subtext && <p>{subtext}</p>}
          </div>
          {actions && (
            <>
              {screenWidth > 769 ? (
                <div className="screen_header_container__header__actions_container">
                  {actions.map((action, idx) => {
                    return (
                      <StyledButton
                        key={`${idx}_${action.text}`}
                        startIcon={action.startIcon}
                        className={`action_btn ${action.className}`}
                        text={action.text}
                        onClick={action.onClick}
                        variant={action.variant}
                        disabled={action.disabled}
                      />
                    );
                  })}
                </div>
              ) : (
                <MobileActionMenu actions={actions} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScreenHeader;
