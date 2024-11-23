import React from "react";
import { TextField, InputBaseComponentProps } from "@mui/material";

import "./styles.scss";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputWrapper from "../InputWrapper";

export type Props = {
  id: string;
  type: "text" | "password" | "email" | "number" | "date" | "file" | "tel";
  label?: string;
  value: string | number | undefined | null;
  error?: boolean;
  errorText?: string | undefined;
  multiline?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  hasBackground?: boolean;
  margin?: string;
  maxWidth?: string;
  disabled?: boolean;
  inputProps?: InputBaseComponentProps | undefined;
  extraClass?: string;
  containerExtraClass?: string;
  placeholder?: string;
  autoComplete?: AutoCompleteOptions;
  noBorder?: boolean;
  required?: boolean;
  ref?: React.ForwardedRef<unknown>;
  tooltip?: React.ReactNode;
};

export type AutoCompleteOptions =
  | "on"
  | "off"
  | "name"
  | "username"
  | "password"
  | "new-password"
  | "current-password"
  | "email"
  | "tel"
  | "url"
  | "street-address"
  | "postal-code";

const StyledInput = ({
  id,
  type,
  label,
  value,
  error,
  errorText,
  multiline,
  onChange,
  disabled,
  inputProps,
  extraClass,
  placeholder,
  autoComplete,
  noBorder,
  containerExtraClass,
  required,
  tooltip
}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputWrapper
      label={label}
      error={error}
      errorText={errorText}
      extraClass={containerExtraClass}
      required={required}
      tooltip={tooltip}
    >
      <TextField
        id={id}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        rows={5}
        label={label}
        value={value ?? ""}
        variant={"outlined"}
        multiline={multiline}
        onChange={onChange}
        disabled={disabled}
        inputProps={{ ...inputProps }}
        className={`input ${multiline && "input__multiline__no_padding"} ${extraClass}`}
        placeholder={placeholder ? placeholder : label}
        hiddenLabel={true}
        autoComplete={autoComplete}
        InputLabelProps={{
          shrink: !!label
        }}
        error={error}
        sx={{
          "& .MuiOutlinedInput-root": {
            //  padding:0,
            "& fieldset": {
              border: noBorder ? "none" : "",
              top: label ? "" : "0px"
            }
          }
        }}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </InputWrapper>
  );
};

export default StyledInput;
