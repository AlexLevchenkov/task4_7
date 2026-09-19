import { fireEvent, render } from "@testing-library/react";
import Link from "./Link";
import { useState } from "react";

const TestLink = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  return (
    <>
      <Link 
        href="linksURL"
        disabled={isDisabled} 
        label="LinkLabel"     
      />
      <button
        data-testid="changeLinkStatus"
        onClick={() => setIsDisabled(!isDisabled)}
      />
    </>
  );
};

test("Link component", () => {
  const { getByTestId } = render(<TestLink />);

  const Link = getByTestId("Link");

  expect(Link).not.toBeNull();

  expect(Link.className.includes("disabled")).toBe(false);
  expect(Link.getAttribute("href")).toBe("linksURL");
  expect(Link.textContent).toBe("LinkLabel");

  fireEvent.click(getByTestId("changeLinkStatus"));

  expect(Link.className.includes("disabled")).toBe(true);
  expect(Link.getAttribute("href")).toBeNull();
});
