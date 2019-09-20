import React, { useState, FC } from 'react';
import '../css/App.css';

import { Button } from 'antd';
import styled from 'styled-components';

import CustomForm from './CustomForm';
import CustomMenu from './CustomMenu';

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

const App: FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <AppWrapper>
      <Header>
        <Button icon="menu" onClick={() => setVisible(true)} />
      </Header>
      <Content>
        <CustomForm />
      </Content>
      <CustomMenu visible={visible} setVisible={setVisible} />
    </AppWrapper>
  );
};

export default App;
