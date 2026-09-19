import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import TextArea from "./TextArea";

const TestTextArea = () => {
  const [textArea, setTextArea] = useState<string>("");

  return (
    <TextArea
      label={"TextArea"}
      value={textArea}
      onChange={setTextArea}
      name={"TextArea"}
    />
  )
}

test("TextArea component", () => {
  const { getByTestId, getByText } = render(<TestTextArea />);

  expect(getByTestId("TextArea"));
  expect(getByText("TextArea")).not.toBeNull();

  const TextArea = getByTestId("TextArea-field");

  fireEvent.change(TextArea, { target: { value: "Testing text" } });

  const TextAreaValue = TextArea.textContent;
  expect(TextAreaValue).toBe("Testing text");
});
