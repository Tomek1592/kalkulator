import * as React from 'react';

import { Card as AntdCard } from 'antd';
import { Props } from './types';
// import * as S from './styles';

const Card = (props: Props): JSX.Element => {
  const { children } = props;

  return <AntdCard>{children}</AntdCard>;
};

export { Card };
