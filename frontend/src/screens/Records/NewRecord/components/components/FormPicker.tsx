import React, { useState } from "react";

import StyledInput from "@/components/Inputs/StyledInput";
import StyledSelector from "@/components/Inputs/StyledSelector";
import { RecordFormBasicInfoProps, Specialty } from "@/types/Records";

type Props = {
  formHeader: Partial<RecordFormBasicInfoProps>;
  handleHeaderInput: (value: string, id: keyof RecordFormBasicInfoProps) => void;
  formMode: "edit" | "create" | undefined;
};

const FormPicker = ({ formHeader, handleHeaderInput, formMode }: Props) => {
  return (
    <div className="new_record_form__header">
      <StyledSelector
        id="rotation"
        label={"Estágio: "}
        value={formHeader.rotation as string}
        onChange={(event) => {
          handleHeaderInput(event.target.value, "rotation");
        }}
        options={FORM_SELECTOR_OPTIONS}
        containerExtraClass="input_selector"
        disabled={formMode !== undefined}
      />
      <StyledInput
        id="episode"
        value={formHeader.episode}
        onChange={(event) => handleHeaderInput(event.target.value, "episode")}
        label="Nº Episódio"
        type="text"
        containerExtraClass="input_episode"
        disabled={formMode !== undefined}
      />
      <StyledInput
        id="process"
        value={formHeader.process}
        onChange={(event) => handleHeaderInput(event.target.value, "process")}
        label="Nº Processo"
        type="text"
        containerExtraClass="input_proccess"
        disabled={formMode !== undefined}
      />
    </div>
  );
};

export default FormPicker;

// TODO: 'value must match with BE'
const FORM_SELECTOR_OPTIONS: { label: Specialty; value: Specialty }[] = [
  { label: "Anestesiologia", value: "Anestesiologia" }
  //{ label: "Medicina Intensiva", value: "Medicina Intensiva" }
];
