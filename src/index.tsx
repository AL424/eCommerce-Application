import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './services/store/store';
import { Provider } from 'react-redux';
import { getProductById } from './services/eCommerceService/Client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const id = '12236346-a8dd-40b5-ba11-6077e197f5e0';
const res = getProductById(id);
console.log(res);
