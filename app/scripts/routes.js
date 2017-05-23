import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Concerts from './pages/concerts.jsx';
import Countries from './pages/countries.jsx';
import Seating from './pages/seating.jsx';
import NotFound from './pages/notFound.jsx';

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home }/>
      <Route path='home' component={ Home } />
      <Route path='concerts' component={ Concerts } />
      <Route path='countries' component={ Countries } />
      <Route path='seating' component={ Seating } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
