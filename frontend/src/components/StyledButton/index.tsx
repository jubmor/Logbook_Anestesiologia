import React from "react";

import Button from "@mui/material/Button";

import "./styles.scss";

interface SubmitFormButtonProps extends DefaultButtonProps {
  type: "submit";
  onClick?: never;
}

interface InteractionButtonProps extends DefaultButtonProps {
  type?: "button" | "reset";
  onClick: () => void;
}

interface DefaultButtonProps {
  type?: "submit" | "button" | "reset";
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

type Props = SubmitFormButtonProps | InteractionButtonProps;

const StyledButton = ({
  type,
  variant,
  disabled,
  onClick,
  text,
  startIcon,
  endIcon,
  className
}: Props) => {
  return (
    <div className="styled_button__container ">
      <Button
        type={type}
        variant={variant ?? "contained"}
        disabled={disabled}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        className={`${className}`}
        sx={{
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none"
          }
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default StyledButton;
