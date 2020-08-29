import React from 'react';
import { useLocation } from 'react-router-dom';

import * as S from './styles';

const Header = (): JSX.Element => {
  const location = useLocation();

  const titles = [
    { id: 'profit', path: '/', desc: 'Zysk z faktury' },
    { id: 'savings', path: '/savings', desc: 'Oszczędności z faktury' },
  ];

  const getDesc = (path: string) => {
    const currentTitle = titles.filter((title) => {
      if (title.path === path) return title;

      return undefined;
    });

    return currentTitle[0].desc;
  };

  return <S.HeaderWrapper>{getDesc(location.pathname)}</S.HeaderWrapper>;
};

export default Header;
