import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  SelectMenu,
  TextArea,
} from "components/Simple";
import { IItem } from "components/Simple/SelectMenu/SelectMenu";
import styles from "../Modal.module.scss";

import { RootState } from "store/store";
import { IEvent, RepeatVariants, addEventItem, updateEventItem } from "store/events.reducer";
import { eventsApi } from "api";

interface IRepeat {
  id: number;
  value: RepeatVariants;
  title: string;
}

interface IComponentProps {
  closeModal: () => void;
}

const CreateEvent = ({ closeModal }: IComponentProps) => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state: RootState) => state.eventsReducer.eventsList
  );
  const currentEventId = useSelector(
    (state: RootState) => state.eventsReducer.currentEventId
  );

  const [inputError, setInputError] = useState<string>("");
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

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

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

  const createEventTemplate: IEvent = {
    id: "",
    title: "",
    date: selectedDate,
    time: {
      start: {
        hours: (new Date(selectedDate).getHours() + 1) % 12,
        minutes: 0,
        ampm: new Date(selectedDate).getHours() + 1 > 12 ? "pm" : "am",
      },
      end: {
        hours: (new Date(selectedDate).getHours() + 2) % 12,
        minutes: 0,
        ampm: new Date(selectedDate).getHours() + 2 > 12 ? "pm" : "am",
      },
      isAllDay: false,
    },
    repeat: "not",
    calendarId: calendarsList[0]?.id || "",
    description: "",
  }

  const [eventValues, setEventValues] = useState<IEvent>(
    currentEventId !== null
    ? events.find(event => event.id === currentEventId) || events[0]
    : createEventTemplate
  );

  const changeEventValues = (
    key:
      | "title"
      | "date"
      | "start"
      | "end"
      | "isAllDay"
      | "repeat"
      | "calendarId"
      | "description",
    value: any
  ) => {
    setEventValues((prev) => {
      if (key === "start" || key === "end" || key === "isAllDay") {
        return {
          ...prev,
          time: {
            ...prev.time,
            [key]: value,
          },
        };
      } else {
        return {
          ...prev,
          [key]: value.toString(),
        };
      }
    });
  };

  const updateEventTimeValues = (startOrEnd: "start" | "end", value: string) => {
    const date = new Date(value);

    const hours = (date.getHours()) % 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() > 11 ? "pm" : "am";

    changeEventValues(startOrEnd, {hours, minutes, ampm});

    if (startOrEnd === "start") {
      changeEventValues("end", {hours: (hours + 1) % 12, minutes, ampm: ampm === "am" && hours + 1 < 12 ? "am" : "pm"});
    }
  }

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

  const saveEvent = async () => {
    if (!eventValues.title) {
      setInputError("Please enter a title");
      return;
    } else {
      setInputError("");
    }
    try {
      if (currentEventId !== null) {
        dispatch(updateEventItem(await eventsApi.update(eventValues)));
      } else {
        const { id: _id, ...newEvent } = eventValues;
        dispatch(addEventItem(await eventsApi.create(newEvent)));
      }
      closeModal();
    } catch (error) {
      setInputError(error instanceof Error ? error.message : "Failed to save event");
    }
  };

  return (
    <>
      <Modal isOpen={true} title={ currentEventId === null ? "Create event" : "Edit event"} close={closeModal}>
        <>
          <div className={`${styles.item} ${styles.title}`}>
            <Input
              type={"text"}
              value={eventValues.title}
              onChange={(value) => changeEventValues("title", value)}
              label="Title"
              name="title"
              placeholder="Enter title"
              errorMessage={inputError}
            />
          </div>
          <div className={`${styles.item} ${styles.clock}`}>
            <div className={styles.dateAndTimeBlock}>
              <div className={styles.date}>
                <button
                  className={styles.currentDate}
                  onClick={() => setShowCalendar((prev) => !prev)}
                >
                  <div style={{ pointerEvents: "none" }}>
                    <Input
                      label="Date"
                      type={"text"}
                      disabled={true}
                      value={new Date(eventValues.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                      onChange={() => {}}
                      name="currentDate"
                    />
                  </div>
                </button>
                {showCalendar && (
                  <div className={styles.datePickerBlock}>
                    <DatePicker
                      selectedDate={new Date(eventValues.date)}
                      selectDate={(date) => changeEventValues("date", date)}
                    />
                  </div>
                )}
              </div>
              <div className={styles.time}>
                <SelectMenu
                  label="Time"
                  selected={
                    timeList.find((item) => {
                      const currentDate = new Date(item.value);
                      return (
                        currentDate.getHours() ===
                          eventValues.time.start.hours +
                            (eventValues.time.start.ampm === "am" ? 0 : 12) &&
                        currentDate.getMinutes() >=
                          eventValues.time.start.minutes
                      );
                    }) || timeList[0]
                  }
                  list={timeList}
                  changeValue={(item) => updateEventTimeValues("start", item.value)}
                  disable={eventValues.time.isAllDay}
                />
                <span>-</span>
                <SelectMenu
                  selected={
                    timeList.find((item) => {
                      const currentDate = new Date(item.value);
                      return (
                        currentDate.getHours() ===
                          eventValues.time.end.hours +
                            (eventValues.time.end.ampm === "am" ? 0 : 12) &&
                        currentDate.getMinutes() >= eventValues.time.end.minutes
                      );
                    }) || timeList[0]
                  }
                  list={timeList.filter((item) => {
                    const currentDate = new Date(item.value);
                    return (
                      currentDate.getHours() >=
                        eventValues.time.start.hours +
                          (eventValues.time.start.ampm === "am" ? 0 : 12) &&
                      currentDate.getMinutes() >= eventValues.time.start.minutes
                    );
                  })}
                  changeValue={(item) => updateEventTimeValues("end", item.value)}
                  disable={eventValues.time.isAllDay}
                />
              </div>
              <div className={styles.allDay}>
                <Checkbox
                  name="allDay"
                  label="All day"
                  status={eventValues.time.isAllDay}
                  onChange={() =>
                    changeEventValues("isAllDay", !eventValues.time.isAllDay)
                  }
                />
              </div>
              <div className={styles.repeat}>
                <SelectMenu
                  selected={
                    repeatVariants.find(
                      (item) => item.value === eventValues.repeat
                    ) || repeatVariants[0]
                  }
                  list={repeatVariants}
                  changeValue={(item) =>
                    changeEventValues("repeat", item.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className={`${styles.item} ${styles.calendar}`}>
            <SelectMenu
              label="Calendar"
              selected={
                calendarsList.find(
                  (item) => item.id === Number(eventValues.calendarId)
                ) || calendarsList[0]
              }
              list={calendarsList}
              changeValue={(item) => changeEventValues("calendarId", item.id)}
            />
          </div>
          <div className={`${styles.item} ${styles.description}`}>
            <TextArea
              label="Description"
              value={eventValues.description}
              onChange={(value) => changeEventValues("description", value)}
              name="description"
            />
          </div>
          <div className={`${styles.item} ${styles.buttons}`}>
            <Button label="Save" onClick={saveEvent} />
          </div>
        </>
      </Modal>
    </>
  );
};

export default CreateEvent;
