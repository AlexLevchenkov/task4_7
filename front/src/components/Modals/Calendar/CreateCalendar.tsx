import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../Modal.module.scss";
import { Button, ColorPicker, Input, Modal } from "components/Simple";

import { RootState } from "store/store";
import { ICalendar, addCalendarItem } from "store/calendars.reducer";
import { calendarsApi } from "api";

interface IComponentProps {
  closeModal: () => void;
}

const CreateCalendar = ({closeModal}: IComponentProps) => {
  const [title, setTitle] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const colorList = useSelector(
    (state: RootState) => state.userProfileReducer.colorList
  );

  const changeCalendarList = async () => {
    if (!title) {
      setInputError("Please enter a title");
      return;
    }

    const color = colorList.find(item => item.id === selectedColorId)?.filter

    const newCalendar: Omit<ICalendar, "id"> = {
      title,
      color: color ? color : colorList[0].filter,
      visible: true
    }
    try {
      dispatch(addCalendarItem(await calendarsApi.create(newCalendar)));
      closeModal();
    } catch (error) {
      setInputError(error instanceof Error ? error.message : "Failed to create calendar");
    }
  };

  return (
    <>
      <Modal
        isOpen={true}
        title="Create calendar"
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
              onClick={changeCalendarList}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default CreateCalendar