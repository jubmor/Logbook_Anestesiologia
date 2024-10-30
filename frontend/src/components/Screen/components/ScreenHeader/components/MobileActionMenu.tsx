import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { ActionButtonType } from "..";

type Props = {
  actions: ActionButtonType[];
};
const MobileActionMenu = ({ actions }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [firstAction, secondAction, ...otherActions] = actions;

  return (
    <div className="screen_header_container__mobile_container">
      {firstAction && (
        <div
          onClick={firstAction.onClick}
          className={`screen_header_container__mobile_container__first_action`}
        >
          {firstAction.startIcon}
        </div>
      )}
      {secondAction && (
        <div
          onClick={secondAction.onClick}
          className={`screen_header_container__mobile_container__first_action`}
        >
          {secondAction.startIcon}
        </div>
      )}

      {otherActions.length > 0 && (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            {otherActions.map((action, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  action.onClick();
                  handleClose();
                }}
                disabled={action.disabled}
              >
                <ListItemIcon>{action.startIcon} </ListItemIcon>
                <ListItemText>{action.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default MobileActionMenu;
