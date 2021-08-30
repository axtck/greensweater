import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from "./app/store";
import CustomSnackbar from './components/Alerts/CustomSnackbar';
import "./styles/Main.scss";
import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  // example on urls to only show when authorized
  // if(request.url?.includes("checkout") || request.url?.includes("billing"))

  request.headers["x-access-token"] = store.getState().user.user?.accessToken;
  return request;
}, (error) => {
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <CustomSnackbar />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
