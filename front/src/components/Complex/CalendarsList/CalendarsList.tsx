import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CalendarsList.module.scss";
import {CalendarItem} from "components/Complex";

import { RootState } from "store/store";
import { CreateCalendar, DeleteCalendar, EditCalendar } from "components/Modals";
import { ICalendar, updateCalendarItem } from "store/calendars.reducer";
import { calendarsApi } from "api";

const CalendarsList = () => {
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [workingCalendar, setWorkingCalendar] = useState<ICalendar | null>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const [popupShift, setPopupShift] = useState<number>(0);

  const dispatch = useDispatch();

  const calendarItems = useSelector(
    (state: RootState) => state.calendarsReducer.calendarList
  );

  const createCalendar = () => {
    if (!showCreatePopup && !showEditPopup && !showDeletePopup) {
      setShowCreatePopup(true);
      setWorkingCalendar(null);
      setPopupShift(0);
    }
  }
  const changeVisibleStatus = async (calendar: ICalendar) => {
    try {
      dispatch(updateCalendarItem(await calendarsApi.update({...calendar, visible: !calendar.visible})));
    } catch (error) {
      console.error("Failed to update calendar visibility", error);
    }
  } 
  const editCalendar = (
    calendar: ICalendar,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!showCreatePopup && !showEditPopup && !showDeletePopup) {
      setShowEditPopup(true);
      setWorkingCalendar(calendar);
      if (calendarWrapperRef.current) {
        const parentRect = calendarWrapperRef.current.getBoundingClientRect();
        let bottomRelativeToParent = 0
        if (event.clientY > 650) {
          bottomRelativeToParent = parentRect.top + parentRect.height - event.clientY + 150;
        } else {
          bottomRelativeToParent = parentRect.top - event.clientY + 30 ;
        }
        setPopupShift(bottomRelativeToParent);
      }
    }
  } 
  const deleteCalendar = (calendar: ICalendar) => {
    if (!showCreatePopup && !showEditPopup && !showDeletePopup) {
      setShowDeletePopup(true);
      setWorkingCalendar(calendar);
    }
  }

  return (
    <>
      <div className={styles.calendarWrapper} ref={calendarWrapperRef}>
        <h2 className={styles.title}>My calendars</h2>
        <button 
          className={styles.add}
          onClick={createCalendar}
        />
        <div className={styles.calendarBlock}>
          {calendarItems.map((item) => (
            <CalendarItem
              key={item.id}
              label={item.title}
              color={item.color}
              status={item.visible}
              isPrimary={false}
              changeStatus={() => changeVisibleStatus(item)}
              editCalendar={(event) => editCalendar(item, event)}
              deleteCalendar={() => deleteCalendar(item)}
            />
          ))}
        </div>
        <div className={styles.modalWrapper} style={{bottom: popupShift}}>
          {showCreatePopup && (
            <CreateCalendar 
              closeModal={() => setShowCreatePopup(false)}
            />
          )}
          {showEditPopup && (
            <EditCalendar
              closeModal={() => setShowEditPopup(false)}
              calendar={workingCalendar as ICalendar}
            />
          )}
        </div>
      </div>
        {showDeletePopup && (
          <div className={styles.deletePopup}>
            <DeleteCalendar
              closeModal={() => setShowDeletePopup(false)}
              calendar={workingCalendar as ICalendar}
            />
          </div>
        )}
    </>
  );
};

export default CalendarsList;
