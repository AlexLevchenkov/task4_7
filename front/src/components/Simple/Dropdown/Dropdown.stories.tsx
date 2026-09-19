import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { IItem } from './Dropdown';
import '/src/index.css';
import { useState } from 'react';

const CustomDropdown = ({ ...props }) => {
  const { 
    selected, 
    list, 
  } = props

  const [selectedValue, setSelectedValue] = useState<IItem>(selected);

  const uiProps = { 
    selected: selectedValue,
    list,
    changeValue: (item: IItem) => setSelectedValue(item),
  }
  return (
    <Dropdown {...uiProps} />  
  )
}

const meta: Meta<typeof CustomDropdown> = {
  title: 'Example/Dropdown',
  component: CustomDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
const list = [
  {id: 0, title: "text0", value: "text0"},
  {id: 1, title: "text1", value: "text1"},
  {id: 2, title: "text2", value: "text2"},
  {id: 3, title: "text3", value: "text3"},
  {id: 4, title: "text4", value: "text4"},
  {id: 5, title: "text5", value: "text5"},
];

export const Example: Story = {
  args: {
    selected: list[0],
    list: list,
  },
};
