import { useDispatch, useSelector } from "react-redux";

import styles from "./EventsPopup.module.scss";
import { DeleteEvent, CreateOrEditEvent, ViewEvent } from "components/Modals";

import { RootState } from "store/store";
import { changeShownPopup } from "store/events.reducer";

interface IComponentProps {}

const EventsPopup = ({}: IComponentProps) => {
  const dispatch = useDispatch();
  const shownPopup = useSelector(
    (state: RootState) => state.eventsReducer.shownPopup
  );
  const closeModal = () => {
    dispatch(changeShownPopup({ shownPopup: null }));
  };

  return (
    <div className={styles.eventsWrapper}>
      {(shownPopup === "create" || shownPopup === "edit") && (
        <CreateOrEditEvent closeModal={closeModal} />
      )}
      {shownPopup === "view" && <ViewEvent closeModal={closeModal} />}
      {shownPopup === "delete" && <DeleteEvent closeModal={closeModal} />}
    </div>
  );
};

export default EventsPopup;
