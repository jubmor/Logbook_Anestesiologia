import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import React from "react";
import { DefaultAnesthesiologyFormType } from "..";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  intraProcedureFormRef: React.RefObject<GenerateFormRef>;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
};

const IntraProcedure = ({ form, intraProcedureFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("intraProcedure", values);
  };

  return (
    <GenerateForm
      defaultValues={form.intraProcedure}
      ref={intraProcedureFormRef}
      form={RENDER_GERAL_FORM}
      onChange={onChange}
    />
  );
};

export default IntraProcedure;

const RENDER_GERAL_FORM: RecordFormDataType[] = [
  /* {
    form: "local",
    label: "Local",
    type: "select",
    options: [
      { label: "BO HSA", value: "BO HSA" },
      { label: "BO CICA", value: "BO CICA" },
      { label: "Locais Remotos", value: "Locais Remotos" },
      { label: "Dor Aguda", value: "Dor Aguda" },
      { label: "Sala de Emergência", value: "Sala de Emergência" }
    ],
    rules: { required: "Este campo é obrigatório" }
  },
  {
    form: "remoteLocal",
    label: "Locais Remotos",
    type: "select",
    options: [
      { label: "Option1", value: "1" },
      { label: "Option2", value: "2" },
      { label: "Option3", value: "3" },
      { label: "Option4", value: "4" }
    ],
    rules: {}
  },
  {
    form: "specialty",
    label: "Especialidade",
    type: "select",
    options: [
      { label: "Neurocirurgia", value: "Neurocirurgia" },
      { label: "C. Plástica e Reconstrutiva", value: "C. Plástica e Reconstrutiva" },
      { label: "C. Geral", value: "C. Geral" },
      { label: "Urologia", value: "Urologia" },
      { label: "Ginecologia", value: "Ginecologia" },
      { label: "Obstetrícia", value: "Obstetrícia" },
      { label: "C. Pediátrica", value: "C. Pediátrica" },
      { label: "Ortopedia", value: "Ortopedia" },
      { label: "Oftalmologia", value: "Oftalmologia" },
      { label: "ORL", value: "ORL" },
      { label: "C. Vascular", value: "C. Vascular" },
      { label: "C. Maxilo Facial", value: "C. Maxilo Facial" },
      { label: "Estomatologia", value: "Estomatologia" },
      { label: "Gastroenterologia", value: "Gastroenterologia" }
    ],
    rules: { required: "Este campo é obrigatório" }
  }, */
  {
    form: "procedureDate33131",
    label: "Data do Procedimento",
    type: "dateTime",
    rules: { required: "Este campo é obrigatório" }
  }
  /* {
    form: "specialistName",
    label: "Nome Especialista",
    type: "text",
    autocomplete: "name",
    rules: {
      required: "Este campo é obrigatório",
      minLength: {
        value: 3,
        message: "O nome precisa ter pelo menos 3 caracteres."
      },
      maxLength: {
        value: 80,
        message: "O nome não pode ter mais de 80 caracteres."
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "O nome só pode conter letras."
      }
    }
  },
  {
    form: "proposedProcedure",
    label: "Procedimento Proposto",
    type: "text",
    rules: { required: "Este campo é obrigatório" }
  },
  {
    form: "surgicalRegime",
    label: "Procedimento Proposto",
    type: "select",
    options: [
      { label: "Ambulatório", value: "Ambulatório" },
      { label: "Urgente", value: "Urgente" },
      { label: "SIGIC", value: "SIGIC" }
    ],
    rules: {}
  } */
];
