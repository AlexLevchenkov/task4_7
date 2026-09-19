import styles from "./CalendarItem.module.scss";
import { Checkbox } from "components/Simple";

interface IComponentProps {
  label: string;
  color: string;
  status: boolean;
  isPrimary: boolean;
  changeStatus: () => void;
  editCalendar: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteCalendar: () => void;
}

const CalendarItem = ({
  label,
  color,
  status,
  isPrimary,
  changeStatus,
  editCalendar,
  deleteCalendar,
}: IComponentProps) => {
  return (
    <>
      <div className={styles.calendarItem}>
        <Checkbox
          name="calendar"
          label={label}
          color={color}
          status={status}
          onChange={changeStatus}
        />
        {!isPrimary && <button className={styles.delete} onClick={deleteCalendar}></button>}
        <button className={styles.edit} onClick={(event) => editCalendar(event)}></button>
      </div>
    </>
  );
};

export default CalendarItem;
