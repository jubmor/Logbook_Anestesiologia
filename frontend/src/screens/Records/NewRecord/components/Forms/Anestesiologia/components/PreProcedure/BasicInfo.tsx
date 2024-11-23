import { memo, useRef } from "react";

import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";

import { FieldValues } from "react-hook-form";
import { DefaultAnesthesiologyFormType } from "../..";

type Props = {
  form: DefaultAnesthesiologyFormType;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  basicInfoFormRef: React.RefObject<GenerateFormRef>;
};

const BasicInfo = ({ form, basicInfoFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("pre_procedure", { ...values });
  };

  return (
    <div className="record-tab-selector-container__form_container">
      <GenerateForm
        defaultValues={form.pre_procedure}
        ref={basicInfoFormRef}
        form={RENDER_PRE_PROCEDURE_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(BasicInfo);

export const RENDER_PRE_PROCEDURE_FORM: RecordFormDataType[] = [
  {
    form: "age",
    label: "Idade",
    type: "number",
    rules: {
      validate: (value) => {
        const numberValue = Number(value);

        if (numberValue < 0) {
          return "Introduza um valor válido";
        }

        return true;
      }
    }
  },
  {
    form: "gender",
    label: "Sexo",
    type: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Feminino", value: "Feminino" }
    ],
    rules: {}
  },
  {
    form: "weight",
    label: "Peso (kg)",
    type: "number",
    rules: {
      validate: (value) => {
        const numberValue = Number(value);

        if (numberValue < 0) {
          return "Introduza um valor válido";
        }

        return true;
      }
    }
  },
  {
    form: "height",
    label: "Altura (cm)",
    type: "number",
    rules: {
      validate: (value) => {
        const numberValue = Number(value);

        if (numberValue < 0) {
          return "Introduza um valor válido";
        }

        return true;
      }
    }
  },
  {
    form: "medical_history",
    label: "Antecedentes Médicos (ICD-10CM)",
    type: "select",
    multiple: true,
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "medical_history_notes",
    label: "Notas Antecedentes Médicos",
    type: "text",
    rules: {}
  },
  {
    form: "usual_medication",
    label: "Medicação Habitual (codificação CHNM)",
    type: "select",
    multiple: true,
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "usual_medication_notes",
    label: "Notas Medicação Habitual",
    type: "text",
    rules: {}
  },
  {
    form: "alergies",
    label: "Alergias",
    type: "select",
    multiple: true,
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "surgical_history",
    label: "Antecedentes Cirútgicos",
    type: "text",
    rules: {}
  },
  {
    form: "mcdt_description",
    label: "Descrição dos MCDTs",
    type: "text",
    rules: {}
  }
];
