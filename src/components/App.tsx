import React, { useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import { Button } from 'antd';
import styled from 'styled-components';

import Savings from './Savings/Savings';
import Profit from './Profit/Profit';
import CustomMenu from './Common/CustomMenu';

import '../css/App.css';

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
    <Router>
      <AppWrapper>
        <Header>
          <Button icon="menu" onClick={() => setVisible(true)} />
        </Header>
        <Content>
          <Switch>
            <Route exact path="/">
              <Savings />
            </Route>
            <Route exact path="/profit">
              <Profit />
            </Route>
          </Switch>
        </Content>
        <CustomMenu visible={visible} setVisible={setVisible} />
      </AppWrapper>
    </Router>
  );
};

export default App;
