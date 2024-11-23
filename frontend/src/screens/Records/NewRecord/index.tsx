import { useMemo, useRef, useState } from "react";

import Screen from "@/components/Screen";
import { ActionButtonType, ScreenHeaderProps } from "@/components/Screen/components/ScreenHeader";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NewRecordBody from "./components/NewRecordBody";

import { useAppDispatch } from "@/store/hooks";
import { RecordFormBasicInfoProps } from "@/types/Records";
import { useNavigate } from "react-router-dom";
import { showToaster } from "@/store/toaster/module";
import { GenerateFormRef } from "@/components/GenerateForm";

import AddIcon from "@mui/icons-material/Add";
import { BASE_API } from "@/config/endpoints";

export type RecordFormHandlingRef = {
  getData: () => Promise<{
    formValues: Record<string, any>;
    hasErrors: boolean;
  }>;
};

const NewRecord = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formMode, setFormMode] = useState<"edit" | "create" | undefined>(undefined);
  const [formHeader, setFormHeader] =
    useState<Partial<RecordFormBasicInfoProps>>(DEFAULT_FORM_HEADER);

  const isFormInitialized = formMode !== undefined;

  const isFormBasicInfoCompleted = validateFormBasicInfo(formHeader);

  const recordFormRef = useRef<RecordFormHandlingRef>(null);

  const submitForm = async () => {
    const data = await recordFormRef.current?.getData();
    console.log({ formValus: data?.formValues });
    if (data?.hasErrors) {
      dispatch(
        showToaster({
          message: "Não é possível guardar o formulário enquanto houver erros por corrigir. ",
          severity: "error",
          position: { vertical: "bottom", horizontal: "right" }
        })
      );
    }
  };

  const headerProps: ScreenHeaderProps = useMemo(() => {
    return {
      title: "Novo Registo",
      actions: [
        ...(formMode !== undefined
          ? [
              {
                startIcon: <ClearOutlinedIcon />,
                text: "Cancelar",
                onClick: () => {
                  setFormHeader(DEFAULT_FORM_HEADER);
                  setFormMode(undefined);
                  //navigate(-1);
                },
                variant: "outlined"
              } as ActionButtonType
            ]
          : []),
        {
          startIcon: isFormInitialized ? <SaveOutlinedIcon /> : <AddIcon />,
          text: isFormInitialized ? "Guardar " : "Criar Novo",
          onClick: () => (isFormInitialized ? submitForm() : setFormMode("create")),
          variant: "contained",
          disabled: !isFormInitialized && !isFormBasicInfoCompleted
        }
      ]
    };
  }, [isFormInitialized, isFormBasicInfoCompleted, formMode]);

  // useNavPrompt("You have unsaved changes, are you sure you want to leave?", false);

  return (
    <Screen headerProps={headerProps}>
      <NewRecordBody
        formHeader={formHeader}
        setFormHeader={setFormHeader}
        formMode={formMode}
        recordFormRef={recordFormRef}
      />
    </Screen>
  );
};

export default NewRecord;

export const validateFormBasicInfo = (recordBasicInfo: Partial<RecordFormBasicInfoProps>) =>
  Object.values(recordBasicInfo).every(
    (value) => value !== undefined && value !== "" && value !== null
  );

const DEFAULT_FORM_HEADER = {
  rotation: null,
  episode: null,
  process: null
};

export type RecordFormType = any;
