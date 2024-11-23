import { PATHS } from "@/routes/paths";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SmileIcon from "./smileIcon.svg";

import "./styles.scss";
import { useAppSelector } from "@/store/hooks";
import StyledButton from "@/components/StyledButton";
const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, []);

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="not_found_page">
      <div className="not_found_page__center_container">
        <div className="not_found_page__center_container__title_container">
          <span className="not_found_page__center_container__title_container__text">4</span>
          <img
            className="not_found_page__center_container__title_container__img"
            src={SmileIcon}
            alt="Your SVG"
          />
          <span className="not_found_page__center_container__title_container__text tilt">4</span>
        </div>

        <div className="not_found_page__center_container__information_container">
          <p>Ooops!Parece que não encontrámos a página que procurava!</p>
        </div>

        <div className="not_found_page__center_container__actions_container">
          <StyledButton text="Voltar" onClick={() => navigate(user ? PATHS.ROOT : PATHS.LOGIN)} />
        </div>
      </div>
    </div>
  );
};

export default Error404;
