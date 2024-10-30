import React, { useRef } from "react";

import "./styles.scss";
import { HEADER } from "./utils";
import Header from "./components/Header";
import TableBody from "./components/TableBody";
import dayjs from "dayjs";
import EventRow from "./components/EventRow";

dayjs.locale("pt");

const YearlyResidencyTable = () => {
  const cellWidth = 200;

  return (
    <>
      <TableBody>
        {EVENTS.map((event, eventIndex) => (
          <EventRow key={eventIndex} event={event} eventIndex={eventIndex} />
        ))}
      </TableBody>
    </>
  );
};

export default YearlyResidencyTable;

type EventType = {
  title: string;
  startDate: Date;
  endDate: Date;
};

export type EventEntryType = {
  title: string;
  startDate: Date;
  endDate: Date;
  events: EventType[];
};

const EVENTS: EventEntryType[] = [
  {
    title: "Cardiologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 0, 15), // January 15, 2024
    endDate: new Date(2024, 1, 10), // February 10, 2024
    events: []
  },
  {
    title: "Neurologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 2, 5), // March 5, 2024
    endDate: new Date(2024, 4, 20), // May 20, 2024
    events: [
      {
        title: "Formação em Neurologia",
        startDate: new Date(2024, 2, 5), // March 5, 2024 (within parent dates)
        endDate: new Date(2024, 2, 25) // March 25, 2024 (within parent dates)
      },
      {
        title: "Seminário de Neurologia",
        startDate: new Date(2024, 4, 1), // May 1, 2024 (within parent dates)
        endDate: new Date(2024, 4, 15) // May 15, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Pediatria", // Medical speciality in Portuguese
    startDate: new Date(2024, 5, 1), // June 1, 2024
    endDate: new Date(2024, 7, 15), // August 15, 2024
    events: [
      {
        title: "Formação em Pediatria",
        startDate: new Date(2024, 5, 1), // June 1, 2024 (within parent dates)
        endDate: new Date(2024, 5, 20) // June 20, 2024 (within parent dates)
      },
      {
        title: "Workshop de Pediatria",
        startDate: new Date(2024, 7, 1), // August 1, 2024 (within parent dates)
        endDate: new Date(2024, 7, 10) // August 10, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Cardiologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 0, 15), // January 15, 2024
    endDate: new Date(2024, 1, 10), // February 10, 2024
    events: [
      {
        title: "Formação em Cardiologia",
        startDate: new Date(2024, 0, 15), // January 15, 2024
        endDate: new Date(2024, 0, 30) // January 30, 2024 (within parent dates)
      },
      {
        title: "Workshop de Cardiologia",
        startDate: new Date(2024, 1, 1), // February 1, 2024 (within parent dates)
        endDate: new Date(2024, 1, 5) // February 5, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Neurologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 21, 11), // March 5, 2024 (within parent dates)
    endDate: new Date(2025, 2, 1), // March 25, 2024 (within parent dates),
    events: [
      {
        title: "Formação em Neurologia",
        startDate: new Date(2024, 2, 5), // March 5, 2024 (within parent dates)
        endDate: new Date(2024, 2, 25) // March 25, 2024 (within parent dates)
      },
      {
        title: "Seminário de Neurologia",
        startDate: new Date(2024, 4, 1), // May 1, 2024 (within parent dates)
        endDate: new Date(2024, 4, 15) // May 15, 2024 (within parent dates)
      },
      {
        title: "Formação em Neurologia",
        startDate: new Date(2024, 21, 11), // March 5, 2024 (within parent dates)
        endDate: new Date(2025, 2, 1) // March 25, 2024 (within parent dates)
      },
      {
        title: "Seminário de Neurologia",
        startDate: new Date(2024, 4, 1), // May 1, 2024 (within parent dates)
        endDate: new Date(2024, 4, 15) // May 15, 2024 (within parent dates)
      },
      {
        title: "Formação em Neurologia",
        startDate: new Date(2024, 2, 5), // March 5, 2024 (within parent dates)
        endDate: new Date(2024, 4, 25) // March 25, 2024 (within parent dates)
      },
      {
        title: "Seminário de Neurologia",
        startDate: new Date(2024, 4, 1), // May 1, 2024 (within parent dates)
        endDate: new Date(2024, 4, 15) // May 15, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Pediatria", // Medical speciality in Portuguese
    startDate: new Date(2024, 5, 1), // June 1, 2024
    endDate: new Date(2024, 7, 15), // August 15, 2024
    events: [
      {
        title: "Formação em Pediatria",
        startDate: new Date(2024, 5, 1), // June 1, 2024 (within parent dates)
        endDate: new Date(2024, 5, 20) // June 20, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Cardiologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 0, 15), // January 15, 2024
    endDate: new Date(2024, 1, 10), // February 10, 2024
    events: [
      {
        title: "Formação em Cardiologia",
        startDate: new Date(2024, 0, 15), // January 15, 2024
        endDate: new Date(2024, 0, 30) // January 30, 2024 (within parent dates)
      },
      {
        title: "Workshop de Cardiologia",
        startDate: new Date(2024, 1, 1), // February 1, 2024 (within parent dates)
        endDate: new Date(2024, 1, 5) // February 5, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Neurologia", // Medical speciality in Portuguese
    startDate: new Date(2024, 2, 5), // March 5, 2024
    endDate: new Date(2024, 4, 20), // May 20, 2024
    events: [
      {
        title: "Formação em Neurologia",
        startDate: new Date(2024, 2, 5), // March 5, 2024 (within parent dates)
        endDate: new Date(2024, 2, 25) // March 25, 2024 (within parent dates)
      },
      {
        title: "Seminário de Neurologia",
        startDate: new Date(2024, 4, 1), // May 1, 2024 (within parent dates)
        endDate: new Date(2024, 4, 15) // May 15, 2024 (within parent dates)
      }
    ]
  },
  {
    title: "Pediatria", // Medical speciality in Portuguese
    startDate: new Date(2024, 5, 1), // June 1, 2024
    endDate: new Date(2024, 7, 15), // August 15, 2024
    events: [
      {
        title: "Formação em Pediatria",
        startDate: new Date(2024, 5, 1), // June 1, 2024 (within parent dates)
        endDate: new Date(2024, 5, 20) // June 20, 2024 (within parent dates)
      },
      {
        title: "Workshop de Pediatria",
        startDate: new Date(2024, 7, 1), // August 1, 2024 (within parent dates)
        endDate: new Date(2024, 7, 10) // August 10, 2024 (within parent dates)
      }
    ]
  }
];
