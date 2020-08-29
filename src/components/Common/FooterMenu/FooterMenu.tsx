import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';

import * as S from './styles';

const FooterMenu = (): JSX.Element => {
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
    <S.Footer>
      {menuItems.map((item) => (
        <S.MenuButton
          key={item.id}
          type="link"
          active={(location.pathname === item.path).toString()}
          onClick={() => handleOpenItem(item.path)}
        >
          <FontAwesomeIcon icon={item.icon} size="2x" />
          <span>{item.description}</span>
        </S.MenuButton>
      ))}
    </S.Footer>
  );
};

export default FooterMenu;
