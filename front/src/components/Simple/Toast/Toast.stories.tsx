import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';
import { useEffect, useState } from 'react';

const CustomToast= ({ ...props }) => {
  const { 
    isOpen, 
    text,
  } = props

  const [showToast, setShowToast] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowToast(isOpen)
  }, [isOpen]);

  const uiProps = { 
    isOpen: showToast,
    close: () => setShowToast(false), 
    text
  }
  return (
    <Toast{...uiProps} />  
  )
}

const meta: Meta<typeof CustomToast> = {
  title: 'Example/Toast',
  component: CustomToast,
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
    title: "Toast Title",
    text: "Toast text",
  },
};
