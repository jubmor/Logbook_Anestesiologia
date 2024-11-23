import React, { useState } from "react";

import { RecordFormBasicInfoProps, Specialty } from "@/types/Records";
import GenerateForm, { RecordFormDataType } from "@/components/GenerateForm";

type Props = {
  formHeader: Partial<RecordFormBasicInfoProps>;
  setFormHeader: React.Dispatch<React.SetStateAction<Partial<RecordFormBasicInfoProps>>>;
  formMode: "edit" | "create" | undefined;
};

const FormPicker = ({ formHeader, setFormHeader, formMode }: Props) => {
  return (
    <GenerateForm
      defaultValues={formHeader}
      ref={undefined}
      form={RENDER_GERAL_FORM}
      onChange={(data) => setFormHeader(data)}
      disabled={formMode ? disabledKeys : undefined}
    />
  );
};

export default FormPicker;

const disabledKeys = ["rotation", "process", "episode"];

const RENDER_GERAL_FORM: RecordFormDataType[] = [
  {
    form: "rotation",
    label: "Estágio",
    type: "select",
    options: [
      { label: "Anestesiologia", value: "Anestesiologia" }
      //{ label: "Medicina Intensiva", value: "Medicina Intensiva" }
    ],
    rules: { required: "Este campo é obrigatório" }
  },
  {
    form: "process",
    label: "Nº Processo",
    type: "text",
    rules: { required: "Este campo é obrigatório" }
  },
  {
    form: "episode",
    label: "Episódio",
    type: "text",
    rules: { required: "Este campo é obrigatório" }
  }
];
