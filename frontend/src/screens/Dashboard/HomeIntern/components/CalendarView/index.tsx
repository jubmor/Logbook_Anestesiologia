import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Calendar, Event, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import random from "lodash/random";

import { messages } from "./utils";

import "./styles.scss";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale("pt");

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = dayjsLocalizer(dayjs);

const CalendarView = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const newEvents = generateMockEvents(10);
    setEvents(newEvents);
  }, []);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end)
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { start, end } = data;

    const newEvents = events.map((event) => {
      if (event.resource.id === data.event.resource.id) {
        return { ...event, end, start };
      } else {
        return event;
      }
    });

    setEvents(newEvents as Event[]);
  };

  return (
    <div className=" ">
      <DnDCalendar
        defaultView="week"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{}}
        messages={messages}
        formats={{
          dateFormat: "DD", // Day format
          dayFormat: (date) => dayjs(date).format("ddd"), // Short day names (Seg, Ter, Qua, etc.)
          weekdayFormat: (date) => dayjs(date).format("dddd"), // Full day names (Segunda-feira, Terça-feira, etc.)
          timeGutterFormat: "HH:mm" // 24-hour format (e.g., 13:00 instead of 1 PM)
        }}
      />
    </div>
  );
};

export default CalendarView;

const generateMockEvents = (numberOfEvents: number) => {
  const mockEvents = [];
  const startOfWeek = dayjs().startOf("isoWeek" as dayjs.OpUnitType); // Start of current week (Monday)

  for (let i = 0; i < numberOfEvents; i++) {
    // Randomly pick a day within the current week (Monday to Sunday)
    const dayOffset = Math.floor(Math.random() * 7); // 0 to 6 days offset from the start of the week
    const baseDate = startOfWeek.add(dayOffset, "day");

    // Generate a random hour and minute for the event start time
    const startHour = random(9, 17); // Random hour between 9 AM and 5 PM
    const startMinute = random(0, 59); // Random minute
    const start = baseDate.hour(startHour).minute(startMinute).toDate(); // Event start time

    const end = dayjs(start).add(1, "hour").toDate(); // Event ends 1 hour later

    const event = {
      title: `Event ${i + 1}`,
      start,
      end,
      resource: {
        id: i
      }
    };

    mockEvents.push(event);
  }

  return mockEvents;

  return mockEvents;
};
