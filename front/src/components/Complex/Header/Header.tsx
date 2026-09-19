import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import styles from "./Header.module.scss";

import { Button, Dropdown } from "components/Simple";
import { IItem } from "components/Simple/Dropdown/Dropdown";
import {
  IUser,
  TPeriod,
  Periods,
  setPeriod,
  setSelectedDate,
  setUser,
  toggleAside,
} from "store/userProfile.reducer";

import Logo from "assets/Logo.svg";
import Prev from "assets/chevron-left.svg";
import Next from "assets/chevron-right.svg";
import Logout from "assets/logout.svg";

interface IList extends IItem {
  value: TPeriod;
}

const list: IList[] = [
  { id: 0, value: Periods.Day, title: Periods.Day },
  { id: 1, value: Periods.Week, title: Periods.Week },
];

const Header = () => {
  const dispatch = useDispatch();

  const period = useSelector((state: RootState) => state.userProfileReducer.period);
  const changePeriod = (value: TPeriod) => {
    dispatch(setPeriod(value));
  };

  const user = useSelector((state: RootState) => state.userProfileReducer.user);
  const changeUser = (value: IUser | null) => {
    dispatch(setUser(value));
  };

  const selectedDate = useSelector(
    (state: RootState) => state.userProfileReducer.selectedDate
  );
  const changeSelectedDate = (isForward: boolean) => {
    const changedDate = new Date(selectedDate);
    changedDate.setDate(
      changedDate.getDate() + (isForward ? 1 : -1) * (period === Periods.Day ? 1 : 7)
    );

    dispatch(setSelectedDate(changedDate.toISOString()));
  };

  const returnToToday = () => {
    dispatch(setSelectedDate(new Date().toISOString()));
  }

  const formatDate = useCallback(() => {
    const currentDate = new Date(selectedDate);

    const currentMonth = currentDate.toLocaleString('en', { month: 'long' });
    const currentYear = currentDate.toLocaleString('en', { year: 'numeric' });

    return `${currentMonth} ${currentYear}`;
  }, [selectedDate]);

  const [showLogout, setShowLogout] = useState<boolean>(false);
  const logout = () => {
    setShowLogout(false);
    changeUser(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.mob}>
            <Button
              label="Menu"
              onClick={() => (dispatch(toggleAside()))}
            />
          </div>
          <img className={styles.logo} src={Logo} alt="Logo" />
          <div className={styles.pc}>
          <Button label="Today" onClick={returnToToday} />
          <div className={styles.changeDate}>
            <Button
              type="secondary"
              srcValue={Prev}
              onClick={() => changeSelectedDate(false)}
            />
            <Button
              type="secondary"
              srcValue={Next}
              onClick={() => changeSelectedDate(true)}
            />
          </div>
          </div>
          <p className={styles.currentMonth}>{formatDate()}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.period}>
            <Dropdown
              selected={list.find((e) => e.value === period)}
              list={list}
              changeValue={(item) => changePeriod(item.value as TPeriod)}
          />
          </div>
          <button
            className={styles.userBlock}
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <p className={styles.userName}>{user?.userName}</p>
            <span className={styles.userIcon}>
              {user?.userLogo || user?.userName[0]}
            </span>
          </button>
          {showLogout && (
            <div className={styles.logout}>
              <Button
                type="secondary"
                label="Logout"
                srcValue={Logout}
                onClick={logout}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
