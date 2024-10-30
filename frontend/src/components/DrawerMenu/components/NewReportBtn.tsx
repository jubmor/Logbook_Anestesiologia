import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { toggleDrawer } from "@/store/features/drawerMenu/module";

const NewReportBtn = () => {
  const isMenuOpen = useAppSelector((state) => state.drawerMenu.isOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="new_report_container">
      <div
        onClick={() => {
          isMenuOpen && dispatch(toggleDrawer());
          navigate(PATHS.NEW_RECORD);
        }}
        className={`new_report_container__btn_container ${isMenuOpen ? "open" : "closed"}`}
      >
        <AddIcon />
        <span
          className={`new_report_container__btn_container__text ${!isMenuOpen ? "no_text" : ""}`}
        >
          Novo Registo
        </span>
      </div>
    </div>
  );
};

export default NewReportBtn;
