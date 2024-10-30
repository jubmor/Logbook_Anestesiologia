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
    handleFormChange("preProcedure", { ...values });
  };

  return (
    <div className="record-tab-selector-container__risk_avaluation_container">
      <h6>Avaliação de Risco</h6>
      <GenerateForm
        defaultValues={form.preProcedure}
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
    form: "asaEstadio",
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
    form: "interIncisivDistance",
    label: "Distância inter-incisivos",
    type: "select",
    options: [
      { label: "≥ 3 dedos", value: "≥ 3 dedos" },
      { label: "< 3 dedos", value: "< 3 dedos" }
    ],
    rules: {}
  },
  {
    form: "upperLipBiteTest",
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
    form: "atlantoOccipitalExtension",
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
    form: "stopBangScore",
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
    form: "otherStigmas",
    label: "Outros Estigmas",
    type: "select",
    multiple: true,
    options: [
      { label: "Micrognatia", value: "Micrognatia" },
      { label: "Retrognatia", value: "Retrognatia" },
      { label: "Radioterapia cervical", value: "Radioterapia cervical" },
      { label: "Cirurgia prévia ao pescoço", value: "Cirurgia prévia ao pescoço" },
      { label: "Circunferência do pescoço > 42 cm", value: "Circunferência do pescoço > 42 cm" },
      { label: "SAOS", value: "SAOS" },
      { label: "Sindrome crânio-facial", value: "Circunferência do pescoço > 42 cm" }
    ],
    rules: {}
  },

  {
    form: "airwayNotes",
    label: "Notas acerca da avaliação da Via Aérea",
    type: "text",
    rules: {}
  },
  {
    form: "riscPrevisibility",
    label: "Previsibilidade de Risco",
    type: "select",
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
    form: "descriptionPreviousApproaches",
    label: "Descrição de abordagens prévias",
    type: "text",
    rules: {}
  },

  {
    form: "surgicalRisk",
    label: "Risco cirúrgico",
    type: "select",
    multiple: true,
    options: [
      { label: "Baixo risco ( <1% )", value: "Baixo risco ( <1% )" },
      { label: "Risco intermédio ( 1-5% )", value: "Risco intermédio ( 1-5% )" },
      { label: "Alto risco ( > 5%)", value: "Alto risco ( > 5%)" }
    ],
    rules: {}
  },

  ///// //////////////////

  {
    form: "apfelScore",
    label: "Apfel score",
    type: "select",
    multiple: true,
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
    form: "captiniScore",
    label: "Caprini score",
    type: "select",
    multiple: true,
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
    form: "CHA2DS2-VASc",
    label: "CHA2DS2-VASc",
    type: "select",
    multiple: true,
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
    form: "ARISCATscore",
    label: "ARISCAT score",
    type: "select",
    multiple: true,
    options: [
      { label: "< 25 (risco baixo 1-6%)", value: "< 25 (risco baixo 1-6%)" },
      { label: "26 - 44 (risco intermédio 13.3%)", value: "26 - 44 (risco intermédio 13.3%)" },
      { label: ">= 45 (risco elevado 42.1%)", value: ">= 45 (risco elevado 42.1%)" }
    ],
    rules: {}
  },
  {
    form: "leeRevisedCardiacRisk",
    label: "Lee Revised Cardiac Risk",
    type: "select",
    multiple: true,
    options: [
      { label: "0 (3.9%)", value: "0 (3.9%)" },
      { label: "1 (6.0%)", value: "1 (6.0%)" },
      { label: "2 (10.1%)", value: "2 (10.1%)" },
      { label: ">=3 (15%)", value: ">=3 (15%)" }
    ],
    rules: {}
  },

  {
    form: "P-POSSUM_morbility",
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
    form: "nottinghamHipScoreMorality",
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
    form: "uciVacancyRequest",
    label: "Pedido Vaga UCI",
    type: "select",
    multiple: true,
    options: [
      { label: "Não", value: "Não" },
      { label: "Internédios", value: "Internédios" },
      { label: "Intensivos", value: "Intensivos" }
    ],
    rules: {}
  },
  {
    form: "bloodComponents",
    label: "Camponentes sanguíneos",
    type: "select",
    multiple: true,
    options: [
      { label: "Tipagem GR", value: "Tipagem GR" },
      { label: "Reserva GR", value: "Reserva GR" },
      { label: "Reserva Plaquetas", value: "Reserva Plaquetas" }
    ],
    rules: {}
  },

  {
    form: "prePrecedureOptimizationNotes",
    label: "Notas otimização pré-procedimento",
    type: "text",
    multiline: true,
    rules: {}
  },
  {
    form: "procedurePlaningNotes",
    label: "Notas planeamentos do procedimentos",
    type: "text",
    multiline: true,
    rules: {}
  }
];
