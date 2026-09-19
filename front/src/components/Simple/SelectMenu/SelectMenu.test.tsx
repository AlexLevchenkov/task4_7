import { fireEvent, render } from "@testing-library/react";
import SelectMenu, { IItem } from "./SelectMenu";
import { useState } from "react";

const list = [
  { id: 0, title: "text0", value: "text0" },
  { id: 1, title: "text1", value: "text1" },
  { id: 2, title: "text2", value: "text2" },
  { id: 3, title: "text3", value: "text3" },
  { id: 4, title: "text4", value: "text4" },
  { id: 5, title: "text5", value: "text5" },
];

const TestSelectMenu = () => {
  const [selectMenu, setSelectMenu] = useState<IItem>(list[0]);

  return (
    <SelectMenu
      label={"SelectMenu"}
      selected={selectMenu}
      list={list}
      changeValue={setSelectMenu}
    />
  )
}

test("SelectMenu component", () => {
  const { getByTestId, queryAllByTestId } = render(<TestSelectMenu />);

  expect(getByTestId("SelectMenu")).not.toBeNull();

  expect(queryAllByTestId("SelectMenu-option")).toHaveLength(0);

  const button = getByTestId("SelectMenu-button");

  fireEvent.click(button);

  const options = queryAllByTestId("SelectMenu-option");

  expect(options).toHaveLength(list.length);

  fireEvent.click(options[2]);

  expect(queryAllByTestId("SelectMenu-option")).toHaveLength(0);

  expect(button.textContent).toBe(list[2].title);
});