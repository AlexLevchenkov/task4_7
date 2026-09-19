import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';
import '/src/index.css';

const meta: Meta<typeof Link> = {
  title: 'Example/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    href: "#",
    disabled: false,
    label: "Link",
  },
};
