import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './config/registerServiceWorker';
import './styles/lib/zuehlke.min.css';
import './styles/index.scss';
import { polyFillUrlSearchParamForEdge } from './config/api';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
polyFillUrlSearchParamForEdge(window);
