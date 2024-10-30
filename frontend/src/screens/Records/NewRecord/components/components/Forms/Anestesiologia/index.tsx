import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { RecordFormHandlingRef } from "@/screens/Records/NewRecord";

import Geral from "./components/Geral";
import PreProcedure from "./components/PreProcedure";
import IntraProcedure from "./components/IntraProcedure";
import UCPA from "./components/UCPA";
import PostProcedure from "./components/PostProcedure";

import { GenerateFormRef } from "@/components/GenerateForm";

import "./styles.scss";

type AnestesiologiaProps = {};

const Anestesiologia = forwardRef<RecordFormHandlingRef, AnestesiologiaProps>(
  (props: AnestesiologiaProps, ref) => {
    {
      const [tabIndex, setTabIndex] = React.useState(0);
      const [form, setForm] = useState<DefaultAnesthesiologyFormType>(DEFAULT_FORM_VALUES);
      const [errorIndices, setErrorIndices] = useState<number[]>([]);

      const handleFormChange = (formKey: keyof DefaultAnesthesiologyFormType, values: any) => {
        setForm({ ...form, [formKey]: values });
      };

      const geralFormRef = useRef<GenerateFormRef>(null);
      const basicInfoFormRef = useRef<GenerateFormRef>(null);
      const riskEvaluationFormRef = useRef<GenerateFormRef>(null);

      const intraProcedureFormRef = useRef<GenerateFormRef>(null);
      const ucpaFormRef = useRef<GenerateFormRef>(null);
      const postProcedureFormRef = useRef<GenerateFormRef>(null);

      const formRefs = [
        geralFormRef,
        basicInfoFormRef,
        riskEvaluationFormRef,
        intraProcedureFormRef
        //  ucpaFormRef,
        //  postProcedureFormRef
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
          form: <IntraProcedure {...formProps} intraProcedureFormRef={intraProcedureFormRef} />
        },
        { label: "UCPA", form: <UCPA /> },
        { label: "Pós Operatório", form: <PostProcedure /> }
      ];

      const getAllForms = () => {
        return formRefs.reduce((acc, ref) => {
          if (ref.current) {
            const formValues = ref.current.getForm();
            return { ...acc, ...formValues };
          }
          return acc;
        }, {});
      };

      const validateAllForms = async () => {
        const errorIndices: number[] = [];

        await Promise.all(
          formRefs.map(async (ref, index) => {
            if (ref.current) {
              await ref.current.validateForm(); // Await each validation
              // Check for errors after validation is complete
              if (Object.keys(ref.current?.formErrors || {}).length > 0) {
                errorIndices.push(index);
              }
            }
          })
        );

        setErrorIndices(errorIndices);
        if (errorIndices.length > 0) {
          setTabIndex(errorIndices[0]);
        } else {
        }

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
        <div>
          <div className="record-tab-selector-container">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              variant={"scrollable"}
              scrollButtons="auto"
              className={`record-tab-selector-container__wrapper ${
                errorIndices.includes(tabIndex) && "record-tab-selector-container__wrapper__error"
              }`}
            >
              {RENDER_FORMS.map((tab, index) => (
                <Tab
                  key={`tab_${tab.label} `}
                  className={`${
                    errorIndices.includes(index) &&
                    "record-tab-selector-container__wrapper__form_error"
                  }`}
                  label={tab.label}
                  {...a11yProps(0)}
                />
              ))}
            </Tabs>
          </div>

          {RENDER_FORMS.map((tab, idx) => (
            <div
              key={`panel_${tab.label}`}
              style={{ display: tabIndex === idx ? "block" : "none" }}
            >
              {tab.form}
            </div>
          ))}
        </div>
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
  geral?: geralFormType;
  preProcedure: any;
  intraProcedure: any;
  ucpa: any;
  postProcedure: any;
};

export type geralFormType = {
  local?: string;
  remoteLocal?: string;
  specialty?: string;
  procedureDate?: string;
  specialistName?: string;
  proposedProcedure?: string;
  surgicalRegime?: string;
};

const DEFAULT_FORM_VALUES = {
  geral: undefined,
  preProcedure: undefined,
  intraProcedure: undefined,
  ucpa: undefined,
  postProcedure: undefined
};
