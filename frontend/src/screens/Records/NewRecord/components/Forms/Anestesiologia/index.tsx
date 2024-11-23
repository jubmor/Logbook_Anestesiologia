import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { RecordFormHandlingRef } from "@/screens/Records/NewRecord";

import Geral from "./components/Geral";
import PreProcedure from "./components/PreProcedure";
import IntraProcedure from "./components/IntraProcedure";
import UCPA from "./components/UCPA";
import PostProcedure from "./components/PostProcedure";
import Counter from "./components/PostProcedure/components/Counter";
import { GenerateFormArrayProps, GenerateFormRef } from "@/components/GenerateForm";

import "./styles.scss";

type AnestesiologiaProps = {};

const Anestesiologia = forwardRef<RecordFormHandlingRef, AnestesiologiaProps>(
  (props: AnestesiologiaProps, ref) => {
    {
      const [tabIndex, setTabIndex] = React.useState(0);
      const [form, setForm] = useState<DefaultAnesthesiologyFormType>(DEFAULT_FORM_VALUES);
      const [errorIndices, setErrorIndices] = useState<number[]>([]);

      const [counter, setCounter] = useState(0);

      const handleCounter = (action: "increment" | "decrement") => {
        setCounter((prevCounter) => {
          if (action === "increment" && prevCounter < 10) {
            return prevCounter + 1;
          }
          if (action === "decrement" && prevCounter > 0) {
            return prevCounter - 1;
          }
          return prevCounter;
        });
      };

      const handleFormChange = (formKey: keyof DefaultAnesthesiologyFormType, values: any) => {
        setForm({ ...form, [formKey]: values });
      };

      const geralFormRef = useRef<GenerateFormRef>(null);
      const basicInfoFormRef = useRef<GenerateFormRef>(null);
      const riskEvaluationFormRef = useRef<GenerateFormRef>(null);

      const IPFormRef = useRef<GenerateFormRef>(null);
      const VAFormRef = useRef<GenerateFormRef>(null);
      const TechniquesAndEventsFormRef = useRef<GenerateFormRef>(null);
      const ComplicationsFormRef = useRef<GenerateFormRef>(null);

      const ucpaFormRef = useRef<GenerateFormRef>(null);
      const postProcedureFormRef = useRef<GenerateFormRef>(null);
      const postProcedureComplicationsForms: GenerateFormArrayProps = {
        key: "complications",
        ref: useRef<(GenerateFormRef | null)[]>([])
      };

      const formRefs = [
        geralFormRef,
        basicInfoFormRef,
        riskEvaluationFormRef,
        IPFormRef,
        VAFormRef,
        TechniquesAndEventsFormRef,
        ComplicationsFormRef,
        ucpaFormRef,
        postProcedureFormRef,
        postProcedureComplicationsForms
      ];

      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
      };

      const formProps = useMemo(
        () => ({ form: form, geralFormRef: geralFormRef, handleFormChange: handleFormChange }),
        [form]
      );

      const RENDER_FORMS = [
        {
          label: "Geral",
          form: <Geral {...formProps} geralFormRef={geralFormRef} />
        },
        {
          label: "Av. Pré Procedimento",
          form: (
            <PreProcedure
              {...formProps}
              basicInfoFormRef={basicInfoFormRef}
              riskEvaluationFormRef={riskEvaluationFormRef}
            />
          )
        },
        {
          label: "Intra Procedimento",
          form: (
            <IntraProcedure
              IPFormRef={IPFormRef}
              VAFormRef={VAFormRef}
              TechniquesAndEventsFormRef={TechniquesAndEventsFormRef}
              ComplicationsFormRef={ComplicationsFormRef}
              {...formProps}
            />
          )
        },
        { label: "UCPA", form: <UCPA {...formProps} ucpaFormRef={ucpaFormRef} /> },
        {
          label: "Pós Operatório",
          form: (
            <PostProcedure
              {...formProps}
              postProcedureFormRef={postProcedureFormRef}
              postProcedureComplicationsForms={postProcedureComplicationsForms}
              counter={counter}
            />
          )
        }
      ];

      const getAllForms = () => {
        return formRefs.reduce((acc, ref) => {
          if ("key" in ref && ref.ref?.current) {
            const complicationsValues = ref.ref.current.reduce((compAcc: any[], formRef) => {
              if (formRef) {
                const formValues = formRef.getForm();
                compAcc.push(formValues);
              }
              return compAcc;
            }, []);

            acc = { ...acc, [ref.key]: complicationsValues };
          } else if (!("key" in ref) && ref && ref.current) {
            const formValues = ref.current.getForm();
            acc = { ...acc, ...formValues };
          }
          return acc;
        }, {});
      };

      const validateAllForms = async () => {
        const errorIndices: number[] = [];

        await Promise.all(
          formRefs.map(async (ref, index) => {
            if ("key" in ref && ref.ref?.current) {
              const hasErrorInComplications = await Promise.all(
                ref.ref.current.map(async (formRef) => {
                  if (formRef) {
                    await formRef.validateForm();
                    const hasError = Object.keys(formRef?.formErrors || {}).length > 0;
                    return hasError;
                  }
                  return false;
                })
              );

              if (hasErrorInComplications.some((hasError) => hasError)) {
                if (!errorIndices.includes(index)) {
                  errorIndices.push(index);
                }
              }
            } else if (!("key" in ref) && ref && ref.current) {
              await ref.current.validateForm();
              const hasError = Object.keys(ref.current?.formErrors || {}).length > 0;

              if (hasError) {
                errorIndices.push(index);
              }
            }
          })
        );

        const errorTabIndices = errorIndices
          .map((formIndex) => {
            for (const [tabIndex, formIndices] of Object.entries(tabIndicesToFormErrorIndice)) {
              if (formIndices.includes(formIndex)) {
                return Number(tabIndex);
              }
            }
            return null;
          })
          .filter((tabIndex) => tabIndex !== null)
          .sort((a, b) => a - b);

        if (errorTabIndices.length > 0) {
          setTabIndex(errorTabIndices[0]);
        }

        setErrorIndices(errorIndices);

        return errorIndices;
      };

      const submit = async () => {
        const errorIndices = await validateAllForms();
        const formValues = getAllForms();

        const hasErrors = errorIndices.length > 0;

        return { formValues, hasErrors };
      };

      useImperativeHandle(ref, () => ({
        getData: submit
      }));

      return (
        <>
          <div className="record-tab-selector-container">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              variant={"scrollable"}
              scrollButtons="auto"
              className={`record-tab-selector-container__wrapper ${
                tabIndicesToFormErrorIndice[tabIndex].some((index) =>
                  errorIndices.includes(index)
                ) && "record-tab-selector-container__wrapper__error"
              }`}
            >
              {RENDER_FORMS.map((tab, index) => {
                const showError = tabIndicesToFormErrorIndice[index].some((index) =>
                  errorIndices.includes(index)
                );
                return (
                  <Tab
                    key={`tab_${tab.label} `}
                    className={`${
                      showError && "record-tab-selector-container__wrapper__form_error"
                    }`}
                    label={tab.label}
                    {...a11yProps(0)}
                  />
                );
              })}
            </Tabs>
          </div>

          {tabIndex === 4 && (
            <div className="record-tab-selector-container__counter_container">
              <h4 className="record-tab-selector-container__post_op_container__title">
                Número de complicações:
              </h4>
              <Counter handleCounter={handleCounter} counter={counter} />
            </div>
          )}

          {RENDER_FORMS.map((tab, idx) => (
            <div
              key={`panel_${tab.label}`}
              style={{ display: tabIndex === idx ? "block" : "none" }}
            >
              {tab.form}
            </div>
          ))}
        </>
      );
    }
  }
);

