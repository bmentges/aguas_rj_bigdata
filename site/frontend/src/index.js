import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux'
import globalStateReducer from './reducers/reservatorio';
import {asyncDispatchMiddleware} from "./middleware/async";
import { createLogger } from 'redux-logger'
import {Provider} from 'react-redux';
import {fetchInitialDataAction} from "./constants/actionTypes";

const loggerMiddleware = createLogger();

let store = createStore(
    globalStateReducer,
    applyMiddleware(
        asyncDispatchMiddleware,
        loggerMiddleware
    ));

store.dispatch(fetchInitialDataAction());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
