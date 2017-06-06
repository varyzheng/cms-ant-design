import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Index from './routes/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/index" component={Index} />
    </Router>
  );
}

export default RouterConfig;
