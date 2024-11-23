import React from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  type: "increment" | "decrement";
  currentValue: number;
  handleCounter: (action: "increment" | "decrement") => void;
};

const CounterBtn = ({ type, currentValue, handleCounter }: Props) => {
  const limit = type === "increment" ? 10 : 0;
  return (
    <div
      onClick={() => handleCounter(type)}
      className={`record-tab-selector-container__post_op_container__counter_container__btn ${
        limit === currentValue && "disabled"
      }`}
    >
      {BTN_ICONS[type]}
    </div>
  );
};

export default CounterBtn;

const BTN_ICONS = {
  increment: <AddIcon />,
  decrement: <RemoveIcon />
};
