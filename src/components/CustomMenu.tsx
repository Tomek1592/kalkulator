import React, { FC } from "react";

import { Drawer } from "antd";

interface CustomMenuProps {
  visible: boolean;
  setVisible: any;
}

const CustomMenu: FC<CustomMenuProps> = ({ visible, setVisible }) => {
  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <p>Kalkulator VAT</p>
    </Drawer>
  )
};

export default CustomMenu;
