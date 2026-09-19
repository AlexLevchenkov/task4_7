import { useDispatch, useSelector } from "react-redux";

import styles from "../Modal.module.scss";
import { Button, Modal } from "components/Simple";

import { deleteEventItem } from "store/events.reducer";
import { RootState } from "store/store";
import { eventsApi } from "api";

interface IComponentProps {
  closeModal: () => void;
}

const DeleteEvent = ({closeModal}: IComponentProps) => {
  const dispatch = useDispatch();

  const events = useSelector(
    (state: RootState) => state.eventsReducer.eventsList
  );

  const deletedEventId = useSelector(
    (state: RootState) => state.eventsReducer.currentEventId
  );

  const deleteCalendar = async () => {
    if (deletedEventId === null) return;
    try {
      await eventsApi.delete(deletedEventId);
      dispatch(deleteEventItem(deletedEventId));
      closeModal();
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        title="Delete event"
        close={closeModal}
      >
        <>
          <p>
            Are you sure you want to delete Event {events.find(event => event.id === deletedEventId)?.title}? You'll no longer have access to it. 
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

export default DeleteEvent