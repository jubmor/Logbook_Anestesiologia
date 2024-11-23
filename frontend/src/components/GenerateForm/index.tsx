import { forwardRef, RefObject, useEffect, useImperativeHandle, useRef } from "react";

import StyledSelector from "@/components/Inputs/StyledSelector";
import DatePicker from "@/components/Inputs/DatePicker";
import StyledInput, { AutoCompleteOptions } from "@/components/Inputs/StyledInput";
import SelectAndSearch from "@/components/Inputs/SelectAndSearch";
import StyledCheckbox from "@/components/Inputs/StyledCheckbox";

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

type GenerateFormProps = {
  defaultValues?: FieldValues;
  form: RecordFormDataType[];
  onChange: (formValues: FieldValues) => void;
  disabled?: Array<keyof FieldValues>;
};

export type GenerateFormRef = {
  clearForm: () => void;
  getForm: () => FieldValues;
  formErrors: FieldErrors<FieldValues>;
  validateForm: () => void;
};

export type GenerateFormArrayProps = {
  key: string;
  ref: RefObject<(GenerateFormRef | null)[]>;
};

const GenerateForm = forwardRef<GenerateFormRef, GenerateFormProps>(
  ({ defaultValues, form, onChange, disabled }: GenerateFormProps, ref) => {
    const {
      control,
      register,
      handleSubmit,
      getValues,
      watch,
      reset,
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

    useEffect(() => {
      // Detect changes in `defaultValues` and reset the form if all keys are null/undefined || reset
      if (
        defaultValues &&
        Object.values(defaultValues).every((value) => value === null || value === undefined)
      ) {
        reset(defaultValues);
      }
    }, [defaultValues, reset]);

    useImperativeHandle(ref, () => ({
      clearForm: () => reset(),
      getForm: () => watch(),
      formErrors: errors,
      validateForm: async () => {
        await handleSubmit(() => {})();
        return errors;
      }
    }));

    return (
      <form
        className="generate-form-template__form_container"
        //onSubmit={submit ? handleSubmit(submit) : undefined}
      >
        {form.map((input) => {
          const rules = typeof input.rules === "function" ? input.rules(getValues) : input.rules;
          const fieldProps = register(input.form, rules);
          const error = errors[input.form]?.message;

          const isDisabled = disabled?.includes(input.form);

          return (
            <Controller
              key={input.form}
              name={input.form}
              control={control}
              render={({ field }) => {
                return (
                  <RenderFormInputs
                    key={input.form}
                    formInput={{ ...input, rules }}
                    fieldProps={fieldProps}
                    field={field}
                    error={error}
                    isDisabled={isDisabled}
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
  isDisabled?: boolean;
};

const RenderFormInputs = forwardRef(
  ({ fieldProps, formInput, field, error, isDisabled }: RenderFormInputsProps, ref) => {
    const { type } = formInput;

    if (type === "date") {
      return (
        <DatePicker
          required={formInput.rules?.required as boolean}
          key={formInput.form}
          label={formInput.label}
          {...fieldProps}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          disabled={isDisabled}
        />
      );
    } else if (type === "dateTime") {
      return (
        <DatePicker
          required={formInput.rules?.required as boolean}
          key={formInput.form}
          label={formInput.label}
          {...fieldProps}
          {...field}
          ref={ref}
          error={!!error}
          errorText={error as string}
          withTime
          disabled={isDisabled}
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
          disabled={isDisabled}
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
          disabled={isDisabled}
        />
      );
    } else if (type === "checkbox") {
      return (
        <StyledCheckbox
          required={formInput.rules?.required as boolean}
          label={formInput.label}
          error={!!error}
          errorText={error as string}
          {...field}
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
          disabled={isDisabled}
          tooltip={formInput?.tooltip}
          placeholder={formInput?.placeholder}
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

export interface CheckboxInputForm extends DefaultFormProps {
  type: "checkbox";
}

export type RecordFormDataType =
  | InputRegisterForm
  | SelectInputForm
  | SelectAndSearchInputForm
  | DateInputForm
  | DateTimeInputForm
  | CheckboxInputForm;

export type DefaultFormProps = {
  form: string;
  label: string;
  rules: RegisterOptions | ((getValues: () => FieldValues) => RegisterOptions);
  tooltip?: React.ReactNode;
  placeholder?: string;
};
