import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from "./Aside.module.scss";

import { Button, DatePicker } from "components/Simple";
import {CalendarsList} from "components/Complex";

import Plus from "assets/plus.svg";
import { setSelectedDate } from "store/userProfile.reducer";
import { changeShownPopup } from "store/events.reducer";

interface IComponentProps {}

const Aside = ({}: IComponentProps) => {
  const dispatch = useDispatch();

  const showAside = useSelector(
    (state: RootState) => state.userProfileReducer.showAside
  );

  const date = useSelector(
    (state: RootState) => state.userProfileReducer.selectedDate
  );
  const changeDate = (value: number | Date) => {
    dispatch(setSelectedDate(new Date(value).toISOString()));
  };
  const showCreateEventPopup = () => {
    dispatch(changeShownPopup({shownPopup: "create"}));
  };

  return (
    <aside className={`${styles.aside}${showAside ? ` ${styles.show}`: ""}`}>
      <Button
        srcValue={Plus}
        label="Create"
        full={true}
        onClick={showCreateEventPopup}
      />
      <DatePicker selectedDate={new Date(date)} selectDate={changeDate} />
      <CalendarsList />
    </aside>
  );
};

export default Aside;
