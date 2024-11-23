import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues, RegisterOptions } from "react-hook-form";
import dayjs from "dayjs";

type Props = {
  form: DefaultAnesthesiologyFormType;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  TechniquesAndEventsFormRef: React.RefObject<GenerateFormRef>;
};

const TechniquesAndEvents = ({ form, TechniquesAndEventsFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("intra_procedure", values);
  };

  return (
    <div className="record-tab-selector-container__form_container">
      <GenerateForm
        defaultValues={form.intra_procedure}
        ref={TechniquesAndEventsFormRef}
        form={TECHNIQUES_AND_EVENTS_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default TechniquesAndEvents;

const TECHNIQUES_AND_EVENTS_FORM: RecordFormDataType[] = [
  {
    form: "anesthetic_technique",
    label: "Técnica Anestésica",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "MAC", value: "MAC" },
      { label: "Sedação", value: "Sedação" },
      { label: "Geral balanceada", value: "Geral balanceada" },
      { label: "Geral inalatória", value: "Geral inalatória" },
      { label: "Geral intravenosa", value: "Geral intravenosa" },
      { label: "LR BNE", value: "LR BNE" },
      { label: "LR BNP", value: "LR BNP" },
      { label: "LR BNE + BNP", value: "LR BNE + BNP" },
      { label: "Combinada Sedação AG + BNE", value: "Combinada Sedação AG + BNE" },
      { label: "Combinada Sedação AG + BNP", value: "Combinada Sedação AG + BNP" },
      { label: "Combinada Sedação + BNE", value: "Combinada Sedação + BNE" },
      { label: "Combinada Sedação + BNP", value: "Combinada Sedação + BNP" }
    ],
    rules: {}
  },
  {
    form: "bne",
    label: "BNE",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "BSA", value: "BSA" },
      { label: "Epidural", value: "Epidural" },
      { label: "Sequencial", value: "Sequencial" },
      { label: "BSA continuo", value: "BSA continuo" },
      { label: "Caudal", value: "Caudal" }
    ],
    rules: {}
  },
  {
    form: "bnp",
    label: "BNP",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "BRILMA", value: "BRILMA" },
      { label: "PEC2", value: "PEC2" },
      { label: "PENG", value: "PENG" },
      { label: "Plexo branquial via axilar", value: "Plexo branquial via axilar" },
      {
        label: "Plexo branquial via interescalénica",
        value: "Plexo branquial via interescalénica"
      },
      {
        label: "Plexo branquial via supraclavicular",
        value: "Plexo branquial via supraclavicular"
      },
      {
        label: "Plexo branquial via infraclavicular",
        value: "Plexo branquial via infraclavicular"
      },
      { label: "TAP", value: "TAP" },
      { label: "Bainha dos retos", value: "Bainha dos retos" },
      { label: "Ciático distal (poplíteo)", value: "Ciático distal (poplíteo)" },
      { label: "Ciático proximal", value: "Ciático proximal" },
      { label: "Cubital", value: "Cubital" },
      { label: "Cutâneo femoral lateral", value: "Cutâneo femoral lateral" },
      { label: "Eretor da espinha", value: "Eretor da espinha" },
      { label: "Escalpe", value: "Escalpe" },
      { label: "Fáscia ilíaca suprainguinal", value: "Fáscia ilíaca suprainguinal" },
      { label: "Fáscia ilíaca infrainguinal", value: "Fáscia ilíaca infrainguinal" },
      { label: "Femoral", value: "Femoral" },
      { label: "iPACK", value: "iPACK" },
      { label: "Ilioiinguinal/illiohipogastrico", value: "Ilioiinguinal/illiohipogastrico" },
      { label: "Mediano", value: "Mediano" },
      { label: "Obturador anterior", value: "Obturador anterior" },
      { label: "Paraesternal", value: "Paraesternal" },
      { label: "Peniano", value: "Peniano" },
      { label: "Peribulpar", value: "Peribulpar" },
      { label: "Plexo lombar", value: "Plexo lombar" },
      { label: "Pudendos", value: "Pudendos" },
      { label: "Quadrado lombar", value: "Quadrado lombar" },
      { label: "Radial", value: "Radial" },
      { label: "Safeno", value: "Safeno" },
      { label: "Tornozelo", value: "Tornozelo" }
    ],
    rules: {}
  },
  {
    form: "anesthetic_technique_conversion",
    label: "Conversão da Técnica Anestésica",
    type: "select",
    multiple: false,
    options: [
      { label: "Sim", value: "Sim" },
      { label: "Não", value: "Não" }
    ],
    rules: {}
  },
  {
    form: "anesthetic_technique_2",
    label: "Técnica Anestésica2",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "MAC", value: "MAC" },
      { label: "Sedação", value: "Sedação" },
      { label: "Geral balanceada", value: "Geral balanceada" },
      { label: "Geral inalatória", value: "Geral inalatória" },
      { label: "Geral intravenosa", value: "Geral intravenosa" },
      { label: "LR BNE", value: "LR BNE" },
      { label: "LR BNP", value: "LR BNP" },
      { label: "LR BNE + BNP", value: "LR BNE + BNP" },
      { label: "Combinada Sedação AG + BNE", value: "Combinada Sedação AG + BNE" },
      { label: "Combinada Sedação AG + BNP", value: "Combinada Sedação AG + BNP" },
      { label: "Combinada Sedação + BNE", value: "Combinada Sedação + BNE" },
      { label: "Combinada Sedação + BNP", value: "Combinada Sedação + BNP" }
    ],
    rules: {}
  },
  {
    form: "other_procedures_equipment",
    label: "Outros Procedimentos/Equipamento",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Dreno torácico", value: "Dreno torácico" },
      { label: "Dreno lombar", value: "Dreno lombar" },
      { label: "Punção lombar", value: "Punção lombar" },
      { label: "Acesso intra ósseo", value: "Acesso intra ósseo" },
      { label: "Sistema de infusão rápida", value: "Sistema de infusão rápida" },
      { label: "HFNO (high-flow) Nasal oxygen", value: "HFNO (high-flow) Nasal oxygen" },
      { label: "Verde de Indocianina", value: "Verde de Indocianina" }
    ],
    rules: {}
  },
  {
    form: "surgical_events",
    label: "Eventos Cirúrgicos",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Garrote", value: "Garrote" },
      { label: "Pneumoperitoneu", value: "Pneumoperitoneu" },
      { label: "Clamp arterial", value: "Clamp arterial" },
      { label: "Clamp venoso", value: "Clamp venoso" },
      { label: "Apneia", value: "Apneia" },
      { label: "Manobra de valsalva", value: "Manobra de valsalva" }
    ],
    rules: {}
  },
  {
    form: "hemorrahagic_losses",
    label: "Perdas Hemorrágicas",
    type: "number",
    rules: {
      pattern: {
        value: /^\d*\.?\d*$/,
        message: "O valor tem de ser maior que 0"
      }
    }
  },
  {
    form: "transfusion",
    label: "Transfusão",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Concentrado eritrocitario", value: "Concentrado eritrocitario" },
      { label: "Pool de Plaquetas", value: "Pool de Plaquetas" },
      { label: "Plasma fresco congelado", value: "Plasma fresco congelado" },
      {
        label: "Concentrado de complexo protrombinico",
        value: "Concentrado de complexo protrombinico"
      },
      { label: "Fibrinogénio", value: "Fibrinogénio" },
      { label: "Fator VIII", value: "Fator VIII" },
      { label: "Fator VII", value: "Fator VII" }
    ],
    rules: {}
  },
  {
    form: "hydraulic_balance",
    label: "Balanço Hídrico",
    type: "number",
    rules: {
      pattern: {
        value: /^\d*\.?\d*$/,
        message: "O valor tem de ser maior que 0"
      }
    }
  },
  {
    form: "anesthesia_start_time",
    label: "Hora Inicio Anestesia",
    type: "dateTime",
    rules: (getValues) => ({
      validate: (value) => {
        const now = new Date();
        const parsedStartDate = value
          ? new Date(value.replace(" / ", " ").replace(" / ", " "))
          : null;

        if (parsedStartDate && parsedStartDate > now) {
          return "Datas futuras não são válidas";
        }

        const formValues = getValues();
        const endTime = formValues["anesthesia-end-time"];

        if (endTime && !value) {
          return "Hora Início Anestesia é obrigatória quando a Hora Fim Anestesia é fornecida";
        }

        if (parsedStartDate && endTime) {
          const parsedEndDate = new Date(endTime.replace(" / ", " ").replace(" / ", " "));
          if (parsedStartDate > parsedEndDate) {
            return "Hora Início Anestesia não pode ser posterior à Hora Fim Anestesia";
          }
        }

        return true;
      }
    })
  },

  {
    form: "anesthesia_end_time",
    label: "Hora Fim Anestesia",
    type: "dateTime",
    rules: (getValues) => ({
      validate: (value) => {
        const now = new Date();
        const parsedEndDate = value
          ? new Date(value.replace(" / ", " ").replace(" / ", " "))
          : null;

        if (parsedEndDate && parsedEndDate > now) {
          return "Datas futuras não são válidas";
        }

        const formValues = getValues();
        const startTime = formValues["anesthesia-start-time"];

        if (startTime && !value) {
          return "Hora Fim Anestesia é obrigatória quando a Hora Início Anestesia é fornecida";
        }

        if (parsedEndDate && startTime) {
          const parsedStartDate = new Date(startTime.replace(" / ", " ").replace(" / ", " "));
          if (parsedEndDate < parsedStartDate) {
            return "Hora Fim Anestesia não pode ser anterior à Hora Início Anestesia";
          }
        }

        return true;
      }
    })
  },

  {
    form: "anesthesia_start_surgery",
    label: "Hora Inicio Cirurgia",
    type: "dateTime",
    rules: (getValues) => ({
      validate: (value) => {
        const now = new Date();
        const parsedStartDate = value
          ? new Date(value.replace(" / ", " ").replace(" / ", " "))
          : null;

        if (parsedStartDate && parsedStartDate > now) {
          return "Datas futuras não são válidas";
        }

        const formValues = getValues();
        const endTime = formValues["anesthesia-end-surgery"];

        if (endTime && !value) {
          return "Hora Início Cirurgia é obrigatória quando a Hora Fim Cirurgia é fornecida";
        }

        if (parsedStartDate && endTime) {
          const parsedEndDate = new Date(endTime.replace(" / ", " ").replace(" / ", " "));
          if (parsedStartDate > parsedEndDate) {
            return "Hora Inicio Cirurgia não pode ser posterior à Hora Fim Cirurgia";
          }
        }

        return true;
      }
    })
  },

  {
    form: "anesthesia_end_surgery",
    label: "Hora Fim Cirurgia",
    type: "dateTime",
    rules: (getValues) => ({
      validate: (value) => {
        const now = new Date();
        const parsedEndDate = value
          ? new Date(value.replace(" / ", " ").replace(" / ", " "))
          : null;

        if (parsedEndDate && parsedEndDate > now) {
          return "Datas futuras não são válidas";
        }

        const formValues = getValues();
        const startTime = formValues["anesthesia-start-surgery"];

        if (startTime && !value) {
          return "Hora Fim Cirurgia é obrigatória quando a Hora Início Cirurgia é fornecida";
        }

        return true;
      }
    })
  },

  {
    form: "anesthesia_duration",
    label: "Anestesia Duração",
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
    form: "surgery_duration",
    label: "Cirurgia Duração",
    type: "text",
    placeholder: "00h00m",
    tooltip: (
      <>
        <p>O valor deve estar no formato hh-mm, onde 'hh' é entre 00-23 e 'mm' é entre 00-59</p>
      </>
    ),
    rules: {
      pattern: {
        value: /^(0[0-9]|1[0-9]|2[0-3])h(0[0-9]|[1-5][0-9])m$/, // Matches 00h00m format
        message: "O valor deve estar no formato hhhmm, onde 'hh' é entre 00-23 e 'mm' é entre 00-59"
      }
    }
  }
];
