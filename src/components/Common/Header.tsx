import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const HeaderWrapper = styled('div')`
  width: 100%;
  height: 50px;
  background: #e8e8e8;
  padding: 9px;
`;

const Header: FC = () => {
  const location = useLocation();

  const titles = [
    { id: 'profit', path: '/', desc: 'Zysk z faktury' },
    { id: 'savings', path: '/savings', desc: 'Oszczędności z faktury' },
  ];

  const getDesc = (path: string) => {
    const currentTitle = titles.filter((title) => {
      if (title.path === path) return title;
    });

    return currentTitle[0].desc;
  };

  return <HeaderWrapper>{getDesc(location.pathname)}</HeaderWrapper>;
};

export default Header;
