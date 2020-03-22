import React, { useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { BarsOutlined } from '@ant-design/icons';

// import { Button } from 'antd';
import styled from 'styled-components';

import Savings from './Savings/Savings';
import Profit from './Profit/Profit';
// import CustomMenu from './Common/CustomMenu';
import FooterMenu from './Common/FooterMenu';

import '../css/App.css';

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled('div')`
  width: 100%;
  height: 50px;
  background: #e8e8e8;
  padding: 9px;
`;

const Content = styled('div')`
  padding: 20px;
  height: 100%;
`;

const App: FC = () => {
  // const [visible, setVisible] = useState(false);

  return (
    <Router>
      <AppWrapper>
        <Header>
          {/* <Button icon={<BarsOutlined />} onClick={() => setVisible(true)} /> */}
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
        <FooterMenu />
        {/* <CustomMenu visible={visible} setVisible={setVisible} /> */}
      </AppWrapper>
    </Router>
  );
};

export default App;
