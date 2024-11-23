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
  tooltip?: React.ReactNode;
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
  tooltip
}: Props) => {
  const selectedOptions = multiple
    ? Array.isArray(value)
      ? options.filter((option) => value.includes(option.value))
      : []
    : options.find((option) => option.value === value) || null;

  const defaultPlaceholder = multiple ? "Selecione as opções" : "Selecionar opção";
  const showPlaceholder = !multiple ? (value ? false : true) : true;

  return (
    <InputWrapper
      label={label}
      error={error}
      errorText={errorText}
      extraClass={`${containerExtraClass} ${error && errorText && "select_and_search_error"}`}
      required={required}
      tooltip={tooltip}
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
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={showPlaceholder ? defaultPlaceholder : ""}
            InputLabelProps={{
              shrink: true // Keeps the label always shrunk to prevent overlapping
            }}
          />
        )}
        disabled={disabled}
        disableClearable
      />
    </InputWrapper>
  );
};

export default SelectAndSearch;
