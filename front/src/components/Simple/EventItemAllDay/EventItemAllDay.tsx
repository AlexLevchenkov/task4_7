import { IEvent } from "store/events.reducer";
import styles from "./EventItemAllDay.module.scss";

interface IComponentProps {
  item: IEvent;
  getCalendarColor: (calendarId: string | number) => {
    border: string | undefined;
    background: string | undefined;
  }
  viewThisEvent: (eventId: string | number) => void
}

const EventItemAllDay = ({item, getCalendarColor, viewThisEvent}: IComponentProps) => {
  const currentColor = getCalendarColor(item.calendarId);

  return (
    <button
      className={styles.task}
      style={{ backgroundColor: currentColor.background }}
      onClick={() => viewThisEvent(item.id)}
    >
      <p
        className={styles.taskTitle}
        style={{ borderColor: currentColor.border }}
      >
        {item.title}
      </p>
    </button>
  );
};

export default EventItemAllDay