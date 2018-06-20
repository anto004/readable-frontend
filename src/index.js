import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose} from "redux";
import post from "./reducers";
import {Provider} from "react-redux";
import {logger} from "redux-logger";
import thunk from "redux-thunk";

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // To add Redux dev tools to applyMiddleware
const store = createStore(
    post,
    composeEnhancers(
        applyMiddleware(thunk, logger)
    )
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
