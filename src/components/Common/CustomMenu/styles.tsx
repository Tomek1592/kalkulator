import styled from 'styled-components';
import { Drawer } from 'antd';

export const CustomDrawer = styled(Drawer)`
  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }
`;

export const MenuTile = styled.div`
  height: 200px;
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin-bottom: 24px;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 20px;
    margin-top: 5px;
  }
`;
