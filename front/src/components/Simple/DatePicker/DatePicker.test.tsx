import { fireEvent, render } from "@testing-library/react";
import DatePicker, { months } from "./DatePicker";
import { useState } from "react";

const TestDatePicker = () => {
  const [date, setDate] = useState<Date | number>(new Date());
  return (
    <DatePicker selectedDate={date} selectDate={setDate} />
  )
}

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

describe("DatePicker component", () => {
  test("Checking the selected current date when init DatePicker", () => {
    const { getByTestId, getByText } = render(<TestDatePicker />);
    const DatePicker = getByTestId("DatePicker");

    expect(DatePicker).not.toBeNull();

    const renderedDate = getByText(`${months[month]} ${year}`);

    expect(renderedDate).not.toBeNull();

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(date);
      }
    });
  });

  test("Checking the change of month", () => {
    const { getByTestId } = render(<TestDatePicker />);
    const DatePicker = getByTestId("DatePicker");
    const prevMonth = getByTestId("DatePicker-prev");
    const nextMonth = getByTestId("DatePicker-next");

    fireEvent.click(prevMonth);

    expect(getByTestId("DatePicker-month").textContent)
      .toBe(`${months[month === 0 ? 11 : month - 1]} ${
        month === 0 ? year - 1 : year
      }`);

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(date);
      }
    });

    fireEvent.click(nextMonth);
    fireEvent.click(nextMonth);

    expect(getByTestId("DatePicker-month").textContent)
      .toBe(`${months[month === 11 ? 0 : month + 1]} ${
        month === 11 ? year + 1 : year
      }`);

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(date);
      }
    });
  });

  test("Checking the selected date", () => {
    const { getByTestId, getAllByText } = render(<TestDatePicker />);
    const DatePicker = getByTestId("DatePicker");

    const selectedDate = date === 1 ? 2 : 1;

    const selectedDateItem = getAllByText(`${selectedDate}`)[0];

    expect(selectedDateItem).not.toBeNull();

    if (selectedDateItem) {
      fireEvent.click(selectedDateItem);
    }

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(selectedDate);
      }
    });
  });

  test("Checking the selected date in the previous month", () => {
    const { getByTestId, getAllByText } = render(<TestDatePicker />);
    const DatePicker = getByTestId("DatePicker");

    const selectedDate = new Date(year, month, 0).getDate();

    const selectedDateItem = getAllByText(`${selectedDate}`)[0];

    expect(selectedDateItem).not.toBeNull();

    if (selectedDateItem) {
      fireEvent.click(selectedDateItem);
    }

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(selectedDate);
      }
    });

    expect(getByTestId("DatePicker-month").textContent)
      .toBe(`${months[month === 0 ? 11 : month - 1]} ${
        month === 0 ? year - 1 : year
      }`);
  });

  test("Checking the selected date in the next month", () => {
    const { getByTestId, getAllByText } = render(<TestDatePicker />);
    const DatePicker = getByTestId("DatePicker");

    const selectedDate = 1;

    const selectedDateItem = getAllByText(`${selectedDate}`)[1];

    expect(selectedDateItem).not.toBeNull();

    if (selectedDateItem) {
      fireEvent.click(selectedDateItem);
    }

    DatePicker.querySelectorAll("button").forEach((button) => {
      if (button.className.includes("currentDate")) {
        expect(Number(button.textContent)).toBe(selectedDate);
      }
    });

    expect(getByTestId("DatePicker-month").textContent)
      .toBe(`${months[month === 11 ? 0 : month + 1]} ${
        month === 11 ? year + 1 : year
      }`);
  });
});
