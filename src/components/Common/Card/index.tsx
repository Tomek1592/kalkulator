import * as React from 'react';

import { Card as AntdCard } from 'antd';
import { Props } from './types';

const Card = (props: Props): JSX.Element => {
  const { children } = props;

  return <AntdCard>{children}</AntdCard>;
};

export default Card;
