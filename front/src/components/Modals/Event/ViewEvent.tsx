import { useDispatch, useSelector } from "react-redux";

import { Modal } from "components/Simple";
import { IItem } from "components/Simple/SelectMenu/SelectMenu";
import styles from "../Modal.module.scss";

import { RootState } from "store/store";
import { IEvent, RepeatVariants, changeShownPopup } from "store/events.reducer";

interface IRepeat {
  id: number;
  value: RepeatVariants;
  title: string;
}

interface IComponentProps {
  closeModal: () => void;
}

const ViewEvent = ({ closeModal }: IComponentProps) => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state: RootState) => state.eventsReducer.eventsList
  );
  const currentEventId = useSelector(
    (state: RootState) => state.eventsReducer.currentEventId
  ) || -1;

  const selectedDate = useSelector(
    (state: RootState) => state.userProfileReducer.selectedDate
  );
  const calendars = useSelector(
    (state: RootState) => state.calendarsReducer.calendarList
  );
  const colors = useSelector(
    (state: RootState) => state.userProfileReducer.colorList
  );

  const calendarsList: IItem[] = calendars.map((calendar) => {
    return {
      id: calendar.id,
      value: calendar.title,
      title: calendar.title,
      color: colors.find((color) => color.filter === calendar.color)?.color || colors[0].color,
    };
  });

  const midnight = new Date(selectedDate);
  midnight.setHours(0, 0, 0);

  const timeList: IItem[] = [];
  for (let i = 0; i < 24 * 4; i++) {
    const tempDate = new Date(midnight);
    tempDate.setMinutes(15 * i);

    timeList.push({
      id: i,
      value: tempDate.toISOString(),
      title: tempDate.toLocaleString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    });
  }

  const eventValues: IEvent = events.find(event => event.id === currentEventId) as IEvent;

  const repeatVariants: IRepeat[] = [
    { id: 0, value: "not", title: "Does not repeat" },
    { id: 1, value: "daily", title: "Daily" },
    {
      id: 2,
      value: "weekly",
      title: `Weekly on ${new Date(eventValues.date).toLocaleDateString("en-US", {
        weekday: "long",
      })}`,
    },
    { id: 3, value: "monthly", title: "Monthly" },
    {
      id: 4,
      value: "yearly",
      title: `Annually on ${new Date(eventValues.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`,
    },
  ];

  const editEvent = () => {
    dispatch(changeShownPopup({shownPopup: "edit", currentEventId}));
  };

  const deleteEvent = () => {
    dispatch(changeShownPopup({shownPopup: "delete", currentEventId}));
  };

  return (
    <>
      <Modal isOpen={true} title="View event" close={closeModal} editItem={editEvent} deleteItem={deleteEvent}>
        <>
          <div className={`${styles.item} ${styles.title} ${styles.small}`}>
            <p className={styles.titleValue}>{eventValues.title}</p>
          </div>
          <div className={`${styles.item} ${styles.clock} ${styles.small}`}>
            <p className={styles.value}>
              {`${
                new Date(eventValues.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
                }, ${
                  timeList.find((item) => {
                    const currentDate = new Date(item.value);
                    return (
                      currentDate.getHours() ===
                        eventValues.time.start.hours +
                          (eventValues.time.start.ampm === "am" ? 0 : 12) &&
                      currentDate.getMinutes() >=
                        eventValues.time.start.minutes
                    );
                  })?.title
                } - ${
                  timeList.find((item) => {
                    const currentDate = new Date(item.value);
                    return (
                      currentDate.getHours() ===
                        eventValues.time.end.hours +
                          (eventValues.time.end.ampm === "am" ? 0 : 12) &&
                      currentDate.getMinutes() >= eventValues.time.end.minutes
                    );
                  })?.title
                }`}
            </p>
            <p className={styles.value}>
              {`${eventValues.time.isAllDay 
                    ? "All day"
                    : "Not all day"
              }, ${repeatVariants.find(
                      (item) => item.value === eventValues.repeat
                    )?.title}`}
            </p>
          </div>
          <div className={`${styles.item} ${styles.calendar} ${styles.small}`}>
            <p className={styles.calendarValue}>
              <span style={{backgroundColor: calendarsList.find(
                (item) => item.id === Number(eventValues.calendarId)
              )?.color}}></span>
              {calendarsList.find(
                (item) => item.id === Number(eventValues.calendarId)
              )?.title}
            </p>
          </div>
          <div className={`${styles.item} ${styles.description} ${styles.small}`}>
            <p className={styles.value}>{eventValues.description}</p>
          </div>
        </>
      </Modal>
    </>
  );
};

export default ViewEvent