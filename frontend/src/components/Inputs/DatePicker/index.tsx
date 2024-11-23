import React, { useState } from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs, { Dayjs } from "dayjs";
import InputWrapper from "../InputWrapper";
import "./styles.scss";
import { TextField } from "@mui/material";

type Props = {
  label: string;
  value?: string | null;
  error?: boolean;
  errorText?: string | undefined;
  ref?: React.ForwardedRef<unknown>;
  onChange: (newValue: string | null) => void;
  withTime?: boolean;
  disabled?: boolean;
  required?: boolean;
  tooltip?: React.ReactNode;
  extraClass?: string;
};

const DatePicker = ({
  label,
  error,
  errorText,
  value,
  onChange,
  withTime,
  disabled,
  required,
  tooltip,
  extraClass
}: Props) => {
  const [internalValue, setInternalValue] = useState<Dayjs | null>(value ? dayjs(value) : null);

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      setInternalValue(newValue);
      onChange(newValue.format(withTime ? "DD / MMMM / YYYY HH:mm" : "DD / MMMM / YYYY"));
    } else if (newValue === null) {
      setInternalValue(null);
      onChange(null);
    }
  };

  return (
    <InputWrapper
      label={label}
      error={error && !!errorText}
      errorText={errorText}
      extraClass={`${extraClass} ${error && errorText && "date_picker_error"}`}
      required={required}
      tooltip={tooltip}
    >
      <DateTimePicker
        label={label}
        disabled={disabled}
        className="datePicker"
        referenceDate={dayjs(new Date())}
        value={internalValue}
        onChange={handleChange}
        //  disableFuture
        closeOnSelect
        format={withTime ? "DD / MM / YYYY HH:mm" : "DD / MM / YYYY"}
        views={withTime ? ["year", "month", "day", "hours", "minutes"] : ["year", "month", "day"]}
        //   minutesStep={1}
        ampm={false}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4fd1c5"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4fd1c5"
            },
            "& .MuiInputBase-input": {}
          }
        }}
      />
    </InputWrapper>
  );
};

export default DatePicker;
