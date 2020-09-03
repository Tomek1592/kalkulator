import styled from 'styled-components';
import { Button as AntdButton } from 'antd';

import { Props } from './types';

export const Footer = styled.div`
  width: 100%;
  height: 50px;

  position: fixed;
  bottom: 0;
  padding: 5px;

  display: flex;
  justify-content: space-around;

  background: #e8e8e8;
`;

export const MenuButton = styled(AntdButton)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    color: ${(props: Props) =>
      props.active === 'true' ? '#1890ff' : '#7d7d7d'};
  }
`;
