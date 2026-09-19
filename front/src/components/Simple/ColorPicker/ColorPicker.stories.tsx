import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';
import { useState } from 'react';

const CustomColorPicker = ({ ...props }) => {
  const { 
    colors, 
    selectedColorId, 
  } = props

  const [colorId, setColorId] = useState<number | null>(selectedColorId);

  const uiProps = { 
    colors,
    selectedColorId: colorId,
    selectColor: (id: number) => setColorId(id), 
  }
  return (
    <ColorPicker {...uiProps} />  
  )
}

const meta: Meta<typeof CustomColorPicker> = {
  title: 'Example/ColorPicker',
  component: CustomColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    colors: [
      {id: 0, color: "#000000"},
      {id: 1, color: "#00AE1C"},
      {id: 2, color: "#FF5620"},
      {id: 3, color: "yellow"},
      {id: 4, color: "red"},
      {id: 5, color: "blue"},
    ]
  },
};
