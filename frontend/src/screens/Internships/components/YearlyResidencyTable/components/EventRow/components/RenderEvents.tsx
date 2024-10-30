import React, { memo } from "react";
import { EventEntryType } from "../../..";
import { calculatePosition } from "..";
import { useScreenWidth } from "@/hooks/useScreenWidth";

type Props = {
  cardsRef: React.RefObject<HTMLDivElement>;
  mainEvent: EventEntryType;
};

const RenderEvents = ({ cardsRef, mainEvent }: Props) => {
  const screenWidth = useScreenWidth();
  const mainEventPositioning = calculatePosition(
    mainEvent.startDate,
    mainEvent.endDate,
    screenWidth
  );

  return (
    <div ref={cardsRef} className="table-container__table_wrapper__event_row__event_cards">
      <div className="table-container__table_wrapper__event_row__event_cards__wrapper">
        <div
          style={{ left: mainEventPositioning.left, width: mainEventPositioning.width }}
          className="table-container__table_wrapper__event_row__event_card"
        >
          {mainEvent.title}
        </div>

        {mainEvent.events.map((card, cardIndex) => {
          const { left, width } = calculatePosition(card.startDate, card.endDate, screenWidth);
          return (
            <div
              key={cardIndex}
              style={{ left, width }}
              className="table-container__table_wrapper__event_row__event_card"
            >
              {/* {card.title} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(RenderEvents);
