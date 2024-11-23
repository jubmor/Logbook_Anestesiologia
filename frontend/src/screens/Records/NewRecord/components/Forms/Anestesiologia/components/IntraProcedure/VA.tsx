import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  VAFormRef: React.RefObject<GenerateFormRef>;
};
const VA = ({ form, VAFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("intra_procedure", values);
  };

  return (
    <div className="record-tab-selector-container__risk_avaluation_container">
      <h6>Via Aérea</h6>
      <GenerateForm
        defaultValues={form.intra_procedure}
        ref={VAFormRef}
        form={VA_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default VA;

const VA_FORM: RecordFormDataType[] = [
  /// RED
  {
    form: "VAapproach",
    label: "Abordagem da VA",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Dispositivo supraglótico", value: "Dispositivo supraglótico" },
      { label: "Laringoscopia direta", value: "Laringoscopia direta" },
      { label: "Videolaringoscopia", value: "Videolaringoscopia" },
      { label: "Nasofibroscopia", value: "Nasofibroscopia" },
      { label: "Fibroscopia oral", value: "Fibroscopia oral" },
      { label: "Traqueotomia", value: "Traqueotomia" },
      { label: "Entubação através de DSG", value: "Entubação através de DSG" },
      { label: "Cricotireotomia", value: "Cricotireotomia" }
    ],
    rules: {}
  },
  {
    form: "VAdevice",
    label: "Dispositivo VA",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "DSG 1ª G", value: "DSG 1ª G" },
      { label: "DSG 2ª G", value: "DSG 2ª G" },
      { label: "DSG aramado", value: "DSG aramado" },
      { label: "TET aramado oral", value: "TET aramado oral" },
      { label: "TET aramado nasal", value: "TET aramado nasal" },
      { label: "RAE nasal", value: "RAE nasal" },
      { label: "ERA oral", value: "ERA oral" },
      { label: "Turbo Duplo Lúmen Esq", value: "Turbo Duplo Lúmen Esq" },
      { label: "Turbo Duplo Lúmen Direito", value: "Turbo Duplo Lúmen Direito" },
      { label: "Bloqueador Brônquico", value: "Bloqueador Brônquico" },
      { label: "MLT", value: "MLT" },
      { label: "Cânula de traqueostomia", value: "Cânula de traqueostomia" }
    ],
    rules: {}
  },
  {
    form: "blade",
    label: "Blade",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Macintosh", value: "Macintosh" },
      { label: "Miller", value: "Miller" },
      { label: "McCoy", value: "McCoy" },
      { label: "Videolaringocopio-Macintosh", value: "Videolaringocopio-Macintosh" },
      { label: "Videolaringocopio-hiperangulada", value: "Videolaringocopio-hiperangulada" }
    ],
    rules: {}
  },
  {
    form: "adjuvants",
    label: "Adjuvantes",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "BURP", value: "BURP" },
      { label: "Mandril rígido", value: "Mandril rígido" },
      { label: "Mandril maleável", value: "Mandril maleável" },
      { label: "Bougie", value: "Bougie" },
      { label: "Frova", value: "Frova" },
      { label: "Fibroscopia diagnostica", value: "Fibroscopia diagnostica" },
      { label: "Cabo curto", value: "Cabo curto" },
      { label: "Cunha de obesidade", value: "Cunha de obesidade" }
    ],
    rules: {}
  },
  {
    form: "isr",
    label: "ISR",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Não", value: "Não" },
      { label: "Sim", value: "Sim" }
    ],
    rules: {}
  },
  {
    form: "cormack_lehane",
    label: "Cormack-Lehane",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "I", value: "I" },
      { label: "IIa", value: "IIa" },
      { label: "IIb", value: "IIb" },
      { label: "III", value: "III" },
      { label: "IV", value: "IV" }
    ],
    rules: {}
  },
  {
    form: "difficult_airway",
    label: "Via Aérea Dificil",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Não", value: "Não" },
      { label: "Ventilação difícil", value: "Ventilação difícil" },
      { label: "Laringoscopia direta difícil", value: "Laringoscopia direta difícil" },
      { label: "Videolaringoscopia difícil", value: "Videolaringoscopia difícil" },
      { label: "Aplicação de LMA difícil", value: "Aplicação de LMA difícil" },
      { label: "VA difícil fisiológica", value: "VA difícil fisiológica" }
    ],
    rules: {}
  },
  {
    form: "difficult_airway_description",
    label: "Via Aérea Dificil",
    type: "text",
    multiline: false,
    rules: {}
  }
];
