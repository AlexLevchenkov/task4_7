import { fireEvent, render } from "@testing-library/react";
import Dropdown, { IItem } from "./Dropdown";
import { useState } from "react";

const list = [
  { id: 0, title: "text0", value: "text0" },
  { id: 1, title: "text1", value: "text1" },
  { id: 2, title: "text2", value: "text2" },
  { id: 3, title: "text3", value: "text3" },
  { id: 4, title: "text4", value: "text4" },
  { id: 5, title: "text5", value: "text5" },
];

const TestDropdown = () => {
  const [selected, setSelected] = useState<IItem>(list[0]);
  return (
    <Dropdown selected={selected} list={list} changeValue={setSelected} />
  )
}

test("Dropdown component", () => {
  const { getByTestId, queryAllByTestId } = render(<TestDropdown />);

  expect(getByTestId("Dropdown")).not.toBeNull();

  expect(queryAllByTestId("Dropdown-option")).toHaveLength(0);

  const button = getByTestId("Dropdown-button");

  fireEvent.click(button);

  const options = queryAllByTestId("Dropdown-option");

  expect(options).toHaveLength(list.length);

  fireEvent.click(options[2]);

  expect(queryAllByTestId("Dropdown-option")).toHaveLength(0);

  const DropdownValue = button.querySelector("div")?.textContent;

  expect(DropdownValue).toBe(list[2].title);
});