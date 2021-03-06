/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import MainPage from 'containers/MainPage/Loadable';
import CreatePage from 'containers/CreatePage/Loadable';
import SubscribePage from 'containers/SubscribePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import ProducePage from 'containers/ProducePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Container } from 'react-bootstrap';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <Container>
      <Helmet
        titleTemplate="%s - Consesus Finance"
        defaultTitle="Consesus Finance"
      >
        <meta name="description" content="Consesus Finance" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/subscribe" component={SubscribePage} />
        <Route path="/produce" component={ProducePage} />
        <Route path="/create" component={CreatePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </Container>
  );
}
