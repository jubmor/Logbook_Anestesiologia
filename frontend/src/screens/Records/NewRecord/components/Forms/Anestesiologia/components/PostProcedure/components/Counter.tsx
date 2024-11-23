import React from "react";
import CounterBtn from "./CounterBtn";

type Props = {
  handleCounter: (action: "increment" | "decrement") => void;
  counter: number;
};
const Counter = ({ handleCounter, counter }: Props) => {
  return (
    <div className="record-tab-selector-container__post_op_container__counter_container">
      <CounterBtn currentValue={counter} type="decrement" handleCounter={handleCounter} />
      <div className="record-tab-selector-container__post_op_container__counter_container__counter">
        <h5>{counter}</h5>
      </div>
      <CounterBtn currentValue={counter} type="increment" handleCounter={handleCounter} />
    </div>
  );
};

export default Counter;
