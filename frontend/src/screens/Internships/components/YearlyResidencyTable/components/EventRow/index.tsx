import { useEffect, useRef, useState } from "react";

import { useScreenWidth } from "@/hooks/useScreenWidth";

import { EventEntryType } from "../..";

import "../../styles.scss";
import MonthsSpacing from "./components/MonthsSpacing";
import RenderEvents from "./components/RenderEvents";
import EventTitle from "./components/EventTitle";

type Props = {
  event: EventEntryType;
  eventIndex: number;
};

const EventRow = ({ event, eventIndex }: Props) => {
  const { startDate, endDate } = event;

  const screenWidth = useScreenWidth();

  const subEvents = event.events || [];

  const cardsRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number>(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === cardsRef.current) {
          const height = entry.contentRect.height;
          setRowHeight(height);
        }
      }
    });

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, [subEvents]);

  return (
    <div
      key={eventIndex}
      className="table-container__table_wrapper__event_row"
      style={{ minHeight: rowHeight }} //
    >
      <EventTitle event={event} />

      <div className="table-container__table_wrapper__event_row__container">
        <RenderEvents cardsRef={cardsRef} mainEvent={event} />

        <MonthsSpacing />
      </div>
    </div>
  );
};

export default EventRow;

export const calculatePosition = (startDate: Date, endDate: Date, screenWidth: number) => {
  let monthWidth = 250;
  if (screenWidth < 768) {
    monthWidth = 120;
  } else if (screenWidth < 1024) {
    monthWidth = 180;
  } else {
    monthWidth = 250;
  }

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Calculate the fraction of the start month
  const startDay = startDate.getDate();
  const startMonthDays = daysInMonth(startDate);
  const startLeft = (startDay / startMonthDays) * monthWidth;

  // Calculate the fraction of the end month
  const endDay = endDate.getDate();
  const endMonthDays = daysInMonth(endDate);
  const endRight = (endDay / endMonthDays) * monthWidth;

  // Calculate the total number of months spanned
  const monthDifference =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // Total width is the sum of full months + the partial months at the start and end
  const width = monthDifference * monthWidth - startLeft + endRight;

  // Left position is based on the start month
  const left = startDate.getMonth() * monthWidth + startLeft;

  return { left, width };
};
