import './styles/global.css';

import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';

ReactDom.render(
  <Router history={browserHistory} routes={routes} />, document.getElementById('root'));
