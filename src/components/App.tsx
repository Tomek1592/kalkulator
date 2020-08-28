import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';

import Savings from './Savings/Savings';
import Profit from './Profit/Profit';
import FooterMenu from './Common/FooterMenu';
import Header from './Common/Header';

import '../css/App.css';

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled('div')`
  padding: 20px;
  height: 100%;
`;

const App: FC = () => {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/">
              <Profit />
            </Route>
            <Route exact path="/savings">
              <Savings />
            </Route>
          </Switch>
        </Content>
        <FooterMenu />
      </AppWrapper>
    </Router>
  );
};

export default App;
