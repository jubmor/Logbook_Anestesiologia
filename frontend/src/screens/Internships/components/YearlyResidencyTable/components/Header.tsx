import React from "react";

import { getHeader, HEADER } from "../utils";
import { useScreenWidth } from "@/hooks/useScreenWidth";

import "../styles.scss";

type Props = {
  tableHeight: number | undefined;
};

const Header = ({ tableHeight }: Props) => {
  const screenWidth = useScreenWidth();

  let monthWidth = 250;
  if (screenWidth < 768) {
    monthWidth = 120;
  } else if (screenWidth < 1024) {
    monthWidth = 180;
  } else {
    monthWidth = 250;
  }

  const passedMonthsWidth = getColumnMultiplier() * monthWidth;
  const currentMonthProgress = (monthWidth * getCurrentMonthProgress()) / 100;

  const pointerPosition = passedMonthsWidth + currentMonthProgress;

  const selectedYear = new Date();
  const header = getHeader(selectedYear);

  return (
    <div className="table-container__table_wrapper__header_row">
      {header.map((month, idx) => (
        <div
          key={`${month.month}_${idx}`}
          className="table-container__table_wrapper__header_row__month_container"
        >
          <p className="table-container__table_wrapper__header_row__month_container__month">
            {month.month}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Header;

const getCurrentMonthProgress = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = today.getDate();
  const percentagePassed = (currentDay / totalDaysInMonth) * 100;
  return percentagePassed;
};

const getColumnMultiplier = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const monthMultipliers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return monthMultipliers[currentMonth] + 1;
};
