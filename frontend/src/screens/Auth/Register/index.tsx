import { useRef, useState } from "react";

import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

import { showToaster } from "@/store/toaster/module";
import { useAppDispatch } from "@/store/hooks";

import StyledButton from "@/components/StyledButton";
import GenerateForm, { GenerateFormRef, RecordFormDataType } from "@/components/GenerateForm";

import { END_POINT } from "@/config/endpoints";
import request from "@/config/interceptors";
import { AxiosError } from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerFormRef = useRef<GenerateFormRef>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    if (!registerFormRef.current) {
      return null;
    }

    const { formErrors, getForm, validateForm } = registerFormRef.current;
    await validateForm();

    const isFormValid = Object.keys(formErrors).length === 0;

    if (isFormValid) {
      const data = getForm();
      const keysToRemoveFromData = new Set(["confirmPassword"]);

      const formData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !keysToRemoveFromData.has(key))
      );

      try {
        const response = await request.post(END_POINT.REGISTER, formData);
        console.log(response);

        dispatch(
          showToaster({
            message: "Registo feito com sucesso!",
            severity: "success"
          })
        );

        navigate(PATHS.LOGIN);
      } catch (e: any) {
        dispatch(
          showToaster({
            message: e.response.data.detail
              ? e.response.data.detail
              : "Something went wrong, please contact support.",
            severity: "error"
          })
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      dispatch(
        showToaster({
          message: "Alguns campos estão inválidos. Verifique-os e tente novamente.",
          severity: "error"
        })
      );
    }
  };

  return (
    <div className="login_container__container__form_container__wrapper">
      <h4 className="login_container__container__form_container__wrapper__form_title">Registar</h4>
      <div
        className="login_container__container__form_container__form" /* onSubmit={handleRegister} */
      >
        <GenerateForm ref={registerFormRef} form={RENDER_REGISTER_FORM} onChange={() => {}} />

        <StyledButton onClick={handleRegister} type="button" text="Registar" loading={loading} />
      </div>

      <div className="login_container__create_account_cta">
        <div className="login_container__create_account_cta__divider">
          <p>ou</p>
        </div>
        <div className="login_container__create_account_cta__text">
          Já tem conta?
          <span
            onClick={() => navigate(PATHS.LOGIN)}
            className="login_container__create_account_cta__link"
          >
            Fazer login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

const passwordTooltip = (
  <div
    style={{
      padding: "10px"
    }}
  >
    <ul style={{ listStyleType: "initial", padding: 0 }}>
      <li>
        🔑 Pelo menos <strong>8 caracteres</strong>
      </li>
      <li>
        🔠 Pelo menos <strong>uma letra maiúscula</strong>
      </li>
      <li>
        🔢 Pelo menos <strong>um número</strong>
      </li>
      <li>
        💻 Pelo menos <strong>um caractere especial</strong> (como !, @, #, $, etc.)
      </li>
    </ul>
  </div>
);

const RENDER_REGISTER_FORM: RecordFormDataType[] = [
  {
    form: "first_name",
    label: "Nome",
    type: "text",
    rules: {
      required: "Este campo é obrigatório",
      validate: {
        noSpaces: (value) => !/\s/.test(value) || "O primeiro nome não pode conter espaços",
        capitalize: (value) =>
          /^[A-Z]/.test(value) || "O primeiro nome deve começar com uma letra maiúscula"
      }
    }
  },
  {
    form: "last_name",
    label: "Apelido",
    type: "text",
    rules: {
      required: "Este campo é obrigatório",
      validate: {
        noSpaces: (value) => !/\s/.test(value) || "O primeiro nome não pode conter espaços",
        capitalize: (value) =>
          /^[A-Z]/.test(value) || "O primeiro nome deve começar com uma letra maiúscula"
      }
    }
  },
  {
    form: "email",
    label: "Email",
    type: "email",
    rules: {
      required: "Este campo é obrigatório",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Por favor, insira um endereço de e-mail válido"
      }
    }
  },
  {
    form: "password",
    label: "Password",
    type: "password",
    tooltip: passwordTooltip,
    rules: {
      required: "Este campo é obrigatório",
      minLength: {
        value: 8,
        message: "A password deve ter pelo menos 8 caracteres"
      },
      validate: {
        uppercase: (value) =>
          /[A-Z]/.test(value) || "A password deve conter pelo menos uma letra maiúscula",
        number: (value) => /\d/.test(value) || "A password deve conter pelo menos um número",
        specialChar: (value) =>
          /[\W_]/.test(value) || "A password deve conter pelo menos um caractere especial"
      }
    }
  },
  {
    form: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    rules: {
      required: "Este campo é obrigatório",
      validate: (value, context) => value === context.password || "As passwords devem coincidir"
    }
  }
];
