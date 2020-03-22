import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from 'antd';
import styled from 'styled-components';

interface MenuButtonProps {
  isActive?: boolean;
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
      props.isActive ? '#1890ff' : '#7d7d7d'};
  }
`;

const FooterMenu: FC = () => {
  const [active, setActive] = useState('/');
  const history = useHistory();

  const handleOpenItem = (path: string) => {
    setActive(path);
    history.push(path);
  };

  return (
    <Footer>
      <MenuButton
        type="link"
        isActive={active === '/'}
        onClick={() => handleOpenItem('/')}
      >
        <FontAwesomeIcon icon={faPiggyBank} size="2x" />
        <span>Oszczędności</span>
      </MenuButton>
      <MenuButton
        type="link"
        isActive={active === '/profit'}
        onClick={() => handleOpenItem('/profit')}
      >
        <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
        <span>Zysk</span>
      </MenuButton>
    </Footer>
  );
};

export default FooterMenu;
