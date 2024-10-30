import React, { memo } from "react";

import "../../../styles.scss";

const MonthsSpacing = () => {
  return (
    <>
      {[...Array(12)].map((_, itemIndex) => (
        <div
          key={itemIndex}
          className="
          table-container__table_wrapper__event_row__month_container_body 
          table-container__table_wrapper__event_row__months_block
          "
        >
          {[...Array(4)].map((_, spanIndex) => (
            <div
              key={spanIndex}
              className="
              table-container__table_wrapper__event_row__item__span
              table-container__table_wrapper__event_row__months_block__space
              "
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default memo(MonthsSpacing);
