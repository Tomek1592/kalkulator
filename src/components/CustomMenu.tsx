import React, { FC } from "react";
import { Link } from 'react-router-dom';

import { Drawer } from "antd";
import styled from "styled-components";

const CustomDrawer = styled(Drawer)`
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

interface CustomMenuProps {
  visible: boolean;
  setVisible: any;
}

const CustomMenu: FC<CustomMenuProps> = ({ visible, setVisible }) => {
  const menuItems = [
    { id: 'menu-item-1', description: 'Ile zaoszczędzę', path: '/' },
    { id: 'menu-item-2', description: 'Zysk z faktury', path: '/profit' },
  ];

  return (
    <CustomDrawer
      title="Menu"
      placement="left"
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={() => setVisible(false)}
            >
              {item.description}
            </Link>
          </li>
        ))}
      </ul>
    </CustomDrawer>
  )
};

export default CustomMenu;
