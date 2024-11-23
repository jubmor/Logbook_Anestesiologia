import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledButton from "@/components/StyledButton";
import StyledInput from "@/components/Inputs/StyledInput";

import { PATHS } from "@/routes/paths";
import { UserProps } from "@/types/User";

import { setAccessToken, setUser } from "@/store/auth/module";
import { showToaster } from "@/store/toaster/module";
import { useAppDispatch } from "@/store/hooks";

import request from "@/config/interceptors";
import { BASE_API, END_POINT } from "@/config/endpoints";

import "./styles.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<LoginFormProps>(DEFAULT_LOGIN_FORM);
  const [formErrors, setFormErrors] = useState<LoginFormErrorsProps>(DEFAULT_LOGIN_FORM_ERRORS);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length === 0) {
      setFormErrors(DEFAULT_LOGIN_FORM_ERRORS);
      form.username === "intern" || form.username === "tutor" ? handleFakeLogin() : handleLogin();
    } else {
      setFormErrors(formErrors);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await request.post(END_POINT.LOGIN, form);
      dispatch(setAccessToken(response.data.access_token));
    } catch (e: any) {
      dispatch(
        showToaster({
          message: e.response.data.detail
            ? e.response.data.detail.length > 0
              ? e.response.data.detail.length[0].msg
              : e.response.data.detail
            : "Por favor contactar com o supporte.",
          severity: "error"
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFakeLogin = () => {
    const users = ["intern", "tutor"];
    if (users.includes(form.username)) {
      if (form.username === "intern") {
        dispatch(setUser(internUser));
      } else if (form.username === "tutor") {
        dispatch(setUser(tutorUser));
      }
      navigate("/");
    } else {
      setFormErrors({ username: "Use `intern` or `tutor` as username and any password" });
    }
  };

  return (
    <div className="login_container__container__form_container__wrapper">
      <h4 className="login_container__container__form_container__wrapper__form_title">Login</h4>
      <form className="login_container__container__form_container__form " onSubmit={handleSubmit}>
        <div className="login_container__login_inputs">
          <StyledInput
            id="username"
            value={form.username}
            onChange={handleInputChange}
            label="Utilizador / Email"
            type="text"
            autoComplete="username"
            error={!!formErrors.username}
            errorText={formErrors.username}
          />
          <StyledInput
            id="password"
            value={form.password}
            onChange={handleInputChange}
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!formErrors.password}
            errorText={formErrors.password}
          />
        </div>
        <div className="login_container__forgot_password">
          <p onClick={() => navigate(PATHS.RECOVER_PASSWORD)}>Recuperar password</p>
        </div>
        <StyledButton
          type="submit"
          disabled={form.username === "" || form.password === ""}
          text="Sign In"
          loading={loading}
        />
      </form>

      <div className="login_container__create_account_cta">
        <div className="login_container__create_account_cta__divider">
          <p>ou</p>
        </div>
        <div className="login_container__create_account_cta__text">
          Não tem conta?
          <span
            onClick={() => navigate(PATHS.REGISTER)}
            className="login_container__create_account_cta__link"
          >
            Registar agora
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

const DEFAULT_LOGIN_FORM: LoginFormProps = {
  username: "",
  password: ""
};

const DEFAULT_LOGIN_FORM_ERRORS: LoginFormErrorsProps = {};

type LoginFormProps = {
  username: string;
  password: string;
};

type LoginFormErrorsProps = {
  username?: string;
  password?: string;
};

const defaultDataUser = {
  email: "default@email.com",
  first_name: "John",
  last_name: "Test",
  id: 0
};

const validateForm = (form: LoginFormProps): LoginFormErrorsProps => {
  const errors: LoginFormErrorsProps = {};

  if (!form.username.trim()) {
    errors.username = "Username is required";
  }

  // else if (!validateEmail(form.username)) {
  //   // Optional: if the username is expected to be an email, validate it as an email
  //   errors.username = "Please enter a valid email address";
  // }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

const internUser: UserProps = { ...defaultDataUser, user_type: "intern" };
const tutorUser: UserProps = { ...defaultDataUser, user_type: "tutor" };
