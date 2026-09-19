import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

const TestButton = () => {
  const [haveIcon, setHaveIcon] = useState<boolean>(false);
  return (
    <>
      <Button
        type={"primary"}
        srcValue={haveIcon ? "scr" : undefined}
        disabled={false}
        label={"Button"}
        onClick={() => console.log("Click")}
      />
      <button 
        onClick={() => setHaveIcon(!haveIcon)}
        data-testid="addIcon"
      />
    </>
  );
};

test("Button component", () => {
  const { getByTestId, getByText } = render(<TestButton />);

  const button = getByTestId("Button");

  expect(button).not.toBeNull();

  const havePrimaryClass = button.className.includes("primary");
  expect(havePrimaryClass).toBe(true);

  expect(button.querySelector("img")).toBeNull();

  fireEvent.click(getByTestId("addIcon"));
  
  const img = button.querySelector("img");

  if (img) {
    const src = img.getAttribute("src");
    expect(src).toBe("scr");
  }

  expect(getByText("Button")).not.toBeNull();
});
