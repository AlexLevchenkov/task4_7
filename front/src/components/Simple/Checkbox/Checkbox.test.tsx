import { fireEvent, render } from "@testing-library/react";
import Checkbox from "./Checkbox";
import { useState } from "react";

const TestCheckbox = () => {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <Checkbox
      status={status}
      onChange={() => setStatus((prev) => !prev)}
      name={"Checkbox"}
      label="Checkbox"
    />
  );
};

test("Checkbox component", () => {
  const { getByTestId } = render(<TestCheckbox />);
  const checkbox = getByTestId("Checkbox");

  expect(checkbox).not.toBeNull();

  let img = checkbox.querySelector("img");

  expect(img).not.toBeNull();

  if (img) {
    const src = img.getAttribute("src");
    expect(src).toBe("svg-asset-mock");
  }

  fireEvent.click(checkbox);

  if (img) {
    const src = img.getAttribute("src");
    expect(src).toBe("svg-asset-mock");
  }
});
