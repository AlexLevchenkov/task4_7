import { useDispatch } from "react-redux";

import styles from "../Modal.module.scss";
import { Button, Modal } from "components/Simple";

import { ICalendar, deleteCalendarItem } from "store/calendars.reducer";
import { deleteAllEventsFromTheCalendar } from "store/events.reducer";
import { calendarsApi, eventsApi } from "api";

interface IComponentProps {
  closeModal: () => void;
  calendar: ICalendar;
}

const DeleteCalendar = ({closeModal, calendar}: IComponentProps) => {
  const dispatch = useDispatch();

  const deleteCalendar = async () => {
    try {
      await eventsApi.deleteByCalendar(calendar.id);
      await calendarsApi.delete(calendar.id);
      dispatch(deleteCalendarItem(calendar.id));
      dispatch(deleteAllEventsFromTheCalendar(calendar.id));
      closeModal();
    } catch (error) {
      console.error("Failed to delete calendar", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        title="Delete calendar"
        close={closeModal}
      >
        <>
          <p>
            Are you sure you want to delete {calendar.title}? You'll no longer have access to this calendar and its events. 
          </p>
          <div className={`${styles.item} ${styles.buttons}`}>
            <Button
              type="secondary"
              label="Cancel"
              onClick={closeModal}
            />
            <Button
              label="Delete"
              onClick={deleteCalendar}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default DeleteCalendar