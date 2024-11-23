import React from "react";
import { DefaultAnesthesiologyFormType } from "..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  ucpaFormRef: React.RefObject<GenerateFormRef>;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
};
const UCPA = ({ form, ucpaFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("ucpa", values);
  };

  return (
    <div className="record-tab-selector-container__form_container">
      <GenerateForm
        defaultValues={form.geral}
        ref={ucpaFormRef}
        form={RENDER_GERAL_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default UCPA;

const RENDER_GERAL_FORM: RecordFormDataType[] = [
  {
    form: "entry_time",
    label: "Hora de Entrada",
    type: "dateTime",
    rules: {}
  },
  {
    form: "departure_time",
    label: "Hora de Saída",
    type: "dateTime",
    rules: {}
  },
  {
    form: "duration",
    label: "Duração",
    type: "text",
    placeholder: "00h00m",
    tooltip: (
      <>
        <p>O valor deve estar no formato hh-mm, onde 'hh' é entre 00-23 e 'mm' é entre 00-59</p>
      </>
    ),
    rules: {
      pattern: {
        value: /^(0[0-9]|1[0-9]|2[0-3])h(0[0-9]|[1-5][0-9])m$/,
        message: "O valor deve estar no formato hhhmm, onde 'hh' é entre 00-23 e 'mm' é entre 00-59"
      }
    }
  },
  {
    form: "advanced_monitoring",
    label: "Monotorização Avançada",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "PAI", value: "PAI" },
      { label: "Diurese horária", value: "Diurese horária" },
      { label: "BIS", value: "BIS" },
      { label: "INVOS", value: "INVOS" },
      { label: "PIC", value: "PIC" },
      { label: "ECG12D", value: "ECG12D" },
      { label: "EcoTT", value: "EcoTT" }
    ],
    rules: {}
  },
  {
    form: "procedures",
    label: "Procedimentos",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "EOT", value: "EOT" },
      { label: "Linha arterial", value: "Linha arterial" },
      { label: "CVC jugular ecoguiado", value: "CVC jugular ecoguiado" },
      { label: "CVC jugular referencias", value: "CVC jugular referencias" },
      { label: "CVC subclávio ecoguiado", value: "CVC subclávio ecoguiado" },
      { label: "CVC subclávio referencias", value: "CVC subclávio referencias" },
      { label: "CVC femoral ecoguiado", value: "CVC femoral ecoguiado" },
      { label: "CVC femoral referencias", value: "CVC femoral referencias" },
      { label: "Algaliação", value: "Algaliação" },
      { label: "BNPeriferico", value: "BNPeriferico" },
      { label: "Cateter Epidural", value: "Cateter Epidural" }
    ],
    rules: {}
  },
  {
    form: "organ_support",
    label: "Suporte de Órgão",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "ONAF", value: "ONAF" },
      { label: "BiPAP domiciliário", value: "BiPAP domiciliário" },
      { label: "VNI", value: "VNI" },
      { label: "VMI", value: "VMI" },
      { label: "Vasopressor", value: "Vasopressor" },
      { label: "Ionotropico", value: "Ionotropico" },
      { label: "Antiarritmico", value: "Antiarritmico" }
    ],
    rules: {}
  },
  {
    form: "analgesics_used",
    label: "Analgésicos usados na UCPA",
    type: "text",
    rules: {}
  },
  {
    form: "references_to_uda",
    label: "Referenciação à UDA",
    type: "select",
    multiple: false,
    options: [
      { label: "Sim", value: "Sim" },
      { label: "Não", value: "Não" }
    ],
    rules: {}
  },
  {
    form: "complications_in_ucpa",
    label: "Complicações na UCPA",
    type: "select_and_search",
    multiple: false,
    options: [],
    rules: {}
  },
  {
    form: "complications_description",
    label: "Descrição das Complicações",
    type: "text",
    multiline: true,
    rules: {}
  },
  {
    form: "aldrete_score",
    label: "Aldrete Score",
    type: "number",
    rules: {
      validate: (value) => {
        const numberValue = Number(value);

        if (numberValue < 0) {
          // TODO Confirmar
          return "Introduza um valor válido";
        }

        return true;
      }
    }
  },
  {
    form: "ucpa_discharge_destination",
    label: "Destino à Alta da UCPA",
    type: "select",
    options: [
      { label: "Enfermaria", value: "Enfermaria" },
      { label: "Intermédios", value: "Intermédios" },
      { label: "Intensivos", value: "Intensivos" },
      { label: "CMIN", value: "CMIN" },
      { label: "Outro hospital", value: "Outro hospital" },
      { label: "Unidade de Curta Duração (SU)", value: "Unidade de Curta Duração (SU)" }
    ],
    rules: {}
  }
];
