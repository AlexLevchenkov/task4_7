import styles from "./DatePicker.module.scss";
import '/src/index.css';
import ChevronLeft from "../../../assets/chevron-left.svg";
import ChevronRight from "../../../assets/chevron-right.svg";

interface IComponentProps {
  selectedDate: Date | number;
  selectDate: (date: Date | number) => void;
}
  
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePicker = ({ selectedDate = new Date(), selectDate }: IComponentProps) => {
  const currentDate = new Date();
  const formattedSelectedDate = new Date(selectedDate);

  const nextMonth = () => {
    const newDate = new Date(formattedSelectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    selectDate(newDate);
  };

  const prevMonth = () => {
    const newDate = new Date(formattedSelectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    selectDate(newDate);
  };

  const selectThisDate = (date: number, month: number) => {
    const newDate = new Date(formattedSelectedDate);
    newDate.setDate(15);
    newDate.setMonth(newDate.getMonth() + month);
    newDate.setDate(date);
    selectDate(newDate);
  }

  const date = formattedSelectedDate.getDate();
  const month = formattedSelectedDate.getMonth();
  const year = formattedSelectedDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  let day = 1;

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthDays = [];
  for (let i = firstDayOfMonth; i > 0; i--) {
    const prevDay = prevMonthLastDay - i + 1;
    prevMonthDays.push(
      <button
        key={`prev${i}`}
        className={styles.prevMonth}
        onClick={() => selectThisDate(prevDay, -1)}
      >
        {prevDay}
      </button>
    );
  }

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        continue;
      } else if (day <= daysInMonth) {
        const today = day;
        const isCurrentDate = (
          day === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        )
        week.push(
          <button
            key={`current${day}`}
            className={`${styles.currentMonth}${
              isCurrentDate ? ` ${styles.currentDate}` : ""
            }${
              !isCurrentDate && day === date ? ` ${styles.selectedDate}` : ""
            }`}
            onClick={() => selectThisDate(today, 0)}
          >
            {day}
          </button>
        );
        day++;
      } else {
        const nextDay = day - daysInMonth;
        week.push(
          <button
            key={`next${nextDay}`}
            className={styles.nextMonth}
            onClick={() => selectThisDate(nextDay, 1)}
          >
            {nextDay}
          </button>
        );
        day++;
      }
    }
    if (i === 0) {
      days.push(<div className={styles.week} key={`week${i}`}>{[...prevMonthDays, ...week]}</div>);
    } else {
      days.push(<div className={styles.week} key={`week${i}`}>{week}</div>);
    }
  }


  return (
    <>
      <div className={styles.calendarWrapper} data-testid="DatePicker">
        <div className={styles.controlBlock}>
          <button
            className={styles.controlItem}
            onClick={prevMonth}
            data-testid={"DatePicker-prev"}
          >
            <img className={styles.icon} src={ChevronLeft} alt="prev month icon" />
          </button>
          <button 
            className={styles.controlItem}
            onClick={nextMonth}
            data-testid={"DatePicker-next"}
          >
            <img className={styles.icon} src={ChevronRight} alt="next month icon" />
          </button>
        </div>
        <div className={styles.calendar}>
          <div className={styles.header}>
            <div 
              className={styles.title}
              data-testid="DatePicker-month"
            >
              {months[month]} {year}
            </div>
            <div className={styles.daysOfWeek}>
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
          </div>
          <div className={styles.body}>{days}</div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
