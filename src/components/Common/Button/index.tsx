import React from 'react';

import { Props } from './types';
import * as S from './styles';

const Button = (props: Props): JSX.Element => {
  const {
    block,
    href,
    htmlType,
    icon,
    label,
    loading,
    shape,
    size,
    type,
  } = props;

  return (
    <S.Button
      block={block}
      href={href}
      htmlType={htmlType}
      icon={icon}
      loading={loading}
      shape={shape}
      size={size}
      type={type}
    >
      {label}
    </S.Button>
  );
};

export { Button };
