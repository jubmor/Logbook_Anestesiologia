import React, { useState } from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import dayjs from "dayjs";
import InputWrapper from "../InputWrapper";
import "./styles.scss";

type Props = {
  label: string;
  value: dayjs.Dayjs | null | undefined;
  error?: boolean;
  errorText?: string | undefined;
  ref?: React.ForwardedRef<unknown>;
  onChange: () => any;
  withTime?: boolean;
};

const DatePicker = ({ label, error, errorText, value, onChange, withTime }: Props) => {
  return (
    <InputWrapper
      label={label}
      error={error}
      errorText={errorText}
      extraClass={`${error && "date_picker_error"}`}
    >
      <DateTimePicker
        className="datePicker"
        referenceDate={dayjs(new Date())}
        value={value}
        onChange={onChange}
        disableFuture
        closeOnSelect
        format={withTime ? "DD / MMMM / YYYY HH:mm" : "DD / MMMM / YYYY"}
        views={withTime ? ["year", "month", "day", "hours", "minutes"] : ["year", "month", "day"]}
        minutesStep={1}
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

const timeViewerProps = {
  hours: null,
  minutes: null,
  seconds: null
};
