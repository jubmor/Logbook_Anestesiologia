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
      <div className="login_container">
        <div className="login_container__container login_container__container__banner">
          {/* <h1 className=" ">Welcome Back!</h1> */}
        </div>

        <div className="login_container__container login_container__container__login_form">
          <div className="login_container__container__form_container glassContainer">
            <Outlet />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Auth;
