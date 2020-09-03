import * as React from 'react';

import { Props } from './types';
import * as S from './styles';

const Button = (props: Props): JSX.Element => {
  const {
    block,
    children,
    href,
    htmlType,
    icon,
    loading,
    onClick,
    shape,
    size,
    type,
  } = props;
  const items: React.ReactNode[] = [];

  function getChildren() {
    return items.concat(children);
  }

  return (
    <S.Button
      block={block}
      href={href}
      htmlType={htmlType}
      icon={icon}
      loading={loading}
      onClick={onClick}
      shape={shape}
      size={size}
      type={type}
    >
      {children && getChildren().map((child) => !!child && child)}
    </S.Button>
  );
};

export { Button };
