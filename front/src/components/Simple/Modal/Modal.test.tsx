import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import Modal from "./Modal";

const TestModal = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <> 
      <Modal
        isOpen={modal}
        close={() => setModal(false)}
        title={"Modal"}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur esse facilis id ipsam perspiciatis magni quisquam perferendis natus. Excepturi consectetur alias iste? Magni nostrum rem vel nesciunt! Cumque soluta, quo dolor labore nostrum aperiam fugit deserunt dolorem magni officiis non repellat reprehenderit doloremque error fuga. Aspernatur sunt dolorum voluptas obcaecati ullam. Eaque necessitatibus architecto ex obcaecati in dicta. Sed nisi praesentium deserunt ab ratione harum quo fugit ex maiores. Quia aut expedita illum architecto suscipit pariatur sit atque, sed necessitatibus explicabo cum rem provident nesciunt. Exercitationem veritatis nemo minus quod deserunt debitis quidem autem, ipsam temporibus cum molestias eum? Quaerat.
        </p>
      </Modal>
      <button
        onClick={() => setModal(true)}
        data-testid={"changeModalStatus"}
      >
        Modal change status
      </button>
    </>
  )
}

test("Modal component", () => {
  const { getByTestId, queryByTestId } = render(<TestModal />);
  
  const modalChangeButton = getByTestId("changeModalStatus");
  expect(queryByTestId("Modal")).toBeNull();
  expect(modalChangeButton);

  fireEvent.click(modalChangeButton);

  expect(queryByTestId("Modal")).not.toBeNull();

  fireEvent.click(getByTestId("Modal-close"));

  expect(queryByTestId("Modal")).toBeNull();
});