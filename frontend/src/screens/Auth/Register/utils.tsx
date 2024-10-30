import StyledInput, { AutoCompleteOptions } from "@/components/Inputs/StyledInput";

import DatePicker from "@/components/Inputs/DatePicker";
import StyledSelector from "@/components/Inputs/StyledSelector";

export const ALL_APP_RESIDENCIES = [
  { label: "Anestesiologia", value: "anesthesiology" },
  { label: "Medicina intensiva", value: "intensive_care" }
];

export const PUBLIC_HOSPITALS = [
  {
    label: "Centro Hospitalar Universitário de Lisboa Norte (Hospital de Santa Maria)",
    value: "chulnSantaMaria"
  },
  {
    label: "Centro Hospitalar Universitário de Lisboa Central (Hospital São José)",
    value: "chulcSaoJose"
  },
  {
    label: "Hospital de Santo António (Centro Hospitalar Universitário do Porto)",
    value: "chupSantoAntonio"
  },
  { label: "Centro Hospitalar de Setúbal (Hospital de São Bernardo)", value: "chsSetubal" },
  { label: "Hospital de Braga", value: "hospitalBraga" },
  { label: "Centro Hospitalar Universitário do Algarve (Hospital de Faro)", value: "chuaFaro" },
  { label: "Centro Hospitalar de Vila Nova de Gaia/Espinho", value: "chvngEspinho" },
  { label: "Hospital Beatriz Ângelo (Loures)", value: "hospitalBeatrizAngelo" },
  {
    label: "Centro Hospitalar Universitário de Coimbra (Hospitais da Universidade de Coimbra)",
    value: "chucCoimbra"
  },
  { label: "Centro Hospitalar Tondela-Viseu (Hospital de São Teotónio)", value: "chtvViseu" },
  {
    label: "Hospital Pedro Hispano (Unidade Local de Saúde de Matosinhos)",
    value: "ulsmPedroHispano"
  },
  { label: "Hospital Garcia de Orta (Almada)", value: "hospitalGarciaOrta" },
  { label: "Hospital de Évora", value: "hospitalEvora" },
  { label: "Centro Hospitalar do Oeste (Hospital de Caldas da Rainha)", value: "choCaldasRainha" },
  { label: "Centro Hospitalar do Médio Tejo (Hospital de Abrantes)", value: "chmtAbrantes" },
  { label: "Centro Hospitalar Póvoa de Varzim/Vila do Conde", value: "chpvVilaDoConde" },
  { label: "Centro Hospitalar Barreiro Montijo", value: "chBarreiroMontijo" },
  { label: "Centro Hospitalar do Baixo Vouga (Aveiro)", value: "chbvAveiro" },
  { label: "Hospital de Santarém", value: "hospitalSantarem" },
  { label: "Centro Hospitalar de Trás-os-Montes e Alto Douro (Vila Real)", value: "chtrasMontes" },
  { label: "Hospital Distrital da Figueira da Foz", value: "hospitalFigueiraFoz" },
  { label: "Hospital Distrital de Santarém", value: "hospitalDistritalSantarem" },
  { label: "Centro Hospitalar de Leiria", value: "chLeiria" },
  {
    label: "Centro Hospitalar Lisboa Ocidental (Hospital de São Francisco Xavier)",
    value: "chloSaoFranciscoXavier"
  },
  { label: "Hospital Dr. Francisco Zagalo - Ovar", value: "hospitalFranciscoZagalo" },
  { label: "Hospital de Santa Luzia - Viana do Castelo", value: "hospitalSantaLuzia" }
];

export const DEFAULT_REGISTER_FORM: RegisterFormProps = {
  fullName: {
    value: "",
    label: "Primeiro e Último Nome",
    type: "text",
    required: true,
    autocomplete: "name"
  },
  email: {
    value: "",
    label: "Email",
    type: "email",
    required: true,
    autocomplete: "email"
  },
  password: {
    value: "",
    label: "Password",
    type: "password",
    required: true,
    autocomplete: "new-password"
  },
  confirmPassword: {
    value: "",
    label: "Confirmar Password",
    type: "password",
    required: true,
    autocomplete: "new-password"
  },

  residency: {
    value: "",
    label: "Internato",
    type: "select",
    options: ALL_APP_RESIDENCIES,
    required: true
  },

  startYear: {
    value: "",
    label: "Ano de Ingresso na Especialidade",
    type: "date",
    required: true
  },

  workPlace: {
    value: "",
    label: "Hospital",
    type: "select",
    options: PUBLIC_HOSPITALS,
    required: true
  }
};

export interface SelectInputForm extends DefaultFormProps {
  type: "select";
  options: { value: string; label: string }[];
}

export interface InputRegisterForm extends DefaultFormProps {
  type: "number" | "text" | "email" | "password" | "date" | "file" | "tel";
  autocomplete?: AutoCompleteOptions;
}

export interface DateInputForm extends DefaultFormProps {
  type: "date";
}

type DefaultFormProps = {
  value: string;
  label: string;
  required: boolean;
};

export type FormKeys =
  | "fullName"
  | "email"
  | "password"
  | "confirmPassword"
  | "residency"
  | "startYear"
  | "workPlace";

export type RegisterFormProps = {
  [key in FormKeys]: SelectInputForm | InputRegisterForm | DateInputForm;
};
