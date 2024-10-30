import React, { ReactElement } from "react";

import FormPicker from "./components/FormPicker";

import { RecordFormBasicInfoProps, Specialty } from "@/types/Records";

import Anestesiologia from "./components/Forms/Anestesiologia";

import "./styles.scss";
import { RecordFormHandlingRef } from "..";

type Props = {
  formHeader: Partial<RecordFormBasicInfoProps>;
  handleHeaderInput: (value: string, id: keyof RecordFormBasicInfoProps) => void;
  formMode: "edit" | "create" | undefined;
  recordFormRef: React.RefObject<RecordFormHandlingRef>;
};

const NewRecordBody = ({ formHeader, handleHeaderInput, formMode, recordFormRef }: Props) => {
  const RENDER_FORM: Partial<Record<Specialty, JSX.Element>> = {
    Anestesiologia: <Anestesiologia ref={recordFormRef} />
  };

  return (
    <div className="new_record_form">
      <FormPicker
        formHeader={formHeader}
        handleHeaderInput={handleHeaderInput}
        formMode={formMode}
      />
      {formHeader?.rotation && formMode && RENDER_FORM[formHeader.rotation]}
    </div>
  );
};

export default NewRecordBody;
