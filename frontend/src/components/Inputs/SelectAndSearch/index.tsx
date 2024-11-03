import React from "react";
import InputWrapper from "../InputWrapper";
import { Autocomplete, TextField } from "@mui/material";

import "./styles.scss";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string | string[];
  onChange: (values: string | string[]) => void;
  containerExtraClass?: string;
  options: Option[];
  label: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;

  ref?: React.ForwardedRef<unknown>;
};

const SelectAndSearch = ({
  value,
  onChange,
  containerExtraClass,
  options,
  label,
  error,
  errorText,
  required,
  disabled,
  multiple = false,
  placeholder
}: Props) => {
  const selectedOptions = multiple
    ? Array.isArray(value)
      ? options.filter((option) => value.includes(option.value))
      : []
    : options.find((option) => option.value === value) || null;

  return (
    <InputWrapper
      label={label}
      error={error}
      errorText={errorText}
      extraClass={containerExtraClass}
      required={required}
    >
      <Autocomplete
        filterSelectedOptions
        className="input_selector_and_search"
        id="autocomplete-select-search"
        value={selectedOptions as any}
        onChange={(event, newValue) => {
          if (multiple) {
            const newValues = (newValue as Option[]).map((option) => option.value);
            onChange(newValues);
          } else {
            onChange((newValue as Option)?.value || "");
          }
        }}
        options={options.sort((a, b) => -b.label.localeCompare(a.label))}
        multiple={multiple}
        disableCloseOnSelect={multiple ? true : false}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
        disabled={disabled}
        disableClearable
        sx={{}}
      />
    </InputWrapper>
  );
};

export default SelectAndSearch;
