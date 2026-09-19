import { IEvent } from "store/events.reducer";
import styles from "./EventItem.module.scss";
import { useEffect, useState } from "react";

interface IPosition {
  top: number;
  height: number | string;
}

interface IComponentProps {
  event: IEvent;
  getCalendarColor: (calendarId: string | number) => {
    border: string | undefined;
    background: string | undefined;
  };
  getEventPosition: (event: IEvent) => IPosition | undefined;
  parent: HTMLDivElement | null;
  viewThisEvent: (eventId: string | number) => void;
}

const EventItem = ({
  event,
  getCalendarColor,
  getEventPosition,
  parent,
  viewThisEvent,
}: IComponentProps) => {
  const calendarColor = getCalendarColor(event.calendarId);
  const [position, setPosition] = useState<IPosition | undefined>(
    getEventPosition(event)
  );

  useEffect(() => {
    setPosition(getEventPosition(event));
  }, [parent, event, getEventPosition]);

  const startTime = `${
      event.time.start.hours.toString().padStart(2, "0")
    }:${
      event.time.start.minutes.toString().padStart(2, "0")
    }${
      event.time.start.ampm
    }`;
  const endTime = `${
    event.time.end.hours.toString().padStart(2, "0")
  }:${
    event.time.end.minutes.toString().padStart(2, "0")
  }${
    event.time.end.ampm
  }`;

  return (
    <>
      <button
        className={styles.eventButton}
        style={{
          top: position?.top,
          height: position?.height,
        }}
        onClick={() => viewThisEvent(event.id)}
      >
        <div
          className={styles.event}
          style={{
            backgroundColor: calendarColor.background,
            borderColor: calendarColor.border,
          }}
        >
          {startTime === endTime ? (
            <p className={styles.text}>{`${event.title}, ${startTime}`}</p>
          ) : (
            <>
              <p className={styles.title}>{event.title}</p>
              <p className={styles.time}>{`${startTime} - ${endTime}`}</p>
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default EventItem;
