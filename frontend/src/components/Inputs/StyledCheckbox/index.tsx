import React from "react";
import InputWrapper from "../InputWrapper";

import Checkbox from "@mui/material/Checkbox";
import { FormControl, FormControlLabel, FormHelperText } from "@mui/material";

type Props = {
  label: string;
  value?: boolean;
  error?: boolean;
  errorText?: string | undefined;
  ref?: React.ForwardedRef<unknown>;
  onChange: (newValue: boolean) => void;
  withTime?: boolean;
  disabled?: boolean;
  required?: boolean;
  tooltip?: React.ReactNode;
};

const StyledCheckbox = ({
  label,
  error,
  errorText,
  value,
  onChange,
  withTime,
  disabled,
  required,
  tooltip
}: Props) => {
  const handleChange = () => {};

  return (
    <FormControl required error={error} component="fieldset" sx={{ m: 3 }} variant="standard">
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label={label}
        onChange={(e, v) => onChange(v)}
        value={value}
        disabled={disabled}
        required={required}
      />
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default StyledCheckbox;
