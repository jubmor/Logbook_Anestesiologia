import React from "react";

import { DefaultAnesthesiologyFormType } from "../..";

import GenerateForm, {
  GenerateFormArrayProps,
  GenerateFormRef,
  RecordFormDataType
} from "@/components/GenerateForm";

import { FieldValues } from "react-hook-form";

import ComplicationsForm from "./components/ComplicationsForm";

import "./styles.scss";

type Props = {
  form: DefaultAnesthesiologyFormType;
  postProcedureFormRef: React.RefObject<GenerateFormRef>;
  postProcedureComplicationsForms: GenerateFormArrayProps;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  counter: number;
};
const PostProcedure = ({
  form,
  postProcedureFormRef,
  postProcedureComplicationsForms,
  handleFormChange,
  counter
}: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("post_procedure", values);
  };

  return (
    <>
      <ComplicationsForm
        counter={counter}
        postProcedureComplicationsForms={postProcedureComplicationsForms}
      />

      <div className="record-tab-selector-container__form_container">
        <GenerateForm
          defaultValues={form.post_procedure}
          ref={postProcedureFormRef}
          form={POST_PRECUDERE_GERAL_FORM}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default PostProcedure;

const POST_PRECUDERE_GERAL_FORM: RecordFormDataType[] = [
  {
    form: "surgical_re_intervention",
    label: "Re-intervenção Cirurgica",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Sim", value: "Sim" },
      { label: "Não", value: "Não" }
    ],
    rules: {}
  },
  {
    form: "intermediate_duration",
    label: "Duração Intermédios (dias)",
    type: "number",
    rules: {
      pattern: {
        value: /^\d*\.?\d*$/,
        message: "O valor tem de ser maior que 0"
      }
    }
  },
  {
    form: "intensive_duration",
    label: "Duração Intensivos (dias)",
    type: "number",
    rules: {
      pattern: {
        value: /^\d*\.?\d*$/,
        message: "O valor tem de ser maior que 0"
      }
    }
  },
  {
    form: "hospital_discharge_date",
    label: "Data Alta Hospitalar",
    type: "date",
    rules: {}
  },

  {
    form: "hospital_discharge_site",
    label: "Destino Alta Hospitalar",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Domicilio", value: "Domicilio" },
      { label: "Outro Hospitalar", value: "Outro Hospitalar" },
      { label: "Unidade de cuidados continuados", value: "Unidade de cuidados continuados" }
    ],
    rules: {}
  }
];
