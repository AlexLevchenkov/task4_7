import { useDispatch, useSelector } from "react-redux";

import styles from "./EventsCalendar.module.scss";

import { RootState } from "store/store";
import { IEvent, RepeatVariants, changeShownPopup } from "store/events.reducer";
import { useRef } from "react";
import { EventItem } from "components/Simple";
import EventItemAllDay from "components/Simple/EventItemAllDay/EventItemAllDay";
import { Periods } from "store/userProfile.reducer";

interface IComponentProps {}

const EventsCalendar = ({}: IComponentProps) => {
  const dispatch = useDispatch();
  const eventBlockRef = useRef<HTMLDivElement>(null);

  const period = useSelector((state: RootState) => state.userProfileReducer.period);

  const calendarList = useSelector(
    (state: RootState) => state.calendarsReducer.calendarList
  );
  const colorList = useSelector(
    (state: RootState) => state.userProfileReducer.colorList
  );

  const selectedDate = new Date(
    useSelector((state: RootState) => state.userProfileReducer.selectedDate)
  );
  const selectedDateMidnight = new Date(
    useSelector((state: RootState) => state.userProfileReducer.selectedDate)
  );
  selectedDateMidnight.setHours(0, 0, 0, 0);
  let firstDate: Date = new Date();

  const headersListItems: { date: number; day: string; current: boolean }[] = [];

  if (period === Periods.Day) {
    const currentDateMidnight = new Date();
    currentDateMidnight.setHours(0, 0, 0, 0);
    headersListItems.push({
      date: selectedDate.getDate(),
      day: selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      current: currentDateMidnight.getTime() === selectedDateMidnight.getTime(),
    });
  } else {
    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay());
    firstDate = new Date(selectedDate.toISOString());
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(selectedDate);
      headersListItems.push({
        date: tempDate.getDate(),
        day: tempDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        current:
          tempDate.getDate() === today.getDate() &&
          tempDate.getMonth() === today.getMonth() &&
          tempDate.getFullYear() === today.getFullYear(),
      });
      selectedDate.setDate(selectedDate.getDate() + 1);
    }
  }

  const timesList: string[] = [""];

  for (let i = 1; i < 12; i++) {
    timesList.push(`${i} am`);
  }
  for (let i = 0; i < 12; i++) {
    timesList.push(`${i} pm`);
  }

  const events = useSelector(
    (state: RootState) => state.eventsReducer.eventsList
  );
  let eventsOnThisPeriodAllDay: IEvent[][] = Array.from(
    { length: 7 },
    () => []
  );
  let eventsOnThisPeriod: IEvent[][] = Array.from({ length: 7 }, () => []);

  const isCurrentDate = (
    eventDate: Date,
    currentDate: Date,
    repeatType: RepeatVariants
  ) => {
    switch (repeatType) {
      case "not":
        return eventDate.getTime() === currentDate.getTime();

      case "daily":
        return true;

      case "weekly":
        return eventDate.getDay() === currentDate.getDay();

      case "monthly":
        return eventDate.getDate() === currentDate.getDate();

      case "yearly":
        return (
          eventDate.getDate() === currentDate.getDate() &&
          eventDate.getMonth() === currentDate.getMonth()
        );

      default:
        return false;
    }
  };

  if (period === Periods.Day) {
    events.forEach((item) => {
      const date = new Date(item.date);
      date.setHours(0, 0, 0, 0);
      const tempDate = new Date(firstDate);
      tempDate.setHours(0, 0, 0, 0);

      const calendarStatus = calendarList.find(
        (calendar) => calendar.id === item.calendarId
      )?.visible;

      if (!calendarStatus) {
        return;
      }
      if (isCurrentDate(date, selectedDateMidnight, item.repeat)) {
        if (item.time.isAllDay) {
          eventsOnThisPeriodAllDay[0].push(item);
        } else {
          eventsOnThisPeriod[0].push(item);
        }
      }
    });
  } else {
    const tempDate = new Date(firstDate);
    tempDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      events.forEach((item) => {
        const date = new Date(item.date);
        date.setHours(0, 0, 0, 0);

        const calendarStatus = calendarList.find(
          (calendar) => calendar.id === item.calendarId
        )?.visible;

        if (!calendarStatus) {
          return;
        }

        if (isCurrentDate(date, tempDate, item.repeat)) {
          if (item.time.isAllDay) {
            eventsOnThisPeriodAllDay[i].push(item);
          } else {
            eventsOnThisPeriod[i].push(item);
          }
        }
      });
      tempDate.setDate(tempDate.getDate() + 1);
    }
  }

  const getCalendarColor = (calendarId: string | number) => {
    const currentCalendar = calendarList.find(
      (item) => item.id === calendarId
    ) || calendarList[0];

    const currentColor = colorList.find(
      (item) => item.filter === currentCalendar.color
    )?.color;

    return {
      border: currentColor,
      background: `${currentColor}4D`,
    };
  };

  const getEventPosition = (event: IEvent) => {
    if (!eventBlockRef.current) {
      return;
    }
    const blockHeight = eventBlockRef.current.getBoundingClientRect().height;
    const cellHeight = blockHeight / 24;
    const startTime = event.time.start;
    const endTime = event.time.end;

    const startTimeValue =
      (startTime.ampm === "am" ? 0 : 12) +
      startTime.hours +
      startTime.minutes / 60;
    const endTimeValue =
      (endTime.ampm === "am" ? 0 : 12) + endTime.hours + endTime.minutes / 60;
    const eventHeight = endTimeValue - startTimeValue;

    return {
      top: (startTimeValue * blockHeight) / 24 + 6,
      height: eventHeight ? eventHeight * cellHeight : "auto",
    };
  };

  const viewThisEvent = (eventId: string | number) => {
    dispatch(changeShownPopup({ shownPopup: "view", currentEventId: eventId }));
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.header}${
          period === Periods.Week ? ` ${styles.week}` : ""
        }`}
      >
        {headersListItems.map((item, idx) => (
          <div className={styles.item} key={idx}>
            <div
              className={`${styles.value}${
                item.current ? ` ${styles.currentDate}` : ""
              }`}
            >
              <span className={styles.date}>{item.date}</span>
              <span className={styles.day}>{item.day}</span>
            </div>
            {eventsOnThisPeriodAllDay[idx].map((item, idx) => (
              <EventItemAllDay
                key={idx}
                item={item}
                getCalendarColor={getCalendarColor}
                viewThisEvent={viewThisEvent}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        <div className={styles.block} ref={eventBlockRef}>
          <div className={styles.times}>
            {timesList.map((item, idx) => (
              <div className={styles.time} key={idx}>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div
            className={`${styles.eventsZone} ${
              period === Periods.Week ? ` ${styles.week}` : ""
            }`}
          >
            {eventsOnThisPeriod.map((eventOnDay, idx) => (
              <div className={styles.eventsColumn} key={idx}>
                {eventOnDay.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    getCalendarColor={getCalendarColor}
                    getEventPosition={getEventPosition}
                    parent={eventBlockRef.current}
                    viewThisEvent={viewThisEvent}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
