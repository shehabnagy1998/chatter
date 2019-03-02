import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import { CSSTransition } from 'react-transition-group'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <CSSTransition
                in={true}
                appear={true}
                classNames='slideIn'
                timeout={1000}>
                <Route path="/" component={App}></Route>
            </CSSTransition>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
