import styled from 'styled-components';
import { Button } from 'antd';

import { MenuButtonProps } from './types';

export const Footer = styled.div`
  width: 100%;
  height: 50px;
  background: #e8e8e8;
  padding: 5px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

export const MenuButton = styled(Button)`
  && {
    display: flex;
    flex-direction: column;
    font-size: 10px;
    align-items: center;
    color: ${(props: MenuButtonProps) =>
      props.active === 'true' ? '#1890ff' : '#7d7d7d'};
  }
`;
