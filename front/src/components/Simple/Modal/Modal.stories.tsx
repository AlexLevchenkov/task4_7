import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import { useEffect, useState } from 'react';

const CustomModal= ({ ...props }) => {
  const { 
    isOpen, 
    title, 
    children,
  } = props

  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen]);

  const uiProps = { 
    isOpen: showModal,
    close: () => setShowModal(false), 
    title, 
    children
  }
  return (
    <Modal{...uiProps} />  
  )
}

const meta: Meta<typeof CustomModal> = {
  title: 'Example/Modal',
  component: CustomModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    children: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur esse facilis id ipsam perspiciatis magni quisquam perferendis natus. Excepturi consectetur alias iste? Magni nostrum rem vel nesciunt! Cumque soluta, quo dolor labore nostrum aperiam fugit deserunt dolorem magni officiis non repellat reprehenderit doloremque error fuga. Aspernatur sunt dolorum voluptas obcaecati ullam. Eaque necessitatibus architecto ex obcaecati in dicta. Sed nisi praesentium deserunt ab ratione harum quo fugit ex maiores. Quia aut expedita illum architecto suscipit pariatur sit atque, sed necessitatibus explicabo cum rem provident nesciunt. Exercitationem veritatis nemo minus quod deserunt debitis quidem autem, ipsam temporibus cum molestias eum? Quaerat.</p>,
  },
};
