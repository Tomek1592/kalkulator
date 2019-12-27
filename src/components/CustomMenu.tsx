import React, { FC } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

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

const MenuTile = styled('div')`
  height: 200px;
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin-bottom: 24px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span {
    font-size: 20px;
    margin-top: 5px;
  }
`;

interface CustomMenuProps {
  visible: boolean;
  setVisible: any;
}

const CustomMenu: FC<CustomMenuProps> = ({ visible, setVisible }) => {
  const menuItems = [
    {
      id: 'menu-item-1',
      description: 'Ile zaoszczędzę',
      path: '/',
      color: '#7bdff2',
      icon: faPiggyBank
    },
    {
      id: 'menu-item-2',
      description: 'Zysk z faktury',
      path: '/profit',
      color: '#b2f7ef',
      icon: faHandHoldingUsd
    }
  ];

  const history = useHistory();

  const handleOpenItem = (path: string) => {
    setVisible(false);
    history.push(path);
  };

  return (
    <CustomDrawer
      title="Menu"
      placement="left"
      width="100%"
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <ul>
        {menuItems.map(item => (
          <li key={item.id} onClick={() => handleOpenItem(item.path)}>
            <MenuTile color={item.color}>
              <IconWrapper>
                <FontAwesomeIcon icon={item.icon} size="6x" />
                <span>{item.description}</span>
              </IconWrapper>
            </MenuTile>
          </li>
        ))}
      </ul>
    </CustomDrawer>
  )
};

export default CustomMenu;
