import React from 'react';

import { Button } from '../components/Common/Button';
import { Props } from '../components/Common/Button/types';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    htmlType: {
      control: {
        type: 'inline-radio',
        options: ['button', 'submit', 'reset'],
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    type: {
      control: {
        type: 'inline-radio',
        options: ['link', 'text', 'default', 'ghost', 'primary', 'dashed'],
      },
    },
    shape: {
      control: {
        type: 'inline-radio',
        options: ['circle', 'round'],
      },
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['large', 'small'],
      },
    },
  },
};

export const Basic = (args: Props) => <Button {...args} />;
Basic.args = {
  htmlType: 'submit',
  label: 'Oblicz',
  loading: false,
  type: 'primary',
  shape: undefined,
  size: undefined,
};
