import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';
import { useState } from 'react';

const CustomDatePicker = () => {
  const [date, setDate] = useState<Date | number>(new Date());

  const uiProps = { 
    selectedDate: date,
    selectDate: (date: number | Date) => setDate(date), 
  }
  return (
    <DatePicker {...uiProps} />  
  )
}

const meta: Meta<typeof CustomDatePicker> = {
  title: 'Example/DatePicker',
  component: CustomDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
