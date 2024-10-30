import dayjs from "dayjs";
import { EventEntryType } from "../../..";

type Props = {
  event: EventEntryType;
};

const EventTitle = ({ event }: Props) => {
  return (
    <div
      style={{ zIndex: "99" }}
      className="table-container__table_wrapper__event_row__month_container_body"
    >
      <div className="table-container__table_wrapper__event_row__event_title">
        <h5>{event.title}</h5>
        <p>
          {`
        ${dayjs(event.startDate).format("DD-MMM")} - ${dayjs(event.endDate).format("DD-MMM")}`}
        </p>

        {event.events.length > 0 && <p>{event.events.length} Eventos</p>}
      </div>
    </div>
  );
};

export default EventTitle;
