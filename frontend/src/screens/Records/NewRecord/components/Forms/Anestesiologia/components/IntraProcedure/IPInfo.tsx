import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";
import { FieldValues } from "react-hook-form";

type Props = {
  form: DefaultAnesthesiologyFormType;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
  IPFormRef: React.RefObject<GenerateFormRef>;
};
const IPInfo = ({ form, IPFormRef, handleFormChange }: Props) => {
  const onChange = (values: FieldValues) => {
    handleFormChange("intra_procedure", values);
  };

  return (
    <div className="record-tab-selector-container__form_container">
      <GenerateForm
        defaultValues={form.intra_procedure}
        ref={IPFormRef}
        form={IP_INFO_FORM}
        onChange={onChange}
      />
    </div>
  );
};

export default IPInfo;

const IP_INFO_FORM: RecordFormDataType[] = [
  {
    form: "monitorization",
    label: "Monotorização",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Standard ASA", value: "Standard ASA" },
      { label: "Bloqueio Neuromuscular", value: "Bloqueio Neuromuscular" },
      { label: "BIS unilateral", value: "BIS unilateral" },
      { label: "BIS bilateral", value: "BIS bilateral" },
      { label: "SEDline", value: "SEDline" },
      { label: "Diurese horária", value: "Diurese horária" },
      { label: "Temperatura Esofágica", value: "Temperatura Esofágica" },
      { label: "Pressões Arteriais Invasivas", value: "Pressões Arteriais Invasivas" },
      { label: "INVOS", value: "INVOS" },
      { label: "O3", value: "O3" },
      { label: "ANI", value: "ANI" },
      { label: "PVC", value: "PVC" },
      { label: "PVI", value: "PVI" },
      { label: "ProAQT pulsioflex", value: "ProAQT pulsioflex" },
      { label: "LiDCO rapid", value: "LiDCO rapid" },
      { label: "Starling SV", value: "Starling SV" },
      { label: "PiCCO", value: "PiCCO" },
      { label: "Ecocardiograma TT", value: "Ecocardiograma TT" },
      { label: "Ecocardiograma TE", value: "Ecocardiograma TE" },
      { label: "Potenciais somota-sensitivos", value: "Potenciais somota-sensitivos" },
      { label: "Potenciais motores", value: "Potenciais motores" },
      { label: "PIC", value: "PIC" },
      { label: "PtiO2", value: "PtiO2" },
      { label: "DjVO2", value: "DjVO2" },
      { label: "Tromboelastografia", value: "Tromboelastografia" },
      { label: "ACT", value: "ACT" },
      { label: "Stump Pressure", value: "Stump Pressure" },
      { label: "Hg não invasiva", value: "Hg não invasiva" },
      { label: "EcoDoppler", value: "EcoDoppler" }
    ],
    rules: {}
  },
  {
    form: "catheterizations",
    label: "Cateterismos",
    type: "select_and_search",
    multiple: true,
    options: [
      { label: "Algália", value: "Algália" },
      { label: "Cateter arterial radial", value: "Cateter arterial radial" },
      { label: "Cateter arterial branquial", value: "Cateter arterial branquial" },
      { label: "Cateter arterial femoral", value: "Cateter arterial femoral" },
      { label: "Cateter arterial pediosa", value: "Cateter arterial pediosa" },
      { label: "CVC jugular ecoguiado", value: "CVC jugular ecoguiado" },
      { label: "CVC jugular por referências", value: "CVC jugular por referências" },
      { label: "CVC subclávio ecoguiado", value: "CVC subclávio ecoguiado" },
      { label: "CVC subclávio por referências", value: "CVC subclávio por referências" },
      { label: "CVC multiorificios", value: "CVC multiorificios" },
      { label: "CVC femoral", value: "CVC femoral" },
      { label: "Cateter alto debito 1", value: "Cateter alto debito 1" },
      { label: "Cateter alto debito 2", value: "Cateter alto debito 2" },
      { label: "Cateter PiCCO", value: "Cateter PiCCO" },
      { label: "Intodutor de Swan-Ganz", value: "Intodutor de Swan-Ganz" },
      { label: "Cateter de Swan-Ganz", value: "Cateter de Swan-Ganz" },
      { label: "CVC diálise femoral", value: "CVC diálise femoral" },
      { label: "CVC diálise jugular", value: "CVC diálise jugular" },
      {
        label: "Cateter central de inserção periférica",
        value: "Cateter central de inserção periférica"
      },
      { label: "CVC totalmente implantado", value: "CVC totalmente implantado" },
      { label: "Cateter ventrículo-auricular", value: "Cateter ventrículo-auricular" }
    ],
    rules: {}
  },
  {
    form: "procedure_icd_10",
    label: "Procedimento (ICD-10 PCSS)",
    type: "select_and_search",
    options: [
      {
        label: "Médico e Cirúrgico > Sistema Nervoso Central > Reparação",
        value: "Médico e Cirúrgico > Sistema Nervoso Central > Reparação"
      },
      {
        label: "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação",
        value: "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação"
      },
      {
        label:
          "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação > Cérebro > Aberta > Sem dispositivo > Sem qualificador",
        value:
          "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação > Cérebro > Aberta > Sem dispositivo > Sem qualificador"
      },
      {
        label:
          "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação > Cérebro > Percutânia > Sem dispositivo > Sem qualificador",
        value:
          "Médico e Cirúrgico > Sistema Nervoso Central e Nervos Cranianos > Reparação > Cérebro > Percutânia > Sem dispositivo > Sem qualificador"
      }
    ],
    rules: {}
  },
  {
    form: "procedure_notes",
    label: "Notas Procedimento",
    type: "text",
    multiline: true,
    rules: {}
  }
];
