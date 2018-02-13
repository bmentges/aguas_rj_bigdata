import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, createStore} from 'redux'
import reservatorioReducer from './reducers/reservatorio';
import {asyncDispatchMiddleware} from "./middleware/async";
import {Provider} from 'react-redux';

it('renders without crashing', () => {
  let store = createStore(reservatorioReducer, applyMiddleware(
                  asyncDispatchMiddleware
              ));
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      div);
  ReactDOM.unmountComponentAtNode(div);
});