export default Anestesiologia;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export type DefaultAnesthesiologyFormType = {
  geral?: GeralFormFormType;
  pre_procedure?: PreProcedureFormFormType;
  intra_procedure?: IntraProcedureFormType;
  ucpa?: any;
  post_procedure?: PostPrecudereFormType;
};

export type GeralFormFormType = {
  local?: string;
  remote_local?: string;
  specialty?: string;
  specialist_name?: string;
  proposed_procedure?: string;
};

export type PreProcedureFormFormType = {
  // BasicInfo
  age: string;
  gender: string;
  weight: string;
  height: string;
  medical_history: string[];
  medical_history_notes: string;
  usual_medication: string[];
  usual_medication_notes: string;
  alergies: string[];
  surgical_history: string;
  mcdt_description: string;
  // RisckEvaluation
  asa_estadio: string;
  mallampati: string;
  inter_incisiv_distance: string;
  upper_lip_bite_test: string;
  atlanto_occipital_extension: string;
  stop_bang_score: string;
  other_stigmas: string[];
  airway_notes: string;
  risc_previsibility: string[];
  description_previous_approaches: string;
  surgical_risk: string[];
  apfel_score: string;
  captini_score: string;
  cha2ds2_vasc: string;
  ariscat_score: string;
  lee_revised_cardiac_risk: string;
  p_possum_morbility: string;
  mortality: string;
  nottingham_hip_score_morality: string;
  uci_vacancy_request: string;
  blood_components: string;
  pre_precedure_optimization_notes: string;
  procedure_planingNotes: string;
};

export type IntraProcedureFormType = {
  // IPInfo
  monitorization: string[];
  catheterizations: string[];
  procedure_icd_10: string[];
  procedure_notes: string[];
  // Va
  VAapproach: string[];
  VAdevice: string[];
  blade: string[];
  adjuvants: string[];
  isr: string[];
  cormack_lehane: string[];
  difficult_airway: string[];
  difficult_airway_description: string;
  // TechniquesAndEvents
  anesthetic_technique: string[];
  bne: string[];
  bnp: string[];
  anesthetic_technique_conversion: string[];
  anesthetic_technique_2: string[];
  other_procedures_equipment: string[];
  surgical_events: string[];
  hemorrahagic_losses: string;
  transfusion: string[];
  hydraulic_balance: string;
  anesthesia_start_time: string;
  anesthesia_end_time: string;
  anesthesia_start_surgery: string;
  anesthesia_end_surgery: string;
  anesthesia_duration: string;
  surgery_duration: string;
  // Complications
  imediate_destination: string;
  intra_procedure_complications: string;
  intra_procedure_complications_notes: string;
};

export type PostPrecudereFormType = {
  complications: PostPrecudereComplicationsFormType[];
  surgical_re_intervention: string;
  intermediate_duration: string;
  intensive_duration: string;
  hospital_discharge_date: string;
  hospital_discharge_site: string;
};

export type PostPrecudereComplicationsFormType = {
  complication: string[];
  complication_date: string;
  complication_site: string;
  complication_notes: string;
};

const DEFAULT_FORM_VALUES = {
  geral: undefined,
  pre_procedure: undefined,
  intra_procedure: undefined,
  ucpa: undefined,
  post_procedure: undefined
};

const tabIndicesToFormErrorIndice: { [key: number]: number[] } = {
  0: [0],
  1: [1, 2],
  2: [3, 4, 5, 6],
  3: [7],
  4: [8, 9]
};
