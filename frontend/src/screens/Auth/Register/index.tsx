import React, { useState } from "react";

import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

import StyledButton from "@/components/StyledButton";
import { DEFAULT_REGISTER_FORM, FormKeys, RegisterFormProps } from "./utils";
import RenderInput from "./RenderInput";

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState<RegisterFormProps>(DEFAULT_REGISTER_FORM);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const formKey = id as FormKeys;

    setRegisterForm((prevValues) => ({
      ...prevValues,
      [id]: {
        ...registerForm[formKey],
        value
      }
    }));
  };

  const handleRegister = () => {};

  return (
    <div className="wrapper">
      <h4 className="form-title">Registar</h4>
      <form className="form" onSubmit={handleRegister}>
        {Object.keys(registerForm).map((input, idx) => (
          <RenderInput
            key={`${idx}_${input}`}
            formKey={input as FormKeys}
            formInput={registerForm[input as FormKeys]}
          />
        ))}

        <StyledButton
          type="submit"
          //  disabled={form.username === "" || form.password === ""}
          text="Registar"
          className={"register-btn"}
        />
      </form>

      <div className="login-container__create_account_cta">
        <div className="divider">
          <p>ou</p>
        </div>
        <div className="login-container__create_account_cta__text">
          Já tem conta?
          <span
            onClick={() => navigate(PATHS.LOGIN)}
            className="login-container__create_account_cta__link"
          >
            Fazer login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
