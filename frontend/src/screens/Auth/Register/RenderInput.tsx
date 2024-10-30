import React from "react";
import { FormKeys, SelectInputForm, InputRegisterForm, DateInputForm } from "./utils";

import StyledSelector from "@/components/Inputs/StyledSelector";
import DatePicker from "@/components/Inputs/DatePicker";
import StyledInput from "@/components/Inputs/StyledInput";

type Props = {
  formKey: FormKeys;
  formInput: SelectInputForm | InputRegisterForm | DateInputForm;
};

const RenderInput = ({ formKey, formInput }: Props) => {
  const { type } = formInput;

  if (type === "date") {
    return <DatePicker key={formKey} label={formInput.label} value="" />;
  } else if (type === "select") {
    return (
      <StyledSelector
        id={formInput.label}
        key={formKey}
        label={formInput.label}
        value={formInput.value}
        onChange={() => {}}
        options={formInput.options}
      />
    );
  } else {
    return (
      <StyledInput
        id={formKey}
        key={formKey}
        label={formInput.label}
        value={formInput.value}
        onChange={() => {}}
        type={formInput.type}
        autoComplete={formInput?.autocomplete}
      />
    );
  }
};

export default RenderInput;
