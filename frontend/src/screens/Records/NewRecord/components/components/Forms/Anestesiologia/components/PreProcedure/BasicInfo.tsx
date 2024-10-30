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
    handleFormChange("preProcedure", { ...values });
  };

  return (
    <GenerateForm
      defaultValues={form.preProcedure}
      ref={basicInfoFormRef}
      form={RENDER_PRE_PROCEDURE_FORM}
      onChange={onChange}
    />
  );
};

export default memo(BasicInfo);

export const RENDER_PRE_PROCEDURE_FORM: RecordFormDataType[] = [
  {
    form: "age",
    label: "Idade",
    type: "number",
    rules: {}
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
    rules: {}
  },
  {
    form: "height",
    label: "Altura (cm)",
    type: "number",
    rules: {}
  },
  {
    form: "medicalHistory",
    label: "Antecedentes Médicos (ICD-10CM)",
    type: "select",
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "medicalHistoryNotes",
    label: "Notas Antecedentes Médicos",
    type: "text",
    rules: {}
  },
  {
    form: "usualMedication",
    label: "Medicação Habitual (codificação CHNM)",
    type: "select",
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "usualMedicationNotes",
    label: "Notas Medicação Habitual",
    type: "text",
    rules: {}
  },
  {
    form: "alergies",
    label: "Alergias",
    type: "select",
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
      { label: "Option3", value: "Option3" }
    ],
    rules: {}
  },
  {
    form: "surgicalHistory",
    label: "Antecedentes Cirútgicos",
    type: "text",
    rules: {}
  },
  {
    form: "mcdtDescription",
    label: "Descrição dos MCDTs",
    type: "text",
    rules: {}
  }
];
