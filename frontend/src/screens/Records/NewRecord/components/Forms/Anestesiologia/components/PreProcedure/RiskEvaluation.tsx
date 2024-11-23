import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  riskEvaluationFormRef: React.RefObject<GenerateFormRef>;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
};

const RiskEvaluation = ({ form, riskEvaluationFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("pre_procedure", { ...values });
  };

  return (
    <div className="record-tab-selector-container__risk_avaluation_container">
      <h6>Avaliação de Risco</h6>
      <GenerateForm
        defaultValues={form.pre_procedure}
        ref={riskEvaluationFormRef}
        form={RENDER_RISK_EVALUATION_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default RiskEvaluation;

export const RENDER_RISK_EVALUATION_FORM: RecordFormDataType[] = [
  {
    form: "asa_estadio",
    label: "Estadio ASA",
    type: "select",
    options: [
      { label: "I", value: "I" },
      { label: "IE", value: "IE" },
      { label: "II", value: "II" },
      { label: "IIE", value: "IIE" },
      { label: "III", value: "III" },
      { label: "IIIE", value: "IIIE" },
      { label: "IV", value: "IV" },
      { label: "IVE", value: "IVE" },
      { label: "VE", value: "VE" },
      { label: "VI", value: "VI" }
    ],
    rules: {}
  },
  {
    form: "mallampati",
    label: "Mallampati",
    type: "select",
    options: [
      { label: "I", value: "I" },
      { label: "II", value: "II" },
      { label: "III", value: "III" },
      { label: "IV", value: "IV" }
    ],
    rules: {}
  },
  {
    form: "inter_incisiv_distance",
    label: "Distância inter-incisivos",
    type: "select",
    options: [
      { label: "≥ 3 dedos", value: "≥ 3 dedos" },
      { label: "< 3 dedos", value: "< 3 dedos" }
    ],
    rules: {}
  },
  {
    form: "upper_lip_bite_test",
    label: "Upper Lip Bite Test",
    type: "select",
    options: [
      { label: "I", value: "I" },
      { label: "II", value: "II" },
      { label: "III", value: "III" }
    ],
    rules: {}
  },
  {
    form: "atlanto_occipital_extension",
    label: "Extensão Atlanto-Occipital",
    type: "select",
    options: [
      { label: "Adequada", value: "Adequada" },
      { label: "Limitada", value: "Limitada" },
      { label: "Inexistente", value: "Inexistente" }
    ],
    rules: {}
  },
  {
    form: "stop_bang_score",
    label: "STOP BANG score",
    type: "select",
    options: [
      { label: "0-2 (baixo risco)", value: "0-2 (baixo risco)" },
      { label: "3-4 (risco intermédio)", value: "3-4 (risco intermédio)" },
      { label: "5-8 (risco elevado)", value: "5-8 (risco elevado)" }
    ],
    rules: {}
  },
  {
    form: "other_stigmas",
    label: "Outros Estigmas",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Micrognatia", value: "Micrognatia" },
      { label: "Retrognatia", value: "Retrognatia" },
      { label: "Radioterapia cervical", value: "Radioterapia cervical" },
      { label: "Cirurgia prévia ao pescoço", value: "Cirurgia prévia ao pescoço" },
      { label: "Circunferência do pescoço > 42 cm", value: "Circunferência do pescoço > 42 cm" },
      { label: "SAOS", value: "SAOS" },
      { label: "Sindrome crânio-facial", value: "Sindrome crânio-facial" }
    ],
    rules: {}
  },

  {
    form: "airway_notes",
    label: "Notas acerca da avaliação da Via Aérea",
    type: "text",
    rules: {}
  },
  {
    form: "risc_previsibility",
    label: "Previsibilidade de Risco",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Ventilação com Máscara Facial", value: "Ventilação com Máscara Facial" },
      {
        label: "Colocação/ adaptação de dispositivo supraglótico",
        value: "Colocação/ adaptação de dispositivo supraglótico"
      },
      { label: "Laringoscopia direita", value: "Laringoscopia direita" },
      { label: "Videolaringoscopia", value: "Videolaringoscopia" },
      { label: "VA cirúrgica dificíl", value: "VA cirúrgica dificíl" },
      { label: "VA fisiológica difícil", value: "VA fisiológica difícil" }
    ],
    rules: {}
  },

  {
    form: "description_previous_approaches",
    label: "Descrição de abordagens prévias",
    type: "text",
    rules: {}
  },

  {
    form: "surgical_risk",
    label: "Risco cirúrgico",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Baixo risco ( <1% )", value: "Baixo risco ( <1% )" },
      { label: "Risco intermédio ( 1-5% )", value: "Risco intermédio ( 1-5% )" },
      { label: "Alto risco ( > 5%)", value: "Alto risco ( > 5%)" }
    ],
    rules: {}
  },

  {
    form: "apfel_score",
    label: "Apfel score",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" }
    ],
    rules: {}
  },
  {
    form: "captini_score",
    label: "Caprini score",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "0 (risco mínimo)", value: "0 (risco mínimo)" },
      { label: "1-2 (risco mínimo)", value: "1-2 (risco mínimo)" },
      { label: "3-4 (risco moderado 0.7%)", value: "3-4 (risco moderado 0.7%)" },
      { label: "4-6 (moderado 1.8%)", value: "4-6 (moderado 1.8%)" },
      { label: "7-8 (elevado 4%)", value: "7-8 (elevado 4%)" },
      { label: "9 (elevado 10.7%)", value: "9 (elevado 10.7%)" }
    ],
    rules: {}
  },
  {
    form: "cha2ds2_vasc",
    label: "CHA2DS2-VASc",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" }
    ],
    rules: {}
  },
  {
    form: "ariscat_score",
    label: "ARISCAT score",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "< 25 (risco baixo 1-6%)", value: "< 25 (risco baixo 1-6%)" },
      { label: "26 - 44 (risco intermédio 13.3%)", value: "26 - 44 (risco intermédio 13.3%)" },
      { label: ">= 45 (risco elevado 42.1%)", value: ">= 45 (risco elevado 42.1%)" }
    ],
    rules: {}
  },
  {
    form: "lee_revised_cardiac_risk",
    label: "Lee Revised Cardiac Risk",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "0 (3.9%)", value: "0 (3.9%)" },
      { label: "1 (6.0%)", value: "1 (6.0%)" },
      { label: "2 (10.1%)", value: "2 (10.1%)" },
      { label: ">=3 (15%)", value: ">=3 (15%)" }
    ],
    rules: {}
  },

  {
    form: "p_possum_morbility",
    label: "P-POSSUM morbilidade",
    type: "number",
    rules: {
      min: {
        value: 0,
        message: "Valor mínimo é 0."
      },
      max: {
        value: 100,
        message: "Valor máximo é 100."
      }
    }
  },
  {
    form: "mortality",
    label: "Mortalidade",
    type: "number",
    rules: {
      min: {
        value: 0,
        message: "Valor mínimo é 0."
      },
      max: {
        value: 100,
        message: "Valor máximo é 100."
      }
    }
  },
  {
    form: "nottingham_hip_score_morality",
    label: "Nottingham Hip # Score mortalidade",
    type: "number",
    rules: {
      min: {
        value: 0,
        message: "Valor mínimo é 0."
      },
      max: {
        value: 100,
        message: "Valor máximo é 100."
      }
    }
  },

  {
    form: "uci_vacancy_request",
    label: "Pedido Vaga UCI",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Não", value: "Não" },
      { label: "Internédios", value: "Internédios" },
      { label: "Intensivos", value: "Intensivos" }
    ],
    rules: {}
  },
  {
    form: "blood_components",
    label: "Camponentes sanguíneos",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Tipagem GR", value: "Tipagem GR" },
      { label: "Reserva GR", value: "Reserva GR" },
      { label: "Reserva Plaquetas", value: "Reserva Plaquetas" }
    ],
    rules: {}
  },

  {
    form: "pre_precedure_optimization_notes",
    label: "Notas otimização pré-procedimento",
    type: "text",
    multiline: true,
    rules: {}
  },
  {
    form: "procedure_planingNotes",
    label: "Notas planeamentos do procedimentos",
    type: "text",
    multiline: true,
    rules: {}
  }
];
