import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'; 

import Reducer from './reducers/index'
import {createStore} from 'redux'; 
const store = createStore(
    Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

ReactDOM.render(
    <Provider store = {store}>
      <App />,
    </Provider>,
  document.getElementById('root')
);
