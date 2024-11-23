import React, { forwardRef, useEffect, useRef } from "react";
import BasicInfo from "./BasicInfo";
import RiskEvaluation from "./RiskEvaluation";
import { GenerateFormRef } from "@/components/GenerateForm";
import { DefaultAnesthesiologyFormType } from "../..";

type Props = {
  form: DefaultAnesthesiologyFormType;
  basicInfoFormRef: React.RefObject<GenerateFormRef>;
  riskEvaluationFormRef: React.RefObject<GenerateFormRef>;
  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
};

const PreProcedure = ({
  form,
  handleFormChange,
  basicInfoFormRef,
  riskEvaluationFormRef
}: Props) => {
  const newProps = { form, handleFormChange };

  return (
    <>
      <BasicInfo {...newProps} basicInfoFormRef={basicInfoFormRef} />
      <RiskEvaluation {...newProps} riskEvaluationFormRef={riskEvaluationFormRef} />
    </>
  );
};
export default PreProcedure;
