import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import 'normalize.css';
import './assets/scss/styles.scss';
import App from './App';
import store from 'config/store';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

render(<Main />, document.getElementById('root'));
