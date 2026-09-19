import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import '/src/index.css';
import { useState } from 'react';

const CustomInput = ({ ...props }) => {
  const {
    type,
    disabled,
    label,
    name,
    placeholder,
  } = props

  const [inputValue, setInputValue] = useState<string>("");

  const uiProps = {
    type,
    disabled,
    value: inputValue,
    onChange: (value: string) => setInputValue(value),
    label,
    name,
    placeholder,
  }
  return (
    <Input {...uiProps} />  
  )
}

const meta: Meta<typeof CustomInput> = {
  title: 'Example/Input',
  component: CustomInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    type: "password",
    disabled: false,
    label: "Input",
    name: "Input",
    placeholder: "Input placeholder"
  },
};
