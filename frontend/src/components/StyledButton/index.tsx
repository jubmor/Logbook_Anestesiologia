import React from "react";
import Button from "@mui/material/Button";
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
}

interface SubmitFormButtonProps extends DefaultButtonProps {
  type: "submit"; // Submit buttons should not have an onClick prop
  onClick?: never;
}

interface InteractionButtonProps extends DefaultButtonProps {
  type?: "button" | "reset"; // Interaction buttons have onClick
  onClick: () => void;
}

type Props = SubmitFormButtonProps | InteractionButtonProps;

const StyledButton: React.FC<Props> = ({
  type = "button", // Default type is button
  variant,
  disabled = false,
  onClick,
  text,
  startIcon,
  endIcon,
  className = ""
}) => {
  return (
    <div className="styled_button__container">
      <Button
        type={type}
        variant={variant ?? "contained"}
        disabled={disabled}
        onClick={type !== "submit" ? onClick : undefined} // Prevent onClick for submit buttons
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
        {text}
      </Button>
    </div>
  );
};

export default StyledButton;
