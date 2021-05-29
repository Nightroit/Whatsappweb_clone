import React from 'react'; 
import ReactDOM from 'react-dom'; 
import {BrowserRouter, Route} from 'react-router-dom'; 
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux'; 
import reduxThunk from 'redux-thunk'; 

import reducers from './reducers/index'
import App from './components/App';
import Signup from './components/auth/Signup';
import Feature from './components/Feature'
import Welcome from './components/Welcome'
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducers, 
    {
        auth: {authenticated: localStorage.getItem('token')}, 
    }, 
    composeEnhancer(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    <Provider store = {store}> 
        <BrowserRouter>
            <App>
                <Route path = "/signup" exact component = {Signup} /> 
                <Route path = "/home" exact component = {Feature} />
                <Route path = "/signout" exact component = {Signout} />
                <Route path = "/signin" exact component = {Signin}/>
            </App> 
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
