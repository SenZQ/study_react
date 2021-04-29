import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from "react-router-dom";

// Mobx 相关组件
import {Provider} from 'mobx-react';
import store from './store/store.js';

/*
    用 <Provider store={store}></Provider>，嵌套住根部的 <App/> 组件

    可在 App 内访问到 store
*/

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
