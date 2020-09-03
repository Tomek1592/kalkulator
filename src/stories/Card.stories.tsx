import React from 'react';

import Card from '../components/common/Card/Card';
import { Props } from '../components/common/Card/types';

export default {
  title: 'Common/Card',
  component: Card,
};

export const Basic = (args: Props) => <Card {...args} />;
Basic.args = {
  children: 'Card content',
};
