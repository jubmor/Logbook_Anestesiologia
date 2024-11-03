import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledButton from "@/components/StyledButton";
import StyledInput from "@/components/Inputs/StyledInput";

import { PATHS } from "@/routes/paths";
import { UserProps } from "@/types/User";

import { setUser } from "@/store/features/auth/module";
import { showToaster } from "@/store/features/toaster/module";
import { useAppDispatch } from "@/store/hooks";

import request from "@/config/interceptors";
import { BASE_API, END_POINT } from "@/config/endpoints";

import "./styles.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<LoginFormProps>(DEFAULT_LOGIN_FORM);
  const [formErrors, setFormErrors] = useState<LoginFormErrorsProps>(DEFAULT_LOGIN_FORM_ERRORS);

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
      // handleLogin();
      handleFakeLogin();
    } else {
      setFormErrors(formErrors);
    }
  };

  const handleLogin = async () => {
    try {
      console.log(END_POINT.LOGIN);
      const response = await request.post(END_POINT.LOGIN, form);

      console.log(response);

      // if (false) {
      //   dispatch(setUser(user[form.username]));
      //   navigate("/");
      // }
    } catch (e: any) {
      dispatch(
        showToaster({
          message: "Invalid username or password",
          severity: "error"
        })
      );
      throw new Error(e);
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
      setFormErrors({ username: "Use `intern` or `tutor` as username" });
    }
  };

  return (
    <div className="wrapper">
      <h4 className="form-title">Login</h4>
      <form className="form" onSubmit={handleSubmit}>
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
        <div>
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
          <div className="forgot_password">
            <p onClick={() => navigate(PATHS.RECOVER_PASSWORD)}>Recuperar password</p>
          </div>
        </div>
        <StyledButton
          type="submit"
          disabled={form.username === "" || form.password === ""}
          text="Sign In"
        />
      </form>

      <div className="login-container__create_account_cta">
        <div className="divider">
          <p>ou</p>
        </div>
        <div className="login-container__create_account_cta__text">
          Não tem conta?
          <span
            onClick={() => navigate(PATHS.REGISTER)}
            className="login-container__create_account_cta__link"
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

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const internUser: UserProps = { ...defaultDataUser, usertype: "intern" };
const tutorUser: UserProps = { ...defaultDataUser, usertype: "tutor" };
