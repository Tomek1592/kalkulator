import React, { useState } from 'react';
import '../css/App.css';

import { Button, Drawer } from 'antd';
import styled from 'styled-components';

import CustomForm from './CustomForm';
import SummaryCard from "./SummaryCard";

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Header = styled('div')`
  width: 100%;
  height: 50px;
  background: #e8e8e8;
  padding: 9px;
`;

const Content = styled('div')`
  padding: 20px;
`;

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <AppWrapper>
      <Header>
        <Button icon="menu" onClick={() => setVisible(true)} />
      </Header>
      <Content>
        <CustomForm />
      </Content>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </AppWrapper>
  );
};

export default App;
