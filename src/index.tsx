import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// for MUI (datepicker used)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// https://capacitorjs.com/docs/v2/web/pwa-elements
// Needed to show camera elements when running on web page
defineCustomElements(window);
