import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  ComplicationsFormRef: React.RefObject<GenerateFormRef>;
};
const Complications = ({ form, ComplicationsFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("intra_procedure", values);
  };

  return (
    <div className="record-tab-selector-container__risk_avaluation_container">
      <h6>Complicações</h6>
      <GenerateForm
        defaultValues={form.intra_procedure}
        ref={ComplicationsFormRef}
        form={VA_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default Complications;

const VA_FORM: RecordFormDataType[] = [
  {
    form: "imediate_destination",
    label: "Destino Imediato",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "UCPA", value: "UCPA" },
      { label: "SCIntermedios", value: "SCIntermedios" },
      { label: "SCIntensivos", value: "SCIntensivos" },
      { label: "Enfermaria", value: "Enfermaria" },
      { label: "Outro Hospital", value: "Outro Hospital" }
    ],
    rules: {}
  },
  {
    form: "intra_procedure_complications",
    label: "Complicações Intra Prodcedimento",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Laringospasmo", value: "Laringospasmo" },
      { label: "Broncospasmo", value: "Broncospasmo" },
      { label: "Paragem respiratória", value: "Paragem respiratória" },
      { label: "Aspiração de conteúdo gástrico", value: "Aspiração de conteúdo gástrico" },
      { label: "Insuficiência respiratória tipo I", value: "Insuficiência respiratória tipo I" },
      { label: "Insuficiência respiratória tipo II", value: "Insuficiência respiratória tipo II" },
      { label: "Pneumotórax", value: "Pneumotórax" },
      { label: "Não entubo não ventilo", value: "Não entubo não ventilo" },
      { label: "Edema da VA", value: "Edema da VA" },
      { label: "Hemorragia da VA", value: "Hemorragia da VA" },
      { label: "Hipotensão grave", value: "Hipotensão grave" },
      { label: "Crise hipertensiva", value: "Crise hipertensiva" },
      {
        label: "Paragem Cardio Respiratória Não Revertida",
        value: "Paragem Cardio Respiratória Não Revertida"
      },
      { label: "PCR Revertida", value: "PCR Revertida" },
      { label: "Bradiarritmia com compromisso CV", value: "Bradiarritmia com compromisso CV" },
      { label: "Taquiarritmia com compromisso CV", value: "Taquiarritmia com compromisso CV" },
      { label: "EAMIocárdio", value: "EAMIocárdio" },
      { label: "TEP", value: "TEP" },
      { label: "AVC", value: "AVC" },
      { label: "Isquemia de membro", value: "Isquemia de membro" },
      { label: "EAP", value: "EAP" },
      { label: "Anafilaxia", value: "Anafilaxia" },
      { label: "Lesão renal aguda", value: "Lesão renal aguda" },
      { label: "Choque hemorrágico", value: "Choque hemorrágico" },
      { label: "Choque anafilático", value: "Choque anafilático" },
      { label: "Choque séptico", value: "Choque séptico" },
      { label: "Convulsão", value: "Convulsão" },
      { label: "Síndrome de implantação do cimento", value: "Síndrome de implantação do cimento" },
      { label: "Choque cardiogénico", value: "Choque cardiogénico" },
      { label: "Síndrome de reperfusão", value: "Síndrome de reperfusão" },
      { label: "Choque obstrutivo", value: "Choque obstrutivo" },
      { label: "Tamponamento cardíaco", value: "Tamponamento cardíaco" },
      { label: "Rotura de aneurisma abdominal", value: "Rotura de aneurisma abdominal" },
      { label: "Rotura de aneurisma torácico", value: "Rotura de aneurisma torácico" },
      { label: "Rotura de aneurisma cerebral", value: "Rotura de aneurisma cerebral" },
      { label: "Punção acidental da dura mater", value: "Punção acidental da dura mater" },
      { label: "Hipertensão intracraniana", value: "Hipertensão intracraniana" },
      { label: "Hipotermia", value: "Hipotermia" },
      { label: "Hipertermia maligna", value: "Hipertermia maligna" },
      { label: "Delírio de emergência", value: "Delírio de emergência" },
      { label: "Embolia gorda", value: "Embolia gorda" },
      { label: "Embolia gasosa", value: "Embolia gasosa" },
      { label: "Intoxicação por Anestésicos Locais", value: "Intoxicação por Anestésicos Locais" },
      { label: "Hipercalemia (HiperK)", value: "Hipercalemia (HiperK)" },
      { label: "Hipocalemia (HipoK)", value: "Hipocalemia (HipoK)" },
      { label: "Atelectasia", value: "Atelectasia" },
      { label: "Hipoglicemia", value: "Hipoglicemia" },
      { label: "Hiperglicemia", value: "Hiperglicemia" },
      { label: "Síndrome TURP", value: "Síndrome TURP" },
      {
        label: "Lesão de plexo nervoso/nervo periférico",
        value: "Lesão de plexo nervoso/nervo periférico"
      },
      {
        label: "Oclusão da artéria central da retina",
        value: "Oclusão da artéria central da retina"
      },
      { label: "Hemorragia cerebral", value: "Hemorragia cerebral" },
      { label: "ICC agudizada", value: "ICC agudizada" },
      { label: "Hemorragia massiva", value: "Hemorragia massiva" },
      { label: "Atonia uterina", value: "Atonia uterina" }
    ],
    rules: {}
  },
  {
    form: "intra_procedure_complications_notes",
    label: "Notas Complicações Intra Prodcedimento",
    type: "text",
    multiline: true,
    rules: {}
  }
];
