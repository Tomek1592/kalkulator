import React from 'react';

import Card from '../components/Common/Card/Card';
import { Props } from '../components/Common/Card/types';

export default {
  title: 'Common/Card',
  component: Card,
};

export const Basic = (args: Props) => <Card {...args} />;
Basic.args = {
  children: 'Card content',
};
