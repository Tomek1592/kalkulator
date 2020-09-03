import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Savings from '../../pages/savings';
import Profit from '../../pages/profit';

import FooterMenu from '../common/FooterMenu/FooterMenu';
import Header from '../common/Header';

import * as S from './styles';
import '../../css/App.css';

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
