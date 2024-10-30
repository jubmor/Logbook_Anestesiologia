import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Container from "./Container/Container";
import { PATHS } from "@/routes/paths";

import "./styles.scss";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === PATHS.AUTH) {
      navigate(PATHS.LOGIN);
    }
  }, [location, navigate]);

  return (
    <Container>
      <div className="login-container">
        <div className="login-container__container banner">
          <h1 className=" ">Welcome Back!</h1>
        </div>

        <div className="login-container__container login-form">
          <div className="form-container glassContainer">
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Auth;
