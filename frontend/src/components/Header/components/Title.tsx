import React from "react";

import "../styles.scss";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();
  return (
    <div className="header_container__" onClick={() => navigate("/")}>
      <h5 className="header_container__title">LOGBOOK</h5>
    </div>
  );
};

export default Title;
