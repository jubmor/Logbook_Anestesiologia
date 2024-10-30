import React from "react";
import List from "./components/List";
import CalendarView from "./components/CalendarView";

import "./styles.scss";
import Screen from "@/components/Screen";

const HomeIntern = () => {
  const cards = Array.from({ length: 5 });
  return (
    <Screen>
      <div className="cards_container">
        {content.map((card, index) => (
          <div key={index} className="dashboard_container cards">
            {card.component ? card.component : `Card ${index + 1}`}{" "}
          </div>
        ))}
      </div>
    </Screen>
  );
};

export default HomeIntern;

const content = [
  {
    label: "List",
    component: undefined
  },
  {
    label: "List",
    component: undefined //<CalendarView />
  },
  {
    label: "List",
    component: undefined
  },
  {
    label: "List",
    component: <List />
  },
  {
    label: "List",
    component: undefined
  }
];
