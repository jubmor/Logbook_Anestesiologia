import React, { ReactElement } from "react";

import FormPicker from "./FormPicker";

import { RecordFormBasicInfoProps, Specialty } from "@/types/Records";

import Anestesiologia from "./Forms/Anestesiologia";

import { RecordFormHandlingRef } from "..";

type Props = {
  formHeader: Partial<RecordFormBasicInfoProps>;
  setFormHeader: React.Dispatch<React.SetStateAction<Partial<RecordFormBasicInfoProps>>>;
  formMode: "edit" | "create" | undefined;
  recordFormRef: React.RefObject<RecordFormHandlingRef>;
};

const NewRecordBody = ({ formHeader, setFormHeader, formMode, recordFormRef }: Props) => {
  const RENDER_FORM: Partial<Record<Specialty, JSX.Element>> = {
    Anestesiologia: <Anestesiologia ref={recordFormRef} />
  };

  return (
    <div>
      <FormPicker formHeader={formHeader} setFormHeader={setFormHeader} formMode={formMode} />
      {formHeader?.rotation && formMode && RENDER_FORM[formHeader.rotation]}
    </div>
  );
};

export default NewRecordBody;
