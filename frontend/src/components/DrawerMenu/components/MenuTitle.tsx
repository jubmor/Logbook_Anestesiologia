import React from "react";

import "../styles.scss";
import { useNavigate } from "react-router-dom";

const MenuTitle = () => {
  const navigate = useNavigate();
  return (
    <div className="drawer_menu_container__header_container" onClick={() => navigate("/")}>
      <h5 className="drawer_menu_container__header_container__title">LOGBOOK</h5>
    </div>
  );
};

export default MenuTitle;
