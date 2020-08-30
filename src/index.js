import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk'
import { fetchExpenses } from './actions/Expense';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const userData = sessionStorage.getItem('userData');
if (userData) {
    store.dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
    const param = {
      userID: JSON.parse(userData).userID 
  }
  console.log(userData)
  store.dispatch(fetchExpenses(JSON.stringify(param)))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
