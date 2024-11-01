import React from 'react';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast';

import store from './store.js'; // Import your store
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
