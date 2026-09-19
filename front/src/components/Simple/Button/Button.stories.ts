import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import Play from "assets/play.svg";

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    type: 'primary',
    srcValue: Play,
    disabled: false,
    label: 'Button',
  },
  parameters: {
    controls: {
      exclude: ['onClick'],
    },
  },
};