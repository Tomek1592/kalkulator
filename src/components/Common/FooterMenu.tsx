import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from 'antd';
import styled from 'styled-components';

interface MenuButtonProps {
  active?: string;
}

const Footer = styled('div')`
  width: 100%;
  height: 50px;
  background: #e8e8e8;
  padding: 5px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
`;

const MenuButton = styled(Button)`
  && {
    display: flex;
    flex-direction: column;
    font-size: 10px;
    align-items: center;
    color: ${(props: MenuButtonProps) =>
      props.active === 'true' ? '#1890ff' : '#7d7d7d'};
  }
`;

const FooterMenu: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      id: 'profit',
      path: '/',
      description: 'Zysk',
      icon: faHandHoldingUsd,
    },
    {
      id: 'savings',
      path: '/savings',
      description: 'Oszczędności',
      icon: faPiggyBank,
    },
  ];

  const handleOpenItem = (path: string) => {
    history.push(path);
  };

  return (
    <Footer>
      {menuItems.map((item) => (
        <MenuButton
          key={item.id}
          type="link"
          active={(location.pathname === item.path).toString()}
          onClick={() => handleOpenItem(item.path)}
        >
          <FontAwesomeIcon icon={item.icon} size="2x" />
          <span>{item.description}</span>
        </MenuButton>
      ))}
    </Footer>
  );
};

export default FooterMenu;
