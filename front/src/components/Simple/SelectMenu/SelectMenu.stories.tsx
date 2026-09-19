import type { Meta, StoryObj } from '@storybook/react';
import SelectMenu from './SelectMenu';
import { useState } from 'react';
import { IItem } from '../Dropdown/Dropdown';

const CustomSelectMenu= ({ ...props }) => {
  const { 
    label, 
    selected, 
    list, 
  } = props

  const [selectMenu, setSelectMenu] = useState<IItem>(selected);

  const uiProps = {
    label, 
    selected: selectMenu, 
    list, 
    changeValue: (item: IItem) => setSelectMenu(item)
  }
  return (
    <SelectMenu{...uiProps} />  
  )
}

const meta: Meta<typeof CustomSelectMenu> = {
  title: 'Example/SelectMenu',
  component: CustomSelectMenu,
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
    label: "SelectMenu",
    selected: list[0],
    list: list,
  },
};
