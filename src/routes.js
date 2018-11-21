import React from 'react';
import ErrorPage from './components/ErrorPage';
import { Route } from 'react-router';
import DashboardPage from './components/landing';
require('./styles/main.styl');
require('react-redux-toastr/src/styles/index.scss');

const routes = () =>
  (
    <Route>
      <Route path="/" name="landing" component={DashboardPage} />
      <Route path="*" name="not-found" component={ErrorPage} />
    </Route>
  );

export default routes;
