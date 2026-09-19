import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

const colors = [
  { id: 0, color: "#000000" },
  { id: 1, color: "#00AE1C" },
  { id: 2, color: "#FF5620" },
  { id: 3, color: "yellow" },
  { id: 4, color: "red" },
  { id: 5, color: "blue" },
];

const TestColorPicker = () => {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  return (
    <ColorPicker
      colors={colors}
      selectedColorId={selectedColorId}
      selectColor={setSelectedColorId}
    />
  )
}

describe("ColorPicker component", () => {
  test("Test ColorPicker rendered with 6 colors", () => {
    const { getByTestId, queryAllByTestId } = render(<TestColorPicker />);
    expect(getByTestId("ColorPicker")).not.toBeNull();
    expect(queryAllByTestId("ColorPicker-item")).toHaveLength(6);
    expect(queryAllByTestId("ColorPicker-button")).toHaveLength(6);
  });

  test("Checking the color values", () => {
    const { queryAllByTestId } = render(<TestColorPicker />);
    const coloredButtons = queryAllByTestId("ColorPicker-button");

    coloredButtons.forEach((coloredButton, idx) => {
      expect(coloredButton.style.backgroundColor === colors[idx].color);
    });
  });

  test("Checking the selected color", () => {
    const { queryAllByTestId } = render(<TestColorPicker />);
    const coloredItems = queryAllByTestId("ColorPicker-item");
    const coloredButtons = queryAllByTestId("ColorPicker-button");

    fireEvent.click(coloredButtons[1]);

    coloredItems.forEach((item, idx) => {
      idx === 1
        ? item.className.includes("selected")
        : !item.className.includes("selected");
    });

    fireEvent.click(coloredButtons[3]);

    coloredItems.forEach((item, idx) => {
      idx === 3
        ? item.className.includes("selected")
        : !item.className.includes("selected");
    });
  });
});
