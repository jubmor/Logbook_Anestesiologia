import React from "react";
import { DefaultAnesthesiologyFormType } from "../..";
import { GenerateFormRef } from "@/components/GenerateForm";
import IPInfo from "./IPInfo";
import VA from "./VA";
import TechniquesAndEvents from "./TechniquesAndEvents";
import Complications from "./Complications";

type Props = {
  form: DefaultAnesthesiologyFormType;

  IPFormRef: React.RefObject<GenerateFormRef>;
  VAFormRef: React.RefObject<GenerateFormRef>;
  TechniquesAndEventsFormRef: React.RefObject<GenerateFormRef>;
  ComplicationsFormRef: React.RefObject<GenerateFormRef>;

  handleFormChange: (formKey: keyof DefaultAnesthesiologyFormType, values: any) => void;
};

const IntraProcedure = ({
  form,
  IPFormRef,
  VAFormRef,
  TechniquesAndEventsFormRef,
  ComplicationsFormRef,
  handleFormChange
}: Props) => {
  const newProps = { form, handleFormChange };
  return (
    <>
      <IPInfo {...newProps} IPFormRef={IPFormRef} />
      <VA {...newProps} VAFormRef={VAFormRef} />
      <TechniquesAndEvents {...newProps} TechniquesAndEventsFormRef={TechniquesAndEventsFormRef} />
      <Complications {...newProps} ComplicationsFormRef={ComplicationsFormRef} />
    </>
  );
};

export default IntraProcedure;
