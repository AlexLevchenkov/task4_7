import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../Modal.module.scss";
import { Button, ColorPicker, Input, Modal } from "components/Simple";

import { RootState } from "store/store";
import { ICalendar, updateCalendarItem } from "store/calendars.reducer";
import { calendarsApi } from "api";


interface IComponentProps {
  closeModal: () => void;
  calendar: ICalendar;
}

const EditCalendar = ({closeModal, calendar}: IComponentProps) => {
  const colorList = useSelector(
    (state: RootState) => state.userProfileReducer.colorList
  );

  const [title, setTitle] = useState<string>(calendar.title);
  const [inputError, setInputError] = useState<string>("");
  const [selectedColorId, setSelectedColorId] = useState<number | null>(colorList.find(item => item.filter === calendar.color)?.id || -1);
  const dispatch = useDispatch();
  const updateCalendar = async () => {
    if (!title) {
      setInputError("Please enter a title");
      return;
    }

    const color = colorList.find(item => item.id === selectedColorId)?.filter || colorList[0].filter

    const updatedCalendar: ICalendar = {
      ...calendar,
      title,
      color,
    }
    
    try {
      dispatch(updateCalendarItem(await calendarsApi.update(updatedCalendar)));
      closeModal();
    } catch (error) {
      setInputError(error instanceof Error ? error.message : "Failed to update calendar");
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        title="Edit calendar"
        close={closeModal}
      >
        <>
          <div className={`${styles.item} ${styles.title}`}>
            <Input
              type={"text"}
              value={title}
              onChange={setTitle}
              label="Title"
              name="title"
              placeholder="Enter title"
              errorMessage={inputError}
            />
          </div>
          <div className={`${styles.item} ${styles.colors}`}>
            <ColorPicker
              colors={colorList}
              selectedColorId={selectedColorId}
              selectColor={setSelectedColorId}
            />
          </div>
          <div className={`${styles.item} ${styles.buttons}`}>
            <Button
              label="Save"
              onClick={updateCalendar}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default EditCalendar