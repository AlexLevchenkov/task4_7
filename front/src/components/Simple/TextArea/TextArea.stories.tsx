import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
import '/src/index.css';
import { useEffect, useState } from 'react';

const CustomTextArea = ({ ...props }) => {
  const {
    label, 
    value, 
    name, 
  } = props

  const [inputValue, setTextAreaValue] = useState<string>(value);

  useEffect(() => {
    setTextAreaValue(value)
  }, [value]);

  const uiProps = {
    value: inputValue,
    onChange: (value: string) => setTextAreaValue(value),
    label,
    name,
  }
  return (
    <TextArea {...uiProps} />  
  )
}

const meta: Meta<typeof CustomTextArea> = {
  title: 'Example/TextArea',
  component: CustomTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: "TextArea",
    value: "",
    name: "TextArea",
  },
};
