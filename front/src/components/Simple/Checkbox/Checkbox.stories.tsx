import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useEffect, useState } from 'react';

const CustomCheckbox = ({ ...props }) => {
  const { 
    status, 
    name, 
    label,
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(status);

  useEffect(() => {
    setIsOpen(status);
  }, [status]);

  const uiProps = { 
    status: isOpen,
    name,
    label,
    onChange: () => setIsOpen(prev=>!prev),
  }
  return (
    <Checkbox {...uiProps} />  
  )
}

const meta: Meta<typeof CustomCheckbox> = {
  title: 'Example/Checkbox',
  component: CustomCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    status: false,
    name: 'Checkbox',
    label: 'Checkbox',
  },
};
