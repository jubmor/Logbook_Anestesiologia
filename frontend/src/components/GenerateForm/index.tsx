import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import StyledSelector from "@/components/Inputs/StyledSelector";
import DatePicker from "@/components/Inputs/DatePicker";
import StyledInput, { AutoCompleteOptions } from "@/components/Inputs/StyledInput";
import { DateOrTimeView } from "@mui/x-date-pickers";

import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  useForm,
  UseFormRegisterReturn
} from "react-hook-form";

import "./styles.scss";
import SelectAndSearch from "../Inputs/SelectAndSearch";

type GenerateFormProps = {
  defaultValues?: FieldValues;
  form: RecordFormDataType[];
  onChange: (formValues: FieldValues) => void;
};

export type GenerateFormRef = {
  getForm: () => FieldValues;
  formErrors: FieldErrors<FieldValues>;
  validateForm: () => void;
};

const GenerateForm = forwardRef<GenerateFormRef, GenerateFormProps>(
  ({ defaultValues, form, onChange }: GenerateFormProps, ref) => {
    const {
      control,
      register,
      handleSubmit,
      getValues,
      watch,
      formState: { errors }
    } = useForm({ defaultValues: defaultValues });

    const watchedValues = watch();

    const prevValuesRef = useRef(watchedValues);

    useEffect(() => {
      if (JSON.stringify(watchedValues) !== JSON.stringify(prevValuesRef.current)) {
        onChange(watchedValues);
        prevValuesRef.current = watchedValues;
      }
    }, [watchedValues, onChange]);

    useImperativeHandle(ref, () => ({
      getForm: () => watch(),
      formErrors: errors,
      validateForm: async () => {
        await handleSubmit(() => {})();
        return errors;
      }
    }));

    return (
      <form className="generate-form-template__form_container">
        {form.map((input) => {
          const fieldProps = register(input.form, input.rules);
          const error = errors[input.form]?.message;

          return (
            <Controller
              key={input.form}
              name={input.form}
              control={control}
              render={({ field }) => {
                return (
                  <RenderFormInputs
                    key={input.form}
                    formInput={input}
                    fieldProps={fieldProps}
                    //value={value}
                    field={field}
                    error={error}
                  />
                );
              }}
            />
          );
        })}
      </form>
    );
  }
);

export default GenerateForm;

type RenderFormInputsProps = {
  formInput: RecordFormDataType;
  field: ControllerRenderProps<FieldValues, string>;
  fieldProps: UseFormRegisterReturn<string>;
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const RenderFormInputs = forwardRef(
  ({ fieldProps, formInput, field, error }: RenderFormInputsProps, ref) => {
    const { type } = formInput;

    if (type === "date") {
      return (
        <DatePicker
          key={formInput.form}
          label={formInput.label}
          {...fieldProps}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
        />
      );
    } else if (type === "dateTime") {
      return (
        <DatePicker
          key={formInput.form}
          label={formInput.label}
          {...fieldProps}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          withTime
        />
      );
    } else if (type === "select") {
      return (
        <StyledSelector
          required={formInput.rules?.required as boolean}
          id={formInput.label}
          key={formInput.form}
          label={formInput.label}
          options={formInput.options}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          multiple={formInput?.multiple}
        />
      );
    } else if (type === "select_and_search") {
      return (
        <SelectAndSearch
          required={formInput.rules?.required as boolean}
          //  id={formInput.label}
          key={formInput.form}
          label={formInput.label}
          options={formInput.options}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          multiple={formInput?.multiple}
        />
      );
    } else {
      return (
        <StyledInput
          required={formInput.rules?.required as boolean}
          id={formInput.form}
          key={formInput.form}
          label={formInput.label}
          type={formInput.type}
          autoComplete={formInput?.autocomplete}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          multiline={formInput?.multiline}
        />
      );
    }
  }
);

export interface SelectInputForm extends DefaultFormProps {
  type: "select";
  multiple?: boolean;
  options: { value: string; label: string }[];
}
export interface SelectAndSearchInputForm extends DefaultFormProps {
  type: "select_and_search";
  multiple?: boolean;
  options: { value: string; label: string }[];
}

export interface InputRegisterForm extends DefaultFormProps {
  type: "number" | "text" | "email" | "password" | "date" | "file" | "tel";
  multiline?: boolean;
  autocomplete?: AutoCompleteOptions;
}

export interface DateInputForm extends DefaultFormProps {
  type: "date";
  views: DateOrTimeView[];
}

export interface DateTimeInputForm extends DefaultFormProps {
  type: "dateTime";
}

export type RecordFormDataType =
  | InputRegisterForm
  | SelectInputForm
  | SelectAndSearchInputForm
  | DateInputForm
  | DateTimeInputForm;

export type DefaultFormProps = {
  form: string;
  label: string;
  rules: RegisterOptions;
};
