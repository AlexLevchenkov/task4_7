import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import Toast from "./Toast";

const TestToast = () => {
  const [toast, setToast] = useState<boolean>(false);

  return (
    <>
      <Toast
        isOpen={toast}
        close={() => setToast(false)}
        text={
          "Toast text"
        }
      />
      <button
        onClick={() => setToast(true)}
        data-testid={"changeToastStatus"}
      />
    </>  
  )
}


test("Toast component", () => {
  const { getByTestId, queryByTestId } = render(<TestToast />);

  const toast = queryByTestId("Toast");
  const toastChangeButton = getByTestId("changeToastStatus");

  expect(toast).not.toBeNull();

  if (toast) {
    expect(toast).toHaveStyle("opacity: 0");
    expect(toastChangeButton);
  
    fireEvent.click(toastChangeButton);
  
    expect(toast).toHaveStyle("opacity: 1");
  
    fireEvent.click(getByTestId("Toast-close"));
  
    expect(toast).toHaveStyle("opacity: 0");
  }
});