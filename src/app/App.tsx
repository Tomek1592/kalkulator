import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Savings from '../pages/savings';
import Profit from '../pages/profit';

import FooterMenu from '../components/common/FooterMenu/FooterMenu';
import Header from '../components/common/Header/Header';

import * as S from './styles';

const App = (): JSX.Element => {
  return (
    <Router>
      <S.AppWrapper>
        <Header />
        <S.Content>
          <Switch>
            <Route exact path="/">
              <Profit />
            </Route>
            <Route exact path="/savings">
              <Savings />
            </Route>
          </Switch>
        </S.Content>
        <FooterMenu />
      </S.AppWrapper>
    </Router>
  );
};

export default App;
