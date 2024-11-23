import React, { useEffect, useRef, useState } from "react";
import GenerateForm, {
  GenerateFormArrayProps,
  RecordFormDataType
} from "@/components/GenerateForm";

type Props = {
  counter: number;
  postProcedureComplicationsForms: GenerateFormArrayProps;
};
const ComplicationsForm = ({ counter, postProcedureComplicationsForms }: Props) => {
  const [formValues, setFormValues] = useState(Array.from({ length: counter }, () => ({})));

  const handleFormChange = (index: number, updatedValues: any) => {
    setFormValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = updatedValues;
      return newValues;
    });
  };

  useEffect(() => {
    if (postProcedureComplicationsForms.ref.current === null) {
      postProcedureComplicationsForms.ref.current = [];
    }

    // Ensure the ref array matches the counter lengths
    while (postProcedureComplicationsForms.ref.current.length < counter) {
      postProcedureComplicationsForms.ref.current.push(null);
    }
  }, [counter, postProcedureComplicationsForms]);

  return (
    <div>
      {Array.from({ length: counter }).map((_, index) => {
        return (
          <div
            key={`complication_${index}`}
            className="record-tab-selector-container__form_container"
          >
            <h6>{`Complicação ${index + 1}`}</h6>
            <GenerateForm
              ref={(el) => {
                if (postProcedureComplicationsForms.ref.current) {
                  postProcedureComplicationsForms.ref.current[index] = el;
                }
              }}
              defaultValues={formValues[index]}
              form={COMPLICATIONS_GERAL_FORM}
              onChange={(updatedValues) => handleFormChange(index, updatedValues)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ComplicationsForm;

const COMPLICATIONS_GERAL_FORM: RecordFormDataType[] = [
  {
    form: "complication",
    label: "Complicação",
    type: "select_and_search",
    multiple: true,
    options: [{ label: "Hipertensão", value: "Hipertensão" }],
    rules: {
      required: "Este campo é obrigatório"
    }
  },
  {
    form: "complication_date",
    label: "Data da Complicação",
    type: "date",
    rules: {
      required: "Este campo é obrigatório"
    }
  },
  {
    form: "complication_site",
    label: "Local da Complicação",
    type: "select_and_search",
    multiple: false,
    options: [
      { label: "Enfermaria", value: "Enfermaria" },
      { label: "Intermédios", value: "Intermédios" },
      { label: "Intensivos", value: "Intensivos" },
      { label: "Transporte Intra-hospitalar", value: "Transporte Intra-hospitalar" },
      { label: "Transporte Inter-hospitalar", value: "Transporte Inter-hospitalar" }
    ],
    rules: {
      required: "Este campo é obrigatório"
    }
  },
  {
    form: "complication_notes",
    label: "Notas da Complicação",
    type: "text",
    multiline: true,
    rules: {
      required: "Este campo é obrigatório"
    }
  }
];
