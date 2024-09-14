import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>

);
