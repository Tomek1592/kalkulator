import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';

import { CustomMenuProps } from './types';
import * as S from './styles';

const CustomMenu: FC<CustomMenuProps> = ({ visible, setVisible }) => {
  const history = useHistory();

  const menuItems = [
    {
      id: 'menu-item-1',
      description: 'Ile zaoszczędzę',
      path: '/',
      color: '#7bdff2',
      icon: faPiggyBank,
    },
    {
      id: 'menu-item-2',
      description: 'Zysk z faktury',
      path: '/profit',
      color: '#b2f7ef',
      icon: faHandHoldingUsd,
    },
  ];

  const handleOpenItem = (path: string) => {
    setVisible(false);
    history.push(path);
  };

  return (
    <S.CustomDrawer
      title="Menu"
      placement="left"
      width={isMobile ? '100%' : '30%'}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} onClick={() => handleOpenItem(item.path)}>
            <S.MenuTile color={item.color}>
              <S.IconWrapper>
                <FontAwesomeIcon icon={item.icon} size="6x" />
                <span>{item.description}</span>
              </S.IconWrapper>
            </S.MenuTile>
          </li>
        ))}
      </ul>
    </S.CustomDrawer>
  );
};

export default CustomMenu;
