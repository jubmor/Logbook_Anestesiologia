import React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import "./styles.scss";

interface DefaultButtonProps {
  type?: "submit" | "button" | "reset";
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

interface SubmitFormButtonProps extends DefaultButtonProps {
  type: "submit";
  onClick?: never;
}

interface InteractionButtonProps extends DefaultButtonProps {
  type?: "button" | "reset";
  onClick: () => void;
}

type Props = SubmitFormButtonProps | InteractionButtonProps;

const StyledButton: React.FC<Props> = ({
  type = "button",
  variant,
  disabled = false,
  onClick,
  text,
  startIcon,
  endIcon,
  className = "",
  loading
}) => {
  return (
    <div className="styled_button__container">
      <Button
        type={type}
        variant={variant ?? "contained"}
        disabled={disabled}
        onClick={type !== "submit" ? onClick : undefined}
        startIcon={startIcon}
        endIcon={endIcon}
        className={className}
        sx={{
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none"
          }
        }}
      >
        {loading ? <CircularProgress size="30px" color="inherit" /> : text}
      </Button>
    </div>
  );
};

export default StyledButton;
