import { fireEvent, render } from "@testing-library/react";
import Input from "./Input";
import { useState } from "react";

const TestInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const changeInputErrorValue = () => {
    setInputError((prev) => {
      if (prev) {
        return "";
      } else {
        return "You have error!";
      }
    });
  };

  return (
    <>
      <Input
        type={"password"}
        disabled={false}
        value={inputValue}
        onChange={setInputValue}
        label={"Input"}
        name={"Input"}
        placeholder={"Input placeholder"}
        errorMessage={inputError}
      />
      <button
        onClick={changeInputErrorValue}
        data-testid={"changeInputErrorValue"}
      />
    </>  
  )
}

describe("Input component", () => {
  test("Checking input params", () => {
    const { getByTestId, getByText } = render(<TestInput />);

    expect(getByTestId("Input"));
    expect(getByText("Input")).not.toBeNull();

    const input = getByTestId("Input-field");
    expect(input.getAttribute("type")).toBe("password");
  });

  test("Checking the ability to enter data into a component", () => {
    const { getByTestId, queryByText } = render(<TestInput />);

    const input = getByTestId("Input-field");

    fireEvent.change(input, { target: { value: "Testing text" } });

    const inputValue = input.getAttribute("value");
    expect(inputValue).toBe("Testing text");

    const elementWithText = queryByText("Testing text");
    expect(elementWithText).toBeNull();
  });

  test("Checking changes component type", () => {
    const { getByTestId } = render(<TestInput />);

    const input = getByTestId("Input-field");
    const buttonForChangeType = getByTestId("Input-button");

    expect(input.getAttribute("type")).toBe("password");
    fireEvent.click(buttonForChangeType);
    expect(input.getAttribute("type")).toBe("text");
  });

  test("Checking error message", () => {
    const { getByTestId, queryByText } = render(<TestInput />);

    const button = getByTestId("changeInputErrorValue");

    const elementWithText = queryByText("You have error!");
    expect(elementWithText).toBeNull();

    fireEvent.click(button);
    
    expect(queryByText("You have error!")).not.toBeNull();
  });
});
