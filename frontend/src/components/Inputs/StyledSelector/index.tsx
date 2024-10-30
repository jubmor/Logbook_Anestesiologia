import React from "react";
import { Checkbox, FormControl, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

import "./styles.scss";
import InputWrapper from "../InputWrapper";

type Props = {
  value: string | string[];
  onChange: SelectInputProps<string>["onChange"];
  containerExtraClass?: string;

  options: {
    value: string;
    label: string;
  }[];

  label: string;
  error?: boolean;
  errorText?: string | undefined;
  guideLine?: string;
  id: string;
  disabled?: boolean;
  required?: boolean;
  ref?: React.ForwardedRef<unknown>;
  multiple?: boolean;
  placeholder?: string;
};

const StyledSelector = ({
  value,
  onChange,
  label,
  options,
  error,
  errorText,
  guideLine,
  containerExtraClass,
  id,
  disabled,
  required,
  multiple,
  placeholder
}: Props) => {
  const safeValue = value ?? (multiple ? [] : "");
  return (
    <InputWrapper
      label={label}
      error={error}
      errorText={errorText}
      extraClass={containerExtraClass}
      required={required}
    >
      <FormControl variant="outlined">
        <Select
          id={id}
          error={error}
          className="input_selector"
          value={safeValue as any}
          onChange={onChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <em className="input_selector__placeholder">
                  {placeholder
                    ? placeholder
                    : multiple
                    ? "Selecione as opções"
                    : "Selecionar opção"}
                </em>
              );
            }

            return multiple ? (selected as any).join(", ") : selected;
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          disabled={disabled}
          multiple={multiple}
          placeholder={"Selecionar opção"}
          MenuProps={{
            PaperProps: {
              style: {
                minHeight: 0,
                maxHeight: 200
              }
            }
          }}
        >
          {/*   {!multiple && (
            <MenuItem value={""}>
              <em> - </em>
            </MenuItem>
          )} */}

          {options.map((option, idx) => (
            <MenuItem key={`${idx}_${option.value}`} value={option.value}>
              {multiple && <Checkbox checked={(value && value.includes(option.value)) || false} />}
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {!error && !errorText && guideLine && <div className="guideline">{guideLine}</div>}
      </FormControl>
    </InputWrapper>
  );
};

export default StyledSelector;
