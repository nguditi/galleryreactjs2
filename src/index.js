import React from 'react';
import ReactDOM from 'react-dom';
import './Component/explore.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers'
import App from './Component/App';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
